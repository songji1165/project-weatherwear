function loadCoords() {
  navigator.geolocation.getCurrentPosition(geoSucc, geoErr);
}

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
    () => {}
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
