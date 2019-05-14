<template>
  <div>
    <div class="wear">
      <p class="wear-icon" @click="handleCloseModal">
        <img :src="imageSrc" :class={smallIcon:isSmallIcon} />
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
</template>

<script>
  import Modal from "@/components/Modal";
  import WeatherIcons from "@/json/weatherIcon.json";
  import {
    wearIconNum,
    selectedTempScope,
    selectedClothes,
    weatherIconSelect
  } from "@/modules/search.js";

  export default {
    components: { Modal },
    props: ["temp", "description","isSmallIcon"],
    watch: {
      temp(temp) {
        this.imageWearNum = wearIconNum(temp);
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
        showTitle:false
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
      },
      smallIcon(){
        return smallIcon
      }
    }
  };
</script>

<style scoped>
  .wear {
    position: relative;
    margin: 20px 0;
  }
  img {
    width: 300px;
  }
  .smallIcon{
    width: 200px
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
