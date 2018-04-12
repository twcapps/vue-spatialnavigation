import "./polyfill";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import Config from "./config.json";

import * as Store from "./store";
import { store } from "./store";

import router from "./router";

import "./style.scss";
import template from "./main.vue";

let logLevel = (Config.debug ? Logger.DEBUG : Logger.ERROR);
Logger.useDefaults();
Logger.setLevel(logLevel);

import VueFocus from "../../src/focus.directive";

Vue.use(VueFocus);

Vue.config.errorHandler = function (err, vm, info) {
  Logger.error("Vue error: ", err);
};

@Component({
  mixins: [template],
  store,
  components: {
  },
  router
})
class App extends Vue {
  mounted () {
    Logger.log("mounted");

    const loaderVisible = Store.readLoaderVisibility(this.$store);
    Logger.info("loader is visible: ", loaderVisible);
  }
}

window.onerror = function (errorMsg, url, lineNo, colNo, error) {
  Logger.error("Global event: ", errorMsg);

  Store.commitLoaderVisibility(store, false);
};

export const app = new App().$mount("#app");
