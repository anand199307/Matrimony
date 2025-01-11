import React from 'react';
import UserTable from './UserTable';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface User {
  firstName?: string;
  createdAt?: string;
  email?: string;
  emailVerified?: boolean;
  favouriteProfiles?: any;
  favouritedYourProfile?: any;
  idVerified?: boolean;
  ignoredProfiles?: any;
  isPhoneNumberVerified?: boolean;
  membership?: string;
  numOfLogins?: number;
  numOfLogouts?: number;
  numLogin?: number;
  numLogout?: number;
  phoneNumber: string;
  phoneNumberViewed?: any;
  profileId?: string;
  profileStatus?: number;
  profileViewed?: any;
  resetPasswordToken?: string;
  resetPasswordTokenExpireAt?: string;
  role?: string;
  status?: number;
  updatedAt?: string;
  uuid?: string;
  viewedYourProfile?: any;
  _id?: string;
  age?: number;
  gender?: string;
  lastName?: string;
  locationDetails?: {
    city?: string;
    country?: string;
    state?: string;
  };
  avatar?: string;
  basicDetails?: {
    weight?: string;
    bodyType?: string;
  };
  careerDetails?: {
    educationInstitution?: string;
    organization?: string;
  };
  familyDetails?: {
    fatherOccupation?: string;
    motherOccupation?: string;
  };
  generalDetails?: {
    height?: string;
    physicalStatus?: string;
    education?: string;
    employedIn?: string;
    occupation?: string;
    ancestralOrigin?: string;
    currency?: string;
    description?: string;
    familyStatus?: string;
    familyType?: string;
    familyValue?: string;
    income?: string;
  };
  horoscopeDetails?: {
    placeOfBirth?: {
      city?: string;
      country?: string;
      state?: string;
    };
    timeOfBirth?: {
      hours?: string;
      hourPeriod?: string;
      minutes?: string;
    };
  };
  lastLoginAt?: string;
  lastLogoutAt?: string;
  lifeStyleDetails?: {
    smokingHabit?: string;
    drinkingHabit?: string;
    dietHabit?: string;
  };
  partnerPreferences?: {
    aboutYourPartner?: string;
    basicInformation?: {
      age?: {
        from?: string;
        to?: string;
      };

      dietHabit?: string;
      drinkingHabit?: string;
      height?: {
        from?: string;
        to?: string;
      };
      martialStatus?: string;
      motherTongue?: string;
      physicalStatus?: string;
      smokingHabit?: string;
    };
    religiousPreferences?: {
      caste?: string;
      religion?: string;
      dosham?: string;
      star?: string;
      subCaste?: string;
    };
    professionalPreferences?: {
      education?: string;
      employedIn?: string;
      occupation?: string;
    };
    locationPreferences?: {
      city?: string;
      country?: string;
      state?: string;
    };
  };
  phoneNumberCode?: string;
  phoneNumberCodeExpireAt?: string;

  profileType?: string;
  religionDetails?: {
    caste?: string;
    religion?: string;
    dosham?: string;
    maritalStatus?: string;
    motherTongue?: string;
    noOfChildrens?: string;
    subCaste?: string;
    children?: string;
    willingToInterCommunity?: string;
  };
  religiousDetails?: {
    moonSign?: string;
    star?: string;
  };
}

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const MemberTable = ({ currentPage, setCurrentPage }: Props) => {
  const usersInfo = useAppSelector((state) => state.data.info);
  const users = usersInfo?.info;
  return (
    <div>
      <UserTable users={users?.response?.users} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default MemberTable;
