var model = require("./model");

module.exports = model.extend({
  initialize: function() {
    this.startChecking();
  },
  startChecking: function() {
    this.set("nopoll", false);
    this.checkGeo();

    var that = this;
    this.interval = setInterval(function() {
      that.checkGeo();
    }, 30000);
  },
  clearInterval: function() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  },
  checkGeo: function() {
    var that = this
        defaults = this.default;

    var geo = window.navigator && window.navigator.geolocation;
    if(geo && typeof geo.getCurrentPosition == "function") {
      geo.getCurrentPosition(function(geoposition) {
        that.set(that.parse(geoposition));
      }, function(){
        that.set(that.parse(defaults));
      }, {timeout: 4000});
    } else {
      _.defer(function() {
        that.set(that.parse(defaults));
      });
    }
  },
  default: {
    coords: {
      "latitude": 37.7833,
      "longitude": -122.4167
    },
    "disabled": true
  },
  parse: function(response) {
    if(response.coords) {
      var coordinates = response.coords;

      var boxSize = .003;
      response.box = [
        coordinates.latitude + boxSize,
        coordinates.longitude - boxSize,
        coordinates.latitude - boxSize,
        coordinates.longitude + boxSize
      ];
    }
    return response
  }
});
