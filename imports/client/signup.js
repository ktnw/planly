Template.signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
    
    let user = {
      email: template.find( '[name="emailAddress"]' ).value,
      password: template.find( '[name="password"]' ).value
    };

    Accounts.createUser( user, ( error ) => {
      if ( error ) {
        //Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        Meteor.call( 'sendVerificationEmail', ( error, response ) => {
          if ( error ) {
            //Bert.alert( error.reason, 'danger' );
            console.log(error.reason);
          } else {
            //Bert.alert( 'Welcome!', 'success' );
            console.log('All good! Check your mailbox to confirm your account!');
          }
        });
      }
    });
  }
});