var App = new Marionette.Application();

var home = function(){
	var homeView = new HomeLayout();
	App.mainRegion.show(homeView);	

	// CINEMA REGION
	$.when(cinemaMoviesHome).done(function(){
		var cinemaCollection = cinemaMoviesHome;
		var cinemaView = new Cinemas({collection: cinemaCollection});
		homeView.cinemaRegion.show(cinemaView);
	});

	// FEATURED REGION
	$.when(featuredMoviesHome).done(function(){
		var featuredCollection = featuredMoviesHome;
		var featuredView = new Featureds({collection: featuredCollection});
		homeView.featuredRegion.show(featuredView);
	});
}

App.addRegions({
	headerRegion: '#header-region',
	sidebarRegion: '#sidebar-region',
	mainRegion: '#main-region'
});

// HOME
App.addInitializer(function(){	
	home();
});

// SEARCH
App.addInitializer(function(){	
	var searchView = new Search();
	App.headerRegion.show(searchView);
});

// SIDEBAR
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
	
	this.listenTo(this.sidebarView, 'childview:show:home', function(){
		home();
	});

	this.listenTo(this.sidebarView, 'childview:show:movies', function(){
		$.when(movies).done(function(){
			this.collection = movies;
			var moviesView = new Movies({collection: this.collection});
			App.mainRegion.show(moviesView);
		});
	});

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
			newMovieList.fetch();
			
			$.when(newMovieList).done(function(){
				var collection = newMovieList;
				var moviesView = new Movies({collection: collection});
				App.mainRegion.show(moviesView);
			});
		});

	});

	this.listenTo(this.sidebarView, 'childview:show:cinema', function(){	
		$.when(cinemaMoviesHome).done(function(){
			var collection = cinemaMoviesHome;
			var moviesView = new Movies({collection: collection});
			App.mainRegion.show(moviesView);
		});
	});

	this.listenTo(this.sidebarView, 'childview:show:featured', function(){		
		$.when(featuredMoviesHome).done(function(){
			var collection = featuredMoviesHome;
			var moviesView = new Movies({collection: collection});
			App.mainRegion.show(moviesView);
		});
	});

	this.listenTo(this.sidebarView, 'childview:show:years', function(){
		var yearToday = String(new Date()).split(' ')[3];
		var years = [];

		for(var i = 1980; i <= 2014; i++){
			var x = JSON.stringify({year: i});			
			var y = jQuery.parseJSON(x);
			years.push(y);
		};

		var yearsCollection = new Years(years);
		var yearsView = new YearsView({collection: yearsCollection});
		App.mainRegion.show(yearsView);

		this.listenTo(yearsView, 'childview:filter:by:year', function(iv){
			var moviePerYear = new Parse.Query(movie)
				.descending('createdAt')
				.include('test');
			var newList = moviePerYear.collection();
			var defer = $.Deferred();
			newList.fetch({
				success: function(data){
					defer.resolve(data);
				}
			});

			var yearSelected = iv.model.get('year');
			var temp = [];			
			var fetchedMovies = defer.promise();
			$.when(fetchedMovies).done(function(data){
				this.collection = data;
				data.map(function(model){
					var info = model.get('test');
					var movieYear = info.get('year');
					if( yearSelected === movieYear ) {
						temp.push(model);
					}
				});
				this.collection.reset(temp);
				var moviesView = new Movies({collection: this.collection});
				App.mainRegion.show(moviesView);
			});
		});
	});
});

App.addInitializer(function(){	

});

App.on('start', function(){});

App.start();