mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: flat.geometry.coordinates,
    zoom: 13,
    // projection: 'globe'
});

for (const apt of apts) {
    new mapboxgl.Marker({scale: 0.6})
    .setLngLat([apt.long, apt.lat])
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML(
           apt.properties.popUpMarkup
        )
    )
    .addTo(map);

}

new mapboxgl.Marker({color: "#ff0000"})
    .setLngLat(flat.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML(
            flat.properties.popUpMarkup
        )
    )
    .addTo(map);

