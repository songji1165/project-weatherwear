<template>
  <div class="slider">
    <div
      class="slide-wrap"
      ref="slider"
      :class="{ active: isActive }"
      @mousedown="mouseDown"
      @mouseleave="mouseLeave"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
    >
      <div class="current-temp">
        <temper-info :temper="temper" :description="description"> </temper-info>
      </div>
      <div class="daytime-temp">
        <div class="min-temp">
          <temper-info
            :temper="min"
            :description="description"
            :isSmallIcon="isSmallIcon"
          >
            <div slot="daytime-title" class="daytime-title">
              최저기온
            </div>
          </temper-info>
        </div>
        <div class="max-temp">
          <temper-info
            :temper="max"
            :description="description"
            :isSmallIcon="isSmallIcon"
          >
            <div slot="daytime-title" class="daytime-title">
              최고 기온
            </div>
          </temper-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeatherAPI } from "@/api/index.js";
import TemperInfo from "@/components/TemperInfo";
// import Loading from "@/components/Loading";

export default {
  components: { TemperInfo },
  props: ["lat", "lon"],
  watch: {
    lat(newV, oldV) {
      this.requestWeather(this.lat, this.lon);
    },
    lon(newV, oldV) {
      this.requestWeather(this.lat, this.lon);
    }
  },
  data() {
    return {
      temper: "",
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
      try {
        const response = await getWeatherAPI(lat, lon);
        const responseSucc = await response.data;
        this.temper = parseInt(responseSucc.main.temp);
        this.max = parseInt(responseSucc.main.temp_max);
        this.min = parseInt(responseSucc.main.temp_min);
        this.description = responseSucc.weather[0].main;
        this.$emit("loadSucc");
      } catch (err) {
        return this.$router.push("/err");
      }
    },
    mouseDown(e) {
      this.isDown = true;
      this.isActive = true;
      this.startX = e.pageX - this.$refs.slider.offsetLeft;
      this.scrollLeft = this.$refs.slider.scrollLeft;
      this.$emit("activeClick");
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
    },
    succLoad() {
      this.showLoading = false;
    }
  },
  Updated() {
    this.mouseDown();
    this.mouseLeave();
    this.mouseUp();
    this.mouseMove();
  }
};
</script>

<style scoped>
.slider {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
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
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.active {
  cursor: grabbing;
}
</style>
