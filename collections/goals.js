Goals = new Meteor.Collection('goals');

Goals.allow({
  update: function(){
  	return true
  },
  remove: function(){
  	return true
  }
});

Meteor.methods({
	goal: function(goal) {
		goal.startDate = new Date();
		goal.endDate = new Date(new Date().setDate(goal.startDate.getDate() + goal.length));
		goal.days = [];
		
		for(var i=0; i<goal.length; i++) {
			goal.days[i] = {}
			goal.days[i].date = new Date(new Date().setDate(goal.startDate.getDate() + i + 1));
			goal.days[i].completed = false;
			goal.days[i].id = i;
		}

		return Goals.insert(goal);
	},

	dayComplete: function(goalId, day) {
		var field = 'days.'+day+'.completed';
		Goals.update({_id: goalId, "days.id": day}, {
			$set: { "days.$.completed" : true } 
		});
	}
});