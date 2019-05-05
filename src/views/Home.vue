<template>
  <div>
    동의해주세요
    <button>
      동의
    </button>
  </div>
</template>

<script>
import { checkAgreement } from "../modules/location";
export default {
  created() {
    checkAgreement();
  }
};
</script>
