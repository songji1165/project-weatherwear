import { getWeatherAPI } from "@/api"

//1. geolocation API 사용가능 여부
export function geoAPI() {
  if ("geolocation" in navigator) {
    requestLocation()
  } else {
    alert("현재 위치의 정보를 알 수 없습니다" )
  }
}

//2. 사용자 위치 저장 값이 있는지 확인 (없으면 위치 요청/ 있으면 api호출)
export function checkSavedLocation() {
  const {latitude, longitude} = isLocation()
  if (lsGetLoc) {
    getWeatherAPI(latitude, longitude)
  } else {
    requestLocation();
  }
}

//3. 사용자 위치 요청
export function requestLocation() {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      saveLocation({
        latitude,
        longitude
      });
    },
    err => {
      err;
      // home페이지로 이동 후 다시 승인 할 수 있도록 함
    }
  );
}

//4. 받은 location 데이터 로컬스토레지 저장
export function saveLocation({ latitude, longitude }) {
  localStorage.setItem(
    "location",
    JSON.stringify({
      latitude,
      longitude
    })
  );
}

//5. 로컬스토레지에서 location정보 가져오기
export function isLocation() {
  return localStorage.getItem("location");
}

//6. weather API 갖고오기
