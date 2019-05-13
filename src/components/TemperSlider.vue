<template>
  <div class="slider">
    <!-- lat,lon 데이터prop해서 
      현재, 최고,최저 기온찾기 -->
      <div class="current-temp">
        <temper-info></temper-info>
      </div>
      <div class="daytime-temp">
          <div class="min-temp">
            <h2>최저 기온</h2>
            <temper-info></temper-info>
          </div>
          <div class="max-temp">
            <h2>최고 기온</h2>
            <temper-info></temper-info>
          </div>
      </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .slider > div{
    float: left
  }
  .slider::after{
    content: '';
    display: block;
    clear: both;
  }
</style>
