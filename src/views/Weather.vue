<template>
  <div class="home">
    <Header-bar />
    <Main-wrap />
    <Time-wrap />
    <Daily-wrap />
    <select name="" id="" v-model="selectValue">
      <option v-for="({ enName, krName }) in locations" :value="enName">{{krName}}</option>
    </select>
  </div>
</template>

<script>

import HeaderBar from "@/components/Header.vue";
import MainWrap from "@/components/Main.vue";
import TimeWrap from "@/components/Time.vue";
import DailyWrap from "@/components/Daily.vue";
import locations from "../location.json";

const { VUE_APP_WHATHER_APP_KEY } = process.env

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
      locations,
      selectedLocation: null,
      selectValue : ''
    };
  },
  methods : {
    async getweather (value) {
      
      const { lat, lon } = this.locations[value || 'seoul'];

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
    );
    this.location = await response.json();
  }
    },
  mounted() {
    // 해체할당!
    this.getweather(this.selectValue)
  
  },
  watch: {
    selectValue (value) {
      
      this.getweather(value)
    }
  }
};
</script>
