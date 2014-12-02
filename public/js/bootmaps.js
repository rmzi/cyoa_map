function initialize() {
        getLocation(); 
      }
      google.maps.event.addDomListener(window, 'load', initialize);

      function getLocation(){
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          // default location
        }
      }

      function success(position){
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latlng,
          scrollWheel: false,
          zoom: 12
        };
        
        var marker = new google.maps.Marker({
            position: latlng,
            url: '/',
            animation: google.maps.Animation.DROP
        });
        
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        
        marker.setMap(map);
      }

      function error(msg){
        if (msg.code == 1) {
            //PERMISSION_DENIED 
        } else if (msg.code == 2) {
            //POSITION_UNAVAILABLE 
        } else {
        }   //TIMEOUT
      }