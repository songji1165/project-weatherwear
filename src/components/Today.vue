<template>
  <div class="ww main-wrap">
    <div class="seletBox">
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
      <p class="location-time">{{ date }}</p>
      <div class="main wear">
        <p class="wear-icon" @click="showModal = true">
          <img src="../assets/0.png" alt="" width="300" />
        </p>
        <Modal class="modal" v-if="showModal" @onClose="handleCloseModal">
          <div slot="header">
            <h3>{{ currentCloth }}</h3>
          </div>
          <div slot="body"></div>
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
  // import {ionicons} from '@expo/vector-icons'
  const { VUE_APP_WHATHER_APP_KEY } = process.env;

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
        weather: {},
        temp: "",
        description: "",
        fas: "",
        clothes
      };
    },
    methods: {
      handleCloseModal() {
        this.showModal = false;
      },
      async getWeather(value) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            this.lat
          }&lon=${this.lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
        );
        this.weather = await response.json();
        console.log("json", this.weather);
        // console.log("temp", this.weather.main.temp);
        // console.log("weather", this.weather.weather[0].description);
        this.temp = this.weather.main.temp;
        this.description = this.weather.weather[0].description;
        this.fas = `fas fa-smog`;
      }
    },
    computed: {
      date() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        dd < 10 ? (dd = "0" + dd) : dd;
        mm < 10 ? (dd = "0" + mm) : mm;

        let minute = today.getMinutes();
        let hour = today.getHours();

        hour <= 12 ? (hour = "오후 " + hour) : (hour = "오전 " + hour);

        return `${yyyy}년 ${mm}월 ${dd}일  ${hour}시 ${minute}분`;
      },
      selectTitle() {
        return this.locations[this.selectValue].krName;
      },
      currentCloth() {
        let tempScope = parseInt(this.temp);
        let rightCloth = "";
        for (property in this.clothes) {
          this.clothes[property].scopne.indexOf(tempScope) != -1
            ? (rightCloth = element.clothes)
            : "";
        }
        return rightCloth;
      }
    },
    watch: {
      selectValue(en) {
        this.lat = this.locations[en].lat;
        this.lon = this.locations[en].lon;
        this.getWeather(this.lat, this.lon);
      }
    },
    mounted() {
      this.lat = this.locations[this.selectValue].lat;
      this.lon = this.locations[this.selectValue].lon;
      console.log(this.lon);

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
  .seletBox {
    float: right;
    margin-right: 5%;
  }
  select {
    height: 30px;
    width: 80px;
    border-radius: 10px;
    padding-left: 10px;
  }
  .current {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .main {
    margin: 10px 0;
  }
  .main h3 {
    font-size: 1.5rem;
  }
  .wear {
    position: relative;
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
    font-size: 0.9em;
  }
  .temper h3 {
    display: inline-block;
    border: 1px solid;
    border-radius: 50px;
    padding: 5px 15px;
  }
</style>
