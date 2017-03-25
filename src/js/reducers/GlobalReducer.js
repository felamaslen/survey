/**
 * This is run whenever an action is called by a view, and decides which
 * reducer to run based on the action given.
 */

import {
  FORM_NEXT_CLICKED,
  FORM_RESPONSE_GOT,
  FORM_INPUT_CHANGED
} from '../constants/actions';

import {
  formNextStep,
  formHandleResponse,
  formInputChanged
} from './FormReducer';

export default (reduction, action) => {
  switch (action.type) {
  case FORM_NEXT_CLICKED:
    return formNextStep(reduction, action.payload);
  case FORM_RESPONSE_GOT:
    return formHandleResponse(reduction, action.payload);
  case FORM_INPUT_CHANGED:
    return formInputChanged(reduction, action.payload);

  default:
    // By default, the reduction is simply returned unchanged.
    return reduction;
  }
}
