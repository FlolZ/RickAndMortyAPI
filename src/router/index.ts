import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Char from "../views/Char.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: "characters",
  },
  {
    path: "/characters",
    name: "characters",
    component: Home,
  },
  {
    path: "/characters/:charId",
    name: "characters-consult",
    component: Char,
    beforeEnter: (to, _from, next) => {
      if (Number.isInteger(Number(to.params.charId))) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _from, next) => {
  const existingPages = ["about", "characters", "characters-consult"];
  const pageExists = existingPages.includes(to.name as string);
  if (pageExists) {
    next();
  } else {
    next("/");
  }
});

export default router;
