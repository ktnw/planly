import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.planLines.onCreated(function(){
  this.editPlanId = new ReactiveVar();
});

Template.planLines.helpers({
  editPlanId: function() {
    return Template.instance().editPlanId.get();
  },
  isAuthor: function() {
  	console.log("isAuthor function (planLines):", this._id);
  	if (this.authorId == Meteor.userId()) {
  		return true;
  	} else {
  		return false;
  	}
  },
});


Template.planLines.events({
  'click .edit'(event, template){
    template.editPlanId.set(this._id);
  },
  'click .delete'() {
     Meteor.call('plans.delete', this._id);
  },

  'click .cancel'(event, template) {
  	event.preventDefault();
  	template.editPlanId.set(null);
  },
  'submit .editPlan'(event, template) {
    event.preventDefault();
    const name = event.target.editPlanName.value;
    Meteor.call('plans.update', this._id, name)
    template.editPlanId.set(null);
  },
  'keypress input'(event, template){
    if(event.keyCode === 27){
      template.editPlanId.set(null);
    }
  },
});