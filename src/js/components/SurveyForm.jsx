/*
 * React component to display a form
 */

import React, { PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';

import PureControllerView from './PureControllerView';

import {
  FORM_NUM_STEPS
} from '../config';

import {
  formNextClicked,
  formInputChanged,
} from '../actions/FormActions';

export class SurveyForm extends PureControllerView {
  render() {
    // render each part of the form (2 parts)
    const parts = Array.apply(null, { length: FORM_NUM_STEPS }).map((_, step) => {
      const className = classNames({
        'form-part': true,
        'active': step === this.props.formStep
      });

      return (
        <div key={step} className={className}>
          {this.renderFormPart(step)}
        </div>
      );
    });

    const form = (
      <div id="main-form">
        {parts}
      </div>
    );

    return form;
  }

  renderFormPart(step) {
    // render part of the form, shown/hidden based on the current form step
    // if the form step has been incremented by the submit button,
    // the form will not be rendered
    switch (step) {
    case 0:
      return (
        <ul>
          <li>
            <span className="label">Title:</span>
            <span className="input">
              <select ref="input_title" type="text" name="title"
                value={this.props.formValues.getIn([step, 'title'])}
                onChange={this.handleChange.bind(this, 'title')}>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </span>
          </li>
          <li>
            <span className="label">Name:</span>
            <span className="input">
              <input ref="input_name" type="text" name="name"
                value={this.props.formValues.getIn([step, 'name'])}
                onChange={this.handleChange.bind(this, 'name')} />
            </span>
          </li>
          <li>
            <span className="label">Date of Birth:</span>
            <span className="input">
              <input ref="input_dob" type="date" name="dob"
                value={this.props.formValues.getIn([step, 'dob'])}
                onChange={this.handleChange.bind(this, 'dob')} />
            </span>
          </li>
          <li>
            <button id="btn-next" onClick={this.nextStep.bind(this)}>Next</button>
          </li>
        </ul>
      );

    case 1:
      return (
        <ul className="form-section">
          <li>
            <span className="label">Current location:</span>
            <span className="input">
              <input ref="input_location" type="text" name="location"
                value={this.props.formValues.getIn([step, 'location'])}
                onChange={this.handleChange.bind(this, 'location')} />
            </span>
          </li>
          <li>
            <span className="label">Current time:</span>
            <span className="input">
              <input ref="input_datetime" type="datetime-local" name="datetime"
                value={this.props.formValues.getIn([step, 'datetime'])}
                onChange={this.handleChange.bind(this, 'datetime')} />
            </span>
          </li>
          <li>
            <span className="label">User feedback:</span>
            <span className="input">
              <textarea rows="4" ref="input_feedback" name="feedback"
                value={this.props.formValues.getIn([step, 'feedback'])}
                onChange={this.handleChange.bind(this, 'feedback')} />
            </span>
          </li>
          <li>
            <span>
              <button id="btn-submit" onClick={this.nextStep.bind(this)}>Submit</button>
            </span>
          </li>
        </ul>
      );

    default:
      return null; // don't render anything
    }
  }

  handleChange(prop, event) {
    const value = event.target.value;
    this.dispatchAction(formInputChanged({ prop, value }));
  }

  nextStep() {
    const step = this.props.formStep;

    // go to the next part of the form if it exists, otherwise submit
    this.dispatchAction(formNextClicked({ step }));
  }
}

SurveyForm.propTypes = {
  formStep: PropTypes.number,
  formValues: PropTypes.instanceOf(List)
};

