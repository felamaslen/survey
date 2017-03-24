import { Record, List, fromJS } from 'immutable';

// the state of the app (reduction) is stored as an immutable object,
// and returned (modified) by reducers
export default new Record({
  appState: fromJS({
    formStep: 0, // goes to 1 when the second part is displayed
    formValues: {
      title: "",
      name: "",
      dob: "",
      location: "",
      datetime: "",
      feedback: ""
    },
    formLoading: false,
    formSubmitted: false
  }),
  // side effects
  effects: List.of()
});

