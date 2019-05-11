import axios from "axios";

const { VUE_APP_WHATHER_APP_KEY } = process.env;

// export const getWeatherAPI = (lat, lon) => {
//   return fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
//     )
//     .then(res => res.json())
//     .catch(err => err);
// };

export const getWeatherAPI = (lat, lon) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`)
    .then(res => {
        console.log('axio',res.data) 
        return res.data  }
      )
    .catch(err => {
     console.log(err)
    });
};
