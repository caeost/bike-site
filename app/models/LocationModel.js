var model = require("./model");

module.exports = model.extend({
  initialize: function() {
    var that = this
        defaults = this.default;

    var geo = window.navigator && window.navigator.geolocation;
    if(false && geo && typeof geo.getCurrentPosition == "function") {
      geo.getCurrentPosition(function(geoposition) {
        that.set(that.parse(geoposition));
      }, function(){
        that.set(that.parse(defaults));
      }, {timeout: 4000});
    } else {
      _.defer(function() {
        that.set(that.parse(defaults))
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
