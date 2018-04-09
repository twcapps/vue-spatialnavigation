<h1 align="center">vue-spatialnavigation</h1>

Vue directive (Vue.js 2.x) for spatial navigation (keyboard navigation)


## Installation

```console
npm install vue-spatialnavigation --save
```

## Spatial navigation
Spatial navigation is keyboard navigation of a html page most often used on devices where mouse navigation is not available or not preferred. An important rule is that only 1 element can have the active 'focus' state at the same time. 

When a user navigates the page with the left, right, up, down keybaord keys a decision should be made which element to focus next. This directive will improve the Vue native keyboard binding to provide a flexible spatial navigation implementation. 

Inspiration for this plugin is taken from the [CSS3 draft keyboard navigation](https://drafts.csswg.org/css-ui/#keyboard), a limitation is that CSS3 can only point the focus position based on (DOM) element id pointers, while this directive supports both element id pointers and custom (component) method binding.


## Typical usage

To make an element 'focusable' just add the focus directive
```javascript
import Vue from "vue";
import VueSpatialNavigation from "vue-spatialnavigation";
Vue.use(VueSpatialNavigation)
```

```html
<div id="button1" v-focus></div>
<div id="button2" v-focus></div>
```

### CSS3 Element binding
Use data properties with a domId string reference to determine the focus action during navigation (this behaves similar to the CSS3 draft)
```html
<div id="button1" v-focus data-down="button2">
<div id="button2" v-focus data-up="button1">
```

### JS Component binding
Use vue bind directive with a component function reference to determine the focus action during navigation
```html
<div id="button1" v-focus @down="componentFunctionDown">
<div id="button2" v-focus @up="componentFunctionUp" >
```
```javascript
import { navigationService } from "vue-spatialnavigation";
import Vue from "vue";
let app = new Vue({
  methods: {
    componentFunctionDown: () => {
      let el = navigationService.getFocusElementById("button2");
      if (el) el.focus()
    },
    componentFunctionUp: () =>  {
      let el = navigationService.getFocusElementById("button1");
      if (el) el.focus()
    }
  }
})
```

### Automatic focus handling
Use the special constant value 'AUTOFOCUS' to let the directive try to find the next focusable sibbling automatically. This only works if the next/prev focusable element is a sibling within the parent container!
```html
<div id="button1" v-focus data-down="AUTOFOCUS">
<div id="button2" v-focus data-up="AUTOFOCUS">
```

### Determine the first or default focus element
In case the page is just rendered and or focus is reset the directive should know which element to restore focus to. The directive will keep a reference to the last focussed element, but if that is not available it will restore focus to the 'default' focus element on the page.
```html
<div id="button1" v-focus data-default data-down="button2">
<div id="button2" v-focus data-up="button1">
```

### Enter action
When a user actions an 'enter' keypress it will automatically be converted into a click action on the element that has active focus. So you can use the regular vue @click bindings.
```html
<div id="button1" v-focus @down="componentFunctionDown">
<div id="button2" v-focus @up="componentFunctionUp" @click="button2clicked">
```
```javascript
import { navigationService } from "vue-spatialnavigation";
import Vue from "vue";
let app = new Vue({
  methods: {
    componentFunctionDown: () => {
      let el = navigationService.getFocusElementById("button2");
      if (el) el.focus()
    },
    componentFunctionUp: () =>  {
      let el = navigationService.getFocusElementById("button1");
      if (el) el.focus()
    },
    button2clicked: () => {
      console.log("button2clicked);
    }
  }
})
```

## Configuration
This directive is binding to the [Vue.config.keyCodes](https://vuejs.org/v2/api/#keyCodes) object, in case different keycodes apply please update vue keyCodes configuration (before this directive is initialised).

## Styling
The directive will automatically assigned and remove the class "focus" on the html element to distingish an element in focus vs an element not in focus. The css "focus" class handling is fully handled by the directive and should not be changed/set manually. 

```html
<style>
.focus { background-color: yellow;}
</style>
<div id="button1" v-focus data-default data-down="AUTOFOCUS">
<div id="button2" v-focus data-up="AUTOFOCUS">
```

## NavigationService
In addition to the directive this plugin also exposes a NavigationService object that allows control of the focusable elements from JS code. The navigation service keeps track of all focusable elements on the page and can be used to query focusable elements/

It provides the below properties:
```typescript
blockAllSpatialNavigation: boolean;   // enabled / disable a navigation block (e.g. during loading)
```

It provides the below methods:
```typescript
NavigationService.getFocusElementInFocus(): FocusElement | undefined;         // get FocusElement currently in focus
NavigationService.getFocusElementById(id: string): FocusElement | undefined;  // get FocusElement by DOM id
NavigationService.getFocusElementIsDefault(): FocusElement | undefined;       // get FocusElement by default property
NavigationService.blurAllFocusElements(): void;                               // blur all FocusElements
```

## FocusElement
FocusElement is a class initialised for each dom element where the directive is applied, you can aquire the FocusElement by quering the NavigationService.

It provides the below properties:
```typescript
  FocusElement.id: string;         // dom id reference
  FocusElement.isFocus: boolean;   // is element currently focussed
  FocusElement.isDefault: boolean; // is element a default focusable element
```

And the below properties: 
```typescript
  FocusElement.focus(): void;  // manually focus the current element
  FocusElement.blur(): void;   // manually blur the current element
  FocusElement.left(): void;   // manually trigger left action the current element
  FocusElement.right(): void;  // manually trigger right action the current element
  FocusElement.up(): void;     // manually trigger up action the current element
  FocusElement.down(): void;   // manually trigger down action the current element
  FocusElement.enter(): void;  // manually trigger enter action the current element
  ```