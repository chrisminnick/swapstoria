import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Things = new Mongo.Collection('things');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish things that are public or belong to the current user
    Meteor.publish('things', function thingsPublication() {
        return Things.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'things.insert'(text,quantity) {
        check(text, String);
        check(quantity, Number);
        // Make sure the user is logged in before inserting a thing
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Things.insert({
            text,quantity,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'things.remove'(thingId) {
        check(thingId, String);
        const thing = Things.findOne(thingId);
        if (thing.private && thing.owner !== this.userId) {
            // If the thing is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Things.remove(thingId);
    },
    'things.setChecked'(thingId, setChecked) {
        check(thingId, String);
        check(setChecked, Boolean);
        const thing = Things.findOne(thingId);
        if (thing.private && thing.owner !== this.userId) {
            // If the thing is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        Things.update(thingId, { $set: { checked: setChecked } });
    },
    'things.setPrivate'(thingId, setToPrivate) {
        check(thingId, String);
        check(setToPrivate, Boolean);

        const thing = Things.findOne(thingId);

        // Make sure only the thing owner can make a thing private
        if (thing.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Things.update(thingId, { $set: { private: setToPrivate } });
    },
});