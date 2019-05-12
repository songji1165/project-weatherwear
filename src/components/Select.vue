<template>
  <div class="selectBox">
    <select name="local" id="local" @change="changeSelect">
      <option value="">지역 선택</option>
      <option
        v-for="{ krName, enName } in locations"
        :value="enName"
        :key="enName"
      >
        {{ krName }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ["locations"],
    methods: {
      changeSelect(e) {
        const selected = e.target.value;
        this.$emit("handleClickSelect", selected);
      }
    }
  };
</script>

<style scoped>
  select {
    height: 30px;
    width: 100px;
    border-radius: 10px;
    padding-left: 10px;
    outline: none;
    background: skyblue;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    outline: none;
    border: none !important;
    color: #fff;
  }
  option {
    background: skyblue;
    outline: none;
    border: none;
  }
</style>
