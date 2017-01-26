import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rules } from '../api/rules.js';
import Rule from './Rule.jsx';
import ReactDOM from 'react-dom';

class App extends Component {
  renderRules() {
    return this.props.rules.map((rule) => (
      <Rule key={rule._id} rule={rule} />
    ));
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const response = ReactDOM.findDOMNode(this.refs.responseInput).value.trim();

    Meteor.call('rules.insert', text, response);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.responseInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Rule list</h1>
          <form className="new-rule" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new rules"
            />
            <input
              type="text"
              ref="responseInput"
              placeholder="Type to add a response"
            />
            <input type="submit" value="Add Rule" />
          </form>
        </header>

        <div className="rule-list">
          {this.renderRules()}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  rules: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    rules: Rules.find({}).fetch(),
  };
}, App);
