import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../imports/ui/plans.js';
//import '../../imports/ui/plan.js';
import '../../imports/ui/tasks.js';

FlowRouter.route('/plans', {
  name: 'Plans.show',
  action() {
  	console.log('Router action for path /plans');
    BlazeLayout.render('mainTemplate', { main: "plans" });
  },
});

FlowRouter.route('/plans/:id', {
  name: 'Plan.show',
  action(params, queryParams) {
  	console.log('Router action for path /plans/:id');
  	console.log('Params:', params);
  	console.log('queryParams:', queryParams);
    BlazeLayout.render('mainTemplate', { main: "tasks" });
  },
});

// this won't be used, itreturns all tasks regardless of the plan : 
/*
FlowRouter.route('/tasks', {
  name: 'Tasks.show',
  action() {
  	console.log('Router action for path /tasks');
    BlazeLayout.render('mainTemplate', { main: "tasks" });
  },
});

FlowRouter.route('/about', {
    action: function(params, queryParams) {
    	console.log('Router action for path /about');
        BlazeLayout.render('mainTemplate', { main: "about" });
    }
});
*/