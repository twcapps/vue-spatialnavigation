<template>
  <div id="app" class="app">
    <transition name="router" mode="out-in">
      <router-view class="view router-view"></router-view>
    </transition>
  </div>
</template>
