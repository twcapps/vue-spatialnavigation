import Vue from "vue";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import Home from "../layouts/home";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: " ",
      component: Home
    }
  ],
  mode: "hash",
  linkActiveClass: "active"
});
