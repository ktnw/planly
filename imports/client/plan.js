import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js';

Template.plan.onCreated(function() {
	Meteor.subscribe('my-plans');
	Meteor.subscribe('other-plans');
});

Template.plan.helpers({
  // return the plan itself
  plan: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: planId });
    return plan;
  },
  isAuthor: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: planId });
	return isPlanAuthor(plan.authorId);
  },
});


Template.plan.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const from = target.taskFrom.value;
    const to = target.taskTo.value;
    const text = target.taskText.value;
    const responsible = target.taskResponsible.value;
    const planId = FlowRouter.getParam("id");

    // Insert a task into the collection
    Meteor.call('tasks.insert', planId, from, to, text, responsible);
    
    // Clear form
    target.taskFrom.value = to;
    target.taskTo.value = '';
    target.taskText.value = '';
    target.taskResponsible.value='';
  },
  'submit .get-token'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const secretToken = target.secretToken.value;
    const planId = FlowRouter.getParam("id");

	Meteor.call('plans.access', planId, secretToken);   //to record the user in the accessList

    // Clear form
    target.secretToken.value = '';
  },
});

