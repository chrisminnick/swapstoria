import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Things } from '../api/things.js';

import Thing from './Thing.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('things.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }
    renderThings() {
        let filteredThings = this.props.things;
        if (this.state.hideCompleted) {
            filteredThings = filteredThings.filter(thing => !thing.checked);
        }
        return filteredThings.map((thing) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = thing.owner === currentUserId;

            return (
                <Thing
                    key={thing._id}
                    thing={thing}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Thing List ({this.props.incompleteCount})</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Checked Things
                    </label>
                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                        <form className="new-thing" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new things"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderThings()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('things');

    return {
        things: Things.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Things.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);