import { Record, List, fromJS } from 'immutable';

import {
  formDefaultValues
} from './config';

// the state of the app (reduction) is stored as an immutable object,
// and returned (modified) by reducers
export default new Record({
  appState: fromJS({
    formStep: 0, // goes to 1 when the second part is displayed
    formValues: formDefaultValues(),
    formLoading: false,
    formSubmitted: false
  }),
  // side effects
  effects: List.of()
});

