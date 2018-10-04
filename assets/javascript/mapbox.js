mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb24zMTQwIiwiYSI6ImNqbW53b2RsMDBmN3YzcHFvemVqMjcwMWgifQ.uSJyJkrDOWjV8xfUcaREtA';
//this is a created variable that has been stored with lat,long points now we can use it to mark a specific spot 
var monument = [-122.420679, 37.772537];
var ll = new mapboxgl.LngLat(-73.9749, 40.7736);
//this is where we can add features and control aspects of the map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
    center: [-87.6321, 41.8362],
    boxZoom: true,
    fadeDuration: 2000,
    trackResize: true,
    zoom: 15,

});

map.addControl(new mapboxgl.FullscreenControl());

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-left');

map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
});

// UI
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}))



var marker = new mapboxgl.Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);

var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'nautical'
});
map.addControl(scale);

scale.setUnit('metric');