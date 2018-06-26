"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_service_1 = require("./navigation.service");
// export focus element
var FocusElement = /** @class */ (function () {
    // directive initialisation
    function FocusElement(vnode) {
        this._listeners = {
            focus: false,
            blur: false,
            left: false,
            right: false,
            up: false,
            down: false,
            click: false
        };
        // is element 'focussed'
        this.isFocus = false;
        // is element 'selected'
        this.isSelect = false;
        // should element be 'focussed' by default on rendering
        this.isDefault = false;
        if (vnode && vnode.elm) {
            // find dom element in vnode
            var elm = vnode.elm;
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
                var listeners = vnode.componentOptions.listeners;
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
    FocusElement.prototype.destroy = function () {
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
    };
    Object.defineProperty(FocusElement.prototype, "$el", {
        // get dom reference of directive
        get: function () {
            if (this._$el)
                return this._$el;
            return this._$el = document.getElementById(this.id);
        },
        enumerable: true,
        configurable: true
    });
    //// focus handling
    // set focus to element
    FocusElement.prototype.focus = function () {
        // blur other element, can only be 1 element in focus
        exports.navigationService.blurAllFocusElements();
        // store focus action in navigation service so we can restore it if needed
        exports.navigationService.lastElementIdInFocus = this.id;
        // set the current element in focus
        this.isFocus = true;
        if (this.$el) {
            this.$el.className += " focus";
            if (this._listeners.focus) {
                try {
                    this.$el.__vue__.$vnode.componentOptions.listeners.focus(this.id);
                }
                catch (e) { }
            }
        }
        // set 'native' browser focus on input elements and focusable elements.
        if (this.$el && (this.$el.tabIndex !== -1 || this.$el.nodeName === "INPUT" || this.$el.nodeName === "TEXTAREA"))
            this.$el.focus();
    };
    // remove focus from element
    FocusElement.prototype.blur = function () {
        this.isFocus = false;
        if (this.$el) {
            this.$el.className = this.$el.className.replace(/\s?\bfocus\b/, "");
            if (this._listeners.blur) {
                try {
                    this.$el.__vue__.$vnode.componentOptions.listeners.blur(this.id);
                }
                catch (e) { }
            }
        }
        // if (this.$el && (this.$el.nodeName === "INPUT" || this.$el.nodeName === "TEXTAREA")) this.$el.blur();
    };
    //// select handling
    // set element as selected
    FocusElement.prototype.select = function () {
        this.isSelect = true;
        if (this.$el)
            this.$el.className += " select";
    };
    // remove selected state from element
    FocusElement.prototype.deSelect = function () {
        this.isSelect = false;
        if (this.$el)
            this.$el.className.replace(/\bselect\b/, "");
    };
    //// spatial navigation
    // move focus to the element/action configured as 'left' from this element
    FocusElement.prototype.left = function () {
        // check if we should automatically find next focusable element
        if (this._left === FocusElement.AutoFocus) {
            this.defaultFocusPrevious();
            // check if next focusable element should be set based on a DOM id pointer
        }
        else if (this._left) {
            this.doFocusElement(this._left);
        }
        // check if a event method is binded to the component
        if (this._listeners.left) {
            try {
                this.$el.__vue__.$vnode.componentOptions.listeners.left();
            }
            catch (e) { }
        }
    };
    // move focus to the element/action configured as 'right' from this element
    FocusElement.prototype.right = function () {
        // check if we should automatically find next focusable element
        if (this._right === FocusElement.AutoFocus) {
            this.defaultFocusNext();
            // check if next focusable element should be set based on a DOM id pointer
        }
        else if (this._right) {
            this.doFocusElement(this._right);
        }
        // check if a event method is binded to the component
        if (this._listeners.right) {
            try {
                this.$el.__vue__.$vnode.componentOptions.listeners.right();
            }
            catch (e) { }
        }
    };
    // move focus to the element/action configured as 'up' from this element
    FocusElement.prototype.up = function () {
        // check if we should automatically find next focusable element
        if (this._up === FocusElement.AutoFocus) {
            this.defaultFocusPrevious();
            // check if next focusable element should be set based on a DOM id pointer
        }
        else if (this._up) {
            this.doFocusElement(this._up);
        }
        // check if a event method is binded to the component
        if (this._listeners.up) {
            try {
                this.$el.__vue__.$vnode.componentOptions.listeners.up();
            }
            catch (e) { }
        }
    };
    // move focus to the element/action configured as 'down' from this element
    FocusElement.prototype.down = function () {
        // check if we should automatically find next focusable element
        if (this._down === FocusElement.AutoFocus) {
            this.defaultFocusNext();
            // check if next focusable element should be set based on a DOM id pointer
        }
        else if (this._down) {
            this.doFocusElement(this._down);
        }
        // check if a event method is binded to the component
        if (this._listeners.down) {
            try {
                this.$el.__vue__.$vnode.componentOptions.listeners.down();
            }
            catch (e) { }
        }
    };
    FocusElement.prototype.enter = function () {
        if (this._listeners.click) {
            try {
                this.$el.__vue__.$vnode.componentOptions.listeners.click();
            }
            catch (e) { }
        }
    };
    FocusElement.prototype.defaultFocusNext = function () {
        if (this.$el) {
            // check if we can find a sibling element
            var next = this.$el.nextElementSibling;
            // check if element exist and has id
            if (next && next.id) {
                // set focus to component
                this.doFocusElement(next.id);
            }
        }
    };
    FocusElement.prototype.defaultFocusPrevious = function () {
        if (this.$el) {
            // check if we can find a sibling element
            var previous = this.$el.previousElementSibling;
            // check if element exist and has current directive selector
            if (previous && previous.id) {
                // set focus to component
                this.doFocusElement(previous.id);
            }
        }
    };
    FocusElement.prototype.doFocusElement = function (id) {
        var el = exports.navigationService.getFocusElementById(id);
        if (el)
            el.focus();
    };
    FocusElement.AutoFocus = "AUTOFOCUS";
    return FocusElement;
}());
exports.FocusElement = FocusElement;
// Vue plugin
exports.default = {
    install: function (Vue, options) {
        if (!options)
            options = {};
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
        exports.navigationService = (options.navigationService) ? new options.navigationService(options.keyCodes) : new navigation_service_1.NavigationService(options.keyCodes);
        Vue.directive("focus", {
            // directive lifecycle
            bind: function (el, binding, vnode) {
                var focusElement = new FocusElement(vnode);
                exports.navigationService.registerFocusElement(focusElement);
                // set this element in focus if no element has focus and this is marked default
                if (focusElement.isDefault && !exports.navigationService.getFocusElementInFocus()) {
                    focusElement.focus();
                }
            },
            unbind: function (el, binding, vnode) {
                if (vnode.elm) {
                    var focusElement = exports.navigationService.getFocusElementById(vnode.elm.id);
                    if (focusElement)
                        exports.navigationService.deRegisterFocusElement(focusElement);
                }
            }
        });
    }
};
