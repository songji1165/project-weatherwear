<template>
  <div id="app">
    <Header-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";

export default {
  components: { HeaderBar },
};
</script>

<style>
body,
div,
h1,
h2,
h3,
ul,
li,
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
  color:rgb(44,	62,	80);
  margin: 0 auto;
  text-align: center;
}

li {
  list-style: none;
}

.ww {
  width: 100%;
}

#head {
  background: rgb(135,	206,	235);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: rgb(255,255,255);
  z-index: 2
}

.ww-main > div {
  float: left;
  margin: 70px 10%;
  text-align: center;
  width: 80%;
}

.ww-main::after {
  clear: both;
  display: block;
  content: "";
}
</style>
