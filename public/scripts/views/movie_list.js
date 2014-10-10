var Movie = Backbone.Marionette.ItemView.extend({
	template: '#movies',
	events: {
		'click': 'showVideo',
		'click': 'test'
	},
	showVideo: function(){
		this.trigger('show:video', this);
	},
	test: function(){
		console.log(this.model.get('test'));
	}
});

var Movies = Backbone.Marionette.CollectionView.extend({
	childView: Movie,
	className: ''
});