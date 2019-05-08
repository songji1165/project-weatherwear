<template>
  <div class="selectBox">
    <select name="local" id="local" v-model="selectValue">
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

<script></script>

<style scoped></style>
