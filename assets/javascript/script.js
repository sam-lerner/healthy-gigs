var googleApiKey = 'AIzaSyCos8hMeTlYcTTrH_T6PK5zdEBJoTqZlV8';


console.log("connect");

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.initMap = initMap;