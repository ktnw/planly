import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';

export const Plans = new Mongo.Collection('plans');

if (Meteor.isServer) {
  Meteor.publish('plans', function plansPublication() {
    return Plans.find( { authorId: this.userId } );
  });
  Meteor.publish('aPlan', function planPublication(planId, secretToken) {
  	//check(groupId, String);
  	console.log("Received subscription for planId=", planId, " and token=", secretToken);
  	var token = secretToken; //here we will have to eventually bcrypt the secretToken
    return Plans.find( { "_id": planId, "token": token } );
  });
}

Meteor.methods({
  'plans.insert'(name) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    check(name, String);
    Plans.insert({
      name: name,
      createdAt: new Date(),
      tasks : [],
      authorId: Meteor.userId(),
    });
  },
  'plans.delete'(planId) {
  	const plan = Plans.findOne(planId);
    if (plan.authorId !== this.userId) {
      // If the current user is not the author, don't allow delete
      throw new Meteor.Error('not-authorized');
    } else {
  	  Plans.remove(planId);
    }
  },
  'plans.update'(planId, name) {
  	var plan = Plans.findOne(planId);
    if (plan.authorId !== this.userId) {
      // If the current user is not the author, don't allow update
      throw new Meteor.Error('not-authorized');
    } else {
  	  plan = {
        name: name,
      };
      Plans.update( planId, {$set: plan} );
    }
  },
  'tasks.insert'(planId, text) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow insert
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  const taskId = Random.id();
	  Plans.update( { "_id" : planId }, { $push: { "tasks": { _id: taskId, "text": text, "createdAt": new Date() } } } );
	}
  },
  'tasks.update'(planId, taskId, text) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow update
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  Plans.update({ "_id" : planId, "tasks._id": taskId }, { $set: {"tasks.$.text": text } } );
  	}
  },
  'tasks.delete'(planId, taskId) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow delete
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  Plans.update({ "_id" : planId }, {$pull : { "tasks" : { "_id": taskId } } } );
  	}
  },
});