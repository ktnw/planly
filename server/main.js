import { Meteor } from 'meteor/meteor';

// uncomment to initialize empty database with testing data:
// import '../imports/startup/server/fixtures.js'

import '../imports/api/plans.js';
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
