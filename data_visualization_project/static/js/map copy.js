console.log("Map")

var year_id = d3.select("#year_id").property("value");

function yearValue(y) {
    year_id = y;
}

console.log("year");
console.log(year_id);

lati = 0;
long = 0;

//add layers
var layers = {
    Airplane: new L.LayerGroup(),
    Balloon: new L.LayerGroup(),
    Glider: new L.LayerGroup(),
    Gyroplane: new L.LayerGroup(),
    Helicopter: new L.LayerGroup(),
    Powered_Parachute: new L.LayerGroup(),
    UltraLight: new L.LayerGroup(),
    Weight_Shift: new L.LayerGroup(),
  
  };
var myMap = L.map("map", {
    center: [42.2, -102.0902],
    zoom: 4,
    minZoom:3,
    layers: [
        layers.Airplane,
        layers.Balloon,
        layers.Glider,
        layers.Gyroplane,
        layers.Helicopter,
        layers.Powered_Parachute,
        layers.UltraLight,
        layers.Weight_Shift
    
      ]
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

var overlays = {
    "Airplane": layers.Airplane,
    "Balloon": layers.Balloon,
    "Glider": layers.Glider,
    "Gyroplane": layers.Gyroplane,
    "Helicopter": layers.Helicopter,
    "Powered Parachute": layers.Powered_Parachute,
    "Ultra Light": layers.UltraLight,
    "Weight-Shift": layers.Weight_Shift
  
  }
L.control.layers(null, overlays).addTo(myMap);
var Airplane = []
var Balloon = []
var Glider = []
var Gyroplane = []
var Helicopter = []
var Powered_Parachute= []
var UltraLight = []
var Weight_Shift = []
  
  

d3.json("/api/report").then((accidentData) => {
    console.log("accidentData");
    console.log(accidentData);

    var filtered = accidentData.filter(accident => accident.year == year_id);
    console.log("filtered");
    console.log(filtered);

    var planeIcon = L.icon({
        iconUrl: "static/images/planes.png",
        iconSize: [25, 25],
      
      })
      
      //var incidents = response;
      //var incidentMarkers = [];
      
      for (var index = 0; index < filtered.length; index++) {
        var incident = filtered[index];
      
        
        aircraft_type = incident['AIRCRAFT_CATEGORY']
        //console.log(incident)
        //console.log(response)
        if (aircraft_type === "AIRPLANE") {
          Airplane.push(incident)
          var aircraft_layer = ['Airplane']
          //aircraft_layer = 'Airplane';
          // console.log(Airplane)
        }
          
        else if (aircraft_type === "BALLOON") {
          Balloon.push(incident)
          var aircraft_layer = ['Balloon']
        }
      
        
        else if (aircraft_type === "GLIDER") {
          Glider.push(incident)
          var aircraft_layer = ['Glider']
        }
      
        else if (aircraft_type === "GYROPLANE") {
          Glider.push(incident)
          var aircraft_layer = ['Gyroplane']
        }
      
        else if (aircraft_type === "HELICOPTER") {
          Helicopter.push(incident)
          var aircraft_layer = ['Helicopter']
        }
      
        else if (aircraft_type === "POWERED PARACHUTE") {
          Powered_Parachute.push(incident)
          var aircraft_layer = ['Powered_Parachute']
        }
      
        else if (aircraft_type === "ULTRALIGHT") {
          UltraLight.push(incident)
          var aircraft_layer = ['UltraLight']
        }
      
        else if (aircraft_type === "WEIGHT-SHIFT") {
          Weight_Shift.push(incident)
          var aircraft_layer = ['Weight_Shift']
        }
        
        
        var incidentMarker = L.marker([incident.LATITUDE, incident.LONGITUDE],{icon: planeIcon})//.addTo(myMap);
        incidentMarker.addTo(layers[aircraft_layer]);
      
        incidentMarker.bindPopup("Date: " + incident.EVENT_DATE + "<br>Accident Number: " + incident.ACCIDENT_NUMBER + "<br>Aircraft: " + incident.AIRCRAFT_CATEGORY + "<br>City: " + incident.CITY + "<br>State: " + incident.STATE + "<br>Total Fatalities: " + incident.TOTAL_FATALITIES + "<br>Total Injuries: " + incident.TOTAL_INJURIES + "<br>Total Uninjured: " + incident.TOTAL_UNINJURED).openPopup;
      
      }

    filtered.forEach((row) => {

        // console.log("num");
        // console.log(num);
        // var location = [row.LATITUDE, row.LONGITUDE];

        // marker = L.marker(location).addTo(myMap);

        // marker.bindPopup("<h2>State: " + row.STATE + "<h2><hr><h3>City: " + row.CITY + "</h3>").addTo(myMap);

        // marker.on('mouseover', function (e) {
        //     this.openPopup();
        // });
        // marker.on('mouseout', function (e) {
        //     this.closePopup();
        // });

    })

});
