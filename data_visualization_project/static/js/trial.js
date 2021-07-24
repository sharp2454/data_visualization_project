d3.json("/api/report").then((accidentData) => {
    console.log("accidentData");
    console.log(accidentData);

    fatalities = 0;
    injuries = 0;
    noninjuries = 0;

    var filtered = accidentData.filter(accident => accident.year == year_id);
    console.log("filtered");
    console.log(filtered);

    filtered.forEach((row) => {
        // console.log("num");
        // console.log(num);
        var location = [row.latitude, row.logitude];

        marker = L.marker(location).addTo(myMap);

        marker.bindPopup("<h2>State: " + row.state + "<h2><hr><h3>City: " + row.city + "</h3>").addTo(myMap);

        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

        fatalities += row.total_fatal_injuries;
        injuries += row.total_injuries;
        noninjuries += row.total_uninjured;
    })

    console.log("fatalities, injuries, and non-injuries");
    casualties = [total_fatal_injuries, total_injuries, total_uninjured];
    console.log("fatalities= " + fatalities);

    var data = [{
        values: casualties,
        labels: ['Total fatalities', 'Total Injuries', 'Total Uninjured'],
        type: 'pie'
    }];

    var layout = {
        height: 400,
        width: 500
    };

    Plotly.newPlot('pie', data, layout);

});
