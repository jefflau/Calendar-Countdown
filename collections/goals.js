Goals = new Meteor.Collection('goals');

Goals.allow({
  update: function(){
  	return true
  },
  remove: function(){
  	return true
  }
});