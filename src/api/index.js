import axios from "axios";

const { VUE_APP_WHATHER_APP_KEY, VUE_APP_GEOCODING_APP_KEY } = process.env;

export const getWeatherAPI = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VUE_APP_WHATHER_APP_KEY}&units=metric`
    )
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
};


export const getLocalName = (lat, lon) => {
  return fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,{
    method : 'GET',
    headers : {"Authorization": `KakaoAK c68a0e4e945b4bc17ba5743f385dd2ad`}
  })
    .then(res => {
      console.log('data',res)
      return res.json()})
      // .then(res => {
      //   console.log('data3',res)
      //   return res
      // })
    // .catch(err => console.log(err));
};

// export const getLocalName = (lat, lon) => {
//   return axios
//     .get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${VUE_APP_GEOCODING_APP_KEY}`
//     )
//     .then(res => {
//       console.log(res.data)
//       return res.data})
//     .catch(err => console.log(err));
// };
