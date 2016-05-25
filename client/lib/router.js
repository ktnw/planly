import { Meteor } from 'meteor/meteor';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../imports/ui/plans.js';
import '../../imports/ui/planLines.js';
import '../../imports/ui/plan.js';
import '../../imports/ui/taskLines.js';
import '../../imports/ui/signup.js';



FlowRouter.route('/', {
  name: 'Home.show',
  action() {
  	console.log('Router action for path: ', FlowRouter.current().path);
    BlazeLayout.render('main', { app: "home" });
  },
});

FlowRouter.route('/plans', {
  name: 'Plans.show',
  action() {
  	console.log('Router action for path: ', FlowRouter.current().path);
    BlazeLayout.render('main', { app: "plans" });
  },
});

FlowRouter.route('/plans/:id', {
  name: 'Plan.show',
  action(params) {
  	console.log('Router action for path: ', FlowRouter.current().path);
    BlazeLayout.render('main', { app: "plan" });
  },
});

FlowRouter.route('/profile', {
  name: "Profile.show",
  action() {
  	console.log('Router action for path: ', FlowRouter.current().path);
    BlazeLayout.render('main', { app: "profile" });
  },
});

FlowRouter.route('/logout', {
  name: "Logout",
  action() {
  	console.log('Router action for path: ', FlowRouter.current().path);
    Meteor.logout(function() {
      FlowRouter.go('/');
    });
  },
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        //Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        FlowRouter.go( '/' );
        //Bert.alert( 'Email verified! Thanks!', 'success' );
        console.log('Email verified! Thanks!');
      }
    });
  }
});