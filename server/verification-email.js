//Accounts.emailTemplates.siteName = "Planly.io";
//Accounts.emailTemplates.from     = "Planly.io <admin@planly.io>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Planly.io Account Verification";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@planly.io",
        emailBody      = `To verify your email address (${emailAddress}) click the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
