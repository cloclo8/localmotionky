// the plain is to have all custom JS that supports the main site function here
// document.ready calls will stay in layout.haml/page level code, for now

var map, markers; // for leaflet mapping
var features_clicked = [] // for comparison features

var restaurantGreenIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/restaurantgreen.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var restaurantYellowIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/restaurantyellow.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var restaurantRedIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/restaurantred.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var parkIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/park.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var basketballIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/basketballfield.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var hikingIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/hiking.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var joggingIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/jogging.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var playgroundIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/playground.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var soccerIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/soccer.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var tennisIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/tennis.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var footballIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/usfootball.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});
var volleyballIcon = L.icon({
    iconUrl: PUBLIC_HOST+'/mapicons.nicolasmollet.com/volleyball.png',
    iconSize: [32, 37],
    iconAnchor: [15, 37],
    popupAnchor: [2,-37]
});

function load_geojson_as_cluster(data_url,fit_bounds){
  $("#map").showLoading();
  $.getJSON(data_url, function(data){
    // clear all markers
    if(typeof(markers) != "undefined"){map.removeLayer(markers);}

    markers = new L.MarkerClusterGroup();
    var geoJsonLayer = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        props = feature.properties
        popup = ""
        // set icon (green or red) depending on incentive receive status
        if(feature.id[0] == "f"){
          if(props["Score"] > 90){
            layer.setIcon(restaurantGreenIcon)
          }
          else if(props["Score"] > 75){
            layer.setIcon(restaurantYellowIcon)
          }
          else {
            layer.setIcon(restaurantRedIcon)
          }
          layer.setIcon(restaurantGreenIcon)
          popup += "<p><strong>"+props["EstablishmentName"]+"</strong></p>"
          popup += "<p>"+props["Address"]+"<br />"+props["City"]+", "+props["State"]+" "+props["Zip"]+"</p>"
          popup
          popup += "<p>Inspection score: "+props["Score"]+" on "+props["InspectionDate"]+"</p>"
        }
        else if(feature.id[0] == "p"){
          if(props["Amenity"] == "Basketball"){
            layer.setIcon(basketballIcon)
          }
          else if(props["Amenity"] == "Hiking Trail"){
            layer.setIcon(hikingIcon)
          }
          else if(props["Amenity"] == "Jogging" || props["Amenity"] == "Walking" || props["Amenity"] == "Running"){
            layer.setIcon(joggingIcon)
          }
          else if(props["Amenity"] == "Playground"){
            layer.setIcon(playgroundIcon)
          }
          else if(props["Amenity"] == "Soccer"){
            layer.setIcon(soccerIcon)
          }
          else if(props["Amenity"] == "Tennis"){
            layer.setIcon(tennisIcon)
          }
          else if(props["Amenity"] == "Football"){
            layer.setIcon(footballIcon)
          }
          else if(props["Amenity"] == "Volleyball"){
            layer.setIcon(volleyballIcon)
          }
          else {
            layer.setIcon(parkIcon)
          }
          popup += "<p><strong>"+props["Amenity"]+" at "+props["DisplayName"]+"</strong></p>"
          popup += "<p>"+props["StreetAddr"]+"<br />"+props["City"]+", "+props["State"]+" "+props["Zip"]+"</p>"
          popup += "<p><a target=_blank href="+props["Url"]+">Visit park's website</a> or give them a call at "+props["Telephone"]+"</p>"
        }
        layer.bindPopup(popup)
        layer.on('click', onFeatureClick);
      }
    });
    markers.on('clusterclick', onClusterClick);
    markers.addLayer(geoJsonLayer);
    map.addLayer(markers);
    $("#map").hideLoading();
  })
}

function onFeatureClick(e){}

function onClusterClick(e){}

function constructComparisonTable(){}
