<template>
  <transition name="arrow">
    <div class="animation-arrow">
      <i class="far fa-hand-pointer guide-icon"></i>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.animation-arrow {
  padding: 5%;
  z-index: 10;
  transition: all 0.5s ease;
}
i {
  font-size: 3rem;
  animation: 1s swipe infinite both;
  opacity: 0.3;
  transition: all 0.5s ease;
}
@keyframes swipe {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
  }
}

.arrow-enter {
  opacity: 0;
}

.arrow-leave-active {
  opacity: 0;
}

.arrow-enter .guide-icon,
.arrow-leave-active .guide-icon {
  font-size: 0.7rem;
  animation-play-state: paused;
}
</style>
