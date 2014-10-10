var HomeLayout = Backbone.Marionette.LayoutView.extend({
	template: '#home-layout',
	regions: {
		cinemaRegion: '#cinema-region',
		featuredRegion: '#featured-region'
	},
});

var Cinema = Backbone.Marionette.ItemView.extend({
	template: '#cinema',
	events: {
		'click': 'test'
	},
	test: function(){
		console.log(this.model.get('test'));
	}
});

var Cinemas = Backbone.Marionette.CollectionView.extend({
	childView: Cinema,
});

var Featured = Backbone.Marionette.ItemView.extend({
	template: '#featured',
});

var Featureds = Backbone.Marionette.CollectionView.extend({
	childView: Featured,
});