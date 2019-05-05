function loadCoords() {
  navigator.geolocation.getCurrentPosition(geoSucc, geoErr);
}

var search = function() {
  if (localStorage.getItem("location")) {
  } else {
  }
};

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
