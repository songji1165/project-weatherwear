<template>
  <div class="main-wrap">
    <div class="main current">
      <div class="select-wrap">
        <button class="current-position" @click="handleClickReLocation">
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
      <div class="article">
        <Loading class="loading" v-show="showLoading"></Loading>

        <h3 class="location">{{ selectTitle }}</h3>
        <p class="location-time">
          {{ currentDate }}
        </p>

        <Temper-slider
          class="slider"
          :lat="lat"
          :lon="lon"
          @activeClick="activeClick"
          @loadSucc="loadSucc"
        >
        </Temper-slider>
      </div>
    </div>
    <Guide class="guide" v-if="showGuide"></Guide>
  </div>
</template>
<script>
import { getLocalName } from "@/api/index.js";

import TemperSlider from "@/components/TemperSlider";
import Loading from "@/components/Loading";
import SelectBox from "@/components/Select";
import Guide from "@/components/Guide";

import locations from "@/json/location.json";

import {
  geoSucc,
  geoLocationInLS,
  requestLocation
} from "@/modules/location.js";
import moment from "moment";

export default {
  components: { Loading, SelectBox, TemperSlider, Guide },
  data() {
    return {
      locations,
      selectedValue: "seoul",
      selectTitle: "",
      lat: "",
      lon: "",
      moment,
      position: null,
      showGuide: true,
      showLoading: true
    };
  },
  methods: {
    handleClickSelect(selectedLocation) {
      const { lat, lon } = this.locations[selectedLocation];
      this.lat = lat;
      this.lon = lon;
      this.selectTitle = this.locations[selectedLocation].krName;
    },
    async requestLocalName(lat, lon) {
      try {
        const responseLocalName = await getLocalName(lat, lon);
        const localNameData = responseLocalName.data;
        this.selectTitle = localNameData.documents[0].region_2depth_name;
      } catch (err) {
        alert("현재 위치를 알 수 없습니다");
      }
    },
    async handleClickReLocation() {
      try {
        const { lat, lon } = geoLocationInLS();
        this.lat = lat;
        this.lon = lon;
        this.requestLocalName(this.lat, this.lon);
      } catch (err) {
        alert("현재 위치를 알 수 없습니다");
      }
    },
    activeClick() {
      this.showGuide = false;
    },
    loadSucc() {
      this.showLoading = false;
    }
  },
  computed: {
    currentDate() {
      return moment().format("YYYY[-]MM[-]DD, hh:mm A");
    }
  },
  async mounted() {
    if (navigator.geolocation) {
      try {
        const { coords } = await requestLocation();
        geoSucc(coords);
        const position = await geoLocationInLS();
        this.lat = position.lat;
        this.lon = position.lon;
        this.requestLocalName(this.lat, this.lon);
      } catch (error) {
        const { lat, lon, krName } = this.locations[this.selectedValue];
        this.lat = lat;
        this.lon = lon;
        this.selectTitle = krName;
      }
    } else {
      const { lat, lon, krName } = this.locations[this.selectValue];
      this.lat = lat;
      this.lon = lon;
      this.selectTitle = krName;
    }
  }
};
</script>

<style scoped>
.main-wrap {
  position: relative;
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
  margin: 0 10% 15px;
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
.current-position:hover {
  background: rgba(0, 0, 0, 0.1);
}
.select-box {
  float: left;
}
.location {
  margin-bottom: 15px;
}
.current {
  width: 100%;
}
.main {
  margin: 10px 0;
}
.main h3 {
  font-size: 1.5rem;
}
.guide {
  position: fixed;
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
}
.article {
  position: relative;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
