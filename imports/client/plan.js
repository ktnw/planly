import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js';

Template.plan.onCreated(function() {
	Meteor.subscribe('plans');
});

Template.plan.helpers({
  // return the plan itself
  plan: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: planId });
    return plan;
  },
});


Template.plan.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.taskText.value;
    const planId = FlowRouter.getParam("id");

    // Insert a task into the collection
    Meteor.call('tasks.insert', planId, text);

    // Clear form
    target.taskText.value = '';
  },
  'submit .get-token'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const secretToken = target.secretToken.value;
    const planId = FlowRouter.getParam("id");
    console.log('Refreshing subscription with planId=',planId,' secretToken=',secretToken);
    Meteor.subscribe('aPlan', planId, secretToken);
    // Clear form
    target.secretToken.value = '';
  },
});

