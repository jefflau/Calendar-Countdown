Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('goals')]; 
	}
});

Router.map(function(){
	this.route('main', {
		path: '/'
	});
	this.route('goalCalendar', { 
		path: '/goal/:_id',
		data: function() { return Goals.findOne(this.params._id); }
	});
	this.route('goalCreator', {
		path: '/create'
	});
});

Router.onBeforeAction('loading');