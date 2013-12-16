#A site about bike parking
Never used brunch or heroku before but this sure is exciting!  

Website displays nearby legit bike parking spaces.
##Documentation:
Shows nearby bike parking places to your current location. Your location is shown as a green marker, parking places are red.  


If none can be found it displays an error message (The API basically only has data for sf is one common situation). The map does not update as you drag it around, but would be nice to do in future.

The site polls your location currently every 30 seconds to find new and closer parking. The theory being that you're not going to go to far to find parking, you just want to see whats around you, and it'll update as you bike. Might be worthwhile to make it check more often. A later improvement would be for it to check whether you are in roughly the same area by comparing bounding boxes and determining whether it really has to fetch from the API again.

Moving the map manually disables this polling until you reenable it.

##Uses:
[Brunch](http://brunch.io) - [Banana Pancakes](https://github.com/Anaphase/brunch-banana-pancakes) skeleton which has: [Bootstrap](http://getbootstrap.com/), [Backbone](http://backbonejs.org/), [Handlebars](http://handlebarsjs.com/), and [LESS](http://lesscss.org/) / [SASS](http://sass-lang.com/).
