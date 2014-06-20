Meteor.publish('singleGoal', function(id) {
  return Goals.find({_id: id});
});