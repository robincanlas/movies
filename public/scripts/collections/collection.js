//movie collection
var moviesCollection = Parse.Collection.extend({
	model: movie
});

var query = new Parse.Query(movie);
query.descending('createdAt');
var movies = query.collection();
var defer = $.Deferred();
movies.fetch({
	success: function(data){
		defer.resolve(data);
	}
});

var fetchedCollection = defer.promise();

//information collection
var informationCollection = Parse.Collection.extend({
	model: information
});

var query = new Parse.Query(information);
query.descending('createdAt');
var informations = query.collection();
informations.fetch();
// console.log(informations);