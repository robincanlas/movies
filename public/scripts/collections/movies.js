var moviesCollection = Parse.Collection.extend({
	model: movie
});

var query = new Parse.Query(movie)
	.descending('createdAt')
	.include('test');
var movies = query.collection();
movies.fetch();

// FEATURED
var featuredMoviesHome = new Parse.Query(movie)
	.descending('createdAt')
	.equalTo('cinema_id', 0)
	.include('test');
var featuredMoviesHome = featuredMoviesHome.collection();
featuredMoviesHome.fetch();

// CINEMA
var cinemaMoviesHome = new Parse.Query(movie)
	.descending('createdAt')
	.equalTo('cinema_id', 1)
	.include('test');
var cinemaMoviesHome = cinemaMoviesHome.collection();
cinemaMoviesHome.fetch();