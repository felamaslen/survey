/*
 * Carries out actions for the Form component
 */

import { } from 'immutable';

import buildMessage from '../messageBuilder';

import {
  FORM_NUM_STEPS
} from '../config';

import {
  FORM_SUBMIT_API_CALL
} from '../constants/effects';

export const formNextStep = (reduction, form) => {
  // increment the current "step" of the form
  let newReduction = reduction.setIn(['appState', 'formStep'], form.step + 1);

  // if we're at the last step already, submit the form
  if (form.step === FORM_NUM_STEPS - 1) {
    // set the form so it doesn't render, and initiate a side effect to submit the form
    newReduction = newReduction.setIn(['appState', 'formStep'], 0)
    .setIn(['appState', 'formLoading'], true)
    .set('effects', reduction.get('effects').push(
      buildMessage(FORM_SUBMIT_API_CALL, reduction.getIn(['appState', 'formValues']))
    ));
  }

  return newReduction;
};

export const formHandleResponse = (reduction, response) => {
  // mark the form as submitted, so a thank you message can be displayed
  return reduction.setIn(['appState', 'formLoading'], false)
  .setIn(['appState', 'formSubmitted'], true);
};

export const formInputChanged = (reduction, input) => {
  // update a form input with the latest value
  return reduction.setIn(['appState', 'formValues', input.prop], input.value);
}

