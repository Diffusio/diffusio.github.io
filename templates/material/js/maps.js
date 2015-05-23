//Variables
var geocoder;
var map;
var address = "rue neuve conliege";
var mapOptions = {
  zoom: 17,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var marker;

//Init
function initialize() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    codeAddress();
}

//Functions
function codeAddress() {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        if(marker)
          marker.setMap(null);
        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            draggable: true
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}