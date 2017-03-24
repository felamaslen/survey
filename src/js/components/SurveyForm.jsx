/*
 * React component to display a form
 */

import React, { PropTypes } from 'react';
import { Map as map } from 'immutable';
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
            <span>Title:</span>
            <span>
              <input ref="input_title" type="text" name="title"
                value={this.props.formValues.get('title')}
                onChange={this.handleChange.bind(this, 'title')} />
            </span>
          </li>
          <li>
            <span>Name:</span>
            <span>
              <input ref="input_name" type="text" name="name"
                value={this.props.formValues.get('name')}
                onChange={this.handleChange.bind(this, 'name')} />
            </span>
          </li>
          <li>
            <span>Date of Birth:</span>
            <span>
              <input ref="input_dob" type="date" name="dob"
                value={this.props.formValues.get('dob')}
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
        <ul>
          <li>
            <span>Current location:</span>
            <span>
              <input ref="input_location" type="text" name="location"
                value={this.props.formValues.get('location')}
                onChange={this.handleChange.bind(this, 'location')} />
            </span>
          </li>
          <li>
            <span>Current time:</span>
            <span>
              <input ref="input_date" type="datetime-local" name="time"
                value={this.props.formValues.get('date')}
                onChange={this.handleChange.bind(this, 'date')} />
            </span>
          </li>
          <li>
            <span>User feedback:</span>
            <span>
              <textarea ref="input_feedback" name="feedback"
                value={this.props.formValues.get('feedback')}
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
  formValues: PropTypes.instanceOf(map)
};

