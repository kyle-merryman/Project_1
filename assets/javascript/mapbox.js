mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29uemFsb24zMTQwIiwiYSI6ImNqbW53b2RsMDBmN3YzcHFvemVqMjcwMWgifQ.uSJyJkrDOWjV8xfUcaREtA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [-121.4960761, 38.5810365],
  boxZoom: true,
  showZoom: true,
  fadeDuration: 2000,
  trackResize: true,
  zoom: 13
});
// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

map.addControl(new mapboxgl.FullscreenControl());

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  "top-left"
);
