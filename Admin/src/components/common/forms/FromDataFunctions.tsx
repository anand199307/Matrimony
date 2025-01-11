import { ChangeEvent } from 'react';

type Props = {
  form: any;
  info: any;
  selectdUser: any;
};
type generatePW = {
  setRandomPassword?: React.Dispatch<React.SetStateAction<string>>;
  form: any;
};
interface scrollProps {
  e: any;
  setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;

  loadingMore: boolean;
  dispatch: any;

  page: number;
  limit: number;
  motherTounges: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}
export const FormSUbmission = ({
  values,
  dispatch,
  RegisterApi,
  OnboardingApi,
  notificationController,
  navigate,
  info,
  updateMember,
  register,
  profile,
  idCard,
}: {
  values: any;
  dispatch: any;
  RegisterApi: any;
  OnboardingApi: any;
  notificationController: any;
  navigate: any;
  info: any;
  updateMember: any;
  register: any;
  profile: any;
  idCard: any;
}) => {
  const registerResponse = {
    profileType: values['ProfileFor'],
    firstName: values['FirstName'],
    lastName: values['LastName'],
    gender: values['Gender'],
    dateOfBirth: values['Date_Of_Birth'],
    age: values['Age'],
    email: values['Email'],
    phoneNumber: values['MobileNumber'],
    password: values['Password'],
    passwordConfirmation: values['Password Confirmation'],
  };
  const dateObject = new Date(`${values['Time_of_Birth']}`);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const hourPeriod = hours >= 12 ? 'PM' : 'AM';

  const postValues = {
    profileStatus: 3,
    avatar: profile,
    religionDetails: {
      motherTongue: values['MotherTongue'],
      maritalStatus: values['MaritalStatus'],
      children: values['Childrens'],
      noOfChildrens: values['Children_count'],
      religion: values['Religion'],
      caste: values['Caste'],
      //subCaste: 'Hindu',
      brothers: values['Number_of_Brothers'],
      sisters: values['Number_of_Sisters'],
      noOfBrothers: values['broCount'],
      noOfSisters: values['sisCount'],
      dosham: values['Dosham'],
      doshamName: values['Dosham_Name'],
      willingToInterCommunity: values['Willing_to_inter_community'],
    },
    galleryPhoto: [profile],
    locationDetails: {
      country: values['Country'],
      city: values['City'],
      state: values['State'],
    },
    generalDetails: {
      height: values['Height'],
      physicalStatus: values['PhysicalStatus'],
      education: values['Education'],
      employedIn: values['EmployedIn'],
      occupation: values['Occupation'],
      currency: values['Currency'],
      income: values['AnnualIncome'],
      familyStatus: values['FamilyStatus'],
      familyValue: values['FamilyValue'],
      familyType: values['FamilyType'],
      ancestralOrigin: values['Ancestral_Origin'],
      description: values['About_MySelf'],
    },
    careerDetails: {
      educationInstitution: values['EducationInstitution'],
      organization: values['Organization'],
    },
    basicDetails: {
      weight: values['Weight'],
      bodyType: values['bodyType'],
    },
    lifeStyleDetails: {
      smokingHabit: values['SmokingHabits'],
      drinkingHabit: values['DrinkingHabits'],
      dietHabit: values['DietHabits'],
    },
    religiousDetails: {
      moonSign: values['moonSign'],
      star: values['Star'],
    },
    horoscopeDetails: {
      placeOfBirth: {
        country: values['Country'],
        city: values['Place_of_Birth'],
        state: values['State'],
      },
      timeOfBirth: {
        hours: `${hours}`,
        minutes: `${minutes}`,
        hourPeriod: `${hourPeriod}`,
      },
    },
    familyDetails: {
      fatherOccupation: values['FatherOccupation'],
      motherOccupation: values['MotherOccupation'],
    },
    partnerPreferences: {
      basicInformation: {
        age: {
          from: `${values['Agefrom']}`,
          to: `${values['Ageto']}`,
        },
        height: {
          from: `${values['Heightfrom']}`,
          to: `${values['Heightto']}`,
        },
        martialStatus: values['Partner_MartialStatus'],
        motherTongue: values['Partner_MotherTongue'],
        physicalStatus: values['Partner_PhysicalStatus'],
        dietHabit: values['Partner_DietHabits'],
        smokingHabit: values['Partner_SmokingHabits'],
        drinkingHabit: values['Partner_DrinkingHabits'],
      },
      religiousPreferences: {
        religion: values['PartnerReligion'],
        caste: values['PartnerCaste'],
        // subCaste: values['castte'],
        moonSign: values['PartnermoonSign'],
        star: values['PartnerStar'],
        dosham: values['PartnerDosham'],
      },
      professionalPreferences: {
        education: values['PartnerEducation'],
        employedIn: values['PartnerEmployedIn'],
        occupation: values['PartnerOccupation'],
      },
      locationPreferences: {
        country: values['PartnerCountry'],
        city: values['PartnerCity'],
        state: values['PartnerState'],
      },
      aboutYourPartner: values['About_from_PartnerFreference'],
    },
    userVerificationDetails: {
      idType: values['Select_ID'],
      idNumber: values['ID_Number'],
      idDoc: idCard,
    },
  };
  if (info) {
    dispatch(updateMember({ onboardingPayload: postValues, uuid: info?.uuid })).then(() => {
      notificationController.success({ message: 'Details Updated successfully' });
      navigate('/members-list');
    });
  } else {
    dispatch(RegisterApi(registerResponse));
    if (register) {
      dispatch(OnboardingApi(postValues)).then(() => {
        notificationController.success({ message: 'Details Updated successfully' });
      });
    }
  }
};
export const setFormFields = ({ form, info, selectdUser }: Props) => {
  if (selectdUser) {
    form.setFieldsValue({
      FirstName: selectdUser?.firstName,
      LastName: selectdUser?.lastName,
      Email: selectdUser?.email,
      MobileNumber: selectdUser?.phoneNumber,
      ProfileFor: selectdUser?.profileType,
      Age: selectdUser?.age,
      Gender: selectdUser?.gender,
      Date_Of_Birth: selectdUser?.dateOfBirth,

      //basicDetails
      bodyType: selectdUser?.basicDetails?.bodyType,
      Weight: selectdUser?.basicDetails?.weight,

      //careerDetails
      Organization: selectdUser?.careerDetails?.organization,
      EducationInstitution: selectdUser?.careerDetails?.educationInstitution,

      //familyDetails
      FatherOccupation: selectdUser?.familyDetails?.fatherOccupation,
      MotherOccupation: selectdUser?.familyDetails?.motherOccupation,

      //generalDetails
      Ancestral_Origin: selectdUser?.generalDetails?.ancestralOrigin,
      Currency: selectdUser?.generalDetails?.currency,
      About_MySelf: selectdUser?.generalDetails?.description,
      Education: selectdUser?.generalDetails?.education,
      EmployedIn: selectdUser?.generalDetails?.employedIn,
      FamilyStatus: selectdUser?.generalDetails?.familyStatus,
      FamilyType: selectdUser?.generalDetails?.familyType,
      FamilyValue: selectdUser?.generalDetails?.familyValue,
      Height: selectdUser?.generalDetails?.height,
      Occupation: selectdUser?.generalDetails?.occupation,
      AnnualIncome: info?.generalDetails?.income,
      PhysicalStatus: selectdUser?.generalDetails?.physicalStatus,

      //horoscopeDetails
      Place_of_Birth: selectdUser?.horoscopeDetails?.placeOfBirth?.city,
      //Time_of_Birth: `${hours}:${minutes} ${hourPeriod}`,

      //lifeStyleDetails
      DietHabits: selectdUser?.lifeStyleDetails?.dietHabit,
      SmokingHabits: selectdUser?.lifeStyleDetails?.smokingHabit,
      DrinkingHabits: selectdUser?.lifeStyleDetails?.drinkingHabit,

      //locationDetails
      Country: selectdUser?.locationDetails?.country,
      State: selectdUser?.locationDetails?.state,
      City: selectdUser?.locationDetails?.city,

      //religionDetails
      Language_Known: selectdUser?.religionDetails?.motherTongue,
      MotherTongue: selectdUser?.religionDetails?.motherTongue,
      MaritalStatus: selectdUser?.religionDetails?.maritalStatus,
      Religion: selectdUser?.religionDetails?.religion,
      Caste: selectdUser?.religionDetails?.caste,
      Dosham: selectdUser?.religionDetails?.dosham,
      Dosham_Name: selectdUser?.religionDetails?.doshamName,
      Childrens: selectdUser?.religionDetails?.children,
      moonSign: selectdUser?.religiousDetails?.moonSign,
      Willing_to_inter_community: selectdUser?.religionDetails?.willingToInterCommunity,
      Number_of_Brothers: selectdUser?.religionDetails?.brothers,
      Number_of_Sisters: selectdUser?.religionDetails?.sisters,
      broCount: selectdUser?.religionDetails?.noOfBrothers,
      sisCount: selectdUser?.religionDetails?.noOfSisters,

      //religiousDetails
      Star: selectdUser?.religiousDetails?.star,

      //userVerificationDetails
      Select_ID: selectdUser?.userVerificationDetails?.idType,
      ID_Number: selectdUser?.userVerificationDetails?.idNumber,
      Children_count: selectdUser?.religionDetails?.noOfChildrens,

      //partnerPreferences
      About_from_PartnerFreference: selectdUser?.partnerPreferences?.aboutYourPartner,

      //basicInformation
      Agefrom: selectdUser?.partnerPreferences?.basicInformation?.age?.from,
      Ageto: selectdUser?.partnerPreferences?.basicInformation?.age?.to,
      Heightfrom: selectdUser?.partnerPreferences?.basicInformation?.height?.from,
      Heightto: selectdUser?.partnerPreferences?.basicInformation?.height?.to,
      Partner_MartialStatus: selectdUser?.partnerPreferences?.basicInformation?.martialStatus,
      Partner_MotherTongue: selectdUser?.partnerPreferences?.basicInformation?.motherTongue,
      Partner_PhysicalStatus: selectdUser?.partnerPreferences?.basicInformation?.physicalStatus,
      Partner_DietHabits: selectdUser?.partnerPreferences?.basicInformation?.dietHabit,
      Partner_SmokingHabits: selectdUser?.partnerPreferences?.basicInformation?.drinkingHabit,
      Partner_DrinkingHabits: selectdUser?.partnerPreferences?.basicInformation?.smokingHabit,

      //locationPreferences
      PartnerCountry: selectdUser?.partnerPreferences?.locationPreferences?.country,
      PartnerState: selectdUser?.partnerPreferences?.locationPreferences?.state,
      PartnerCity: selectdUser?.partnerPreferences?.locationPreferences?.city,

      //professionalPreferences
      PartnerEducation: selectdUser?.partnerPreferences?.professionalPreferences?.education,
      PartnerEmployedIn: selectdUser?.partnerPreferences?.professionalPreferences?.employedIn,
      PartnerOccupation: selectdUser?.partnerPreferences?.professionalPreferences?.occupation,

      //religiousPreferences
      PartnerCaste: selectdUser?.partnerPreferences?.religiousPreferences?.caste,
      PartnerReligion: selectdUser?.partnerPreferences?.religiousPreferences?.religion,
      PartnerDosham: selectdUser?.partnerPreferences?.religiousPreferences?.dosham,
      PartnerStar: selectdUser?.partnerPreferences?.religiousPreferences?.star,
      PartnermoonSign: selectdUser?.partnerPreferences?.religiousPreferences?.moonSign,
    });
  }
};

export const generatePassword = ({ form, setRandomPassword }: generatePW) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;"\'<>,.?/|\\';

  let generatedPassword = '';
  const passwordLength = 8;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedPassword += characters[randomIndex];
  }

  if (form && form.setFieldsValue) {
    form.setFieldsValue({ Password: generatedPassword });
  }

  if (setRandomPassword) {
    setRandomPassword(generatedPassword);
  }
};

export const handleFileChange = async ({
  event,
  uploadedimage,
  dispatch,
  setProfileList,
}: {
  event: ChangeEvent<HTMLInputElement>;
  uploadedimage?: any;
  dispatch?: any;
  setProfileList?: any;
  registerResponse?: any;
}) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    setProfileList(file);
    dispatch(uploadedimage());
  }
};

export const convertBase64 = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const base64String = reader.result as string;
      if (file?.type?.startsWith('image/')) {
        const image = new Image();
        image.src = base64String;
        image.onload = () => {
          resolve(base64String);
        };
        image.onerror = (error) => reject(error);
      } else {
        reject(new Error('The provided file is not an image.'));
      }
    });

    reader.readAsDataURL(file);
  });
};

export const handlePopupScroll = ({
  e,
  setLoadingMore,
  loadingMore,
  motherTounges,
  dispatch,
  page,
  setLimit,
  setPage,
  limit,
}: scrollProps) => {
  const { target } = e;
  if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loadingMore) {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
    setLimit((prev) => prev + 10);
    dispatch(motherTounges({ page: page, limit: limit }));
    setLoadingMore(false);
  }
};
