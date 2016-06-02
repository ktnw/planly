isPlanAuthor = function(authorId) {
	if ( authorId == Meteor.userId() ) {
		return true;
	} else {
		return false;
	}
  };
