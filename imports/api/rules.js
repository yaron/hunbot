import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rules = new Mongo.Collection('rules');

Meteor.methods({
  'rules.insert'(text, response) {
    check(text, String);
    check(response, String);

    Rules.insert({
      text,
      response,
      createdAt: new Date()
    });
  },

  'rules.delete'(id) {
    check(id, String);
    Rules.remove({_id: id});
  }
});
