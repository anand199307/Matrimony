export const validateFirstName = (_rule: any, value: any) => {
  if (!value) {
    return Promise.reject('Please enter your FirstName');
  }
  if (value?.length > 0) {
    if (!/^.{5,}$/.test(value)) {
      return Promise.reject('Username must be minimum 5 characters');
    } else if (!/^([\s.]?[a-zA-Z\. ]+)+$/.test(value)) {
      return Promise.reject('Must contain only alphabets');
    } else {
      return Promise.resolve();
    }
  }
};

export const AgeValidate = (_rule: any, value: any) => {
  const numberRegex = /^([-]?[1-9][0-9]*|0)$/;
  if (!value) {
    return Promise.reject('Please enter your age');
  } else if (!numberRegex.test(value)) {
    return Promise.reject('Must contain only numbers');
  } else {
    return Promise.resolve();
  }
};
export const DobValidate = (_rule: any, value: any) => {
  const dobRegex = /^[0-9/]+$/;
  if (!value) {
    return Promise.reject('Please enter your Date of Birth');
  } else if (!dobRegex.test(value)) {
    return Promise.reject('Date of birth must be in DD/MM/YYYY formate');
  } else {
    return Promise.resolve();
  }
};
export const EmailValidate = (_rule: any, value: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return Promise.reject('Please enter your email');
  } else if (!emailRegex.test(value)) {
    return Promise.reject('Invalid email format');
  } else {
    return Promise.resolve();
  }
};

export const MobileNumberValidate = (_rule: any, value: any) => {
  const numberRegex = /^([-]?[1-9][0-9]*|0)$/;
  if (!value) {
    return Promise.reject('Please enter your Mobile Number');
  } else if (!numberRegex.test(value)) {
    return Promise.reject('Must contain only numbers');
  } else {
    return Promise.resolve();
  }
};
export const validateLastName = (_rule: any, value: any) => {
  if (!value) {
    return Promise.reject('Please enter your LastName');
  } else if (!/^([\s.]?[a-zA-Z\. ]+)+$/.test(value)) {
    return Promise.reject('Must contains only alphabet');
  } else {
    return Promise.resolve();
  }
};
export const Passwordvalidation = (rule: any, value: any) => {
  const notSpace = /^\S*$/;
  const eightChar = /.{8,}/;

  if (!value) {
    return Promise.reject('Please enter your password');
  } else if (!eightChar.test(value)) {
    return Promise.reject('Must contain 8 or more characters');
  } else if (!notSpace.test(value)) {
    return Promise.reject('Must not have any blank spaces');
  } else if (!/.*\d/.test(value)) {
    return Promise.reject('Must contain a number');
  } else if (!/.*[a-z]/.test(value)) {
    return Promise.reject('Must contain a lower case character');
  } else if (!/.*[A-Z]/.test(value)) {
    return Promise.reject('Must contain an upper case character');
  } else if (/^[a-zA-Z0-9 ]*$/.test(value)) {
    return Promise.reject('Must contain a symbol');
  } else {
    return Promise.resolve();
  }
};

export const validateCardNumber = (card: any, rule: any, value: any, callback: any) => {
  const aadhaarRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
  const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
  const drivingLicenceRegex = /^[A-Z0-9]{15}$/;

  const trimmedValue = value?.replace(/\s/g, '');
  if (!trimmedValue) {
    callback('ID number is required.');
  } else if (card === 'Aadher Card' && !aadhaarRegex.test(trimmedValue)) {
    callback('Invalid Aadhaar number. The format should be XXXX XXXX XXXX.');
  } else if (card === 'Pan card' && !panRegex.test(trimmedValue)) {
    callback('Invalid Pan card number. The format should be ABCDE1234F.');
  } else if (card === 'Driving Licence' && !drivingLicenceRegex.test(trimmedValue)) {
    callback('Invalid Driving Licence number. The format should be XXXXXXXXXXXXXX.');
  } else {
    callback();
  }
};
