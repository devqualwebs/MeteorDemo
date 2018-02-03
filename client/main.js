if(Meteor.isClient) {
    Template.registration.events({
        'submit form': function (event) {
            event.preventDefault();
            var name = event.target.name.value;
            var email = event.target.email.value;
            var password = event.target.password.value;
            var repassword = event.target.repassword.value;
            if(name == "" || email == "" || password == "" || repassword == "")
            {
                alert("Please enter all required fields");
            }
            else if (password != repassword)
            {
                alert("Password and confirm password should match");
            }
            else
            {
                Accounts.createUser({
                    username: name,
                    email: email,
                    password: password
                });
            }
        }
    });

    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var email = event.target.email.value;
            var password = event.target.password.value;
            Meteor.loginWithPassword(email,password);
        }
    });

    Template.dashboard.events({
        'click .logout':function (event) {
            event.preventDefault();
            Meteor.logout();
        }
    });
}