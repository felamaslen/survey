import buildMessage from '../messageBuilder';

import {
  FORM_NEXT_CLICKED,
  FORM_RESPONSE_GOT,
  FORM_INPUT_CHANGED
} from '../constants/actions';

export const formNextClicked = form => buildMessage(FORM_NEXT_CLICKED, form);
export const formResponseGot = response => buildMessage(FORM_RESPONSE_GOT, response);
export const formInputChanged = input => buildMessage(FORM_INPUT_CHANGED, input);

