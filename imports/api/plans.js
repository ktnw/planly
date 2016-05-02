import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';

export const Plans = new Mongo.Collection('plans');

if (Meteor.isServer) {
  Meteor.publish('plans', function plansPublication() {
    return Plans.find( { authorId: this.userId } );
  });
}

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
      tasks : [],
      authorId: Meteor.userId(),
    });
  },
  'plans.delete'(planId) {
  	Plans.remove(planId);
  },
  'plans.update'(planId, name) {
  	var plan = {
      name: name,
    };
    Plans.update( planId, {$set: plan} );
  },
  'tasks.insert'(planId, text) {
  	const taskId = Random.id();
	Plans.update( { "_id" : planId }, { $push: { "tasks": { _id: taskId, "text": text, "createdAt": new Date() } } } );
  },
  'tasks.update'(planId, taskId, text) {
  	Plans.update({ "_id" : planId, "tasks._id": taskId }, { $set: {"tasks.$.text": text } } );
  },
  'tasks.delete'(planId, taskId) {
  	Plans.update({ "_id" : planId }, {$pull : { "tasks" : { "_id": taskId } } } );
  },
});