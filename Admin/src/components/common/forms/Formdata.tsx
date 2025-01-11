import { useEffect } from 'react';
import AddMemberForm from './AddMemberForm';
import { statelist } from '@app/store/slices/addMember';
import { Details, educationalProps, stateProps, Information } from './Partners Preferences/PartnerInfoData';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import {
  validateFirstName,
  validateLastName,
  Passwordvalidation,
  AgeValidate,
  MobileNumberValidate,
  DobValidate,
  EmailValidate,
  validateCardNumber,
} from './ValidationsFile';

export const CurrencyOptions = [
  {
    id: 1,
    value: 'INR',
    label: 'INR',
  },
  {
    id: 2,
    value: 'USD',
    label: 'USD',
  },
  {
    id: 3,

    value: 'EUR',
    label: 'EUR',
  },
  {
    id: 4,

    value: '$',
    label: '$',
  },
  {
    id: 5,

    value: 'GPB',
    label: 'GPB',
  },
  {
    id: 6,

    value: 'JPY',
    label: 'JPY',
  },
];
const Formdata = () => {
  const dispatch = useAppDispatch();
  const list_of_languages = useAppSelector((state) => state.form.languages);
  const list_of_religious = useAppSelector((state) => state.form.religious);
  const list_of_casts = useAppSelector((state) => state.form.casts);
  const list_of_education = useAppSelector((state) => state.form.educationList);
  const city_List = useAppSelector((state) => state.form.selectCities);
  const state_list = useAppSelector((state) => state.form.selectStates);
  const country_list = useAppSelector((state) => state.form.countries);
  const dhosam_list = useAppSelector((state) => state.form.dhosams);
  const moonSign_list = useAppSelector((state) => state.form.stars);
  const star_list = useAppSelector((state) => state.form.starList);
  const mapped_occuption = useAppSelector((state) => state.form.OccupationData);

  const dhosamList = dhosam_list?.data?.map((option: { _id: string; name: string }) => ({
    id: option?._id,
    value: option?.name,
    label: option?.name,
  }));

  const professionsData = mapped_occuption?.data.map((option: { _id: string; name: string }) => ({
    id: option?._id,
    value: option?.name,
    label: option?.name,
  }));

  const moonSignList = moonSign_list?.data?.map((option: { _id: string; name: string }) => ({
    id: option?._id,
    value: option?.name,
    label: option?.name,
  }));

  const starList = star_list?.map((option: { _id: string; name: string }) => ({
    id: option?._id,
    value: option?.name,
    label: option?.name,
  }));
  const languagesdOptions = list_of_languages?.data?.map((option) => ({
    id: parseInt(option._id),
    value: option?.name,
    label: option?.name,
  }));
  const religiousdOptions = list_of_religious?.data?.map((option) => ({
    id: parseInt(option.uuid),
    value: option?.name,
    label: option?.name,
  }));
  const castOptions = list_of_casts?.data?.map((option: { name: string; uuid: string }) => ({
    id: parseInt(option.uuid),
    value: option?.name,
    label: option?.name,
  }));
  const educationalDetails = list_of_education?.data?.map((option: educationalProps) => {
    return option?.departmentDetails?.map((item) => ({
      id: parseInt(item.uuid),
      value: item?.short_name,
      label: item?.short_name,
    }));
  });
  const PartnerReligious = list_of_religious?.data?.map((option) => ({
    id: parseInt(option.uuid),
    value: option?.name,
    label: option?.name,
  }));
  const PartnerEducation = list_of_education?.data?.map((option: educationalProps) => {
    return option?.departmentDetails?.map((item) => ({
      id: parseInt(item.uuid),
      value: item?.short_name,
      label: item?.short_name,
    }));
  });
  const partnercast = list_of_casts?.data?.map((option: { name: string; uuid: string }) => ({
    id: parseInt(option.uuid),
    value: option?.name,
    label: option?.name,
  }));
  const no_ofSiblings = [];
  for (let i = 0; i <= 10; i++) {
    const data = {
      id: i,
      value: i === 0 ? 'None' : i,
      label: i === 0 ? 'None' : i,
    };
    no_ofSiblings.push(data);
  }
  const age = [];
  for (let i = 21; i <= 40; i++) {
    const data = {
      id: i,
      value: i === 0 ? 'None' : i,
      label: i === 0 ? 'None' : i,
    };
    age.push(data);
  }
  const toage = [];
  for (let i = 21; i <= 40; i++) {
    const data = {
      id: i,
      value: i === 0 ? 'None' : i,
      label: i === 0 ? 'None' : i,
    };
    toage.push(data);
  }
  const height = [];
  for (let i = 152; i <= 190; i++) {
    const data = {
      id: i,
      value: i === 0 ? 'None' : i,
      label: i === 0 ? 'None' : i,
    };
    height.push(data);
  }
  const toheight = [];
  for (let i = 152; i <= 190; i++) {
    const data = {
      id: i,
      value: i === 0 ? 'None' : i,
      label: i === 0 ? 'None' : i,
    };
    toheight.push(data);
  }
  const CountryList = [
    {
      id: country_list?.country?.uuid,
      value: country_list?.country?.name,
      label: country_list?.country?.name,
    },
  ];

  useEffect(() => {
    if (country_list) {
      dispatch(statelist(country_list?.country?.uuid));
    }
  }, [country_list]);

  const cityOptions = city_List?.data?.map((option: stateProps) => ({
    id: option?.uuid,
    value: option?.name,
    label: option?.name,
  }));
  const stateOptions =
    state_list?.data.length > 0 &&
    state_list?.data?.map((option: stateProps) => ({
      id: option?.uuid,
      value: option?.name,
      label: option?.name,
    }));
  const selectdUser = useAppSelector((state) => state.member.basicInfo);

  const card = useAppSelector((state) => state.form.type);

  const details: Information[] = [
    {
      id: 1,
      title: 'Basic Information:',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'ProfileFor',
          title: 'Profile For',
          placeholder: '--choose profile for--',
          SelectRules: [{ required: true, message: 'Please enter your profile' }],
          options: [
            {
              id: 1,
              value: 'Myself',
              label: 'myself',
            },
            {
              id: 2,
              value: 'Son',
              label: 'Son',
            },
            {
              id: 3,
              value: 'Daughter',
              label: 'Daughter',
            },
            {
              id: 4,
              value: 'Sister',
              label: 'Sister',
            },
            {
              id: 5,
              value: 'Brother',
              label: 'Brother',
            },
            {
              id: 6,
              value: 'Relative',
              label: 'Relative',
            },
            {
              id: 7,
              value: 'Friend',
              label: 'Friend',
            },
          ],
        },

        {
          id: 2,
          name: 'FirstName',
          title: 'First Name',
          placeholder: 'First Name',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.firstName,
          rules: [{ validator: validateFirstName }],
        },
        {
          id: 3,
          name: 'LastName',
          title: 'Last Name',
          placeholder: 'Last Name',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.lastName,
          rules: [{ validator: validateLastName }],
        },
        {
          id: 4,
          name: 'Gender',
          title: 'Gender',
          rules: [{ required: true, message: 'Please Select Your gender' }],
          RadioButtons: [
            {
              id: 1,
              value: 'Male',
              label: 'Male',
            },
            {
              id: 2,
              value: 'Female',
              label: 'Female',
            },
          ],
        },
        {
          id: 5,
          name: 'Date_Of_Birth',
          title: 'Date Of Birth',
          placeholder: 'Date Of Birth',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.dateOfBirth,
          rules: [{ validator: DobValidate }],
        },
        {
          id: 6,
          name: 'Age',
          title: 'Age',
          placeholder: 'Enter your Age',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.age,
          rules: [{ validator: AgeValidate }],
        },
        {
          id: 6,
          name: 'Height',
          title: 'Height',
          placeholder: 'Enter your Height',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.generalDetails?.height,
          //rules: [{ validator: AgeValidate }],
        },
        {
          id: 7,
          name: 'Weight',
          title: 'Weight',
          placeholder: 'Enter your Weight',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.basicDetails?.weight,
          rules: [{ validator: AgeValidate }],
        },
        {
          id: 8,
          name: 'bodyType',
          title: 'BodyType',
          placeholder: 'Enter your bodyType',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.basicDetails?.bodyType,
          //rules: [{ validator: AgeValidate }],
        },
        {
          id: 9,
          name: 'PhysicalStatus',
          title: 'Physical Status',
          placeholder: '--choose Physical Status--',
          SelectRules: [{ required: true, message: 'Please enter your Physical Status' }],
          options: [
            {
              id: 1,
              value: 'Normal',
              label: 'Normal',
            },
            {
              id: 2,
              value: 'Physically Challenged',
              label: 'Physically Challenged',
            },
          ],
        },
        {
          id: 10,
          name: 'Email',
          title: 'Email',
          placeholder: 'Mail Id',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.email,
          rules: [{ validator: EmailValidate }],
        },
        {
          id: 11,
          name: 'MobileNumber',
          placeholder: '0000000000',
          title: 'Mobile Number',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.phoneNumber,
          rules: [
            {
              validator: MobileNumberValidate,
            },
          ],
        },
        ...(selectdUser
          ? []
          : [
              {
                id: 12,
                name: 'Password',
                title: 'Password',
                placeholder: 'Enter Password',
                Password: 'Password',
                rules: [{ validator: Passwordvalidation }],
              },
              {
                id: 13,
                name: 'PasswordConfirmation',
                title: 'Password Confirmation',
                placeholder: 'Enter Confirm Password',
              },
            ]),
      ],
    },

    {
      id: 2,
      title: 'Religional Information:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'MotherTongue',
          title: 'Mother Tongue',
          placeholder: '-- Mother Tongue --',
          SelectRules: [{ required: true, message: 'Please select your Mother Tongue' }],
          options: languagesdOptions ? languagesdOptions : [],
        },
        {
          id: 2,
          name: 'Religion',
          placeholder: '--choose Religion',
          title: 'Religion',
          SelectRules: [{ required: true, message: 'Please select your Religion' }],
          options: religiousdOptions ? religiousdOptions : [],
        },
        {
          id: 3,
          name: 'Caste',
          placeholder: '--caste--',
          title: 'Caste',
          SelectRules: [{ required: true, message: 'Please Select your caste' }],
          options: castOptions ? castOptions : [],
        },
        {
          id: 4,
          name: 'Dosham',
          title: 'Dosham',
          placeholder: '--Select Dosham--',
          RadioButtons: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
          ],
          options: dhosamList ? dhosamList : [],
          defaultvalue: selectdUser?.religionDetails?.dosham === 'None' ? 'No' : selectdUser?.religionDetails?.dosham,
          SelectRules: [{ required: true, message: 'Please select your Dosham' }],
        },
        {
          id: 5,
          name: 'moonSign',
          title: ' Moon Sign',
          placeholder: '-- Moon Sign--',
          options: moonSignList ? moonSignList : [],
          SelectRules: [{ required: true, message: 'Please select  moonSign' }],
        },
        {
          id: 6,
          name: 'Star',
          title: 'Star',
          placeholder: '--Star--',
          options: starList ? starList : [],
          SelectRules: [{ required: true, message: 'Please select Star' }],
        },
        {
          id: 7,
          name: 'Willing_to_inter_community',
          title: 'Willing to inter community',
          placeholder: '--Willing to inter community--',

          SelectRules: [{ required: true, message: 'Please select the opinion' }],
          options: [
            {
              id: 1,
              value: 'No',
              label: 'No',
            },
            {
              id: 2,
              value: 'yes',
              label: 'Yes',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Groom Current Location:',
      rowCount: 'repeat(3,1fr)',
      info: [
        {
          id: 1,
          name: 'Country',
          title: 'Country',
          placeholder: '--choose Country--',
          SelectRules: [{ required: true, message: 'Please select your Country' }],
          options: CountryList ? CountryList : [],
        },
        {
          id: 2,
          name: 'State',
          title: 'State',
          placeholder: '--choose State',
          SelectRules: [{ required: true, message: 'Please select your State' }],
          options: stateOptions ? stateOptions : [],
        },
        {
          id: 3,
          name: 'City',
          placeholder: '--choose City--',
          title: 'City',
          SelectRules: [{ required: true, message: 'Please select your city' }],
          options: cityOptions ? cityOptions : [],
        },
      ],
    },
    {
      id: 3,
      title: 'Education & Occupational Information:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'Education',
          placeholder: '--Education--',
          title: 'Education',
          SelectRules: [{ required: true, message: 'Please select your Education details' }],
          options: educationalDetails ? educationalDetails.flat(1) : [],
        },
        {
          id: 2,
          name: 'EducationInstitution',
          title: 'Education Institution',
          placeholder: 'Enter your Education Institution',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.careerDetails?.educationInstitution,
          rules: [{ validator: validateFirstName }],
        },
        {
          id: 3,
          name: 'EmployedIn',
          title: 'Employed In',
          placeholder: '--Employed In --',
          SelectRules: [{ required: true, message: 'Please select your Employee details' }],
          options: [
            {
              id: 1,
              value: 'Government/PSU',
              label: 'Government/PSU',
            },
            {
              id: 2,
              value: 'Private',
              label: 'Private',
            },
            {
              id: 3,
              value: 'Business',
              label: 'Business',
            },
            {
              id: 4,
              value: 'Self Employed',
              label: 'Self Employed',
            },
            {
              id: 5,
              value: 'Not Working',
              label: 'Not Working',
            },
          ],
        },
        {
          id: 4,
          name: 'Occupation',
          title: 'Occupation',
          placeholder: 'Enter your Occupation',
          options: professionsData ? professionsData : [],

          // typeOfField: 'Input',
          // defaultvalue: selectdUser?.generalDetails?.occupation,
          // rules: [{ validator: validateFirstName }],
        },
        {
          id: 5,
          name: 'Organization',
          title: 'Organization',
          placeholder: 'Enter your Organization',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.careerDetails?.organization,
          rules: [{ validator: validateFirstName }],
        },

        {
          id: 6,
          name: 'AnnualIncome',
          title: 'Annual Income',
          placeholder: 'Annual Income',
          // typeOfField: 'Input',
          defaultvalue: selectdUser?.generalDetails?.income,
          rules: [{ validator: MobileNumberValidate }],
        },

        {
          id: 5,
          name: 'Language_Known',
          title: 'Language Known',
          placeholder: '-- Language Known --',

          SelectRules: [{ required: true, message: 'Please select your Language' }],
          options: languagesdOptions ? languagesdOptions : [],
        },
      ],
    },
    {
      id: 4,
      title: 'Family Information & Background:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'FamilyStatus',
          title: 'Family Status',
          placeholder: '-- Family status --',
          SelectRules: [{ required: true, message: 'Please select your Family status' }],
          options: [
            {
              id: 1,
              value: 'Rich',
              label: 'Rich',
            },

            {
              id: 2,
              value: 'Middle Class',
              label: 'Middle Class',
            },

            {
              id: 3,
              value: 'Affluent',
              label: 'Affluent',
            },
            {
              id: 4,
              value: 'Upper Middle Class',
              label: 'Upper Middle Class',
            },
          ],
        },
        {
          id: 2,
          name: 'FamilyType',
          title: 'Family Type',
          placeholder: '-- Family type --',

          SelectRules: [{ required: true, message: 'Please select your Family type' }],
          options: [
            {
              id: 1,
              value: 'Nuclear',
              label: 'Nuclear',
            },
            {
              id: 2,
              value: 'Joint',
              label: 'Joint',
            },
          ],
        },
        {
          id: 3,
          name: 'FamilyValue',
          title: 'Family Value',
          placeholder: '-- Family value --',

          SelectRules: [{ required: true, message: 'Please select your Family Value' }],
          options: [
            {
              id: 1,
              value: 'Orthodox',
              label: 'Orthodox',
            },
            {
              id: 2,
              value: 'Traditional',
              label: 'Traditional',
            },
            {
              id: 3,
              value: 'Moderate',
              label: 'Moderate',
            },
            {
              id: 3,
              value: 'Liberal',
              label: 'Liberal',
            },
          ],
        },
        {
          id: 4,
          name: 'Ancestral_Origin',
          title: 'Ancestral Origin (Optional)',
          placeholder: 'Ancestral Origin',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.generalDetails?.ancestralOrigin,
        },
        {
          id: 5,
          name: 'FatherOccupation',
          title: 'Father Occupation',
          placeholder: 'Father Occupation',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.familyDetails?.fatherOccupation,
        },
        {
          id: 6,
          name: 'MotherOccupation',
          title: 'Mother Occupation',
          placeholder: 'Mother Occupation',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.familyDetails?.motherOccupation,
        },
        {
          id: 7,
          name: 'MaritalStatus',
          title: 'Marital Status',
          placeholder: '--Martial Status--',
          SelectRules: [{ required: true, message: 'Please select your Martial Status' }],
          options: [
            {
              id: 1,
              value: 'Never Married',
              label: 'Never Married',
            },
            {
              id: 2,
              value: 'Widowed',
              label: 'Widowed',
            },
            {
              id: 3,
              value: 'Divorced',
              label: 'Divorced',
            },
            {
              id: 3,
              value: 'Awaiting Divorced',
              label: 'Awaiting Divorced',
            },
          ],
        },
        {
          id: 8,
          name: 'Childrens',
          title: 'Childrens',
          placeholder: '--Select Childrens--',
          RadioButtons: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
          ],
          options: no_ofSiblings,
          defaultvalue:
            selectdUser?.religionDetails?.children === 'None' ? 'No' : selectdUser?.religionDetails?.children,
          //SelectRules: [{ required: true, message: 'Please select your Dosham' }],
        },
        {
          id: 9,
          name: 'Number_of_Brothers',
          title: 'Number of Brothers',
          count: 'broCount',
          placeholder: 'Number of Brothers',
          //SelectRules: [{ required: true, message: 'Please select correct value' }],
          SibCountOptions: no_ofSiblings,
        },
        {
          id: 10,
          name: 'Number_of_Sisters',
          title: 'Number of Sisters',
          count: 'sisCount',
          placeholder: 'Number of Sisters',
          //SelectRules: [{ required: true, message: 'Please select correct value' }],
          SibCountOptions: no_ofSiblings,
        },
        {
          id: 11,
          name: 'DietHabits',
          title: 'Diet Habits',
          placeholder: '--Diet Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Vegetarian',
              label: 'Vegetarian',
            },
            {
              id: 2,
              value: 'Non-Vegetarian',
              label: 'Non-Vegetarian',
            },
            {
              id: 3,
              value: 'Flexitarian',
              label: 'Flexitarian',
            },
            {
              id: 4,
              value: 'Pescatarian',
              label: 'Pescatarian',
            },
          ],
        },

        {
          id: 12,

          name: 'SmokingHabits',

          title: 'Smoking Habits',
          placeholder: '--smoking Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
            {
              id: 3,
              value: 'Occasionally',
              label: 'Occasionally',
            },
            {
              id: 4,
              value: "Dosen't matter",
              label: "Dosen't matter",
            },
          ],
        },
        {
          id: 13,

          name: 'DrinkingHabits',

          title: 'Drinking Habits',
          placeholder: '--Drinking Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
            {
              id: 3,
              value: 'Occasionally',
              label: 'Occasionally',
            },
            {
              id: 4,
              value: "Dosen't matter",
              label: "Dosen't matter",
            },
          ],
        },
        {
          id: 14,
          name: 'About_MySelf',
          title: 'About My Self',
          placeholder: 'Enter description',
          typeOfField: 'Input',
          defaultvalue: selectdUser?.generalDetails?.description,
          //rules: [{ required: true, message: 'Please enter your details' }],
        },
      ],
    },
    {
      id: 5,
      title: 'Horoscope Information:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'Place_of_Birth',
          title: 'Place of Birth',
          placeholder: '--Place of Birth --',
          SelectRules: [{ required: true, message: 'Please select your family details' }],
          options: cityOptions ? cityOptions : [],
        },
        {
          id: 2,
          name: 'Time_of_Birth',
          title: 'Time of Birth',
          placeholder: '--Time of Birth --',
          SelectRules: [{ required: true, message: 'Please select your birth details' }],
          typeOfField: 'Picker',
        },
      ],
    },
    {
      id: 6,
      title: 'Profile Photo & ID Proofs:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'Profile_Photo',
          title: 'Profile Photo',
          placeholder: 'Profile',

          //SelectRules: [{ required: true, message: 'No choosen file' }],
        },
        {
          id: 2,
          name: 'Select_ID',
          title: 'Select ID',
          placeholder: '--Select your Id--',
          options: [
            {
              id: 1,
              value: 'Aadher Card',
              label: 'Aadher Card',
            },
            {
              id: 2,
              value: 'Pan card',
              label: 'Pan card',
            },
            {
              id: 3,
              value: 'Driving Licence',
              label: 'Driving Licence',
            },
          ],
          SelectRules: [{ required: true, message: 'select the id' }],
        },
        {
          id: 3,
          name: 'ID_Number',
          title: 'ID Number',
          placeholder: 'Enter Id number',
          typeOfField: 'input',
          defaultvalue: selectdUser?.userVerificationDetails?.idNumber,
          rules: [
            {
              validator: (rule: any, value: any, callback: any) =>
                validateCardNumber(card ? card : selectdUser?.userVerificationDetails?.idType, rule, value, callback),
            },
          ],
        },
        {
          id: 2,
          name: 'Upload_ID',
          title: 'Upload ID',
          placeholder: '--Upload ID--',
          //SelectRules: [{ required: true, message: 'No choosen file' }],
        },
      ],
    },
  ];

  const PartnerInformation: Details[] = [
    {
      id: 1,
      title: 'Basic Information:',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'PartenerAge',
          title: 'Age',
          placeholder: 'From',
          SelectRules: [{ required: true, message: ' please select you age' }],
          fromOptions: age,
          toOptions: toage,
        },
        {
          id: 2,
          name: 'PartnerHeight',
          title: 'Height',
          placeholder: 'From',
          SelectRules: [{ required: true, message: ' please select you Height' }],
          fromOptions: height,
          toHeight: toheight,
        },
        {
          id: 3,
          name: 'Partner_MartialStatus',
          title: 'Martial status',
          placeholder: '--Martial status--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Never Married',
              label: 'Never Married',
            },
            {
              id: 2,
              value: 'Widowed',
              label: 'Widowed',
            },
            {
              id: 3,
              value: 'Divorced',
              label: 'Divorced',
            },
            {
              id: 3,
              value: 'Awaiting Divorced',
              label: 'Awaiting Divorced',
            },
          ],
        },
        {
          id: 4,
          name: 'Partner_MotherTongue',
          title: 'Mother Tongue',
          placeholder: '--Mother Tongue--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: languagesdOptions ? languagesdOptions : [],
        },
        {
          id: 5,
          name: 'Partner_PhysicalStatus',
          title: 'Physical Status',
          placeholder: '--Physical Status--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Normal',
              label: 'Normal',
            },
            {
              id: 2,
              value: 'Physically Challenged',
              label: 'Physically Challenged',
            },
          ],
        },
        {
          id: 6,
          name: 'Partner_DietHabits',
          title: 'Diet Habits',
          placeholder: '--Diet Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Vegetarian',
              label: 'Vegetarian',
            },
            {
              id: 2,
              value: 'Non-Vegetarian',
              label: 'Non-Vegetarian',
            },
            {
              id: 3,
              value: 'Flexitarian',
              label: 'Flexitarian',
            },
            {
              id: 4,
              value: 'Pescatarian',
              label: 'Pescatarian',
            },
          ],
        },

        {
          id: 7,

          name: 'Partner_SmokingHabits',

          title: 'Smoking Habits',
          placeholder: '--smoking Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
            {
              id: 3,
              value: 'Occasionally',
              label: 'Occasionally',
            },
            {
              id: 4,
              value: "Dosen't matter",
              label: "Dosen't matter",
            },
          ],
        },
        {
          id: 8,

          name: 'Partner_DrinkingHabits',

          title: 'Drinking Habits',
          placeholder: '--Drinking Habits--',
          SelectRules: [{ required: true, message: 'Please enter your Phone Number' }],
          options: [
            {
              id: 1,
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: 2,
              value: 'No',
              label: 'No',
            },
            {
              id: 3,
              value: 'Occasionally',
              label: 'Occasionally',
            },
            {
              id: 4,
              value: "Dosen't matter",
              label: "Dosen't matter",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'ReligionalInformation:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'PartnerReligion',
          title: 'Religion',
          placeholder: '--Religion--',

          SelectRules: [{ required: true, message: 'Please select your Mother Tongue' }],
          options: PartnerReligious ? PartnerReligious : [],
        },

        {
          id: 2,
          name: 'PartnerCaste',
          title: 'caste',
          placeholder: '--caste--',
          SelectRules: [{ required: true, message: 'Please Select your caste' }],
          options: partnercast ? partnercast : [],
        },
        {
          id: 4,
          name: 'PartnermoonSign',
          title: ' Moon Sign',
          placeholder: '-- Moon Sign--',
          options: [],
          SelectRules: [{ required: true, message: 'Please select  moonSign' }],
        },
        {
          id: 5,
          name: 'PartnerStar',
          title: 'Star',
          placeholder: '--Star--',
          options: [],
          SelectRules: [{ required: true, message: 'Please select' }],
        },
        {
          id: 6,
          name: 'PartnerDosham',
          title: 'Dosham(optional)',
          placeholder: '--Dosham',
          SelectRules: [{ required: true, message: 'Please select the column' }],
          options: dhosamList ? dhosamList : [],
        },
      ],
    },
    {
      id: 3,
      title: 'ProfessionalPerferences:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'PartnerEducation',
          title: 'Education',
          placeholder: '--Education--',

          SelectRules: [{ required: true, message: 'Please enter your Education details' }],
          options: PartnerEducation ? PartnerEducation.flat(1) : [],
        },
        {
          id: 2,
          name: 'PartnerEmployedIn',
          title: 'Employed In',
          placeholder: '--Employed In--',

          SelectRules: [{ required: true, message: 'Please enter your Education details' }],
          options: [
            {
              id: 1,
              value: 'Government/PSU',
              label: 'Government/PSU',
            },
            {
              id: 2,
              value: 'Private',
              label: 'Private',
            },
            {
              id: 3,
              value: 'Business',
              label: 'Business',
            },
            {
              id: 4,
              value: 'Self Employed',
              label: 'Self Employed',
            },
            {
              id: 5,
              value: 'Not Working',
              label: 'Not Working',
            },
          ],
        },
        {
          id: 1,
          name: 'PartnerOccupation',
          title: 'Occupation',
          placeholder: 'Select your Occupation',
          options: professionsData ? professionsData : [],
        },
      ],
    },
    {
      id: 4,
      title: 'LocationPreferences:',
      rowCount: 'repeat(2,1fr)',
      info: [
        {
          id: 1,
          name: 'PartnerCountry',
          title: 'Country',
          placeholder: '--Country--',

          SelectRules: [{ required: true, message: 'Please enter your Country' }],
          options: CountryList ? CountryList : [],
        },

        {
          id: 2,
          name: 'PartnerState',
          title: 'State',
          placeholder: '--State--',

          SelectRules: [{ required: true, message: 'Please enter your Country' }],
          options: stateOptions ? stateOptions : [],
        },
        {
          id: 3,
          name: 'PartnerCity',
          title: 'City',
          placeholder: '--City--',
          SelectRules: [{ required: true, message: 'Please enter your City' }],
          options: cityOptions ? cityOptions : [],
        },
        {
          id: 4,
          name: 'About_from_PartnerFreference',
          title: 'About Your Partner(Exceptation)',
          placeholder: 'About Your Partner(Exceptation)',
          typeOfField: 'Input',
        },
      ],
    },
  ];
  return <div>{details && <AddMemberForm details={details} PartnerInformation={PartnerInformation} />}</div>;
};

export default Formdata;
