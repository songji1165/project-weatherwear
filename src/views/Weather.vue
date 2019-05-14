<template>
  <div class="main-wrap">
    <Loading v-show="showLoading" class="loading"></Loading>
    <div class="main current">
      <div class="select-wrap">
        <button class="current-position">
          내 위치
          <i class="fas fa-map-marker-alt"></i>
        </button>
        <Select-box
          class="select-box"
          v-model="selectedValue"
          :locations="locations"
          @handleClickSelect="handleClickSelect"
        ></Select-box>
      </div>
      <h3 class="location">{{ selectTitle }}</h3>
      <p class="location-time">
        {{ currentDate }}
      </p>

      <Temper-slider class="slider" :lat="lat" :lon="lon"> </Temper-slider>
    </div>
  </div>
</template>
<script>
  import { getWeatherAPI, getLocalName } from "@/api/index.js";

  import TemperSlider from "@/components/TemperSlider";
  import Loading from "@/components/Loading";
  import SelectBox from "@/components/Select";

  import locations from "@/json/location.json";

  import {
    checkSavedLocation,
    geoSucc,
    geoErr,
    geoLocationInLS,
    requestLocation
  } from "@/modules/location.js";
  import moment from "moment";

  export default {
    components: { Loading, SelectBox, TemperSlider },
    data() {
      return {
        showLoading: false,
        locations,
        selectedValue: "seoul",
        selectTitle: "",
        krLocalNAme: "",
        lat: "",
        lon: "",
        moment,
        position: null
      };
    },
    methods: {
      handleClickSelect(selectedLocation) {
        const { lat, lon } = this.locations[selectedLocation];
        this.lat = lat;
        this.lon = lon;
        this.requestWeather(this.lat, this.lon);
        this.selectTitle = this.locations[selectedLocation].krName;
      },
      async requestLocalName(lat, lon) {
        const responseLocalName = await getLocalName(lat, lon);
        this.selectTitle = responseLocalName.documents[0].region_2depth_name;
      }
    },
    computed: {
      currentDate() {
        return moment().format("YYYY[-]MM[-]DD, hh:mm A");
      }
    },
    async beforeCreate() {
      if (navigator.geolocation) {
        try {
          const { coords } = await requestLocation();
          geoSucc(coords);
          const position = await geoLocationInLS();
          this.lat = position.lat;
          this.lon = position.lon;
          this.requestLocalName(this.lat, this.lon);
        } catch (error) {
          const { lat, lon } = this.locations[this.selectValue];
          this.lat = lat;
          this.lon = lon;
        }
      } else {
        const { lat, lon } = this.locations[this.selectValue];
        this.lat = lat;
        this.lon = lon;
      }
    }
  };
</script>

<style scoped>
  .main-wrap {
    height: 100vh;
    position: relative;
    padding-top: 60px;
  }
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .select-wrap {
    margin: 0 10% 5%;
    padding: 2px 5px;
    display: inline-block;
    background: skyblue;
    border-radius: 10px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  }
  .select-wrap:after {
    content: "";
    display: block;
    clear: both;
  }
  .current-position {
    float: left;
    height: 30px;
    width: 100px;
    border: none;
    border-radius: 10px;
    background: none;
    color: #fff;
    cursor: pointer;
  }
  .current-position i {
    margin-left: 5px;
  }
  .select-box {
    float: left;
  }
  .location {
    margin-bottom: 15px;
  }
  .current {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    border: 1px solid red;
    width: 100%;
    /* overflow: hidden; */
    /* height: 50%; */
  }
  .main {
    margin: 10px 0;
  }
  .main h3 {
    font-size: 1.5rem;
  }
  
</style>
