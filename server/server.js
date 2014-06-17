Meteor.publish('goals', function() {
  return Goals.find();
});