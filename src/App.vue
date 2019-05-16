<template>
  <div id="app">
    <Header-bar />
    <router-view class="body"></router-view>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";

export default {
  components: { HeaderBar }
};
</script>

<style>
body,
div,
h1,
h2,
h3,
p,
span {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(44, 62, 80);
  margin: 0 auto;
  text-align: center;
}
.body{
  height: 100%
}
</style>
