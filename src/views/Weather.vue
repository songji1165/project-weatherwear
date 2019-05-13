<template>
  <div class="home">
    <Today-wrap />
    <!-- <Hourly-wrap />
    <Daily-wrap /> -->
  </div>
</template>

<script>
import TodayWrap from "@/components/Today.vue";
// import HourlyWrap from "@/components/Hourly.vue";
// import DailyWrap from "@/components/Daily.vue";


export default {
  name: "home",
  components: {
    TodayWrap,
    // HourlyWrap,
    // DailyWrap
  },
  data() {
    return {
      selectedLocation: null,
      selectValue: ""
    };
  }
}
</script>
