import { apiClient } from "@/lib/api-client";
import { EpisodeManager } from "@/lib/manager/episode/episode.manager";
import { EpisodeModel } from "@/lib/models/episode/episode.model";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { MainState } from "..";


const episodeManager = new EpisodeManager(apiClient);

export interface EpisodeState {
  episodeList: EpisodeModel[];
  loading: boolean;
  error: string | null;
}

export const state: EpisodeState = {
  episodeList: [] as EpisodeModel[],
  loading: false,
  error: null,
};

const mutations: MutationTree<EpisodeState> = {
  setEpisodeList(state, episodeList: EpisodeModel[]) {
    state.episodeList = episodeList;
  },
  setError(state, errorMessage: string | null) {
    state.error = errorMessage;
  },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
};

const actions: ActionTree<EpisodeState, MainState> = {
  getMultipleEpisode({ commit }, params: string[]): void {
    commit("setLoading", true);
    episodeManager
      .getMultipleEpisode(params)
      .then((apiResponse) => {
        let result = [];
        if (!apiResponse.length) {
          result.push(apiResponse);
        } else {
          result = apiResponse;
        }
        commit("setEpisodeList", result);
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

const getters: GetterTree<EpisodeState, MainState> = {};

const namespaced = true;

export const episodeStore: Module<EpisodeState, MainState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
