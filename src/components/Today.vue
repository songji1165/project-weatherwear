<template>
  <div class="main-wrap">
    <Loading v-show="showLoading" class="loading"></Loading>
    <div class="selectBox">
      <select name="local" id="local" v-model="selectValue">
        <option
          v-for="{ krName, enName } in locations"
          :value="enName"
          :key="enName"
        >
          {{ krName }}
        </option>
      </select>
    </div>
    <div class="main current">
      <h3 class="location">{{ selectTitle }}</h3>
      <p class="location-time">
        <span class="now-date">{{ moment().format("YYYY[-]MM[-]DD") }}</span>
        <span>{{ moment().format("hh:mm A") }}</span>
      </p>
      <div class="wear">
        <p class="wear-icon" @click="handleCloseModal">
          <img :src="imageSrc" width="300" />
        </p>
        <Modal class="modal" v-if="showModal" @onClose="handleCloseModal">
          <div slot="header">
            <h3>{{ currentTemperScope }} &#176;</h3>
          </div>
          <div slot="body">
            {{ currentClothes }}
          </div>
        </Modal>
      </div>

      <div class="main temper">
        <h3 class="temper-temper"><i :class="fasIcon"></i>{{ temp }} &#176;</h3>
      </div>
    </div>
  </div>
</template>
<script>
  import { getWeatherAPI, getLocalName } from "@/api/index.js";
  import {
    wearIconNum,
    selectedTempScope,
    selectedClothes,
    weatherIconSelet
  } from "@/modules/search.js";
  import Modal from "./Modal";
  import Loading from "./Loading";
  import locations from "@/json/location.json";
  import WeatherIcons from "@/json/weatherIcon.json";
  import {
    checkSavedLocation,
    geoSucc,
    geoErr,
    geoLocationInLS,
    requestLocation
  } from "@/modules/location.js";
  import moment from "moment";

  export default {
    components: { Modal, Loading },
    data() {
      return {
        showModal: false,
        locations,
        selectValue: "seoul",
        lat: "",
        lon: "",
        res: "",
        imageWearNum: "0",
        // weather: {},
        temp: "",
        description: "",
        fasIcon: "",
        moment,
        showLoading: true,
        position: null,
        krLocalNAme: "",
        selectTitle: ""
      };
    },
    methods: {
      handleCloseModal() {
        this.showModal = !this.showModal;
      },
      async requestWeather(lat, lon) {
        const response = await getWeatherAPI(lat, lon);
        console.log(response);
        this.temp = parseInt(response.main.temp);
        this.imageWearNum = wearIconNum(this.temp);
        this.description = response.weather[0].main;
        this.fasIcon = weatherIconSelet(this.description).iconName;
        setTimeout(() => (this.showLoading = false), 500);
      },
      async requestLocalName(lat, lon) {
        const responseLocalName = await getLocalName(lat, lon);
        const localNameArr = responseLocalName.results[3].formatted_address.split(
          " "
        );
        console.log(localNameArr);
        this.selectTitle = localNameArr[2];
      }
    },
    computed: {
      currentTemperScope() {
        return selectedTempScope(this.imageWearNum);
      },
      currentClothes() {
        return selectedClothes(this.imageWearNum);
      },
      imageSrc() {
        return require(`@/assets/${this.imageWearNum}.png`);
      }
    },
    watch: {
      selectValue(en) {
        const { lat, lon } = this.locations[en];
        this.lat = lat;
        this.lon = lon;
        this.requestWeather(this.lat, this.lon);
        this.selectTitle = this.locations[en].krName;
      }
    },
    async mounted() {
      console.log("처음", this.lat, this.lon);

      if (navigator.geolocation) {
        try {
          const { coords } = await requestLocation();
          geoSucc(coords);
          const position = await geoLocationInLS();
          this.lat = position.lat;
          this.lon = position.lon;
          console.log("현", this.lat, this.lon);
          this.requestWeather(this.lat, this.lon);
          this.requestLocalName(this.lat, this.lon);
        } catch (error) {
          console.log(error);
          const { lat, lon } = this.locations[this.selectValue];
          this.lat = lat;
          this.lon = lon;
          this.requestWeather(this.lat, this.lon);
        }
      } else {
        const { lat, lon } = this.locations[this.selectValue];
        this.lat = lat;
        this.lon = lon;
        this.requestWeather(this.lat, this.lon);
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
  .selectBox {
    float: right;
    margin-right: 5%;
  }
  select {
    height: 30px;
    width: 80px;
    border-radius: 10px;
    padding-left: 10px;
    outline: none;
    background: skyblue;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    outline: none;
    border: none !important;
    color: #fff;
  }
  option {
    background: skyblue;
    outline: none;
    border: none;
  }
  .current {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .now-date {
    margin-right: 10px;
  }
  .main {
    margin: 10px 0;
  }
  .main h3 {
    font-size: 1.5rem;
  }
  .wear {
    position: relative;
    margin: 20px 0;
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  i {
    margin-right: 15px;
    vertical-align: middle;
    /* font-size: 0.9em; */
  }
  .temper h3 {
    display: inline-block;
    border: 1px solid;
    border-radius: 50px;
    padding: 10px 0;
    width: 180px;
  }
</style>
