//<![CDATA[

// global "map" variable
var map = null;
var marker = null;
//========================================================================

var info;
var markers=[];

//========================================================================   
// popup window for pin, if in use
var infowindow = new google.maps.InfoWindow({ 
    size: new google.maps.Size(150,50)
});

// A function to create the marker and set up the event window function 
function createMarker(latlng, name, html) {

    var contentString = html;

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
    });

    google.maps.event.trigger(marker, 'click');   

    return marker;
}

function initialize() {

    // the location of the initial pin
    var myLatlng = new google.maps.LatLng(40.807702,-73.963050);

    // create the map
    var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // establish the initial marker/pin
    var image = 'bootstrap-3.2.0-dist/blogger.png';  
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
     // icon: image,
      title:"Property Location"
    });

    // establish the initial div form fields
    formlat = document.getElementById("latbox").value = myLatlng.lat();
    formlng = document.getElementById("lngbox").value = myLatlng.lng();

    // close popup window
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });

    // removing old markers/pins
    google.maps.event.addListener(map, 'click', function(event) {
        //call function to create marker
         if (marker) {
            marker.setMap(null);
            marker = null;
         }

        // Information for popup window if you so chose to have one
        /*
         marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+event.latLng);
        */

        var image = 'bootstrap-3.2.0-dist/lastfm.png';
        var myLatLng = event.latLng ;

        marker = new google.maps.Marker({   
            position: myLatLng,
            map: map,
          //  icon: image,
            title:"Property Location"
        });

        // populate the form fields with lat & lng 
        formlat = document.getElementById("latbox").value = event.latLng.lat();
        formlng = document.getElementById("lngbox").value = event.latLng.lng();
        flightPlanCoordinates.push(new google.maps.LatLng(formlat,formlng));

    });
    
   // var flightPlanCoordinates = [new google.maps.LatLng(33.926315,-118.312805)];
    
}

var flightPlanCoordinates = [
                     		new google.maps.LatLng(40.807702,-73.963050),
//                     		new google.maps.LatLng(34.11180455556899,-118.34197998046875),
//                     		new google.maps.LatLng(35.926315,-119.312805),
//                     		new google.maps.LatLng(36.926315,-116.312805)
                        	];


function showAdventure(){
    $.get( "oneAdventure", function(data){
        console.log(data[0].a_desc);
        $('#description').html(data[0].a_desc);
    })

    $.get( "testAdventure", function( data ) {
      console.log(data);
      var locations = data;

      locations.forEach(function(location){
        flightPlanCoordinates.push(new google.maps.LatLng(location.latitude,location.longitude));
      })

      LineIt()
    });
}

function getAllAdventures(){
    $.get( "api/adventures", function( data ) {
      console.log(data);
      adventures = data;

      adventures.forEach(function(adventure){
        $('#adventures').append("<p>" + adventure.a_name + "</p>");
      })
    });
}

function createAdventure(){

}

function queryAdventures(){
    var time = $('#timeText').val()
    var money = $('#moneyText').val()

    $.get( "api/adventures/time/" + time + "/money/" + money, function( data ) {
      console.log(data);
      adventures = data;

      adventures.forEach(function(adventure){
        $('#results').append("<p>" + adventure.a_name + "</p>");
      })
    });
}

function PushIt(){
	
	flightPlanCoordinates.push(new google.maps.LatLng(formlat,formlng));
	
}

function LineIt() {

    var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF6699',
    strokeOpacity: 1.0,
    strokeWeight: 5
    });

    flightPath.setMap(map);

}

//]]>