function isAuthor() {
	var planId = FlowRouter.getParam("id");
	var plan = Plans.findOne({ _id: planId });
	if ( plan.authorId == Meteor.userId() ) {
		return true
	} else {
		return false
	}
  }