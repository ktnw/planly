import { Meteor } from 'meteor/meteor';
import { Plans } from '../../api/plans.js';
import { Tasks } from '../../api/tasks.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Plans.find().count() === 0) {
    const data = [
      {
        name: 'Plan A',
        items: [
          'Hello World!',
        ],
      },
      {
        name: 'Plan B',
        items: [
          'Walk the dog',
          'Wash the dishes',
          'Mow the grass',
          'Meet Carl Friedrich Gauss for a beer',
        ],
      },
      {
        name: 'Empty plan',
        items: [
        ],
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((plan) => {
      const planId = Plans.insert({
        name: plan.name,
        createdAt: new Date(),
      });

      plan.items.forEach((text) => {
        Tasks.insert({
          planId,
          text,
          createdAt: new Date(timestamp),
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
