<template>
  <div class="loading">
    <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  z-index: 5;
  margin: 0;
  padding: 0;
}
i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  opacity: 0.7;
}
</style>
