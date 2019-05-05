<template>
  <div class="home">
      <Header-bar/>
      <Main-wrap/>
      <Time-wrap/>
      <Daily-wrap/>
    
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue"
  import MainWrap from "@/components/Main.vue"
  import TimeWrap from "@/components/Time.vue"
  import DailyWrap from "@/components/Daily.vue" 

export default {
  name: "home",
  components: { 
    HeaderBar, MainWrap,TimeWrap, DailyWrap, 
  }
};
</script>
