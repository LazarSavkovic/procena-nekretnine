flats.forEach((flat, index) => {

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: `map-${index}`,
    style: 'mapbox://styles/mapbox/light-v10',
    center: flat.geometry.coordinates,
    zoom: 13,
    interactive: false
    });


new mapboxgl.Marker({color: "#7a7979"})
    .setLngLat(flat.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML(
            flat.properties.popUpMarkup
        )
    )
    .addTo(map);

    
})