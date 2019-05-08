<template>
  <div class="main-wrap">
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
            {{ currentCloth }}
          </div>
        </Modal>
      </div>

      <div class="main temper">
        <h3 class="temper-temper"><i :class="fas"></i>{{ temp }} &#176;</h3>
      </div>
    </div>
  </div>
</template>
<script>
  import { getWeatherAPI } from "@/api/index.js";
  import Modal from "./Modal";
  import locations from "@/json/location.json";
  import clothes from "@/json/cloth.json";
  import WeatherIcons from "@/json/weatherIcon.json";

  const { VUE_APP_WHATHER_APP_KEY } = process.env;
  const moment = require("moment");

  export default {
    components: { Modal },
    data() {
      return {
        showModal: false,
        locations,
        selectValue: "seoul",
        lat: "",
        lon: "",
        res: "",
        imageWearNum: "0",
        weather: {},
        temp: "",
        description: "",
        fas: "",
        clothes,
        WeatherIcons,
        moment
      };
    },
    methods: {
      handleCloseModal() {
        this.showModal = !this.showModal;
      },
      async getWeather(value) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            this.lat
          }&lon=${this.lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
        );
        // this.loading = true
        this.weather = await response.json();
        // this.loading=false
        console.log("json", this.weather);
        // console.log("temp", this.weather.main.temp);
        // console.log("weather", this.weather.weather[0].description);
        this.temp = this.weather.main.temp;
        this.description = this.weather.weather[0].main;
        console.log(this.description);
        this.fas = `fas fa-smog`;
        this.wearIconselect();
        this.weatherIconSelect();
      },
      wearIconselect() {
        const clothesValue = Object.keys(this.clothes);
        const stringTemp = String(parseInt(this.temp));
        console.log(clothesValue);
        console.log(parseInt(this.temp));
        console.log(this.clothes[5].scope);
        console.log(this.clothes[5].scope.indexOf(stringTemp));
        const wearNum = clothesValue.filter(
          e => clothes[e].scope.indexOf(stringTemp) !== -1
        );
        this.imageWearNum = wearNum;
      },
      weatherIconSelect() {
        this.fas = WeatherIcons[this.description].iconName;
      }
    },
    computed: {
      date() {
        // let today = new Date();
        // let dd = today.getDate();
        // let mm = today.getMonth() + 1;
        // let yyyy = today.getFullYear();

        // dd < 10 ? (dd = "0" + dd) : dd;
        // mm < 10 ? (dd = "0" + mm) : mm;

        // let minute = today.getMinutes();
        // let hour = today.getHours();

        // hour <= 12 ? (hour = "오후 " + hour) : (hour = "오전 " + hour);

        // return `${yyyy}년 ${mm}월 ${dd}일  ${hour}시 ${minute}분`;
        return moment().format();
      },
      selectTitle() {
        return this.locations[this.selectValue].krName;
      },
      currentCloth() {
        return clothes[this.imageWearNum].clothes;
      },
      currentTemperScope() {
        return clothes[this.imageWearNum].temper;
      },
      imageSrc() {
        return require(`@/assets/${this.imageWearNum}.png`);
      }
    },
    watch: {
      selectValue(en) {
        const { lat, lon } = this.locations[en];
        // console.log("lat,lon", lat, lon);
        this.lat = lat;
        this.lon = lon;
        // this.lat = this.locations[en].lat;
        // this.lon = this.locations[en].lon;
        this.getWeather(this.lat, this.lon);
      }
    },
    mounted() {
      const { lat, lon } = this.locations[this.selectValue];
      this.lat = lat;
      this.lon = lon;
      // console.log(this.lon);

      this.getWeather(this.lat, this.lon);
    }
  };
</script>

<style scoped>
  .main-wrap {
    height: 100vh;
    position: relative;
    padding-top: 60px;
    border: 1px solid;
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
