import clothes from "@/json/cloth.json";
import WeatherIcons from "@/json/weatherIcon.json";

// wearicon번호 찾기
export function wearIconNum(temp) {
  const clothesValue = Object.keys(clothes);
  const stringTemp = String(temp);
  const wearNum = clothesValue.filter(
    e => clothes[e].scope.indexOf(stringTemp) !== -1
  );
  return wearNum;
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
export function weatherIconSelet(weather) {
  return WeatherIcons[weather];
}
