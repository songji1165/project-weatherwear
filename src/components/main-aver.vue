<template>
  <div class="main-aver">
    <div class="main min-temper">
      <h3 class="main location">최저 기온</h3>
      <div class="main wear">
        <p class="main wear-icon">
          <img src="../assets/0.png" alt="" width="200" />
        </p>
        <div class="main modal">
          <p class="main kind">
            니트, 가디건, 후드티
          </p>
        </div>
        <div class="main temper">
          <p class="main temper-icon"></p>
          <p class="main temper-temper">18도</p>
        </div>
      </div>
    </div>

    <div class="main min-temper">
      <h3 class="main location">최고 기온</h3>
      <div class="main wear">
        <p class="main wear-icon">
          <img src="../assets/0.png" alt="" width="200" />
        </p>
        <div class="main modal">
          <p class="main kind">
            니트, 가디건, 후드티
          </p>
        </div>
        <div class="main temper">
          <p class="main temper-icon"></p>
          <p class="main temper-temper">18도</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
.main-aver > div {
  float: left;
  width: 50%;
  border: 1px solid;
}
.main-aver:after {
  content: "";
  display: block;
  clear: both;
}
</style>
