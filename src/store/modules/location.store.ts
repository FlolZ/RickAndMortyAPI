import { apiClient } from "@/lib/api-client";
import { LocationManager } from "@/lib/manager/location/location.manager";
import { LocationModel } from "@/lib/models/location/location.model";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

export interface MainState {
  version: string;
  $localForage: any;
}

const locationManager = new LocationManager(apiClient);

export interface LocationState {
  loading: boolean;
  location: LocationModel;
  error: string | null;
}

export const state: LocationState = {
  loading: false,
  error: null,
  location: {} as LocationModel,
};

const mutations: MutationTree<LocationState> = {
  setError(state, errorMessage: string | null) {
    state.error = errorMessage;
  },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
  setLocation(state, location: LocationModel) {
    state.location = location;
  },
};

const actions: ActionTree<LocationState, MainState> = {
  getLocation({ commit }, params: string): void {
    commit("setLoading", true);
    locationManager
      .getLocation(params)
      .then((locationModel) => {
        commit("setLocation", locationModel);
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

const getters: GetterTree<LocationState, MainState> = {};

const namespaced = true;

export const locationStore: Module<LocationState, MainState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
