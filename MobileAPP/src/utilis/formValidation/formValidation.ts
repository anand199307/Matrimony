/* eslint-disable no-sequences */
export const isValidLogin = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.mail) {
    (newForm.mailError = 'MailId is required'), (isValid = false);
  }
  if (!newForm.password) {
    (newForm.passwordError = 'Password is required'), (isValid = false);
  }
  if (
    newForm.password &&
    !newForm.password.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  ) {
    (newForm.passwordError = 'Valid password is required'), (isValid = false);
  }

  return [isValid, newForm];
};

export const isValidRegister = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.mail) {
    (newForm.mailError = 'Mail Id number is required'), (isValid = false);
  }
  if (!newForm.profile) {
    (newForm.profileError = 'Profile is required.'), (isValid = false);
  }
  if (!newForm.firstName) {
    (newForm.firstNameError = 'FirstName is required.'), (isValid = false);
  }
  if (newForm.firstName.length < 4) {
    (newForm.firstNameError = 'FirstName should contain min 4 char.'),
      (isValid = false);
  }
  if (!newForm.lastName) {
    (newForm.lastNameError = 'LastName is required.'), (isValid = false);
  }
  if (newForm.lastName.length < 1) {
    (newForm.passwordError = 'LastName should contain min 1 char.'),
      (isValid = false);
  }
  if (!newForm.gender) {
    (newForm.genderError = 'Gender is required.'), (isValid = false);
  }
  if (!newForm.dateOfBirth) {
    (newForm.dateOfBirthError = 'DOB is required.'), (isValid = false);
  }
  if (!newForm.mobileNumber) {
    (newForm.mobileNumberError = 'Mobile Number is required.'),
      (isValid = false);
  }
  if (!newForm.mail) {
    (newForm.mailError = 'Mail is required.'), (isValid = false);
  }
  if (!newForm.password) {
    (newForm.passwordError = 'Password is required.'), (isValid = false);
  }
  if (newForm.password.length < 8) {
    (newForm.passwordError = 'Password should contain min 8 char.'),
      (isValid = false);
  }
  if (
    newForm.password &&
    !newForm.password.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  ) {
    (newForm.passwordError = 'Valid password is required.'), (isValid = false);
  }
  if (!newForm.passwordConfirmation) {
    (newForm.passwordConfirmationError = 'Confirm is required.'),
      (isValid = false);
  }
  if (newForm.passwordConfirmation.length < 8) {
    (newForm.passwordConfirmationError =
      'Confirm Password should contain min 8 char.'),
      (isValid = false);
  }
  if (
    newForm.passwordConfirmation &&
    !newForm.passwordConfirmation.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  ) {
    (newForm.passwordError = 'Valid password is required.'), (isValid = false);
  }
  if (newForm.password !== newForm.passwordConfirmation) {
    (newForm.passwordError = 'Password and Confirm password should be same.'),
      (isValid = false);
  }

  return [isValid, newForm];
};

export const isValidOnboardPageOne = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.motherTongue) {
    (newForm.motherTongueError = 'Mother Tongue is required'),
      (isValid = false);
  }
  if (!newForm.maritalStatus) {
    (newForm.maritalStatusError = 'Marital Status is required'),
      (isValid = false);
  }
  if (!newForm.religion) {
    (newForm.religionError = 'Religion is required'), (isValid = false);
  }
  if (!newForm.caste) {
    (newForm.casteError = 'Caste is required'), (isValid = false);
  }
  if (!newForm.interCommunity) {
    (newForm.interCommunityError = 'Select the option.'), (isValid = false);
  }
  if (!newForm.country) {
    (newForm.countryError = 'Country is required'), (isValid = false);
  }
  if (!newForm.city) {
    (newForm.cityError = 'City is required'), (isValid = false);
  }
  if (!newForm.state) {
    (newForm.stateError = 'State is required'), (isValid = false);
  }
  if (!newForm.height) {
    (newForm.heightError = 'Height is required'), (isValid = false);
  }

  if (!newForm.physicalStatus) {
    (newForm.physicalStatusError = 'Physical status is required.'),
      (isValid = false);
  }
  if (!newForm.Weight) {
    (newForm.WeightError = 'Weight is required'), (isValid = false);
  }
  if (!newForm.bodyType) {
    (newForm.bodyTypeError = 'Select your type.'), (isValid = false);
  }
  if (!newForm.addressLine) {
    (newForm.addressLineError = 'Enter your house or street details.'),
      (isValid = false);
  }
  return [isValid, newForm];
};

export const isValidOnboardPageTwo = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};
  if (!newForm.country) {
    (newForm.countryError = 'Country is required'), (isValid = false);
  }
  if (!newForm.city) {
    (newForm.cityError = 'City is required'), (isValid = false);
  }
  if (!newForm.state) {
    (newForm.stateError = 'State is required'), (isValid = false);
  }
  // if (!newForm.doshamYes) {
  //   (newForm.doshamYesError = 'Dosham type is required'), (isValid = false);
  // }
  // if (!newForm.dosham) {
  //   (newForm.doshamError = 'Dosham is required'), (isValid = false);
  // }
  if (!newForm.raasiAndMoonSign) {
    (newForm.raasiAndMoonSignError = 'Rasi is required.'), (isValid = false);
  }
  if (!newForm.Star) {
    (newForm.StarError = 'Star name is required.'), (isValid = false);
  }
  if (!newForm.Hour) {
    (newForm.HourError = 'Hour is required.'), (isValid = false);
  }
  if (!newForm.Minutes) {
    (newForm.MinutesError = 'Minutes is required.'), (isValid = false);
  }
  if (!newForm.AMAndPM) {
    (newForm.AMAndPMError = 'Select am or pm.'), (isValid = false);
  }

  return [isValid, newForm];
};

export const isValidIDInformation = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};
  if (!newForm.selectedId) {
    (newForm.selectedIdError = 'Select the ID type.'), (isValid = false);
  }
  if (!newForm.IdValue) {
    (newForm.idValueError = 'Enter the ID Number.'), (isValid = false);
  }
  if (!newForm.uplodedValue) {
    (newForm.uplodedIdError = 'Upload the Id Value.'), (isValid = false);
  }
  return [isValid, newForm];
};
