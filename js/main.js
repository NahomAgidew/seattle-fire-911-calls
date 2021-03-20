var mymap = L.map('map', {
  center: [47.7511, -120.7401],
  zoom: 8,
  maxZoom: 20,
  minZoom: 3,
  detectRetina: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

var fireCalls = null;

var colors = chroma.scale('Accent').mode('lch').colors(5);

// dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 5; i++) {
  $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

fireCalls = L.geoJson.ajax("assets/Fire911Calls.geojson",{
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<b>Address: </b>" + feature.properties.address
                    + "<br>" + "<b>Date: </b>" + feature.properties.datetime
                    + "<br>" +"<b>Response: </b>" + feature.properties.type );
    return feature.properties.type;
  },
  pointToLayer: function (feature, latlng) {
    var id = 0;
    if (feature.properties.type === "Aid Response") {
      id = 0;
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-flag marker-color-' + (id + 1).toString() })});
    } else if (feature.properties.type === "Medic Response") {
      id = 1;
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-flag marker-color-' + (id + 1).toString() })});
    } else if (feature.properties.type === "Auto Fire Alarm") {
      id = 2;
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-flag marker-color-' + (id + 1).toString() })});
    } else if (feature.properties.type === "Trans to AMR") {
      id = 3;
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-flag marker-color-' + (id + 1).toString() })});
    } else {
      id = 4;
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-flag marker-color-' + (id + 1).toString() })});
    }
  },
  attribution: 'Seattle Fire 911 Calls Data &copy; | https://data.seattle.gov/resource/kzjm-xkqj.geojson| &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Made By Nahom Abi'
}).addTo(mymap);

colors = chroma.scale('YlOrRd').colors(5);

var legend = L.control({position: 'topright'});

legend.onAdd = function () {
  // Create Div Element and Populate it with HTML
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b>Type of Response</b><br />';
  div.innerHTML += '<i class="fa fa-flag marker-color-1"></i><p> Aid Response </p>';
  div.innerHTML += '<i class="fa fa-flag marker-color-2"></i><p> Medic Response </p>';
  div.innerHTML += '<i class="fa fa-flag marker-color-3"></i><p> Auto Fire Alarm </p>';
  div.innerHTML += '<i class="fa fa-flag marker-color-4"></i><p> Trans to AMR </p>';
  div.innerHTML += '<i class="fa fa-flag marker-color-5"></i><p> Other </p>';
  div.innerHTML += '<hr><b>Seattle Fire 911 Calls (from January 1, 2021 to February 1, 2021)<b><br />';
  div.innerHTML += '<p> Map visualization of Seattle Fire Department 911 dispatches. </p>';

  // Return the Legend div containing the HTML content
  return div;
};

legend.addTo(mymap);

L.control.scale({position: 'bottomleft'}).addTo(mymap);

