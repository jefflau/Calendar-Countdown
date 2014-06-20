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

		Meteor.call('createGoal', goal, function(error, id) {
			Router.go('goalCalendar', {_id: id});
		});
	}
});

Template.goalCalendar.events({
	'click .day': function(e, template) {
		//commented out the validation so calendar actually does something for people to play around!
		//if(Template.goalCalendar.getDate(this.date) === new Date().getDate()) {
			Meteor.call('completeDay', Router.current().params._id, this.id,  function(error, affectedDocs) {
			  if (error) {
			    console.log(error.message);
			  }
  		});
	}
});

Template.goalCalendar.getDate = function(date) {
	return date.getDate();
};

Template.goalCalendar.daysLeft = function(length) {
	var days = Goals.findOne({_id : Router.current().params._id}).days;
	var completed = 0;

	days.map(function(ele){
		if(ele.completed) {
			completed++;
		}
	})

	return length - completed;
};