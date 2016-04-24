import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(id, text) {
  	check(text, String);
    /*
   // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	*/
    Tasks.insert({
      planId: id,
      text: text,
      createdAt: new Date(),
      //owner: Meteor.userId(),
      //username: Meteor.user().username,
    });
  },
  'tasks.delete'(id) {
  	Tasks.remove(id);
  },
  'tasks.update'(id, text) {
  	var task = {
      text: text,
    };
    Tasks.update( id, {$set: task} );
  },
 });

