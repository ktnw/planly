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
  }
});

Template.main.events({
  'click .register'(event, template) {
  	template.account.set("register");
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