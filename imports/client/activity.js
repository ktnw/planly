import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.activity.onCreated(function() {
	Meteor.subscribe('my-plans');
	Meteor.subscribe('other-plans');
});

Template.activity.helpers({
  plans() {
    return Plans.find( { }, { sort: { createdAt: -1 } });  //need to change this into ordering "by access date"
  },
});