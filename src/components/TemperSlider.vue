<template>
  <div class="slider">
      <div class="current-temp">
        <temper-info
        :temp="temp"
        :description="description"
        >
        </temper-info>
      </div>
      <div class="daytime-temp">
          <div class="min-temp">
            <h2>최저 기온</h2>
            <temper-info
            :temp="min"
            :description="description"
            ></temper-info>
          </div>
          <div class="max-temp">
            <h2>최고 기온</h2>
            <temper-info
            :temp="max"
            :description="description"
            >
          </temper-info>
          </div>
      </div>
  </div>
</template>

<script>
 import { getWeatherAPI } from "@/api/index.js";
  import TemperInfo from "@/components/TemperInfo";

  export default {
    components : {TemperInfo},
    props:["lat","lon"],
    watch : {
      lat(val){
        this.geo.push({lat: val})
      },
      lon(val){
        this.geo.push({lon: val})
        this.requestWeather(this.geo[0].lat,this.geo[1].lon)
      }
    },
    data(){
      return{
        temp:'',
        max:'',
        min:'',
        description: "",
        geo : []
      }
    },
    methods:{
      async requestWeather(lat, lon) {
        const response = await getWeatherAPI(lat, lon);

        this.temp = parseInt(response.main.temp);
        this.max = parseInt(response.main.temp_max);
        this.min = parseInt(response.main.temp_min);
        this.description = response.weather[0].main;
      },
    },
  };
</script>

<style scoped>
  .slider{
    position: relative;
    top: 0;
    left: 0
  }
  .slider > div{
    float: left;
    border: 1px solid blue;
    width:100%;
  }
  .slider::after{
    content: '';
    display: block;
    clear: both;
  }
  .daytime-temp > div{
    float: left;
    width: 50%
  }
</style>
