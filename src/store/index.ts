import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import { charStore } from "./modules/char.store";
import { episodeStore } from "./modules/episode.store";
import { locationStore } from "./modules/location.store";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    charStore,
    locationStore,
    episodeStore,
  },
  mutations: {},
  actions: {},
  plugins: debug ? [createLogger()] : [],
});
