import { getWeatherAPI } from "@/api";

// //1. 사용자 위치 저장 값이 있는지 확인 (없으면 위치 요청/ 있으면 api호출)
// export function checkSavedLocation() {
//   if (getLocationInLS() == null) {
//     requestLocation();
//   } else {
//     const isLocation = JSON.parse(getWeatherAPI);
//   }
// }

//2. 사용자 위치 요청
export function requestLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function geoSucc(coords) {
  const { latitude, longitude } = coords;
  saveLocationInLS(latitude, longitude);
}
export function geoErr() {
  alert("정확한 위치를 알 수 없습니다");
  return false;
}

//3. geolocation API 사용가능 여부
export function geoAPI() {
  if ("geolocation" in navigator) {
    requestLocation();
  } else {
    alert("현재 위치의 정보를 알 수 없습니다");
  }
}

//4. 받은 position 데이터 로컬스토레지 저장
export function saveLocationInLS(latitude, longitude) {
  const getPosition = { lat: latitude, lon: longitude };
  localStorage.setItem("POSITION", JSON.stringify(getPosition));
}

//5. 로컬스토레지에서 position 가져오기
export function geoLocationInLS() {
  return JSON.parse(localStorage.getItem("POSITION"));
}
