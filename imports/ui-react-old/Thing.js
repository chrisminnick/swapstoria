import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Things } from '../api/things.js';

// Thing component - represents a single thing
export default class Thing extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('things.setChecked', this.props.thing._id, !this.props.thing.checked);
    }

    deleteThisThing() {
        Meteor.call('things.remove', this.props.thing._id);
    }
    togglePrivate() {
        Meteor.call('things.setPrivate', this.props.thing._id, ! this.props.thing.private);
    }
    render() {
        // Give things a different className when they are checked off,
        // so that we can style them nicely in CSS
        const thingClassName = classnames({
            checked: this.props.thing.checked,
            private: this.props.thing.private,
        });

        return (
            <li className={thingClassName}>
                <button className="delete" onClick={this.deleteThisThing.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.thing.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                { this.props.showPrivateButton ? (
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        { this.props.thing.private ? 'Private' : 'Public' }
                    </button>
                ) : ''}
                <span className="text">
                    <strong>{this.props.thing.username}</strong>: {this.props.thing.quantity} {this.props.thing.text}
                </span>
            </li>
        );
    }
}