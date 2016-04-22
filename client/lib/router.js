import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../imports/ui/plans.js';
import '../../imports/ui/tasks.js';
import '../../imports/ui/planLine.js';

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
