import { } from 'immutable';
import axios from 'axios';

import buildEffectHandler from '../effectHandlerBuilder';

import {
  FORM_SUBMIT_API_CALL
} from '../constants/effects';

import {
  formResponseGot
} from '../actions/FormActions';

export default buildEffectHandler({
  [FORM_SUBMIT_API_CALL]: (formValues, dispatcher) => {
    axios.post('api/submit_survey', formValues.toJS()).then(
      response => dispatcher.dispatch(formResponseGot({ response }))
    ).catch(
      error => console.error('Error submitting form', error)
    );
  }
});
