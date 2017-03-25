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
  // very basic form validation - no empty items!
  const formValid = reduction.getIn(['appState', 'formValues'])
  .filter((section, step) => step === form.step)
  .reduce((emptyCount, section) => {
    const sectionEmptyCount = section.reduce((count, formItem) => {
      return count + (formItem.length === 0 ? 1 : 0);
    }, 0);
    return emptyCount + sectionEmptyCount;
  }, 0) === 0;

  if (!formValid) {
    alert('Please enter data.');
    return reduction;
  }

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
  const step = reduction.getIn(['appState', 'formStep']);
  return reduction.setIn(['appState', 'formValues', step, input.prop], input.value);
}

