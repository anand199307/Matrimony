export interface Details {
  title: string;
  id: number;
  rowCount?: string;
  mode?: string | undefined;
  name?: string;
  info?: {
    id: number;
    name: string;
    placeholder?: string;
    title?: string;
    count?: string;
    icon?: string;
    mode?: string | undefined;

    typeOfField?: string;
    SelectRules?: {
      required?: boolean;

      message?: string;
    }[];
    rules?: {
      required?: boolean;
      pattern?: RegExp;
      message?: string;
      validator?: any;
      type?: string;
    }[];
    options?: {
      id: number | string;
      value: string | number;
      label: string | number;
    }[];
    fromOptions?: {
      id: number;
      value: string | number;
      label: string | number;
    }[];
    toOptions?: {
      id: number;
      value: string | number;
      label: string | number;
      placeholder?: string;
    }[];
    fromHeight?: {
      value: string | number;
      label: string | number;
    }[];
    toHeight?: {
      id: number;
      value: string | number;
      label: string | number;
    }[];
  }[];
}
export interface onBoradingProps {
  profileStatus?: number;
  religionDetails?: {
    motherTongue?: string;
    maritalStatus?: string;
    children?: string;
    noOfChildrens?: number;
    religion?: string;
    caste?: string;
    subCaste?: string;
    dosham?: string;
    willingToInterCommunity?: string;
  };
  locationDetails?: {
    country?: string;
    city?: string;
    state?: string;
  };
  generalDetails?: {
    height?: string;
    physicalStatus?: string;
    education?: string;
    employedIn?: string;
    occupation?: string;
    currency?: string;
    income?: string;
    familyStatus?: string;
    familyValue?: string;
    familyType?: string;
    ancestralOrigin?: string;
    description?: string;
  };
  careerDetails?: {
    educationInstitution?: string;
    organization?: string;
  };
  basicDetails?: {
    weight: string;
    bodyType: string;
  };
  lifeStyleDetails: {
    smokingHabit?: string;
    drinkingHabit?: string;
    dietHabit?: string;
  };
  religiousDetails?: {
    moonSign?: string;
    star?: string;
  };
  horoscopeDetails?: {
    placeOfBirth?: {
      country?: string;
      city?: string;
      state?: string;
    };
    timeOfBirth?: {
      hours?: string;
      minutes?: string;
      hourPeriod?: string;
    };
  };
  familyDetails?: {
    fatherOccupation?: string;
    motherOccupation?: string;
  };
  partnerPreferences?: {
    basicInformation?: {
      age?: {
        from?: string;
        to?: string;
      };
      height?: {
        from?: string;
        to?: string;
      };
      martialStatus?: any;
      motherTongue?: any;
      physicalStatus?: any;
      dietHabit?: any;
      smokingHabit?: any;
      drinkingHabit?: any;
    };
    religiousPreferences?: {
      religion?: any;
      caste?: any;
      subCaste?: any;
      star?: any;
      dosham?: any;
    };
    professionalPreferences?: {
      education?: any;
      employedIn?: any;
      occupation?: any;
    };
    locationPreferences?: {
      country?: any;
      city?: any;
      state?: any;
    };
    aboutYourPartner?: string;
  };
  userVerificationDetails?: {
    idType?: string;
    idNumber?: string;
    idDoc?: string;
  };
}
export interface Information {
  title?: string;
  id?: number;
  rowCount?: string;
  name?: string;
  info?: {
    id: number;
    name: string;
    title?: string;
    defaultvalue?: string;
    placeholder?: string;
    count?: string;
    xyz?: string;
    icon?: string;
    typeOfField?: string;
    Password?: string;
    SelectRules?: {
      required?: boolean;
      message?: string;
    }[];
    rules?: {
      required?: boolean;
      pattern?: RegExp;
      message?: string;
      validator?: any;
      type?: string;
    }[];
    options?: {
      id: number | string;
      value: string | number;
      label: string | number;
    }[];
    Currencyoptions?: {
      id: number;
      value: string;
      label: string;
    };
    Brotheroptions?: {
      id: number;
      value: string;
      label: string;
    }[];
    toOptions?: {
      id: number;
      value: string;
      label: string;
    }[];
    SibCountOptions?: {
      id?: number | string;
      value?: string | number;
      label?: string | number;
    }[];
    Siboptions?: {
      id: number;
      value: string;
      label: string;
    }[];
    RadioButtons?: {
      id: number;
      value: string;
      label: string;
    }[];
  }[];
}

export interface stateProps {
  code: string;
  countryId: string;
  externalId: number;
  lat: string;
  long: string;
  name: string;
  uuid: string;
  startDetails: {
    name: string;
    _id: string;
  }[];
}
export interface educationalProps {
  department: string;
  departmentDetails: {
    full_name: string;
    short_name: string;
    uuid: string;
    _id?: string | null;
  }[];
  uuid: string;
  _id?: string;
}
