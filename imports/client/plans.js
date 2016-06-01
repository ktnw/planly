import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.plans.onCreated(function() {
	Meteor.subscribe('my-plans');
	Meteor.subscribe('other-plans');
});

Template.plans.helpers({
  myPlan() {
    return Plans.find( { "authorId": Meteor.userId() }, { sort: { createdAt: -1 } });
  },
  otherPlan() {
  	return Plans.find( { "authorId": { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } } )
  }
});

Template.plans.events({
  'submit .new-plan'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.planName.value;

    // Insert new Plan into the collection
    Meteor.call('plans.insert', name);

    // Clear form
    target.planName.value = '';
  },
});


