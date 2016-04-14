import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js';
import { Tasks } from '../api/tasks.js';

Template.tasks.helpers({
  plan: function() {
    var planId = FlowRouter.getParam("id");
    var plan = Plans.findOne({ _id: planId }) || {};
    return plan;
  },
  tasks: function() {
  	var planId = FlowRouter.getParam("id");
  	console.log('inside tasks function. planId: ', planId);
  	tasks = Tasks.find({ planId: planId }) || {};
  	console.log('inside tasks function. tasks.count(): ', tasks.count());
    return tasks;
  }
});
