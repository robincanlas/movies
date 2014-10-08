var movie = Backbone.Marionette.ItemView.extend({
	template: '#movies',
	tagName: 'li ',
	className: '',
	events: {
		'click': 'showVideo'
	},
	showVideo: function(){
		this.trigger('show:video', this);
	}
});

var movies = Backbone.Marionette.CollectionView.extend({
	childView: movie,
	tagName: 'ul',
	className: 'row'
});