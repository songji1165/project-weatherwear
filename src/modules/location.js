export function isLocation() {
  return localStorage.getItem("location");
}

export function checkAgreement() {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      saveLocation({
        latitude,
        longitude
      });
    },
    () => {
      alert("동의를 하셔야 서비스를 이용 할 수 있습니다 =");
    }
  );
}

export function saveLocation({ latitude, longitude }) {
  localStorage.setItem(
    "location",
    JSON.stringify({
      latitude,
      longitude
    })
  );
}
