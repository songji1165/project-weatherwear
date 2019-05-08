import Vue from "vue";
import Router from "vue-router";
import Weather from "./views/Weather.vue";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Weather
    },
    {
      path: "/home",
      component: Home
    }
  ]
});

export default router;
