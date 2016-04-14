import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.plans.helpers({
  plans() {
    return Plans.find({}, { sort: { createdAt: -1 } });
  },
});

Template.plans.events({
  'submit .new-plan'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.planName.value;

    // Insert a task into the collection
    Plans.insert({
      name: name,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.planName.value = '';
  },
  'click .delete'() {
     Plans.remove(this._id);
  },
});


