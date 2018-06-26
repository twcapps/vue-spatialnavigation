"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationServiceDirection;
(function (NavigationServiceDirection) {
    NavigationServiceDirection["Up"] = "up";
    NavigationServiceDirection["Down"] = "down";
    NavigationServiceDirection["Left"] = "left";
    NavigationServiceDirection["Right"] = "right";
    NavigationServiceDirection["Enter"] = "enter";
})(NavigationServiceDirection = exports.NavigationServiceDirection || (exports.NavigationServiceDirection = {}));
var NavigationService = /** @class */ (function () {
    function NavigationService(keys) {
        this.keyCodes = [];
        this.focusAbleElements = new Array();
        this.lastElementIdInFocus = "";
        this.blockAllSpatialNavigation = false;
        // bind keyCodes object from Vue config
        for (var keyName in NavigationServiceDirection) {
            var keyCode = keys[NavigationServiceDirection[keyName]];
            if (keyCode) {
                if (keyCode instanceof Array) {
                    for (var _i = 0, keyCode_1 = keyCode; _i < keyCode_1.length; _i++) {
                        var k = keyCode_1[_i];
                        this.keyCodes[k] = keyName;
                    }
                }
                else {
                    this.keyCodes[keyCode] = keyName;
                }
            }
        }
        this.setupKeyBoardEvents();
        this.setupMouseEvents();
    }
    NavigationService.prototype.setupKeyBoardEvents = function () {
        var _this = this;
        document.addEventListener("keydown", (function (e) {
            // find key code
            var keyCode = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
            // find key name
            var keyName = _this.keyCodes[keyCode];
            // no matching key found
            if (!keyName)
                return false;
            // spatial navigation is blocked
            if (_this.blockAllSpatialNavigation)
                return false;
            // action spatial navigation
            if (keyName in NavigationServiceDirection)
                _this.spatialNavigationAction(keyName);
        }));
    };
    NavigationService.prototype.setupMouseEvents = function () {
        var _this = this;
        // enable mouseover event
        document.addEventListener("mouseover", function (e) {
            if (_this.blockAllSpatialNavigation)
                return false;
            var el = _this.findFocusable(e.target);
            if (el)
                el.focus();
        });
        // enable mouseout event
        document.addEventListener("mouseout", function (e) {
            if (_this.blockAllSpatialNavigation)
                return false;
            var el = _this.findFocusable(e.target);
            if (el)
                el.blur();
        });
        // enable click event
        document.addEventListener("click", function (e) {
            if (_this.blockAllSpatialNavigation)
                return false;
            var el = _this.findFocusable(e.target);
            if (el)
                el.enter();
        });
    };
    // try to find focusable element on mouse hover or click
    NavigationService.prototype.findFocusable = function (target) {
        // inside loop search for focusable element
        // we need this if the focusable element has children inside
        // so e.target can point to child or grandchild of focusable element
        while (target) {
            if (target.id) {
                var focusEl = this.getFocusElementById(target.id);
                if (focusEl)
                    return focusEl;
            }
            if (!target.parentNode)
                return undefined;
            target = target.parentNode;
        }
        return undefined;
    };
    // action a new spatial navigation action
    NavigationService.prototype.spatialNavigationAction = function (action) {
        var el = this.getFocusElementInFocus();
        var keyValue = NavigationServiceDirection[action];
        // initiate focus action if we have active element
        if (el) {
            switch (keyValue) {
                case NavigationServiceDirection.Up:
                    el.up();
                    break;
                case NavigationServiceDirection.Down:
                    el.down();
                    break;
                case NavigationServiceDirection.Left:
                    el.left();
                    break;
                case NavigationServiceDirection.Right:
                    el.right();
                    break;
                case NavigationServiceDirection.Enter:
                    el.enter();
                    break;
            }
            // if there is no active element, try to find last element in focus
        }
        else if (this.getFocusElementById(this.lastElementIdInFocus)) {
            var el_1 = this.getFocusElementById(this.lastElementIdInFocus);
            if (el_1)
                el_1.focus();
            // as a last resort, try to find a default focus element to 'reset' focus
        }
        else {
            var el_2 = this.getFocusElementIsDefault();
            if (el_2)
                el_2.focus();
        }
    };
    // bind focusable component
    NavigationService.prototype.registerFocusElement = function (focusElement) {
        this.focusAbleElements.push(focusElement);
        // set initial focus if there is no active focus and current element is default
        if (focusElement.isDefault && !this.getFocusElementInFocus()) {
            focusElement.focus();
        }
    };
    // unbind focusable component
    NavigationService.prototype.deRegisterFocusElement = function (focusElement) {
        var index = this.focusAbleElements.indexOf(focusElement);
        if (index > -1) {
            var el = this.focusAbleElements.splice(index, 1);
            if (el.length > 0)
                el[0].destroy();
        }
    };
    // get current component in focus
    NavigationService.prototype.getFocusElementInFocus = function () {
        for (var _i = 0, _a = this.focusAbleElements; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.isFocus)
                return el;
        }
    };
    // find focusable component by id
    NavigationService.prototype.getFocusElementById = function (id) {
        for (var _i = 0, _a = this.focusAbleElements; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id)
                return el;
        }
    };
    // find component that should be focussed by default
    NavigationService.prototype.getFocusElementIsDefault = function () {
        for (var _i = 0, _a = this.focusAbleElements; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.isDefault)
                return el;
        }
    };
    // blurr all focusable components
    NavigationService.prototype.blurAllFocusElements = function () {
        for (var _i = 0, _a = this.focusAbleElements; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.isFocus)
                el.blur();
        }
    };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
