<template>
  <div class="home">
    <Header-bar />
    <Main-wrap />
    <Time-wrap />
    <Daily-wrap />
    {{ location.name }}
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import MainWrap from "@/components/Main.vue";
import TimeWrap from "@/components/Time.vue";
import DailyWrap from "@/components/Daily.vue";
import locations from "../location.json";

export default {
  name: "home",
  components: {
    HeaderBar,
    MainWrap,
    TimeWrap,
    DailyWrap
  },
  data() {
    return {
      location: {}
    };
  },
  async mounted() {
    // 해체할당!
    const { lat, lon } = locations.seoul;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=02e1f20cb9f0609946d22679b7bf51a5&units=metric`
    );
    this.location = await response.json();
  }
};
</script>
