import {
  FORM_NEXT_CLICKED,
  FORM_RESPONSE_GOT,
  FORM_INPUT_CHANGED
} from '../constants/actions';

import {
} from './AppReducer';

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
    return reduction;
  }
}
