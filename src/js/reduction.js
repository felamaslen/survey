import { Record, List, fromJS } from 'immutable';

// the state of the app (reduction) is stored as an immutable object,
// and returned (modified) by reducers
export default new Record({
  appState: fromJS({
    formValues: {} // an example app property...
  }),
  // side effects
  effects: List.of()
});

