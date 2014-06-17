Template.main.currentGoal = function () {
	return !Session.equals('currentGoal', null);
};

Template.goalCreator.events({
	'click #start' : function(e, template) {
		e.preventDefault();

		var goal = {}

		goal.name = template.find('#goal-name').value;
		goal.startDate = new Date();
		goal.length = parseInt(template.find('#goal-period').value);

		Meteor.call('goal', goal, function(error, id) {
			Router.go('goalCalendar', {_id: id});
		});
	}
});

Template.goalCalendar.events({
	'click .day': function(e, template) {
		//if(Template.goalCalendar.getDate(this.date) === new Date().getDate()) {
			Meteor.call('dayComplete', Router.current().params._id, this.id,  function(error, affectedDocs) {
			  if (error) {
			    console.log(error.message);
			  } else {
			    // Do whatever
  			}
  		});
		//} else {

		//}
	}
});

Template.goalCalendar.goal = function() {
	return Goals.findOne({_id : Session.get('currentGoal')});
};

Template.goalCalendar.getDate = function(date) {
	return date.getDate();
};

Template.goalCalendar.daysLeft = function(length, days) {
	days = days.reduce(function(prev, curr, i){
		if (curr.completed === true) {
			return prev + 1;
		}
	}, 0);

	if(days === undefined) {
		days = 0;
	}
	
	return length - days;
};