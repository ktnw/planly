import { Meteor } from 'meteor/meteor';

// uncomment to initialize empty database with testing data:
// import '../imports/startup/server/fixtures.js'

import '../imports/api/plans.js';

Meteor.startup(() => {
  smtp = {
    server:   'localhost',
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  console.log("MAIL_URL: ", process.env.MAIL_URL);
  
});
