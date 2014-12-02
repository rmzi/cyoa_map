var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var homeLocation; 
var map;

// Initialize Map, Directions, place Home Marker
function initialize() {

  if(!!navigator.geolocation) {      

    directionsDisplay = new google.maps.DirectionsRenderer();

    // Set map to be road map
    var mapOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    directionsDisplay.setMap(map);

  navigator.geolocation.getCurrentPosition(function(position) {
    
      var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      homeLocation = geolocate

      map.setCenter(geolocate);
      
      var marker = new google.maps.Marker({
          position: homeLocation,
          map: map,
          title:"Home",
          icon: "img/house_icon.png"
      });

      var characterMarker = new google.maps.Marker({
          position: homeLocation,
          map: map,
          title: "Character",
          icon: "img/character.gif",
          optimized: false
      });

      google.maps.event.addListener(marker, 'click', function() {
        var content = '<img src="img/house.png">' + 
          '<h1>This is your starting location!</h1>' +
          '<h3>Choose an adventure from the sidebar, or create your own!</h3>' //+ 

        showInfoWindow(homeLocation, content);
      });

    });
    
  } else {
    document.getElementById('map-canvas').innerHTML = 'No Geolocation Support.';
  }
}

function showInfoWindow(location, content){
  var infowindow = new google.maps.InfoWindow({
        map: map,
        position: location,
        content: content
      });
}

function searchForLocations(){
  
  var endpoint = "https://api.foursquare.com/v2/venues/explore?client_id=QP1QJYK1L51MECBAWJXMPOZHUJWCU4E53DLZKRGHWHOPQBVI&client_secret=CVBMPEBEQ5MDYYWCRE41KYPVENPMJ5V03MACS2HDUTLK05NP&v=20140806&ll=" + homeLocation.lat() + "," + homeLocation.lng() + "&m=foursquare&query=sushi"

  $.get(endpoint, function( data ) {
      console.log(data.response.groups[0].items);

      results = data.response.groups[0].items

      results.forEach(function(result) {

        var venueName = result.venue.name
        var location = result.venue.location

        console.log(venueName);
        console.log(location);


        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: result.venue.name,
          icon: "img/tent.gif"
        });

        google.maps.event.addListener(marker, 'click', function() {
          content = venueName;

          showInfoWindow(location, content);
        });
          
      });
    });
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    }
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);