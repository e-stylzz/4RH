Template.register.events({
  "submit .form-signup": function(event){
    var email = trimInput(event.target.email.value);
    var password = trimInput(event.target.password.value);
    var password2 = trimInput(event.target.password2.value);
    var first_name = trimInput(event.target.first_name.value);
    var last_name = trimInput(event.target.last_name.value);

    if(isNotEmpty(email) &&
      isNotEmpty(password) &&
      isNotEmpty(first_name) &&
      isNotEmpty(last_name) &&
      areValidPasswords(password, password2)){

      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          first_name: first_name,
          last_name: last_name
        }
      }, function(err){
        if(err) {
          FlashMessages.sendError('There was an error with registration');
        } else {
          FlashMessages.sendSuccess('Account created!  You are now logged in');
          Router.go('/dashboard');
        }
      });

    }
    // Prevent Submit
    return false;
  }
});

// Validation Rules

//Trim Helper
var trimInput = function(val){
  return val.replace(/^\s*|\s*$/g, "");
};

isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  FlashMessages.sendError("Please fill in all fields");
  return false;
};

isValidPassword = function(password) {
  if (password.length < 6 ) {
    FlashMessages.sendError("Password must be at least 6 characters");
    return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    FlashMessages.sendError("Passwords do not match");
    return false;
  }
  return true;
};
