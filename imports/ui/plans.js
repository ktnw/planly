import { Template } from 'meteor/templating';

import { Plans } from '../api/plans.js'

Template.plans.helpers({
  plans() {
    return Plans.find({});
  },
});


