import { body } from 'express-validator';

export const userDataValidator = [
  // Religion Information Validation
  body('religionDetails').optional().isObject(),
  body('religionDetails.motherTongue').if(body('religionDetails').exists()).notEmpty().withMessage('Mother Tongue is Required').bail().isString().withMessage('Mother Tongue should be string'),
  body('religionDetails.religion').if(body('religionDetails').exists()).notEmpty().withMessage('Religion is Required').bail().isString().withMessage('Religion should be string'),
  body('religionDetails.caste').if(body('religionDetails').exists()).notEmpty().withMessage('Caste is Required').bail().isString().withMessage('Caste should be string'),
  // body('religionDetails.subCaste').if(body('religionDetails').exists()).notEmpty().withMessage('Sub Caste is Required').bail().isString().withMessage('Sub caste should be string'),
  // body('religionDetails.dosham').if(body('religionDetails').exists()).optional().isString().withMessage('Dosham should be string'),

  // Location Validations

  body('locationDetails').optional().isObject(),
  body('locationDetails.address').if(body('locationDetails').exists()).notEmpty().withMessage('Address is Required').bail().isString().withMessage('Address should be string'),
  body('locationDetails.country').if(body('locationDetails').exists()).notEmpty().withMessage('Country is Required').bail().isString().withMessage('Country should be string'),
  body('locationDetails.city').if(body('locationDetails').exists()).notEmpty().withMessage('City is Required').bail().isString().withMessage('City should be string'),
  body('locationDetails.state').if(body('locationDetails').exists()).notEmpty().withMessage('State is Required').bail().isString().withMessage('State should be string'),

  // GENERATE DETAILS VALIDATION

  body('generalDetails').optional().isObject(),
  body('generalDetails.education').if(body('generalDetails').exists()).notEmpty().withMessage('education is Required').bail().isString().withMessage('education should be string'),
  body('generalDetails.employedIn').if(body('generalDetails').exists()).notEmpty().withMessage('employedIn is Required').bail().isString().withMessage('employedIn should be string'),
  body('generalDetails.occupation').if(body('generalDetails').exists()).notEmpty().withMessage('occupation is Required').bail().isString().withMessage('occupation should be string'),
  body('generalDetails.currency').if(body('generalDetails').exists()).notEmpty().withMessage('currency is Required').bail().isString().withMessage('currency should be string'),
  body('generalDetails.income').if(body('generalDetails').exists()).notEmpty().withMessage('income is Required').bail().isString().withMessage('income should be string'),
  body('generalDetails.familyStatus').if(body('generalDetails').exists()).notEmpty().withMessage('familyStatus is Required').bail().isString().withMessage('familyStatus should be string'),
  body('generalDetails.familyValue').if(body('generalDetails').exists()).notEmpty().withMessage('familyValue is Required').bail().isString().withMessage('familyValue should be string'),
  body('generalDetails.ancestralOrigin').if(body('generalDetails').exists()).notEmpty().withMessage('ancestralOrigin is Required').bail().isString().withMessage('ancestralOrigin should be string'),
  body('generalDetails.description').if(body('generalDetails').exists()).notEmpty().withMessage('about myself is Required').bail().isString().withMessage('about myself should be string'),
  body('generalDetails.familyType').if(body('generalDetails').exists()).notEmpty().withMessage('familyType is Required').bail().isString().withMessage('familyType should be string'),

  // careerDetails Validations

  body('careerDetails').optional().isObject(),
  body('careerDetails.educationInstitution')
    .if(body('careerDetails').exists())
    .notEmpty()
    .withMessage('educationInstitution is Required')
    .bail()
    .isString()
    .withMessage('educationInstitution should be string'),
  body('careerDetails.organization').if(body('careerDetails').exists()).notEmpty().withMessage('organization is Required').bail().isString().withMessage('organization should be string'),

  // Basic Information Validation

  body('basicDetails').optional().isObject(),
  body('basicDetails.weight').if(body('basicDetails').exists()).notEmpty().withMessage('weight is Required').bail().isString().withMessage('weight should be string'),
  body('basicDetails.bodyType').if(body('basicDetails').exists()).notEmpty().withMessage('bodyType is Required').bail().isString().withMessage('bodyType should be string'),
  body('basicDetails.maritalStatus').if(body('basicDetails').exists()).notEmpty().withMessage('Marital Status is Required').bail().isString().withMessage('Marital Status should be string'),
  body('basicDetails.height').if(body('basicDetails').exists()).notEmpty().withMessage('Heigth is Required').bail().isString().withMessage('Height should be string'),
  body('basicDetails.physicalStatus').if(body('basicDetails').exists()).notEmpty().withMessage('physicalStatus is Required').bail().isString().withMessage('physicalStatus should be string'),
  body('basicDetails.willingToInterCommunity')
    .if(body('basicDetails').exists())
    .notEmpty()
    .withMessage('Willing To Inter Community is Required')
    .bail()
    .isString()
    .withMessage('Willing To Inter Community should be string')
    .isIn(['Yes', 'No'])
    .withMessage('Willing To Inter Community value is invalid'),

  // lifeStyleDetails Validation

  body('lifeStyleDetails').optional().isObject(),
  body('lifeStyleDetails.smokingHabit').if(body('lifeStyleDetails').exists()).notEmpty().withMessage('smokingHabit is Required').bail().isString().withMessage('smokingHabit should be string'),
  body('lifeStyleDetails.drinkingHabit').if(body('lifeStyleDetails').exists()).notEmpty().withMessage('drinkingHabit is Required').bail().isString().withMessage('drinkingHabit should be string'),
  body('lifeStyleDetails.dietHabit').if(body('lifeStyleDetails').exists()).notEmpty().withMessage('dietHabit is Required').bail().isString().withMessage('dietHabit should be string'),

  // religiousDetails Validations

  body('religiousDetails').optional().isObject(),
  body('religiousDetails.moonSign').if(body('religiousDetails').exists()).notEmpty().withMessage('moonSign is Required').bail().isString().withMessage('moonSign should be string'),
  body('religiousDetails.star').if(body('religiousDetails').exists()).notEmpty().withMessage('star is Required').bail().isString().withMessage('star should be string'),

  // horoscopeDetails Validations

  body('horoscopeDetails').optional().isObject(),
  body('horoscopeDetails.placeOfBirth').if(body('horoscopeDetails').exists()).notEmpty().withMessage('placeOfBirth is Required').bail().isObject().withMessage('placeOfBirth should be object'),
  body('horoscopeDetails.placeOfBirth.country')
    .if(body('horoscopeDetails.placeOfBirth').exists())
    .notEmpty()
    .withMessage('country is Required')
    .bail()
    .isString()
    .withMessage('country should be string'),
  body('horoscopeDetails.placeOfBirth.city').if(body('horoscopeDetails.placeOfBirth').exists()).notEmpty().withMessage('city is Required').bail().isString().withMessage('city should be string'),
  body('horoscopeDetails.placeOfBirth.state').if(body('horoscopeDetails.placeOfBirth').exists()).notEmpty().withMessage('state is Required').bail().isString().withMessage('state should be string'),
  body('horoscopeDetails.timeOfBirth').if(body('horoscopeDetails').exists()).notEmpty().withMessage('timeOfBirth is Required').bail().isObject().withMessage('timeOfBirth should be object'),
  body('horoscopeDetails.timeOfBirth.hours').if(body('horoscopeDetails.timeOfBirth').exists()).notEmpty().withMessage('hours is Required').bail().isString().withMessage('hours should be string'),
  body('horoscopeDetails.timeOfBirth.minutes').if(body('horoscopeDetails.timeOfBirth').exists()).notEmpty().withMessage('hours is Required').bail().isString().withMessage('hours should be string'),
  body('horoscopeDetails.timeOfBirth.hourPeriod')
    .if(body('horoscopeDetails.timeOfBirth').exists())
    .notEmpty()
    .withMessage('hourPeriod is Required')
    .bail()
    .isString()
    .withMessage('hourPeriod should be string'),

  // familyDetails Validations

  body('familyDetails').optional().isObject(),
  body('familyDetails.fatherOccupation').if(body('familyDetails').exists()).notEmpty().withMessage('fatherOccupation is Required').bail().isString().withMessage('fatherOccupation should be string'),
  body('familyDetails.motherOccupation').if(body('familyDetails').exists()).notEmpty().withMessage('motherOccupation is Required').bail().isString().withMessage('motherOccupation should be string'),

  // partnerPreferences Validations

  body('partnerPreferences').optional().isObject(),
  body('partnerPreferences.basicInformation')
    .if(body('partnerPreferences').exists())
    .notEmpty()
    .withMessage('basicInformation is Required')
    .bail()
    .isObject()
    .withMessage('basicInformation should be object'),
  body('partnerPreferences.basicInformation.age')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('age is Required')
    .bail()
    .isObject()
    .withMessage('age should be object'),
  body('partnerPreferences.basicInformation.age.from')
    .if(body('partnerPreferences.basicInformation.age').exists())
    .notEmpty()
    .withMessage('From age is Required')
    .bail()
    .isString()
    .withMessage('From age should be string'),
  body('partnerPreferences.basicInformation.age.to')
    .if(body('partnerPreferences.basicInformation.age').exists())
    .notEmpty()
    .withMessage('To age is Required')
    .bail()
    .isString()
    .withMessage('To age should be string'),
  body('partnerPreferences.basicInformation.height')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('height is Required')
    .bail()
    .isObject()
    .withMessage('height should be object'),
  body('partnerPreferences.basicInformation.height.from')
    .if(body('partnerPreferences.basicInformation.height').exists())
    .notEmpty()
    .withMessage('From height is Required')
    .bail()
    .isString()
    .withMessage('From height should be string'),
  body('partnerPreferences.basicInformation.height.to')
    .if(body('partnerPreferences.basicInformation.height').exists())
    .notEmpty()
    .withMessage('To height is Required')
    .bail()
    .isString()
    .withMessage('To height should be string'),
  body('partnerPreferences.basicInformation.martialStatus')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('martialStatus is Required')
    .bail()
    .isArray()
    .withMessage('martialStatus should be array'),
  body('partnerPreferences.basicInformation.motherTongue')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('motherTongue is Required')
    .bail()
    .isArray()
    .withMessage('motherTongue should be array'),
  body('partnerPreferences.basicInformation.physicalStatus')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('physicalStatus is Required')
    .bail()
    .isArray()
    .withMessage('physicalStatus should be array'),
  body('partnerPreferences.basicInformation.dietHabit')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('dietHabit is Required')
    .bail()
    .isArray()
    .withMessage('dietHabit should be array'),
  body('partnerPreferences.basicInformation.smokingHabit')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('smokingHabit is Required')
    .bail()
    .isString()
    .withMessage('smokingHabit should be string'),
  body('partnerPreferences.basicInformation.drinkingHabit')
    .if(body('partnerPreferences.basicInformation').exists())
    .notEmpty()
    .withMessage('drinkingHabit is Required')
    .bail()
    .isString()
    .withMessage('drinkingHabit should be string'),

  // partnerPreferences > religiousPreferences
  body('partnerPreferences.religiousPreferences')
    .if(body('partnerPreferences').exists())
    .notEmpty()
    .withMessage('religiousPreferences is Required')
    .bail()
    .isObject()
    .withMessage('religiousPreferences should be object'),
  body('partnerPreferences.religiousPreferences.religion')
    .if(body('partnerPreferences.religiousPreferences').exists())
    .notEmpty()
    .withMessage('religion is Required')
    .bail()
    .isArray()
    .withMessage('religion should be array'),
  body('partnerPreferences.religiousPreferences.caste')
    .if(body('partnerPreferences.religiousPreferences').exists())
    .notEmpty()
    .withMessage('caste is Required')
    .bail()
    .isArray()
    .withMessage('caste should be array'),
  // body('partnerPreferences.religiousPreferences.subCaste')
  //   .if(body('partnerPreferences.religiousPreferences').exists())
  //   .notEmpty()
  //   .withMessage('subCaste is Required')
  //   .bail()
  //   .isArray()
  //   .withMessage('subCaste should be array'),
  body('partnerPreferences.religiousPreferences.star')
    .if(body('partnerPreferences.religiousPreferences').exists())
    .notEmpty()
    .withMessage('star is Required')
    .bail()
    .isArray()
    .withMessage('star should be array'),
  body('partnerPreferences.religiousPreferences.dosham')
    .if(body('partnerPreferences.religiousPreferences').exists())
    .notEmpty()
    .withMessage('dosham is Required')
    .bail()
    .isArray()
    .withMessage('dosham should be string'),

  // partnerPreferences > professionalPreferences
  body('partnerPreferences.professionalPreferences')
    .if(body('partnerPreferences').exists())
    .notEmpty()
    .withMessage('professionalPreferences is Required')
    .bail()
    .isObject()
    .withMessage('professionalPreferences should be object'),
  body('partnerPreferences.professionalPreferences.education')
    .if(body('partnerPreferences.professionalPreferences').exists())
    .notEmpty()
    .withMessage('education is Required')
    .bail()
    .isArray()
    .withMessage('education should be array'),
  body('partnerPreferences.professionalPreferences.employedIn')
    .if(body('partnerPreferences.professionalPreferences').exists())
    .notEmpty()
    .withMessage('employedIn is Required')
    .bail()
    .isArray()
    .withMessage('employedIn should be array'),
  body('partnerPreferences.professionalPreferences.occupation')
    .if(body('partnerPreferences.professionalPreferences').exists())
    .notEmpty()
    .withMessage('occupation is Required')
    .bail()
    .isArray()
    .withMessage('occupation should be array'),

  // partnerPreferences > locationPreferences
  body('partnerPreferences.locationPreferences')
    .if(body('partnerPreferences').exists())
    .notEmpty()
    .withMessage('locationPreferences is Required')
    .bail()
    .isObject()
    .withMessage('locationPreferences should be object'),
  body('partnerPreferences.locationPreferences.country')
    .if(body('partnerPreferences.locationPreferences').exists())
    .notEmpty()
    .withMessage('country is Required')
    .bail()
    .isArray()
    .withMessage('country should be array'),
  body('partnerPreferences.locationPreferences.city')
    .if(body('partnerPreferences.locationPreferences').exists())
    .notEmpty()
    .withMessage('city is Required')
    .bail()
    .isArray()
    .withMessage('city should be array'),
  body('partnerPreferences.locationPreferences.state')
    .if(body('partnerPreferences.locationPreferences').exists())
    .notEmpty()
    .withMessage('state is Required')
    .bail()
    .isArray()
    .withMessage('state should be array'),

  // partnerPreferences > aboutYourPartner

  body('partnerPreferences.aboutYourPartner')
    .if(body('partnerPreferences').exists())
    .notEmpty()
    .withMessage('aboutYourPartner is Required')
    .bail()
    .isString()
    .withMessage('aboutYourPartner should be string'),

  // userVerificationDetails Validations

  body('userVerificationDetails').optional().isObject(),
  body('userVerificationDetails.idType').if(body('userVerificationDetails').exists()).notEmpty().withMessage('Id Type is Required').bail().isString().withMessage('Id Type  should be string'),
  body('userVerificationDetails.idNumber').if(body('userVerificationDetails').exists()).notEmpty().withMessage('idNumber is Required').bail().isString().withMessage('idNumber  should be string'),
  body('userVerificationDetails.idDoc').if(body('userVerificationDetails').exists()).notEmpty().withMessage('idDoc is Required').bail().isString().withMessage('idDoc  should be string')
];
