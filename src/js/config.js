/* Client app constant parameters */

// there are two form sections
export const FORM_NUM_STEPS = 2;

export const FORM_TITLES = ['', 'Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];

const getCurrentDateTime = () => {
  const isoString = new Date().toISOString();
  return isoString.substring(0, isoString.lastIndexOf(':'));
}

// each object in this list corresponds to a separate form section
export const formDefaultValues = () => [
  {
    title: FORM_TITLES[0],
    name: '',
    dob: ''
  },
  {
    location: '',
    datetime: getCurrentDateTime(),
    feedback: ''
  }
];

