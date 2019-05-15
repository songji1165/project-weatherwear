<template>
  <div class="slider">
    <div
      class="slide-wrap"
      ref="slider"
      :class="{active:isActive}"
      @mousedown="mouseDown"
      @mouseleave="mouseLeave"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
    >
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
      lat(newV,oldV) {
        this.requestWeather(this.lat, this.lon);
        console.log("here",this.max)
      },
      lon(newV,oldV) {
        this.requestWeather(this.lat, this.lon);
      }
    },
    data() {
      return {
        temp: "",
        max: "",
        min: "",
        description: "",
        isSmallIcon: true,
        isActive: false,
        isDown: false,
        startX: null,
        scrollLeft: null
      };
    },
    methods: {
      async requestWeather(lat, lon) {
        const response = await getWeatherAPI(lat, lon);
        console.log("날씨정보",response)

        this.temp = parseInt(response.main.temp);
        this.max = parseInt(response.main.temp_max);
        this.min = parseInt(response.main.temp_min);
        this.description = response.weather[0].main;
      },
      mouseDown(e) {
        this.isDown = true;
        this.isActive = true;
        this.startX = e.pageX - this.$refs.slider.offsetLeft;
        this.scrollLeft = this.$refs.slider.scrollLeft;
      },
      mouseLeave() {
        this.isDown = false;
        this.isActive = false;
      },
      mouseUp() {
        this.isDown = false;
        this.isActive = false;
      },
      mouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.$refs.slider.offsetLeft;
        const walk = x - this.startX;
        if (walk <= 0) {
          this.$refs.slider.style.left = "-100%";
        } else {
          this.$refs.slider.style.left = "0";
        }
      }
    },
    Updated() {
      this.mouseDown();
      this.mouseLeave();
      this.mouseUp();
      this.mouseMove();
    },
    mounted(){
      
      console.log('변경전',this.lat)
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
