import MemberInfocards from './MemberInfocards';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface UserInfo {
  title?: string;
  id?: number;
  rowCount?: string;
  name?: string;

  image?: {
    id?: number;
    image?: string;
  }[];

  info?: {
    id?: number;
    name?: string;
    placeholder?: string;
    typeOfFiled?: string;
  }[];
}

const Memberinfocard = () => {
  const memberInfo = useAppSelector((state) => state.member.info);
  const info = memberInfo?.userProfile;
  const selectdUser = useAppSelector((state) => state.member.basicInfo);
  const userDetails: UserInfo[] = [
    {
      id: 1,
      title: 'Basic Information:',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Profile for :',
          placeholder: info?.profileType ? info.profileType : 'Not Specified',
        },
        {
          id: 2,
          name: 'Gender :',
          placeholder: info?.gender,
        },
        {
          id: 3,
          name: 'Name :',
          placeholder:
            info?.firstName && info?.lastName
              ? info?.firstName + '' + info?.lastName
              : info?.lastName
              ? info?.lastName
              : info?.firstName
              ? info?.firstName
              : 'Not Specified',
        },
        {
          id: 4,
          name: 'Date of Birth :',
          placeholder: info?.dateOfBirth ? info?.dateOfBirth : 'Not Specified',
        },
        {
          id: 5,
          name: 'Email Id :',
          placeholder: selectdUser?.email ? selectdUser?.email : 'Not Specified',
        },
        {
          id: 6,
          name: 'Mobile Number :',
          placeholder: selectdUser?.phoneNumber ? selectdUser?.phoneNumber : 'Not Specified',
        },
        {
          id: 7,
          name: 'Physical status :',
          placeholder: info?.generalDetails?.physicalStatus ? info?.generalDetails?.physicalStatus : 'Not Specified',
        },
        {
          id: 8,
          name: 'Body Type :',
          placeholder: info?.basicDetails?.bodyType ? info?.basicDetails?.bodyType : 'Not Specified',
        },
        {
          id: 9,
          name: 'Weight :',
          placeholder: info?.basicDetails?.weight ? info?.basicDetails?.weight : 'Not Specified',
        },
        {
          id: 10,
          name: 'Height :',
          placeholder: info?.generalDetails?.height ? info?.generalDetails?.height : 'Not Specified',
        },
        {
          id: 11,
          name: 'Smoking Habits :',
          placeholder: info?.lifeStyleDetails?.smokingHabit ? info?.lifeStyleDetails?.smokingHabit : 'Not Specified',
        },
        {
          id: 12,
          name: 'Drinking Habits :',
          placeholder: info?.lifeStyleDetails?.drinkingHabit ? info?.lifeStyleDetails?.drinkingHabit : 'Not Specified',
        },
        {
          id: 13,
          name: 'Diet Habits :',
          placeholder: info?.lifeStyleDetails?.dietHabit ? info?.lifeStyleDetails?.dietHabit : 'Not Specified',
        },
      ],
    },
    {
      id: 2,
      title: 'Regligion Information :',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Raasi / Moon Sign :',
          placeholder: info?.religiousDetails?.moonSign ? info?.religiousDetails?.moonSign : 'Not Specified',
        },
        {
          id: 2,
          name: 'Star :',
          placeholder: info?.religiousDetails?.star ? info?.religiousDetails?.star : 'Not Specified',
        },
        {
          id: 3,
          name: 'Mother Tongue :',
          placeholder: info?.religionDetails?.motherTongue ? info?.religionDetails?.motherTongue : 'Not Specified',
        },
        // {
        //   id: 3,
        //   name: 'Mother Tongue :',
        //   placeholder: 'Tamil',
        // },
        {
          id: 4,
          name: 'Martial status :',
          placeholder: info?.religionDetails?.maritalStatus ? info?.religionDetails?.maritalStatus : 'Not Specified',
        },
        {
          id: 5,
          name: 'Religion :',
          placeholder: info?.religionDetails?.religion ? info?.religionDetails?.religion : 'Not Specified',
        },
        {
          id: 6,
          name: 'Caste :',
          placeholder: info?.religionDetails?.caste ? info?.religionDetails?.caste : 'Not Specified',
        },
        {
          id: 7,
          name: 'sub Caste :',
          placeholder: info?.religionDetails?.subCaste ? info.religionDetails?.subCaste : 'Not Specified',
        },
        {
          id: 8,
          name: 'Dosham :',
          placeholder: info?.religionDetails?.dosham ? info?.religionDetails?.dosham : 'Not Specified',
        },
        {
          id: 9,
          name: 'Willing to inter community :',
          placeholder: info?.religionDetails?.willingToInterCommunity
            ? info?.religionDetails?.willingToInterCommunity
            : 'Not Specified',
        },
      ],
    },
    {
      id: 3,
      title: 'Groom Current Location :',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Country :',
          placeholder: info?.locationDetails?.country ? info?.locationDetails?.country : 'Not Specified',
        },
        {
          id: 2,
          name: 'City :',
          placeholder: info?.locationDetails?.city ? info?.locationDetails?.city : 'Not Specified',
        },
        {
          id: 3,
          name: 'State :',
          placeholder: info?.locationDetails?.state ? info?.locationDetails?.state : 'Not Specified',
        },
      ],
    },
    {
      id: 4,
      title: 'Education & Occupational Information :',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Equcation :',
          placeholder: info?.generalDetails?.education ? info?.generalDetails?.education : 'Not Specified',
        },
        {
          id: 2,
          name: 'Qualification :',
          placeholder: 'Not Specified',
        },
        {
          id: 3,
          name: 'Employeed As :',
          placeholder: info?.generalDetails?.employedIn ? info?.generalDetails?.employedIn : 'Not Specified',
        },
        {
          id: 4,
          name: 'Occuption :',
          placeholder: info?.generalDetails?.occupation ? info?.generalDetails?.occupation : 'Not Specified',
        },
        {
          id: 5,
          name: 'Annual Income :',
          placeholder: info?.generalDetails?.income ? info?.generalDetails?.income : 'Not Specified',
        },
        {
          id: 6,
          name: 'Language known :',
          placeholder: 'Not Specified',
        },
      ],
    },
    {
      id: 5,
      title: 'Family Information & Background :',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Father Occupation :',
          placeholder: info?.familyDetails?.fatherOccupation ? info?.familyDetails?.fatherOccupation : 'Not Specified',
        },
        {
          id: 2,
          name: 'Mother Occupation :',
          placeholder: info?.familyDetails?.motherOccupation ? info?.familyDetails?.motherOccupation : 'Not Specified',
        },
        {
          id: 3,
          name: 'Family Status :',
          placeholder: info?.generalDetails?.familyStatus ? info?.generalDetails?.familyStatus : 'Not Specified',
        },
        {
          id: 4,
          name: 'Family Type :',
          placeholder: info?.generalDetails?.familyType ? info?.generalDetails?.familyType : 'Not Specified',
        },
        {
          id: 5,
          name: 'Family value :',
          placeholder: info?.generalDetails?.familyValue ? info?.generalDetails?.familyValue : 'Not Specified',
        },
        {
          id: 6,
          name: 'Ancestral Origin(Optional) :',
          placeholder: info?.generalDetails?.ancestralOrigin ? info?.generalDetails?.ancestralOrigin : 'Not Specified',
        },
        {
          id: 7,
          name: 'About My Self :',
          placeholder: info?.generalDetails?.description ? info?.generalDetails?.description : 'Not Specified',
        },
      ],
    },
    {
      id: 6,
      title: 'Horoscope Information :',
      rowCount: 'repeat(2,1fr)',

      info: [
        {
          id: 1,
          name: 'Place of Birth :',
          placeholder: info?.horoscopeDetails
            ? `${info?.horoscopeDetails?.placeOfBirth?.city} / ${info?.horoscopeDetails?.placeOfBirth?.state} / ${info?.horoscopeDetails?.placeOfBirth?.country}`
            : 'Not Specified',
        },
        {
          id: 2,
          name: 'Time of Birth :',
          placeholder: info?.horoscopeDetails
            ? `${info?.horoscopeDetails?.timeOfBirth?.hours} : ${info?.horoscopeDetails?.timeOfBirth?.minutes} : ${info?.horoscopeDetails?.timeOfBirth?.hourPeriod}`
            : 'Not Specified',
        },
        {
          id: 3,
          typeOfFiled: 'Button',
          placeholder: '',
        },
      ],
    },
  ];

  return <div>{userDetails && <MemberInfocards userDetails={userDetails} />}</div>;
};

export default Memberinfocard;
