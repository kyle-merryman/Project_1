mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb24zMTQwIiwiYSI6ImNqbW53b2RsMDBmN3YzcHFvemVqMjcwMWgifQ.uSJyJkrDOWjV8xfUcaREtA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-87.6321, 41.8362],
    boxZoom: true,
    showZoom: true,
    fadeDuration: 500,
    trackResize: true,
    zoom: 13,
    
});
// Add geolocate control to the map.
// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
// }));



function forwardGeocoder(query) {
    var matchingFeatures = [];
    for (var i = 0; i < customData.features.length; i++) {
        var feature = customData.features[i];
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
            // add a tree emoji as a prefix for custom data results
            // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            feature['place_name'] = '🌲 ' + feature.properties.title;
            feature['center'] = feature.geometry.coordinates;
            feature['place_type'] = ['park'];
            matchingFeatures.push(feature);
        }
    }
    return matchingFeatures;
}

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder: forwardGeocoder,
    zoom: 14,
    placeholder: "Enter search e.g. Lincoln Park"
}));