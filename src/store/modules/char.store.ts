import { apiClient } from "@/lib/api-client";
import { CharManager } from "@/lib/manager/char/char.manager";
import { QueryApiModel } from "@/lib/models/api.model";
import { CharModel } from "@/lib/models/char/char.model";
import { InfoModel } from "@/lib/models/info/info.model";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { MainState } from "..";

const charManager = new CharManager(apiClient);

export interface CharState {
  charList: {
    data: CharModel[];
    info: InfoModel;
  };
  loading: boolean;
  char: CharModel;
  error: string | null;
}

export const state: CharState = {
  charList: {
    data: [] as CharModel[],
    info: {} as InfoModel,
  },
  loading: false,
  error: null,
  char: {} as CharModel,
};

const mutations: MutationTree<CharState> = {
  setCharList(state, charList: CharModel[]) {
    state.charList.data = charList;
  },
  setInfo(state, infoModel: InfoModel) {
    state.charList.info = infoModel;
  },
  setError(state, errorMessage: string | null) {
    state.error = errorMessage;
  },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
  setChar(state, char: CharModel) {
    state.char = char;
  },
};

const actions: ActionTree<CharState, MainState> = {
  searchCharacters({ commit }, params?: QueryApiModel): void {
    commit("setLoading", true);
    charManager
      .getCharList(params)
      .then((apiResponse) => {
        commit("setCharList", apiResponse.results);
        commit("setInfo", apiResponse.info);
        commit("setError", null);
      })
      .catch((error) => {
        commit("setError", error.message);
      })
      .finally(() => {
        commit("setLoading", false);
      });
  },

  getCharacter({ commit }, params: number): void {
    commit("setLoading", true);
    charManager
      .getChar(params)
      .then((charModel) => {
        commit("setChar", charModel);
        commit("setError", null);
      })
      .catch((error) => {
        commit("setError", error.message);
      })
      .finally(() => {
        commit("setLoading", false);
      });
  },
  getMultipleChar({ commit }, params: string[]): void {
    commit("setLoading", true);
    charManager
      .getMultipleChar(params)
      .then((apiResponse) => {
        commit("setCharList", apiResponse);
        commit("setError", null);
      })
      .catch((error) => {
        commit("setError", error.message);
      })
      .finally(() => {
        commit("setLoading", false);
      });
  },
};

const getters: GetterTree<CharState, MainState> = {};

const namespaced = true;

export const charStore: Module<CharState, MainState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
