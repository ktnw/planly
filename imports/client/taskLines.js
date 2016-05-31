import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'


Template.taskLines.onCreated(function(){
  this.editTaskId = new ReactiveVar();
});

Template.taskLines.helpers({
  editTaskId: function() {
    return Template.instance().editTaskId.get();
  },
});

Template.taskLines.events({
  'click .edit'(event, template){
    template.editTaskId.set(this._id);
  },
  'click .delete'() {
  	const planId = FlowRouter.getParam("id"); 
    Meteor.call('tasks.delete', planId, this._id);
  },
  'click .cancel'(event, template) {
  	event.preventDefault();
  	template.editTaskId.set(null);
  },
  'submit .editTask'(event, template) {
    event.preventDefault();
    const planId = FlowRouter.getParam("id"); 
    const text = event.target.editTaskText.value;
    Meteor.call('tasks.update', planId, this._id, text);
    template.editTaskId.set(null);
  },
  'keypress input'(event, template){
    if(event.keyCode === 27){
      template.editTaskId.set(null);
    }
  },
  'click .toggle-status'(event, template) {
  	const planId = FlowRouter.getParam("id"); 
  	Meteor.call('tasks.toggle-status', planId, this._id, this.status);
  }
});
