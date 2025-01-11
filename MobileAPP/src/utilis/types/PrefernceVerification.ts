export interface valueType {
  educationInstitution: string;
  Organization: string;
  smokingHabits: string;
  drinkingHabits: any;
  dietHabits: any;
  fatherOccupation: any;
  motherOccupation: any;
  education: string;
  employedIn: string;
  occupation: string;
  currency: any;
  income: any;
  familyStatus: any;
  familyType: any;
  familyValue: any;
  ancestralOrigin: string;
  aboutMyself: string;
  fatherName: string;
  motherName: string;
  maleCount: string;
  femaleCount: string;
  maleMarriedCount: string;
  femaleMarriedCount: string;

  educationInstitutionError: any;
  OrganizationError: string;
  smokingHabitsError: string;
  drinkingHabitsError: string;
  dietHabitsError: string;
  fatherOccupationError: string;
  motherOccupationError: string;
  educationError: string;
  employedInError: string;
  occupationError: string;
  incomeError: string;
  familyStatusError: string;
  familyTypeError: string;
  familyValueError: string;
  ancestralOriginError: string;
  aboutMyselfError: string;
  fatherNameError: string;
  motherNameError: string;
  maleCountError: string;
  femaleCountError: string;
  maleMarriedCountError: string;
  femaleMarriedCountError: string;
}

export const formValue = {
  educationInstitution: '',
  Organization: '',
  smokingHabits: '',
  drinkingHabits: '',
  dietHabits: '',
  fatherOccupation: '',
  motherOccupation: '',
  education: '',
  employedIn: '',
  occupation: '',
  currency: 'INR',
  income: '',
  familyStatus: '',
  familyType: '',
  familyValue: '',
  ancestralOrigin: '',
  aboutMyself:
    'Kind-hearted professional with a passion for family and career. Enthusiastic about travel, food, and making meaningful connections. Seeking a life partner to share the journey of love and companionship.',
  fatherName: '',
  motherName: '',
  maleCount: '',
  femaleCount: '',
  maleMarriedCount: '',
  femaleMarriedCount: '',

  educationInstitutionError: '',
  OrganizationError: '',
  smokingHabitsError: '',
  drinkingHabitsError: '',
  dietHabitsError: '',
  fatherOccupationError: '',
  motherOccupationError: '',
  educationError: '',
  employedInError: '',
  occupationError: '',
  incomeError: '',
  familyStatusError: '',
  familyValueError: '',
  familyTypeError: '',
  ancestralOriginError: '',
  aboutMyselfError: '',
  fatherNameError: '',
  motherNameError: '',
  maleCountError: '',
  femaleCountError: '',
  maleMarriedCountError: '',
  femaleMarriedCountError: '',
};

export interface partnerPrefernceValueType {
  ageFrom: any;
  ageTo: any;
  heightFrom: any;
  heightTo: any;
  location: any;
  aboutMyself: any;
  city: any;
  state: any;
  smokingHabits: any;
  drinkingHabits: any;
  dietHabits: any;
  maritalStatus: any;
  physicalStatus: any;
  motherTongue: any;
  religion: any;
  caste: any;
  dosham: any;
  raasiAndMoonSign?: any;
  Star?: any;
  Education: any;
  employedIn: any;
  Desingnation: any;
  address: string;

  physicalStatusError: string;
  ageFromError: any;
  ageToError: string;
  heightFromError: string;
  heightToError: string;
  smokingHabitsError: string;
  drinkingHabitsError: string;
  dietHabitsError: string;
  maritalStatusError: string;
  motherTongueError: string;
  religionError: string;
  casteError: string;
  subCasteError: string;
  doshamError: string;
  raasiAndMoonSignError: string;
  StarError: string;
  EducationError: string;
  employedInError: string;
  DesingnationError: string;
  locationError: string;
  aboutMyselfError: string;
  cityError: string;
  stateError: string;
  addressError: string;
}

export const partnerPrefernceFormValue = {
  ageFrom: '18',
  ageTo: '25',
  heightFrom: '4.10',
  heightTo: '5.0',
  smokingHabits: 'No',
  drinkingHabits: 'No',
  dietHabits: ['Any'],
  maritalStatus: ['Any'],
  motherTongue: ['Any'],
  religion: ['Any'],
  caste: ['Any'],
  dosham: '',
  raasiAndMoonSign: '',
  Star: ['Any'],
  city: ['Any'],
  state: ['Any'],
  Education: ['Any'],
  employedIn: ['Any'],
  Desingnation: ['Any'],
  location: ['Any'],
  aboutMyself: '',
  physicalStatus: ['Any'],
  address: '',

  physicalStatusError: '',
  ageFromError: '',
  ageToError: '',
  heightFromError: '',
  heightToError: '',
  smokingHabitsError: '',
  drinkingHabitsError: '',
  dietHabitsError: '',
  maritalStatusError: '',
  motherTongueError: '',
  religionError: '',
  casteError: '',
  subCasteError: '',
  doshamError: '',
  raasiAndMoonSignError: '',
  StarError: '',
  EducationError: '',
  employedInError: '',
  DesingnationError: '',
  locationError: '',
  aboutMyselfError: '',
  cityError: '',
  stateError: '',
  addressError: '',
};

export interface IdVerificationvalueType {
  selectedId: string;
  IdValue: string;
  uplodedValue: string;

  selectedIdError: any;
  idValueError: string;
  uplodedIdError: string;
}

export const IdVerificationFormValue = {
  selectedId: '',
  IdValue: '',
  uplodedValue: '',

  selectedIdError: '',
  idValueError: '',
  uplodedIdError: '',
};
