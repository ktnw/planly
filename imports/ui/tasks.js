import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js';
import { Tasks } from '../api/tasks.js';

Template.tasks.helpers({
  // return the plan itself
  plan: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: planId }) || {};
    return plan;
  },
  // return the tasks of the plan
  tasks: function() {
  	var planId = FlowRouter.getParam("id");
  	console.log('inside tasks function. planId: ', planId);
  	tasks = Tasks.find({ planId: planId }) || {};
  	console.log('inside tasks function. tasks.count(): ', tasks.count());
    return tasks;
  },
});


Template.tasks.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.taskText.value;
    const planId = FlowRouter.getParam("id");

    // Insert a task into the collection
    Tasks.insert({
      planId: planId,
      text: text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.taskText.value = '';
  },
  'click .delete'() {
     Tasks.remove(this._id);
  },
});
