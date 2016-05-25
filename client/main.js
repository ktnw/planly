import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.main.onCreated(function(){
  this.account = new ReactiveVar("login");
  this.errorMessage = new ReactiveVar();
});

Template.main.helpers({
  data: function() {
    return { "errorMessage": Template.instance().errorMessage.get() };
  },
  account: function() {
  	return Template.instance().account.get();
  },
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  authenticated: function() {
    return !!Meteor.user();
  },
  verified: function() {
  	return Meteor.user().emails[0].verified;
  }
});

Template.main.events({
  'click .signup'(event, template) {
  	template.account.set("signup");
  },
  'click .forgot-password'(event, template) {
  	template.account.set("forgot-password");
  },
  'click .login'(event, template) {
  	template.account.set("login");
  },
  'click .change-password'(event, template) {
  	template.account.set("change-password");
  },
  'click .resend-verification-email'(event, template) {
    Meteor.call( 'sendVerificationEmail', ( error, response ) => {
      if ( error ) {
        //Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        //Bert.alert( 'Verification sent to ${ email }!', 'success' );
        console.log("Verification sent to ", email, "!");
      }
    });
  },
  'submit .login-form'(event, template) {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;
      
    Meteor.loginWithPassword(email,password,function(err){
      if(err) {
      	template.errorMessage.set(err.reason);
      	console.log(err.reason);
      } else { console.log("Successfully logged in.") }
    });
    return false;
  },
});