// Application bootstrapper.
Application = {
    initialize: function() {
        var HomeView = require('views/home_view'),
            Router   = require('lib/router'),
            LocationModel =  require('models/LocationModel'),
            BikeCollection = require('models/BikeCollection'),
            maps = google.maps,
            that     = this;

        var homeView = this.homeView = new HomeView();
        this.router  = new Router();

        var locate = this.locationModel = new LocationModel();

        var map = this.map =  new maps.Map($("#map-canvas")[0], {
          center: new google.maps.LatLng(locate.default.latitude, locate.default.longitude),
          zoom: 16
        });

        var bikeCollection = this.bikeCollection = new BikeCollection(null, {location: locate, map: map});

        locate.once("change:coords", function(model, coords) {
          var latLng = new maps.LatLng(coords.latitude, coords.longitude);
          var marker = model.Marker || new maps.Marker({title: "you", icon: {path: google.maps.SymbolPath.CIRCLE}, map: map});
          marker.setPosition(latLng);
          model.Marker = marker;

          map.setCenter(latLng);
        });

        locate.on("change:box", function() {
          bikeCollection.fetch();
        });
    }
}

module.exports = Application
