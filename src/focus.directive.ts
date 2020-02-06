import { NavigationService } from "./navigation.service";
import Vue, { VNode } from "vue";

interface VNodeFocusListener {
  focus: boolean;
  blur: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  click: boolean;
}

export interface SpatialNavigationOptions {
  keyCodes?: {[key: string]: number | Array<number> } | undefined;
  navigationService?: new (keys: { [key: string]: number | Array<number> }) => NavigationService;
}

// export navigation service
export let navigationService: NavigationService;

// export focus element
export class FocusElement {
  static AutoFocus = "AUTOFOCUS";

  // private properties
  private _$el: any;
  private _left: string | undefined;
  private _right: string | undefined;
  private _up: string | undefined;
  private _down: string | undefined;
  private _listeners: VNodeFocusListener = {
    focus: false,
    blur: false,
    left: false,
    right: false,
    up: false,
    down: false,
    click: false
  };

  // directive identifier (matches related DOM id)
  id: string;
  // is element 'focussed'
  isFocus = false;
  // is element 'selected'
  isSelect = false;
  // should element be 'focussed' by default on rendering
  isDefault = false;

  // directive initialisation
  constructor(vnode: VNode) {
    if (vnode && vnode.elm) {
      // find dom element in vnode
      let elm = <any>vnode.elm;

      // enforce a dom id on all focusable elements, if it does not exist generate an id
      if (!elm.id) {
        elm.id = "focus-el-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
      }

      // cache dom properties in directive
      this.id = elm.id;
      this.isDefault = (elm.dataset.default === "" || elm.dataset.default === "true");
      this._left = (elm.dataset.left || "");
      this._right = (elm.dataset.right || "");
      this._up = (elm.dataset.up || "");
      this._down = (elm.dataset.down || "");

      // do not cache the listener logic to prevent memory leaks
      // instead cache the existance of a specific listener in the directive
      if (vnode.componentOptions && vnode.componentOptions.listeners) {
        let listeners = <any>vnode.componentOptions.listeners;
        this._listeners = {
          focus: !!listeners.focus,
          blur: !!listeners.blur,
          left: !!listeners.left,
          right: !!listeners.right,
          up: !!listeners.up,
          down: !!listeners.down,
          click: !!listeners.click,
        };
        listeners = undefined;
      }
      elm = undefined;
    }
  }

  // cleanup when directive is destroyed
  destroy() {
    this.isDefault = false;
    this.isFocus = false;
    this.isSelect = false;
    this._$el = undefined;
    this._left = undefined;
    this._right = undefined;
    this._up = undefined;
    this._down = undefined;
    this._listeners = {
      focus: false,
      blur: false,
      left: false,
      right: false,
      up: false,
      down: false,
      click: false
    };
  }
  // get dom reference of directive
  get $el() {
    if (this._$el) return this._$el;
    return this._$el = document.getElementById(this.id);
  }

  //// focus handling
  // set focus to element
  focus() {
    // blur other element, can only be 1 element in focus
    navigationService.blurAllFocusElements();
    // store focus action in navigation service so we can restore it if needed
    navigationService.lastElementIdInFocus = this.id;
    // set the current element in focus
    this.isFocus = true;
    if (this.$el) {
      this.$el.className += " focus";
      if (this._listeners.focus) {
        try {
          this.$el.__vue__.$vnode.componentOptions.listeners.focus(this.id);
        } catch (e) {}
      }
    }
    // set 'native' browser focus on input elements and focusable elements.
    if (this.$el && ( this.$el.tabIndex !== -1 || this.$el.nodeName === "INPUT" || this.$el.nodeName === "TEXTAREA")) this.$el.focus();
  }

  // remove focus from element
  blur() {
    this.isFocus = false;
    if (this.$el) {
      this.$el.className = this.$el.className.replace(/\s?\bfocus\b/, "");
      if (this._listeners.blur) {
        try {
          this.$el.__vue__.$vnode.componentOptions.listeners.blur(this.id);
        } catch (e) {}
      }
    }
    // if (this.$el && (this.$el.nodeName === "INPUT" || this.$el.nodeName === "TEXTAREA")) this.$el.blur();
  }

  //// select handling
  // set element as selected
  select() {
    this.isSelect = true;
    if (this.$el) this.$el.className += " select";
  }

  // remove selected state from element
  deSelect() {
    this.isSelect = false;
    if (this.$el) this.$el.className.replace(/\bselect\b/, "");
  }

  //// spatial navigation
  // move focus to the element/action configured as 'left' from this element
  left() {
    // check if we should automatically find next focusable element
    if (this._left === FocusElement.AutoFocus) {
      this.defaultFocusPrevious();
    // check if next focusable element should be set based on a DOM id pointer
    } else if (this._left) {
      this.doFocusElement(this._left);
    }
    // check if a event method is binded to the component
    if (this._listeners.left) {
      try {
        this.$el.__vue__.$vnode.componentOptions.listeners.left();
      } catch (e) {}
    }
  }

  // move focus to the element/action configured as 'right' from this element
  right() {
    // check if we should automatically find next focusable element
    if (this._right === FocusElement.AutoFocus) {
      this.defaultFocusNext();
    // check if next focusable element should be set based on a DOM id pointer
    } else if (this._right) {
      this.doFocusElement(this._right);
    }
    // check if a event method is binded to the component
    if (this._listeners.right) {
      try {
        this.$el.__vue__.$vnode.componentOptions.listeners.right();
      } catch (e) {}
    }
  }

  // move focus to the element/action configured as 'up' from this element
  up() {
    // check if we should automatically find next focusable element
    if (this._up === FocusElement.AutoFocus) {
      this.defaultFocusPrevious();
    // check if next focusable element should be set based on a DOM id pointer
    } else if (this._up) {
      this.doFocusElement(this._up);
    }
    // check if a event method is binded to the component
    if (this._listeners.up) {
      try {
        this.$el.__vue__.$vnode.componentOptions.listeners.up();
      } catch (e) {}
    }
  }

  // move focus to the element/action configured as 'down' from this element
  down() {
    // check if we should automatically find next focusable element
    if (this._down === FocusElement.AutoFocus) {
      this.defaultFocusNext();
    // check if next focusable element should be set based on a DOM id pointer
    } else if (this._down) {
      this.doFocusElement(this._down);
    }
    // check if a event method is binded to the component
    if (this._listeners.down) {
      try {
        this.$el.__vue__.$vnode.componentOptions.listeners.down();
      } catch (e) {}
    }
  }

  enter() {
    if (this._listeners.click) {
      try {
        this.$el.__vue__.$vnode.componentOptions.listeners.click();
      } catch (e) {}
    }
  }

  private defaultFocusNext() {
    if (this.$el) {
      // check if we can find a sibling element
      const next = this.$el.nextElementSibling;
      // check if element exist and has id
      if (next && next.id) {
        // set focus to component
        this.doFocusElement(next.id);
      }
    }
  }

  private defaultFocusPrevious() {
    if (this.$el) {
      // check if we can find a sibling element
      const previous = this.$el.previousElementSibling;
      // check if element exist and has current directive selector
      if (previous && previous.id) {
        // set focus to component
        this.doFocusElement(previous.id);
      }
    }
  }

  private doFocusElement(id: string): void {
    let el = navigationService.getFocusElementById(id);
    if (el) el.focus();
  }
}

// Vue plugin
export default {
  install: function(Vue: any, options: SpatialNavigationOptions ) {
    if (!options) options = <any>{};
    // initialise navigation service
    if (!options.keyCodes) {
      options.keyCodes = {
        "up": 38,
        "down": 40,
        "left": 37,
        "right": 39,
        "enter": 13
      };
    }
    navigationService = (options.navigationService) ? new options.navigationService(options.keyCodes) : new NavigationService(options.keyCodes);

    Vue.directive("focus", {
      // directive lifecycle
      bind: (el: any, binding: any, vnode: VNode) => {
        let focusElement = new FocusElement(vnode);
        navigationService.registerFocusElement(focusElement);

        // set this element in focus if no element has focus and this is marked default
        if (focusElement.isDefault && !navigationService.getFocusElementInFocus()) {
          focusElement.focus();
        }
      },
      inserted: (el: any, binding: any, vnode: VNode) => {
        if (vnode.elm) {
          let focusElement = navigationService.getFocusElementById((<HTMLScriptElement>vnode.elm).id);
          if (focusElement && focusElement.isFocus)
            focusElement.focus();
        }
      },
      unbind: (el: any, binding: any, vnode: VNode) => {
        if (vnode.elm) {
          let focusElement = navigationService.getFocusElementById((<HTMLScriptElement>vnode.elm).id);
          if (focusElement) navigationService.deRegisterFocusElement(focusElement);
        }
      }
    });
  }
};
