import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js';
import { Tasks } from '../api/tasks.js';

Template.tasks.helpers({
  plan: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: new Meteor.Collection.ObjectID(planId) }) || {};
    return plan;
  },
  tasks: function() {
  	var planId = FlowRouter.getParam("id");
  	console.log('inside tasks function. planId: ', planId);
  	tasks = Tasks.find({ planId: new Meteor.Collection.ObjectID(planId) }) || {};
  	console.log('inside tasks function. tasks.count(): ', tasks.count());
    return tasks;
  }
});

/*
Template.tasks.helpers({
  tasks: [
    { name: 'This is task 1', plan_id: 1 },
    { name: 'This is task 2', plan_id: 1 },
    { name: 'This is task 3', plan_id: 1 },
  ],
});
*/

console.log('inside imports/ui/tasks.js');

/*  as long as we have the same template in templates.html this needs to stay 
    commented out otherwise Meteor complains about duplicate template 'tasks'
    import './tasks.html';
*/