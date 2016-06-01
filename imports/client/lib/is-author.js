/*
function isAuthor() {
	var planId = FlowRouter.getParam("id");
	var plan = Plans.findOne({ _id: planId });
	console.log("isAuthor function:", plan._id);
	if ( plan.authorId == Meteor.userId() ) {
		return true;
	} else {
		return false;
	}
  }
  */