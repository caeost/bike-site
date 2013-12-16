var application = require('application')

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    
    home: function() {
        $('.page-content').html(application.homeView.render().el)
    }
})
