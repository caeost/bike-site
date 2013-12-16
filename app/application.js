// Application bootstrapper.
Application = {
    initialize: function() {
        var HomeView = require('views/home_view'),
            Router   = require('lib/router'),
            LocationModel =  require('models/LocationModel'),
            BikeCollection = require('models/BikeCollection'),
            maps = google.maps,
            that     = this,
            gEvents = google.maps.event.addListener;

        var locate = this.locationModel = new LocationModel();

        var defaultLocation = new maps.LatLng(37.8472168, -122.2727436);
        var map = this.map =  new maps.Map($("#map-canvas")[0], {
          center: defaultLocation,
          zoom: 16
        });


        var bikeCollection = this.bikeCollection = new BikeCollection(null, {location: locate, map: map});

        locate.on("change:coords", function(model, coords) {
          var latLng = new maps.LatLng(coords.latitude, coords.longitude);
          var marker = model.Marker || new maps.Marker({
            title: "you", 
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", 
            map: map
          });

          marker.setPosition(latLng);
          model.Marker = marker;

          map.setCenter(latLng);

          bikeCollection.fetch();
        });

        gEvents(map, "dragstart", function() {
          locate.set("nopoll", true);
          locate.clearInterval();
        });

        var homeView = this.homeView = new HomeView({
          collection: bikeCollection, 
          model: locate
        });
        this.router  = new Router();
    }
}

module.exports = Application
