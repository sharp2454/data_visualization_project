console.log("Report")

lati = 0;
long = 0;

var marker = null;

var myMap = L.map("map", {
    center: [45.0, -96.7970],
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

function buildMetadata(selection) {
    console.log("Metadata selection");
    console.log(selection);

    // Read the json data
    // /api/aviation
    d3.json("/api/report").then((sampleData) => {
        console.log(sampleData);
        //filter & parse data to return sample data
        var parsedData = sampleData;
        var sample = parsedData.filter(accident => accident.accident_number == selection);
        console.log("sample");
        console.log(sample);

        // //update metadata location
        var metadata = d3.select("#sample-metadata").html("");

        var exceptions = ["TOTAL_INJURIES", "TOTAL_UNINJURED", "YEAR"];

        Object.entries(sample[0]).forEach(([key, value]) => {
            // if(key !== "LATITUDE")
            if (!exceptions.includes(key)) {
                console.log(key);
                console.log(value);
                metadata.append("p").text(`${key}: ${value}`);

                if (key == "latitude") {
                    lati = `${value}`;
                }

                if (key == "longitude") {
                    long = `${value}`;
                }
            }
        });
    });
}

function buildMap(selection) {
    console.log("Map");
    console.log(selection);
    console.log(lati, long);

    // "LATITUDE", "LONGITUDE",
    //read json data
    d3.json("/api/report").then((accidentData) => {
        console.log("accidentData");
        console.log(accidentData);

        var sample = accidentData.filter(accident => accident.accident_number == selection);

        console.log(accidentData);
        console.log(sample);

        console.log("sample[0].LATITUDE");
        console.log(sample[0].latitude);

        var location = [sample[0].latitude, sample[0].longitude];

        // Remove the previous marker
        if (marker !== null) {
            myMap.removeLayer(marker);
        }

        marker = L.marker(location).addTo(myMap);

        marker.bindPopup("<h2>" + sample[0].city + "<h2><hr><h3>Fatalities: + " + sample[0].total_fatal_injuries + "</h3>").addTo(myMap);

        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
    });
}

//page load function
function init() {

    //read json data
    d3.json("/static/data/aviation2019.json").then((accidentData) => {
        console.log("accidentData");
        console.log(accidentData);

        var accidentNo = accidentData.map(accident => accident.ACCIDENT_NUMBER);
        console.log("accidentNo");
        console.log(accidentNo);

        //add dropdown menu
        var dropdownMenu = d3.select("#selDataset");

        accidentNo.forEach((num) => {
            // console.log("num");
            // console.log(num);
            dropdownMenu.append("option").property("value", num).text(num);
        })

        buildMetadata(accidentNo[0]);
        buildMap(accidentNo[0]);
    });
}

function optionChanged(newSelection) {
    console.log("newSelection");
    console.log(newSelection);

    buildMetadata(newSelection);
    buildMap(newSelection);
}

init();




