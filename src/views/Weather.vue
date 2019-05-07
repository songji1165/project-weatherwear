<template>
  <div class="home">
    <Today-wrap />
    <Hourly-wrap />
    <Daily-wrap />
    <!-- <select name="" id="" v-model="selectValue">
      <option v-for="({ enName, krName }) in locations" :value="enName">{{krName}}</option>
    </select> -->
  </div>
</template>

<script>


import TodayWrap from "@/components/Today.vue";
import HourlyWrap from "@/components/Hourly.vue";
import DailyWrap from "@/components/Daily.vue";


const { VUE_APP_WHATHER_APP_KEY } = process.env

export default {
  name: "home",
  components: {
    TodayWrap,
    HourlyWrap,
    DailyWrap
  },
  data() {
    return {
      selectedLocation: null,
      selectValue : ''
    };
  },
  // methods : {
  //   async getweather (value) {
      
  //     const { lat, lon } = this.locations[value || 'seoul'];

  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
  //   );
  //   this.location = await response.json();
  //     //response.json()을 통해 정보 받아옴
  //     console.log('this',this.location)
  // }
  //   },
  // mounted() {
  //   // 해체할당!
  //   this.getweather(this.selectValue)
  
  // },
  // watch: {
  //   selectValue (value) {
      
  //     this.getweather(value)
  //   }
  // }
};
</script>
