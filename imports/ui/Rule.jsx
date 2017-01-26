import React, { Component, PropTypes } from 'react';

// Rule component - represents a single rule item
export default class Rule extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    console.log(this.props);
    Meteor.call('rules.delete', this.props.rule._id);
  }

  render() {
    return (
      <div className="rule-item">
        <div className="matching-text">{this.props.rule.text}</div>
        <div className="response-text">{this.props.rule.response}</div>
        <div className="action-button"><a href="#" onClick={this.onDelete}>Delete</a></div>
      </div>
    );
  }
}

Rule.propTypes = {
  // This component gets the rule to display through a React prop.
  // We can use propTypes to indicate it is required
  rule: PropTypes.object.isRequired,
};
