var App = new Marionette.Application();

App.addRegions({
	headerRegion: '#header-region',
	sidebarRegion: '#sidebar-region',
	mainRegion: '#main-region'
});

App.addInitializer(function(){	
	var searchView = new search();
	App.headerRegion.show(searchView);

	var sidebarView = new sidebar();
	App.sidebarRegion.show(sidebarView);

});

App.on('start', function() {	
	// console.log('app start');
});

App.start();