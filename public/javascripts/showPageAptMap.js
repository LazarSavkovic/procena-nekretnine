mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [apt.long, apt.lat],
    zoom: 13,
    // projection: 'globe'
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker({color: "#ff0000"})
    .setLngLat([apt.long, apt.lat])
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
    )
    .addTo(map);

