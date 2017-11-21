import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  Messages = new Meteor.Collection('messages');
});
