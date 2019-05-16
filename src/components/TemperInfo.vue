<template>
  <div class="info-wrap">
    <div class="wear">
      <div class="temper-info-title">
        <slot name="daytime-title"> </slot>
      </div>
      <p class="wear-icon" @click="handleCloseModal">
        <img :src="imageSrc" :class="{ smallIcon: isSmallIcon }" />
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

    <div class="temper">
      <h3 class="temper-temper"><i :class="fasIcon"></i>{{ temp }} &#176;</h3>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
// import WeatherIcons from "@/json/weatherIcon.json";
import {
  wearIconNum,
  selectedTempScope,
  selectedClothes,
  weatherIconSelect
} from "@/modules/search.js";

export default {
  components: { Modal },
  props: ["temp", "description", "isSmallIcon"],
  watch: {
    temp(temp) {
      this.imageWearNum = wearIconNum(temp);
      // console.log("num", this.imageWearNum);
    },
    description(description) {
      this.fasIcon = weatherIconSelect(description).iconName;
    }
  },
  data() {
    return {
      showModal: false,
      fasIcon: "",
      imageWearNum: "0",
      showTitle: false
    };
  },
  methods: {
    handleCloseModal() {
      this.showModal = !this.showModal;
    }
  },
  computed: {
    imageSrc() {
      return require(`@/assets/${this.imageWearNum}.png`);
    },
    currentTemperScope() {
      return selectedTempScope(this.imageWearNum);
    },
    currentClothes() {
      return selectedClothes(this.imageWearNum);
    }
    // smallIcon() {
    //   return smallIcon;
    // }
  }
};
</script>

<style scoped>
.wear {
  position: relative;
  margin-bottom: 20px;
  /* background: blue; */
  height: 250px;
}
img {
  width: 300px;
}
.smallIcon {
  width: 200px;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
}
i {
  margin-right: 15px;
  vertical-align: middle;
}
.temper {
  /* position: relative; */
  border: 1px solid pink;
}
.temper h3 {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid;
  border-radius: 50px;
  padding: 10px 0;
  width: 180px;
}
.info-wrap > div {
  border: 1px solid;
  height: 500px;
}
</style>
