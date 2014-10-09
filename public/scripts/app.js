var App = new Marionette.Application();

App.addRegions({
	headerRegion: '#header-region',
	sidebarRegion: '#sidebar-region',
	mainRegion: '#main-region'
});

App.addInitializer(function(){	
	var searchView = new Search();
	App.headerRegion.show(searchView);
});

App.addInitializer(function(){
	var sidebars = new Sidebars([
		{name: 'Home', data:'data-home', id:1},
		{name: 'Movies', data:'data-movies', id:2},
		{name: 'Genres', data:'data-genres', id:3},
		{name: 'Cinema', data:'data-cinema', id:4},
		{name: 'Featured', data:'data-featured', id:5},
		{name: 'Years', data:'data-years', id:6},
		{name: 'Countries', data:'data-countries', id:7},				
		{name: 'Languages', data:'data-languages', id:8},
	]);

	this.sidebarView = new Names({collection:sidebars});
	App.sidebarRegion.show(this.sidebarView);
});

App.addInitializer(function(){	
	var that = this;
	this.listenTo(this.sidebarView, 'childview:show:genres', function(){
		var genresCollection = new genres([
			{type: 'Action', data:'data-action', id:'1'},
			{type: 'Horror', data:'data-horror', id:'2'},
			{type: 'Sci-Fi', data:'data-comedy', id:'3'},
			{type: 'Thriller', data:'data-thriller',id:'4'},
			{type: 'Adventure', data:'data-adventure',id:'5'},
			{type: 'Animation', data:'data-animation',id:'6'},
			{type: 'Comedy', data:'data-sci-fi',id:'7'},				
			{type: 'War', data:'data-war',id:'8'},
		]);
		this.genreView = new Genres({collection: genresCollection});
		App.mainRegion.show(this.genreView);
		this.listenTo(this.genreView, 'childview:filter:by:genre', function(iv){
			var genre = iv.model.get('id');
			var newMovieQuery = new Parse.Query(movie);
			newMovieQuery.descending('createdAt');
			newMovieQuery.equalTo('category', +genre);
			var newMovieList = newMovieQuery.collection();
			var defer = $.Deferred();
			newMovieList.fetch({
				success: function(data){
					defer.resolve(data);
				}
			});

			var newFetchedMovies = defer.promise();
			
			$.when(newFetchedMovies).done(function(data){
				var collection = data;
				var moviesView = new Movies({collection: collection});
				App.mainRegion.show(moviesView);
			});
		});

	});

	this.listenTo(this.sidebarView, 'childview:show:cinema', function(){
		var cinemaMovieQuery = new Parse.Query(movie);
		cinemaMovieQuery.descending('createdAt');
		cinemaMovieQuery.equalTo('cinema_id', 1);
		var cinemaMovieList = cinemaMovieQuery.collection();
		var defer = $.Deferred();
		cinemaMovieList.fetch({
			success: function(data){
				defer.resolve(data);
			}
		});

		var cinemaMovies = defer.promise();
		
		$.when(cinemaMovies).done(function(data){
			var collection = data;
			var moviesView = new Movies({collection: collection});
			App.mainRegion.show(moviesView);
		});
	});

	this.listenTo(this.sidebarView, 'childview:show:featured', function(){
		var featuredMovieQuery = new Parse.Query(movie);
		featuredMovieQuery.descending('createdAt');
		featuredMovieQuery.equalTo('cinema_id', 0);
		var featuredMovieList = featuredMovieQuery.collection();
		var defer = $.Deferred();
		featuredMovieList.fetch({
			success: function(data){
				defer.resolve(data);
			}
		});

		var featuredMovies = defer.promise();
		
		$.when(featuredMovies).done(function(data){
			var collection = data;
			var moviesView = new Movies({collection: collection});
			App.mainRegion.show(moviesView);
		});
	});

	this.listenTo(this.sidebarView, 'childview:show:years', function(){
		var yearToday = String(new Date()).split(' ')[3];
		var years = [];

		for(var i = 1990; i <= 2014; i++){
			var x = JSON.stringify({year: i});			
			var y = jQuery.parseJSON(x);
			years.push(y);
		};

		var yearsCollection = new Years(years);
		var yearsView = new YearsView({collection: yearsCollection});
		App.mainRegion.show(yearsView);

		this.listenTo(yearsView, 'childview:filter:by:year', function(){
			var query = new Parse.Query(information);
			query.descending('createdAt');
			var informations = query.collection();
			var defer = $.Deferred();
			informations.fetch({
				success: function(data){
					defer.resolve(data);
				}
			});

			//MERGING INFO TO MOVIES COLLECTION
			var fetchedInformations = defer.promise();
			var infos = [];
			$.when(fetchedInformations).done(function(data){
				data.map(function(model){
					infos.push(model.attributes);
				});
			});
		});
	});
});

App.addInitializer(function(){	

});

App.on('start', function(){});

App.start();