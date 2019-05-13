import clothes from "@/json/cloth.json";
import WeatherIcons from "@/json/weatherIcon.json";

// wearicon번호 찾기
export function wearIconNum(temp) {
  return Object.keys(clothes).filter(
    key => clothes[key].scope.indexOf(String(temp)) !== -1
  );
}

// 기온별 구간 찾기
export function selectedTempScope(clothNum) {
  return clothes[clothNum].temper;
}

// 구간별 옷종류 찾기
export function selectedClothes(clothNum) {
  return clothes[clothNum].clothes;
}

//

// weather icon
export function weatherIconSelect(weather) {
  return WeatherIcons[weather];
}
