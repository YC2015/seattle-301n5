(function(module){
  var map = {};

  function initMap(row) {
    // Create a map object and specify the DOM element for display.
    if(row){
      var firstcity = row[0];
      var ll = { lat:firstcity.latitude,lng:firstcity.longitude};
      map = new google.maps.Map(document.getElementById('map'),{
        zoom: 8,
        center: ll
      });
      var marker = new google.maps.Marker({
        position:{lat:firstcity.latitude,lng:firstcity.longitude},
        map: map
      });
      //
      // row.forEach(function(city, index){
      //   var marker = 'marker' + index;
      //   var infowindows = 'infowindows' + index;
      //   map[infowindows] = new google.maps.infowindows({ //m
      //   })
      //   map[marker]= new google.maps.Marker({
      //     position:{lat:city.latitude, lng:city.longitude},
      //     map: map.map
      //   })
        //map[marker].addListner
      //});



    } else {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.611435, lng: -122.330456},
        scrollwheel: true,
        zoom: 8
      });
      var marker = new google.maps.Marker({
        position:{lat: 47.611435, lng: -122.330456},
        map: map
      });
    }
  }

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
  //webDB.execute(


  module.initMap = initMap;
  module.map = map;
})(window);
