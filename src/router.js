import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Weather from "./views/Weather.vue";

import { isLocation } from "./modules/location";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/weather",
      component: Weather,
      beforeEnter: requiredLocation
    }
  ]
});

function requiredLocation(to, from, next) {
  if (!isLocation()) {
    next("/");
  }
  next();
}

export default router;
