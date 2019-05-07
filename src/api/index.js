import axios from "axios";

const { VUE_APP_WHATHER_APP_KEY } = process.env;

export const getWeatherAPI = {
  weatherAPI(lat, long) {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
      )
      .catch(err => console.log(err));
  }
};
