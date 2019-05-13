<template>
  <div class="slider">
    <div class="slide-wrap" :class="{active:isActive}">
      <div class="current-temp">
        <temper-info :temp="temp" :description="description"> </temper-info>
      </div>
      <div class="daytime-temp">
        <div class="min-temp">
          <h2 class="daytime-title">최저 기온</h2>
          <temper-info
            :temp="min"
            :description="description"
            :isSmallIcon="isSmallIcon"
          ></temper-info>
        </div>
        <div class="max-temp">
          <h2 class="daytime-title">최고 기온</h2>
          <temper-info
            :temp="max"
            :description="description"
            :isSmallIcon="isSmallIcon"
          >
          </temper-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getWeatherAPI } from "@/api/index.js";
  import TemperInfo from "@/components/TemperInfo";

  export default {
    components: { TemperInfo },
    props: ["lat", "lon"],
    watch: {
      lat(val) {
        this.geo.push({ lat: val });
      },
      lon(val) {
        this.geo.push({ lon: val });
        this.requestWeather(this.geo[0].lat, this.geo[1].lon);
      }
    },
    data() {
      return {
        temp: "",
        max: "",
        min: "",
        description: "",
        geo: [],
        isSmallIcon: true,
        isActive: false
      };
    },
    methods: {
      async requestWeather(lat, lon) {
        const response = await getWeatherAPI(lat, lon);

        this.temp = parseInt(response.main.temp);
        this.max = parseInt(response.main.temp_max);
        this.min = parseInt(response.main.temp_min);
        this.description = response.weather[0].main;
      }
    },
    mounted() {
      const slider = document.querySelector(".slide-wrap");
      let isDown = false;
      let startX;
      let scrollLeft;
      slider.addEventListener("mousedown", e => {
        isDown = true;
        this.isActive = true;
        startX = e.pageX - slider.offsetLeft;
        console.log("시작", startX);
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        this.isActive = false;
        console.log("leave");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        this.isActive = false;
        console.log("up");
      });
      slider.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        if (walk <= 0) {
          slider.style.left = "-100%";
        } else {
          slider.style.left = "0";
        }
      });
    }
  };
</script>

<style scoped>
  .slider {
    width: 100%;
    overflow: hidden;
  }
  .slide-wrap {
    position: relative;
    width: 200%;
    top: 0;
    transition: all 0.5s;
    cursor: pointer;
  }
  .slide-wrap > div {
    float: left;
    border: 1px solid blue;
    width: 50%;
    height: 380px;
  }
  .slide-wrap::after {
    content: "";
    display: block;
    clear: both;
  }
  .daytime-temp {
    position: relative;
  }
  .daytime-temp > div {
    float: left;
    width: 50%;
  }
  .daytime-title {
    position: absoulute;
    top: 0;
  }

  .active {
    cursor: grabbing;
  }
</style>
