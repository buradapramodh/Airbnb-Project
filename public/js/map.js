// ================= MAPBOX INITIALIZATION =================
mapboxgl.accessToken = mapToken;

// Safety check (prevents blank page crashes)
if (!listing || !listing.geometry || !listing.geometry.coordinates) {
  console.error("Map data missing");
} else {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // [lng, lat]
    zoom: 10,
    cooperativeGestures: true,
  });

  // ================= MARKER =================
  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h6>${listing.title}</h6>
        <p><b>${listing.location}, ${listing.country}</b></p>
        <p style="font-size:12px">Exact location shown after booking</p>
      `)
    )
    .addTo(map);

  // ================= CONTROLS =================
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.FullscreenControl());

  // ================= AUTO ZOOM ANIMATION =================
  map.on("load", () => {
    map.flyTo({
      center: listing.geometry.coordinates,
      zoom: 13,
      speed: 0.8,
      curve: 1.2,
      essential: true,
    });
  });

  // ================= CUSTOM ZOOM FUNCTIONS =================
  window.zoomin = () => {
    const z = map.getZoom();
    if (z < 18) map.zoomTo(z + 1);
  };

  window.zoomout = () => {
    const z = map.getZoom();
    if (z > 1) map.zoomTo(z - 1);
  };
}
