<template>
  <div id="app">
    <header-bar/>
    <main-wrap/>
    <time-wrap/>
    <daily-wrap/>
    
  </div>
</template>

<script>
  import headerBar from "./components/header.vue"
  import mainWrap from "./components/main.vue"
  import timeWrap from "./components/time.vue"
  import dailyWrap from "./components/daily.vue"
  
export default {
  components : {headerBar, mainWrap,timeWrap, dailyWrap, }
}
</script>

<style lang="less">
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
  color: #2c3e50;
  margin: 0 auto;
  text-align: center;
}

li {
  list-style: none;
}

#app > div {
  /* margin: 30px 0; */
  border: 1px solid;
  /* width: 100%; */
  /* height: 100vh; */
}

.ww{
  width: 100%;
  /* height: 100vh; */
}

#head {
    background: #d9d9d9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
  }
/* main1 */
.ww-main > div {
  float: left;
  border: 1px solid;
  margin: 70px 10%;
  text-align: center;
  width: 80%;
}

.ww-main::after {
  clear: both;
  display: block;
  content: "";
}

/* time daily */
.title {
  background: skyblue;
  color: #fff;
  margin-bottom: 10px;
}

.wrap {
  background: skyblue;
}

.time-list li {
  float: left;
}
.time-list::after {
  content: "";
  display: block;
  clear: both;
}


</style>
