// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});  

// Add a tile layer.
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

function chooseColor(depth) {
    if (depth > 90) return "#800026";
    else if (depth > 70) return "#BD0026";
    else if (depth > 50) return "#E31A1C";
    else if (depth > 30) return "#FC4E2A";
    else if (depth > 10) return "#FD8D3C";
    else return "#FEB24C";
}


// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data);
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, 
                {radius : feature.properties.mag * 3,
                opacity: 1,
                fillOpacity: 1,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: chooseColor(feature.geometry.coordinates[2])
                }
                ).bindPopup(`<p>Magnitude and Location: </p><h3>${feature.properties.title}</h3>`);
        }    
    }).addTo(myMap);
    // Add circles to the map.

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: #FEB24C"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background: #E31A1C"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background: #BD0026"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background: #800026"></i><span>>90</span><br>';
   

    return div;
    };

    legend.addTo(myMap);

});

