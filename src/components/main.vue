<template>
  <div class="ww main-wrap">
    <div class="main-current">
      <p class="main location">남양주시 평내동</p>
      <div class="main wear">
        <p class="main wear-icon"
        @click="showModal=true">
          <img src="../assets/0.png" alt="" width="300" />
        </p>
        <Modal 
        class="modal"
        v-if="showModal" @onClose="handleCloseModal"></Modal>
       
      </div>
       
        <div class="main temper">
          <!-- <ionicons name="ios-rainy"></ionicons> -->
          <p class="main temper-temper">18도</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from "./Modal";
  // import {ionicons} from '@expo/vector-icons'

  export default {
    components: { Modal,  },
    data() {
      return {
        showModal: false
      };
    },
    methods: {
      handleCloseModal() {
        this.showModal = false
      }
    }
  };
</script>

<style>
  .main-wrap {
    height: 100vh;
    position: relative;
  }
  .main-wrap > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .wear {
    position: relative;
  }
  .modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
 
</style>
