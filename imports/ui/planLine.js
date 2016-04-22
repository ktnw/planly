import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.planLine.onCreated(function(){
  this.editPlanId = new ReactiveVar();
});

Template.planLine.helpers({
  editPlanId: function() {
    return Template.instance().editPlanId.get();
  },
});


Template.planLine.events({
  'click .edit'(event, template){
    template.editPlanId.set(this._id);
  },
  'click .delete'() {
     Plans.remove(this._id);
  },

  'click .cancel'(event, template) {
  	event.preventDefault();
  	template.editPlanId.set(null);
  },
  'submit .editPlan'(event, template) {
    event.preventDefault();
    const name = event.target.editPlanName.value;
    var editPlan = {
      name: name,
    };
    Plans.update( this._id, {$set: editPlan});
    template.editPlanId.set(null);
  },
  'keypress input'(event, template){
    if(event.keyCode === 27){
      template.editPlanId.set(null);
    }
  },
});