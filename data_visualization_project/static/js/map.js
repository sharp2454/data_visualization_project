console.log("Map")

var year_id = d3.select("#year_id").property("value");

function yearValue(y) {
    year_id = y;
}

console.log("year");
console.log(year_id);

lati = 0;
long = 0;

var myMap = L.map("map", {
    center: [42.2, -96.7970],
    zoom: 4
});

// Define greymap layers  // id: "mapbox/light-v10",
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

d3.json("/static/data/Aviation_short.json").then((accidentData) => {
    console.log("accidentData");
    console.log(accidentData);

    var filtered = accidentData.filter(accident => accident.YEAR == year_id);
    console.log("filtered");
    console.log(filtered);

    filtered.forEach((row) => {
        // console.log("num");
        // console.log(num);
        var location = [row.LATITUDE, row.LONGITUDE];

        marker = L.marker(location).addTo(myMap);

        marker.bindPopup("<h2>State: " + row.STATE + "<h2><hr><h3>City: " + row.CITY + "</h3>").addTo(myMap);

        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

    })

});
