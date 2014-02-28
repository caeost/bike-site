var collection = require("./collection");

module.exports = collection.extend({
  initialize: function(models, options) {
    var location = this.location = options.location;
    this.map = options.map;

    this._idLookup = 0;
    if(location) {
      this.listenTo(location, "change:coords", function(model, coords) {
        this._locationLookup = this.locationHasher(coords);
      });
    }
  },
  comparator: function(a, b) {
    var lookup = this._locationLookup;
    return Math.abs(a.locationHash - lookup) - Math.abs(b.locationHash - lookup);
  },
  url: function() {
    var boxSearch;
    if(this.location) {
      boxSearch =  "within_box(coordinates," + this.location.get("box").join(",") + ")";
    }
    return "https://data.sfgov.org/resource/w969-5mn4.json?status=complete&$where=spaces > 0" + (boxSearch ? " AND " + boxSearch : "" );
  },
  locationHasher: function(coords) {
    //rough hash
    return coords.latitude + coords.longitude;
  },
  //would prefer to do in model but model.parse is not called until after collection tries to access id
  parse: function(response) {
    var locationHasher = this.locationHasher,
        map = this.map,
        maps = google.maps;

    _.each(response, function(model) {
      var coords = model.coordinates;

      model.id = coords.latitude + "x" + coords.longitude;
      model.locationHash = locationHasher(coords);

      var marker = model.Marker = new maps.Marker({title: model.yr_inst, map: map});
      marker.setPosition(new maps.LatLng(coords.latitude, coords.longitude));
    });
    return response;
  }
});
