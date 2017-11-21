import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';

/**
* Templates
*/
Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    }
});

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var name = Meteor.user().profile.name;
      else
        var name = 'Anonymous';
        //var name = Meteor.users.findOne({_id: uniqueID}).usename;
      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});


Accounts.onCreateUser(function (options, user) {
    user.username = user.profile.name;
    return user;
});

Meteor.subscribe('userData');

