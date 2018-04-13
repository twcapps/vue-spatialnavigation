import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./home.vue";

import { navigationService } from "../../../../src/focus.directive";
import FocusElement from "../../components/focus-element";

@Component({
  mixins: [template],
  components: {
    FocusElement
  }
})
export default class Home extends Vue {
    current: string = "";

    componentFunctionRight() {
      let el = navigationService.getFocusElementById("button6");
      if (el) el.focus();
    }

    componentFunctionLeft() {
      let el = navigationService.getFocusElementById("button1");
      if (el) el.focus();
    }

    componentFunctionClicked() {
      let el = navigationService.getFocusElementInFocus();
      if (el) this.current = `${el.id}`;
    }
}
