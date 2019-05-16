<template>
  <transition name="arrow">
    <div class="animation-arrow">
      <span></span>
      <i class="far fa-hand-pointer"></i>
    </div>
  </transition>
</template>

<script>
  export default {};
</script>

<style scoped>
  i {
    font-size: 3rem;
    animation: 1s swipe infinite both;
    opacity: 0.3;
  }
  @keyframes swipe {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-30px);
    }
  }

  .arrow-fade-enter-active {
    transition: all 0.3s ease;
  }

  .arrow-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .arrow-fade-enter,
  .arrow-fade-leave-to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  /* .arrow-enter,
  .arrow-leave-to {
    opacity: 0;
  }

  .arrow-leave-active .arrow-container {
    transition: 5s;
    opacity: 0;
  } */
</style>
