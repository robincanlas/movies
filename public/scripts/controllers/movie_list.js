$.when(fetchedCollection).done(function(data){
	this.collection = data;
	var moviesView = new movies({collection: this.collection});
	App.mainRegion.show(moviesView);
});

this.listenTo(moviesView, 'childview:show:video', function(){
	console.log('trigger');
});