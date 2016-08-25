import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';

export const Plans = new Mongo.Collection('plans');

if (Meteor.isServer) {
  Meteor.publish('my-plans', function plansPublication() {
    return Plans.find( { authorId: this.userId } );
  });
  Meteor.publish('other-plans', function planPublication() {
    return Plans.find( { accessList: [this.userId] } );
  });
}

Meteor.methods({
  'plans.access'( planId, secretToken ) {
  	var token = secretToken; // <- bcrypt the secretToken here to be able to compare the bcrypted token in the DB
    // check that the plan exists and if it does, check that the secretToken provided matches what's in the database
  	var plan = Plans.findOne(planId);
  	if ( plan && plan.token == token ) {
  		Plans.update( { "_id": planId }, { $addToSet: {accessList: Meteor.userId() } } );
    } else {
    	throw new Meteor.Error('not-authorized');
    }
  },
  'plans.insert'(name) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    check(name, String);
    Plans.insert({
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
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
        updatedAt: new Date(),
      };
      Plans.update( planId, {$set: plan} );
    }
  },
  'tasks.insert'(planId, from, to, text, responsible) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow insert
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  const taskId = Random.id();
	  Plans.update( { "_id" : planId }, { $push: { "tasks": { _id: taskId, "taskFrom": new Date(from), "taskTo": new Date(to), "text": text, "taskResponsible": responsible, "status": "Not started", "createdAt": new Date() } }, $set: { "updatedAt": new Date() } } );
	}
  },
  'tasks.update'(planId, taskId, from, to, text, responsible) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow update
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  Plans.update({ "_id" : planId, "tasks._id": taskId }, { $set: {"tasks.$.taskFrom": new Date(from), "tasks.$.taskTo": new Date(to), "tasks.$.text": text, "tasks.$.taskResponsible": responsible, "updatedAt": new Date() } } );
  	}
  },
  'tasks.delete'(planId, taskId) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId) {
  	  // If the current user is not the author, don't allow delete
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  Plans.update({ "_id" : planId }, {$pull : { "tasks" : { "_id": taskId } }, $set : { "updatedAt": new Date() } } );
  	}
  },
  'tasks.toggle-status'(planId, taskId, currentStatus) {
  	const plan = Plans.findOne(planId);
  	if (plan.authorId !== this.userId && !(plan.accessList.indexOf(this.userId) >= 0)) {
  	  // If the current user is not the author, or is not in the accessList, don't allow toggling status
  	  throw new Meteor.Error('not-authorized');
  	} else {
  	  let newStatus;
  	  switch (currentStatus) {
  	  	case "Not started": 
  	  	  newStatus = "In progress";
  	  	  break;
  	  	case "In progress":
  	  	  newStatus = "Completed";
  	  	  break;
  	  	case "Completed":
  	  	  newStatus = "Not started";
  	  	  break;
  	  }
  	  Plans.update({ "_id" : planId, "tasks._id": taskId }, { $set: {"tasks.$.status": newStatus, "tasks.$.statusUpdatedBy": this.userId, "updatedAt": new Date() } } );
  	}
  },
});