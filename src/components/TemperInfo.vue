<template>
  <div class="info-wrap">
    <div class="wear">
      <div>
          <slot name="daytime-title" class="temper-info-title"> </slot>
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
    </div>

    <div class="temper">
      <p class="temper-box"><i :class="fasIcon"></i>{{ temp }} &#176</p></div>
  </div>
</template>

<script>
  import Modal from "@/components/Modal";
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
        return require(`@/assets/${this.imageWearNum}.png`)
        
      },
      currentTemperScope() {
        return selectedTempScope(this.imageWearNum);
      },
      currentClothes() {
        return selectedClothes(this.imageWearNum);
      }
    },
    // mounted(){
    //   imageSrc()
    // }
  };
</script>

<style scoped>
  .info-wrap {
    padding: 10px 0
  }
  .wear {
    position: relative;
    margin-bottom: 30px;
    height: 300px;
    width: 300px;
    margin: 0 auto;
    display: table;
  }
  .wear > div {
    display: table-cell;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
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
  }
  i {
    margin-right: 15px;
    vertical-align: middle;
  }

  .temper-box {
    margin: 20px auto;
    border: 1px solid;
    border-radius: 50px;
    padding: 10px 0;
    width: 180px;
  }
</style>
