<template>
<div class="view-home">
  <div class="left-buttons">
    <FocusElement class="button focus" id="button1" v-focus data-default data-down="button2" @right="componentFunctionRight" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button2" v-focus data-up="button1" data-down="AUTOFOCUS" @right="componentFunctionRight" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button3" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @right="componentFunctionRight" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button4" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @right="componentFunctionRight" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button5" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @right="componentFunctionRight" @click="componentFunctionClicked"></FocusElement>
  </div>
  <div class="right-buttons">
    <FocusElement class="button" id="button6" v-focus data-default data-down="button7" @left="componentFunctionLeft" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button7" v-focus data-up="button6" data-down="AUTOFOCUS" @left="componentFunctionLeft" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button8" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @left="componentFunctionLeft" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button9" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @left="componentFunctionLeft" @click="componentFunctionClicked"></FocusElement>
    <FocusElement class="button" id="button10" v-focus data-up="AUTOFOCUS" data-down="AUTOFOCUS" @left="componentFunctionLeft" @click="componentFunctionClicked"></FocusElement>
  </div>
  <div class="current" id="current">{{ current }}</div>
</div>
</template>
<style lang="scss" src="./home.scss" scoped></style>
