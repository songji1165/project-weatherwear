<template>
  <div class="main-wrap">
    <Loading v-show="showLoading" class="loading"></Loading>
    <Select-box
      v-model="selectedValue"
      class="selectBox"
      :locations="locations"
      @handleClickSelect="handleClickSelect"
    ></Select-box>
    <div class="main current">
      <h3 class="location">{{ selectTitle }}</h3>
      <p class="location-time">
        {{ currentDate }}
      </p>
      <div class="wear">
        <p class="wear-icon" @click="handleCloseModal">
          <img :src="imageSrc" />
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
  import Modal from "@/components/Modal";
  import Loading from "@/components/Loading";
  import SelectBox from "@/components/Select";
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
    components: { Modal, Loading, SelectBox },
    data() {
      return {
        showModal: false,
        locations,
        selectedValue: "seoul",
        lat: "",
        lon: "",
        res: "",
        imageWearNum: "0",
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
      handleClickSelect(selectedLocation) {
        console.log(selectedLocation);
        const { lat, lon } = this.locations[selectedLocation];
        this.lat = lat;
        this.lon = lon;
        this.requestWeather(this.lat, this.lon);
        this.selectTitle = this.locations[selectedLocation].krName;
      },
      async requestWeather(lat, lon) {
        const response = await getWeatherAPI(lat, lon);
        console.log("res", response);

        this.temp = parseInt(response.main.temp);
        this.imageWearNum = wearIconNum(this.temp);
        this.description = response.weather[0].main;
        this.fasIcon = weatherIconSelet(this.description).iconName;
        this.showLoading = false;
      },
      // async requestLocalName(lat, lon) {
      //   const responseLocalName = await getLocalName(lat, lon);
      //   // const localNameArr = responseLocalName.results[3].formatted_address.split(
      //   //   " "
      //   // );
      //   // console.log(localNameArr);
      //   // this.selectTitle = localNameArr[2];
      //   console.log('kakao',responseLocalName)
      // }
      //   requestLocalName(lat,lon) {
      //     const kakaoInit = {
      //       method: "GET",
      //       headers: { Authorization: `KakaoAK c68a0e4e945b4bc17ba5743f385dd2ad` }
      //     };
      //     return fetch(
      //       `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
      //       kakaoInit
      //     )
      //     .then((response) => response.json())
      //   .then((responseData) => {
      //     console.log(responseData);
      //   })
      // },
      async requestLocalName(lat, lon) {
        const responseLocalName = await getLocalName(lat, lon);
        // await function(data){ console.log(data)}
        // const LocalNameData = responseLocalName.json()
        // const LocalNameDataSucc = LocalNameData.data
        this.selectTitle = responseLocalName.documents[0].region_2depth_name;
        // this.selectTitle = responseLocalName[document].region_2depth_name
      }
    },
    computed: {
      currentDate() {
        return moment().format("YYYY[-]MM[-]DD, hh:mm A");
      },
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
    async mounted() {
      console.log("처음", this.lat, this.lon);

      if (navigator.geolocation) {
        try {
          const { coords } = await requestLocation();
          geoSucc(coords);
          const position = await geoLocationInLS();
          this.lat = position.lat;
          this.lon = position.lon;
          console.log("현재", this.lat, this.lon);
          this.requestWeather(this.lat, this.lon);
          this.requestLocalName(this.lat, this.lon);
        } catch (error) {
          console.log(error);
          const { lat, lon } = this.locations[this.selectValue];
          this.lat = lat;
          this.lon = lon;
          this.requestWeather(lat, lon);
        }
      } else {
        const { lat, lon } = this.locations[this.selectValue];
        this.lat = lat;
        this.lon = lon;
        this.requestWeather(lat, lon);
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
  .location {
    margin-bottom: 15px;
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
    margin: 20px 0;
  }
  .wear-icon img {
    width: 300px;
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
  }
  .temper h3 {
    display: inline-block;
    border: 1px solid;
    border-radius: 50px;
    padding: 10px 0;
    width: 180px;
  }
</style>
