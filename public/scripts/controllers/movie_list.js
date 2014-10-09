$.when(fetchedMovies).done(function(data){
	this.collection = data;
	var moviesView = new Movies({collection: this.collection});
	App.mainRegion.show(moviesView);
});