import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Plans } from '../../api/plans.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Plans.find().count() === 0) {
  	console.log("Loading fixtures...");
  	let timestamp = (new Date()).getTime();
  	let tasks = [];

    const data = [
      {
        "name": "Plan A",
        "tasks": tasks,
      },
      {
        "name": "Plan B",
        "tasks": tasks,
      },
      {
        "name": "Empty Plan",
        "tasks": tasks,
      },
    ];

    data.forEach((plan) => {
      const planId = Plans.insert({
        name: plan.name,
        createdAt: new Date(timestamp += 1),
        tasks,
      });

    });

    tasks = [
    	{ "_id": Random.id(), "text": "Hello World!", "createdAt": new Date(timestamp += 1) },
    ];

    tasks.forEach((task) => {
    	Plans.update( { "name" : "Plan A" }, { $push: { "tasks": task } } );
    });

    tasks = [
        { "_id": Random.id(), "text": "Show Nicola Tesla my newest Lion battery", "createdAt": new Date(timestamp += 1) },
        { "_id": Random.id(), "text": "Send a birthday card to Claude Shannon", "createdAt": new Date(timestamp += 1) },
        { "_id": Random.id(), "text": "Take Carl Friedrich Gauss out for a beer", "createdAt": new Date(timestamp += 1) },
    ];

    tasks.forEach((task) => {
    	Plans.update( { "name" : "Plan B" }, { $push: { "tasks": task } } );
    });
  };
});
