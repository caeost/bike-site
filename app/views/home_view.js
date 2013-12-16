var View     = require('./view')
  , template = require('./templates/home')

module.exports = View.extend({
    initialize: function() {
      var that = this;
      if(this.collection) {
        this.listenTo(this.collection, "sync", function() {
          that.render();
        });
      }
      if(this.model) {
        this.listenTo(this.model, "change:nopoll", function() {
          that.render();
        });
      }
    },
    events: {"click .reenable" : "reenable" },
    reenable: function() {
      if(this.model) {
        this.model.startChecking();
      }
    },
    id: 'home-view',
    template: template,
    getRenderData: function() {
      return {
        models: this.collection && this.collection.models && this.collection.models.length,
        polling: this.model && !this.model.get("nopoll")
      };
    }
})
