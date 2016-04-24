import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Plans = new Mongo.Collection('plans');

Meteor.methods({
  'plans.insert'(name) {
    check(name, String);
    /*
   // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	*/
    Plans.insert({
      name: name,
      createdAt: new Date(),
      //owner: Meteor.userId(),
      //username: Meteor.user().username,
    });
  },
  'plans.delete'(id) {
  	Plans.remove(id);
  },
  'plans.update'(id, name) {
  	var plan = {
      name: name,
    };
    Plans.update( id, {$set: plan} );
  },
});