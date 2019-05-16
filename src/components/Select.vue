<template>
  <div class="selectBox">
    <select name="local" id="local" @change="changeSelect">
      <option value="" disabled selected>지역 선택</option>
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
    changeSelect({ target: { value } }) {
      this.$emit("handleClickSelect", value);
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
  background: none;
  border: none;
  color: #fff;
}
option {
  background: skyblue;
  outline: none;
  border: none;
}
</style>
