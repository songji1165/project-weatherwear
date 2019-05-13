<template>
  <div>
    <!-- latlon => temper찾기 => 옷찾기 => 모달알려줌 -->
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
</template>

<script>
  export default {};
</script>

<style></style>
