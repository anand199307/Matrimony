/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/common/GlobalText';
import Header from '../../../components/app/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import SlideModal from '../../../components/auth/SlideModal';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {ICONS} from '../../../assets/Icons';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../../utilis/types/PrefernceVerification';
import TextInputCustom from '../../../components/common/TextInputCustom';
import AppApi from '../../../configurations/Api/AppApi';
import {
  smokingAndDrinkingHabits,
  dietHabits,
  physicalStatus,
} from '../../../utilis/feildStaticData/PrefernceVerification';
import {
  maritalStatus,
  employedIn,
} from '../../../utilis/feildStaticData/Registeration';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';
import CardHeader from '../../../components/app/CardHeading';
import Button from '../../../components/common/Button';
import Toast from 'react-native-toast-message';

//redux
import {useSelector} from 'react-redux';
import {useDebounce} from '../../../utilis/hooks/debounc';
import {API_LIMIT, DEBOUNCE_TIME} from '../../../utilis/helper/apiHelpers';

const PartnerPreferences = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [feildValue, setFieldValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [zodiacDetails, setZodiacDetails] = useState<any[]>([]);
  const [starDetails, setStarDetails] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [dhosams, setDhosams] = useState<any[]>([]);
  const [selectedData, setselectedData] = useState<any[]>();
  const [caste, setCaste] = useState<any[]>([]);
  const [religion, setReligion] = useState<any[]>([]);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [profession, setProfessions] = useState<any[]>([]);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  // const [searchValue, setsearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchUserInforamtion = async () => {
    try {
      const resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        let info = resp?.data?.response?.data;
        setForm({
          ...form,
          ageFrom: info?.partnerPreferences?.basicInformation?.age?.from,
          ageTo: info?.partnerPreferences?.basicInformation?.age?.to,
          maritalStatus:
            info?.partnerPreferences?.basicInformation?.martialStatus,
          heightFrom: info?.partnerPreferences?.basicInformation?.height?.from,
          heightTo: info?.partnerPreferences?.basicInformation?.height?.to,
          physicalStatus:
            info?.partnerPreferences?.basicInformation?.physicalStatus,
          smokingHabits:
            info?.partnerPreferences?.basicInformation?.smokingHabit,
          drinkingHabits:
            info?.partnerPreferences?.basicInformation?.drinkingHabit,
          dietHabits: info?.partnerPreferences?.basicInformation?.dietHabit,
          Education:
            info?.partnerPreferences?.professionalPreferences?.education,
          employedIn:
            info?.partnerPreferences?.professionalPreferences?.employedIn,
          Desingnation:
            info?.partnerPreferences?.professionalPreferences?.occupation,
          location: info?.partnerPreferences?.locationPreferences?.country,
          city: info?.partnerPreferences?.locationPreferences?.city,
          state: info?.partnerPreferences?.locationPreferences?.state,
          religion: info?.partnerPreferences?.religiousPreferences?.religion,
          caste: info?.partnerPreferences?.religiousPreferences?.caste,
          Star: info?.partnerPreferences?.religiousPreferences?.star,
          dosham: info?.partnerPreferences?.religiousPreferences?.dosham,
          raasiAndMoonSign:
            info?.partnerPreferences?.religiousPreferences?.moonSign,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('error in profile info page', error.message);
    }
  };

  useEffect(() => {
    fetchUserInforamtion();
  }, []);

  const RegisterFunc = () => {
    const body = {
      profileStatus: 4,
      partnerPreferences: {
        basicInformation: {
          age: {
            from: form.ageFrom,
            to: form.ageTo,
          },
          height: {
            from: form.heightFrom,
            to: form.heightTo,
          },
          martialStatus: form.maritalStatus,
          physicalStatus: form.physicalStatus,
          dietHabit: form.dietHabits,
          smokingHabit: form.smokingHabits,
          drinkingHabit: form.drinkingHabits,
        },
        religiousPreferences: {
          religion: form.religion,
          caste: form.caste,
          star: form.Star,
          moonSign: form.raasiAndMoonSign,
          dosham: form.dosham !== '' ? form.dosham : ['Any'],
        },
        professionalPreferences: {
          education: form.Education,
          employedIn: form.employedIn,
          occupation: form.Desingnation,
        },
        locationPreferences: {
          country: form.location,
          city: form.city,
          state: form.state,
        },
      },
    };
    updateProfile(body);
  };
  // Toast
  const showToast = (message: {
    heading?: string;
    messageType?: string;
    details?: string;
  }) => {
    Toast.show({
      type: message?.messageType, // 'success', 'error', 'info', or 'custom'
      text1: message?.heading,
      text2: message?.details,
      position: 'top', // 'top' or 'bottom'
      visibilityTime: 2000, // 3 seconds
      topOffset: 100,
      autoHide: true,
    });
  };
  const updateProfile = async (body: {
    partnerPreferences: {
      basicInformation: {
        age: {from: string; to: string};
        height: {from: string; to: string};
        martialStatus: string;
        physicalStatus: string;
        dietHabit: any;
        smokingHabit: string;
        drinkingHabit: string;
      };
      religiousPreferences: {
        religion: any;
        caste: any;
        star: any;
        dosham: any;
      };
      professionalPreferences: {
        education: any;
        employedIn: any;
        occupation: any;
      };
      locationPreferences: {country: string; city: string; state: string};
    };
  }) => {
    try {
      let res = await AppApi.updateProfile({body}, currentUser?.uuid);
      if (res.status === 200) {
        showToast({
          messageType: 'success',
          heading: 'Info',
          details: 'Profile Updated Successfully',
        });
        navigation.goBack();
      }
    } catch (error) {
      showToast({
        messageType: 'error',
        heading: 'Info',
        details: 'Somthing went worng',
      });
      console.log('profile update API error', error);
    }
  };

  //  function to filter star details
  const getStar = (inputArray: string | string[]) => {
    // Check if "Any" is in the inputArray
    if (inputArray.includes('Any')) {
      // If "Any" is present, return all star details
      const resp = zodiacDetails.flatMap(zodiac => zodiac.startDetails);
      setStarDetails(resp);
    } else {
      // Filter star details based on the inputArray
      const filteredStarDetails: React.SetStateAction<any[]> = [];
      zodiacDetails.forEach(zodiac => {
        if (inputArray.includes(zodiac.name)) {
          filteredStarDetails.push(...zodiac.startDetails);
        }
      });
      setStarDetails(filteredStarDetails);
    }
  };

  const searchURL = {
    location: (param: string) => `country?search=${param}`,
    state: (id: string, param: string, page: number) =>
      `country/${id}/states?limit=${API_LIMIT}&page=${page}&search${
        param ? `=${param}` : ''
      }`,
    city: (stateID: string, param: string, page: number) =>
      `states/${stateID}/cities?page=${page}&limit=${API_LIMIT}&search${
        param ? `=${param}` : ''
      }`,
    caste: (page: number, limit: number, query: string) =>
      AppApi.caste(page, limit, query),
    education: (query: string) => AppApi.education(query),
    profession: (page: number, limit: number, query: string) =>
      AppApi.getProfessions(page, limit, query),
  };
  const [stateId, setStateId] = useState('');

  const [countryId, setCountryId] = useState('');

  const [cityCurrentPage, setCityCurrentPage] = useState(2);
  const [cityTotalCount, setCityTotalCount] = useState(0);

  const [stateCurrentPage, setStateCurrentPage] = useState(2);
  const [stateTotalCount, setStateTotalCount] = useState(0);

  const [casteCurrentPage, setCasteCurrentPage] = useState(2);
  const [casteTotalCount, setCasteTotalCount] = useState(0);

  // const [eduCurrentPage, setEduCurrentPage] = useState(2);
  // const [eduTotalCount, setEduTotalPage] = useState(0);

  const [professionCurrentPage, setProfessionCurrentPage] = useState(2);
  const [professionTotalCount, setProfessionTotalCount] = useState(0);
  //loading
  const [cityListLoading, setCityListLoading] = useState(false);
  const [stateListLoading, setStateListLoading] = useState(false);
  const [casteListLoading, setCasteListLoading] = useState(false);
  const [professionListLoading, setProfessionListLoading] = useState(false);
  // const [eduListLoading, setEduListLoading] = useState(false);

  const [stateQuery, setStateQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [eduQuery, setEduQuery] = useState('');
  const [designationQuery, setDesignationQuery] = useState('');
  const [casteQuery, setCasteQuery] = useState('');

  const stateBounceQuery = useDebounce(stateQuery, DEBOUNCE_TIME);
  const cityBounceQuery = useDebounce(cityQuery, DEBOUNCE_TIME);
  const educationBounceQuery = useDebounce(eduQuery, DEBOUNCE_TIME);
  const ProfessionBounceQuery = useDebounce(designationQuery, DEBOUNCE_TIME);
  const casteBounceQuery = useDebounce(casteQuery, DEBOUNCE_TIME);

  const searchPreference = async (
    ID: string,
    searchQuery: string,
    setCount: (count: number) => void,
    setPage: (page: number) => void,
    currentPage: number,
    setData: (data: any[]) => void,
    api: 'states' | 'cities',
    url: (id: string, query: string, page: number) => string,
    totalCount: number,
    initialFunction: (id: string, fromSearch: boolean) => void,
  ) => {
    const fallbackValue = [...list];
    const fallbackLength = totalCount;
    if (!searchQuery) {
      initialFunction(ID, true);
      return;
    }
    try {
      setIsSearching(true);
      const {
        data: {response},
      } = await AppApi[api]({
        url: url(ID, searchQuery, 1),
      });
      // setSearchNotFound('');
      console.log({response: response.data});

      if (response.count === 0) {
        setCount(0);
        setList([]);
        // setSearchNotFound('No States Found');
        setData([]);
        return;
      }

      setList([...response.data]);
      setData([...response.data]);
      setCount(response.count);
      setPage(2);
    } catch (error) {
      console.log('Error fetching states', error);
      setList([...fallbackValue]);
      setCount(fallbackLength);
    } finally {
      setIsSearching(false);
    }
  };

  const searchOtherPrefernce = async (
    setCount: (count: number) => void,
    setPage: (page: number) => void,
    setData: (data: any[]) => void,
    api: 'caste' | 'profession',
    query: string,
    initFunc: (headerLoader: boolean) => void,
  ) => {
    if (!query) {
      initFunc(true);
    }
    const fallback = [...list];
    try {
      setIsSearching(true);
      const {
        data: {
          response: {data, count},
        },
      } = await searchURL[api](1, API_LIMIT, query);
      console.log({count});

      if (!count) {
        setData([]);
        setList([]);
        setCount(0);
      }
      setData([...data]);
      setList([...data]);
      setCount(count);
      setPage(2);
    } catch (error) {
      console.log('error in search');
      setList([...fallback]);
    } finally {
      setIsSearching(false);
    }
  };

  //
  useEffect(() => {
    searchEducation();
  }, [educationBounceQuery]);

  //
  useEffect(() => {
    searchOtherPrefernce(
      setProfessionTotalCount,
      setProfessionCurrentPage,
      setProfessions,
      'profession',
      ProfessionBounceQuery,
      fetchProfiessions,
    );
  }, [ProfessionBounceQuery]);

  //
  useEffect(() => {
    searchOtherPrefernce(
      setCasteTotalCount,
      setCasteCurrentPage,
      setCaste,
      'caste',
      casteBounceQuery,
      fetchCaste,
    );
  }, [casteBounceQuery]);

  useEffect(() => {
    searchPreference(
      countryId,
      stateBounceQuery,
      setStateTotalCount,
      setStateCurrentPage,
      stateCurrentPage,
      setStates,
      'states',
      searchURL.state,
      cityTotalCount,
      getState,
      // countryId,
    );
  }, [stateBounceQuery]);

  //
  useEffect(() => {
    searchPreference(
      stateId,
      cityBounceQuery,
      setCityTotalCount,
      setCityCurrentPage,
      cityCurrentPage,
      setCities,
      'cities',
      searchURL.city,
      stateTotalCount,
      getCities,
    );
  }, [cityBounceQuery]);

  // fetch cities
  useEffect(() => {
    if (stateId) {
      getCities(stateId);
    } else {
      setForm({...form, city: ''});
    }
  }, [stateId]);

  //fetch states
  useEffect(() => {
    if (countryId) {
      getState(countryId);
    }
  }, [countryId]);

  // const hasStat

  // fetch country
  const fetchCountry = () => {
    AppApi.country()
      .then(res => {
        if (res?.data?.response?.country && res?.data?.statusCode === 200) {
          console.log({country: res.data.response});

          setCountryList([res?.data?.response?.country]);
          setCountryId(res?.data?.response?.country?.uuid);
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'country');
      });
  };

  //  fetch sate details
  const getState = (country_uuid: any, fromSearch: boolean = false) => {
    if (country_uuid) {
      setStateListLoading(true);
      const url = searchURL.state(country_uuid, stateBounceQuery, 1);
      AppApi.states({url})
        .then(({data, status}) => {
          if (status === 200) {
            setStates(data?.response?.data);
            setStateTotalCount(data?.response?.count);
            setStateCurrentPage(2);
            fromSearch && setList([...data?.response?.data]);
          }
        })
        .catch(error => console.log('states-error', error))
        .finally(() => {
          setStateListLoading(false);
        });
    } else {
      console.log('no country ID found');
    }
  };

  //  get city list
  const getCities = (stateID: string, fromSearch: boolean = false) => {
    if (stateID) {
      setCityListLoading(true);

      const url = searchURL.city(stateID, cityBounceQuery, 1);
      AppApi.cities({url})
        .then(({data, status}) => {
          if (status === 200) {
            setCities(data?.response?.data);
            setCityTotalCount(data?.response?.count);
            setCityCurrentPage(2);
            fromSearch && setList([...data?.response?.data]);
          }
        })
        .catch(({error}) => console.log('cities-error', error))
        .finally(() => {
          setCityListLoading(false);
        });
    } else {
      console.log('No state were selected');
    }
  };

  // const [state]

  const updateFunc = async (
    loader: boolean,
    setLoader: (state: boolean) => void,
    setCurrentPage: (page?: any) => void,
    currentPage: number,
    api: 'states' | 'cities',
    url: (id: string, query: string, page: number) => string,
    setData: (prev?: any) => void,
    fetchNext: boolean,
    query: string,
    ID: string,
  ) => {
    if (loader) {
      return;
    }
    if (fetchNext) {
      setLoader(true);
      setCurrentPage((prev: number) => prev + 1);

      try {
        const {
          data: {response},
        } = await AppApi[api]({url: url(ID, query, currentPage)});
        // console.log({response});

        setList(prev => [...prev, ...response.data]);
        setData((prev: any) => [...prev, ...response.data]);
      } catch (error) {
        console.log(`error loading state page ${currentPage}`, error);
      } finally {
        setLoader(false);
      }
    }
  };

  const updateOtherPreference = async (
    loader: boolean,
    setLoader: (state: boolean) => void,
    setCurrentPage: (page?: any) => void,
    currentPage: number,
    api: 'caste' | 'profession',
    setData: (prev?: any) => void,
    fetchNext: boolean,
    query: string,
  ) => {
    if (loader) {
      return;
    }
    // if (list.length < totalCasteCount) {
    if (fetchNext) {
      setLoader(true);
      setCurrentPage((prev: number) => prev + 1);
      try {
        const {
          data: {
            response: {data: contentToAppend},
          },
        } = await searchURL[api](currentPage, API_LIMIT, query);
        setList(prev => [...prev, ...contentToAppend]);
        setData((prev: any) => [...prev, ...contentToAppend]);
      } catch (error) {
        console.log('error fetching caste');
      } finally {
        setLoader(false);
      }
    }
  };

  // education search function.
  const searchEducation = async () => {
    const fallback = [...list];
    if (!educationBounceQuery) {
      fetchEducationList(true);
      return;
    }
    try {
      setIsSearching(true);
      const {
        data: {
          response: {data, count},
        },
      } = await searchURL.education(educationBounceQuery);
      if (!count) {
        // setSearchNotFound('No Domain Found');
        setList([]);
        return;
      }
      const converted = convertedEducationList(data);
      // setSearchNotFound('');
      setList(converted);
    } catch (error) {
      console.log('error searching', 'error');
      setList([...fallback]);
    } finally {
      setIsSearching(false);
    }
  };
  const chooseScrollFunc = (choose: string) => {
    console.log({choose});
    switch (choose) {
      case 'state':
        return updateFunc(
          stateListLoading,
          setStateListLoading,
          setStateCurrentPage,
          stateCurrentPage,
          'states',
          searchURL.state,
          setStates,
          list.length < stateTotalCount,
          stateBounceQuery,
          countryId,
        );
      case 'city':
        return updateFunc(
          cityListLoading,
          setCityListLoading,
          setCityCurrentPage,
          cityCurrentPage,
          'cities',
          searchURL.city,
          setCities,
          list.length < cityTotalCount,
          cityBounceQuery,
          stateId,
        );
      case 'caste':
        return updateOtherPreference(
          casteListLoading,
          setCasteListLoading,
          setCasteCurrentPage,
          casteCurrentPage,
          'caste',
          setCaste,
          list.length < casteTotalCount,
          casteBounceQuery,
        );
      case 'Desingnation':
        return updateOtherPreference(
          professionListLoading,
          setProfessionListLoading,
          setProfessionCurrentPage,
          professionCurrentPage,
          'profession',
          setProfessions,
          list.length < professionTotalCount,
          ProfessionBounceQuery,
        );
      default:
        console.log('no action specified', choose);
        return () => {};
    }
  };

  // const searchVisible = (toShow: string) => {
  //   const toCheck = (val: number) => {
  //     return val > API_LIMIT;
  //   };
  //   switch (toShow) {
  //     case 'state':
  //       return toCheck(stateTotalCount);
  //     case '':
  //       return;
  //     default:
  //       return true;
  //   }
  // };

  //  star details
  const fetchZodiacDetails = () => {
    AppApi.zodiacDetails()
      .then(res => {
        if (res?.status === 200) {
          setZodiacDetails(res?.data?.response?.data);
        }
      })
      .catch(error => {
        console.log('zodiacDetails-error', error);
      });
  };

  //  fetch List of Dhosams
  const fetchDosamList = async () => {
    try {
      const resp = await AppApi.getDoshamList();
      if (resp.status === 200) {
        setDhosams(resp.data?.response?.data);
      }
    } catch (error) {
      console.log('error in dosham list api');
    }
  };

  const fetchCaste = async (fromSearch: boolean = false) => {
    fromSearch ? setIsSearching(true) : setCasteListLoading(true);
    try {
      let res = await AppApi.caste(1, API_LIMIT, '');
      if (res.status === 200) {
        setCaste(res.data?.response?.data);
        fromSearch && setList(res.data?.response?.data);
        setCasteCurrentPage(2);
        setCasteTotalCount(res.data?.response?.count);
      }
    } catch (error) {
      console.log('error in caste API', error);
    } finally {
      fromSearch ? setIsSearching(false) : setCasteListLoading(false);
    }
  };

  const fetchReligius = async () => {
    try {
      let res = await AppApi.religion(1, API_LIMIT, '');
      if (res.status === 200) {
        setReligion(res.data?.response?.data);
      }
    } catch (error) {
      console.log('error in relgious API', error);
    }
  };

  const fetchEducationList = async (fromSearch: boolean = false) => {
    fromSearch && setIsSearching(true);
    try {
      let res = await AppApi.education('');
      if (res.status === 200) {
        convertedEducationList(res.data?.response?.data);
      }
    } catch (error) {
      console.log('error in educationList api', error);
    } finally {
      setIsSearching(false);
    }
  };
  //  convertEducation list
  const convertedEducationList = (data: any[]) => {
    let educationList: any = [];
    data?.map((item: any) => {
      educationList.push({id: Math.random(), heading: item?.department});
      item?.departmentDetails?.map((nestedItem: any) => {
        educationList.push({
          id: Math.random(),
          name: nestedItem?.short_name,
        });
      });
    });
    setEducation(educationList);
    return educationList;
  };

  const fetchProfiessions = async (fromSearch: boolean = false) => {
    fromSearch ? setIsSearching(true) : setProfessionListLoading(true);
    try {
      let resp = await AppApi.getProfessions(1, API_LIMIT, '');
      if (resp.status === 200) {
        setProfessions(resp.data?.response?.data);
        fromSearch && setList(resp.data?.response?.data);
        setProfessionTotalCount(resp.data?.response?.count);
        setProfessionCurrentPage(2);
      }
    } catch (error) {
      console.log('error in profission list', error);
    } finally {
      fromSearch ? setIsSearching(false) : setProfessionListLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchDosamList();
    fetchZodiacDetails();
    fetchCaste();
    fetchReligius();
    fetchEducationList();
    fetchProfiessions();
  }, []);

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Marital Status':
        settingModal('maritalStatus', maritalStatus), setChecked(true);
        break;
      case 'Physical Status':
        settingModal('physicalStatus', physicalStatus), setChecked(true);
        break;
      case 'Smoking Habits':
        settingModal('smokingHabits', smokingAndDrinkingHabits),
          setChecked(false);
        break;
      case 'Drinking Habits':
        settingModal('drinkingHabits', smokingAndDrinkingHabits),
          setChecked(false);
        break;
      case 'Diet Habits':
        settingModal('dietHabits', dietHabits), setChecked(true);
        break;
      case 'Religion':
        settingModal('religion', religion), setChecked(true);
        break;
      case 'Caste':
        settingModal('caste', caste), setChecked(true);
        break;
      case 'Dosham':
        settingModal('dosham', dhosams), setChecked(true);
        break;
      case 'Raasi/MoonSign':
        settingModal('raasiAndMoonSign', zodiacDetails), setChecked(true);
        break;
      case 'Star':
        settingModal('Star', starDetails), setChecked(true);
        break;
      case 'Location':
        settingModal('location', countryList), setChecked(true);
        break;
      case 'State':
        settingModal('state', states), setChecked(true);
        break;
      case 'City':
        settingModal('city', cities), setChecked(true);
        break;
      case 'Education':
        settingModal('Education', education), setChecked(true);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn), setChecked(true);
        break;
      case 'Designation':
        settingModal('Desingnation', profession), setChecked(true);
      default:
        null;
    }
  };

  const settingModal = (fieldName: string, data: any) => {
    console.log({fieldName});

    setFieldValue(fieldName);
    setModalVisible(true);
    if (
      fieldName === 'smokingHabits' ||
      fieldName === 'drinkingHabits' ||
      fieldName === 'location'
    ) {
      setList([...data]);
    } else {
      let value: any = [{id: 0, name: 'Any', isActive: false}];
      data?.forEach((item: any) => value.push({...item, isActive: false}));
      setList([...value]);
    }
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData);
    }
  }, [modalVisible]);

  useEffect(() => {
    const arrList = list;
    const verifiedList = arrList?.filter(item => item?.isActive === true);
    const existsInData = verifiedList?.map(item => item.name);
    if (existsInData?.includes('Any')) {
      setselectedData(['Any']);
    } else {
      setselectedData(existsInData);
    }
  }, [list]);

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value});
        break;
      case 'maritalStatus':
        setForm({...form, maritalStatus: value});
        break;
      case 'physicalStatus':
        setForm({...form, physicalStatus: value});
        break;
      case 'smokingHabits':
        setForm({...form, smokingHabits: value?.name});
        break;
      case 'drinkingHabits':
        setForm({...form, drinkingHabits: value?.name});
        break;
      case 'dietHabits':
        setForm({...form, dietHabits: value});
        break;
      case 'religion':
        setForm({...form, religion: value});
        break;
      case 'caste':
        setForm({...form, caste: value});
        break;
      case 'dosham':
        setForm({...form, dosham: value});
        break;
      case 'raasiAndMoonSign':
        setForm({
          ...form,
          raasiAndMoonSign: value,
        }),
          getStar(value);
        break;
      case 'Star':
        setForm({...form, Star: value});
        break;
      case 'location':
        setForm({...form, location: value});
        break;
      case 'state':
        setForm({...form, state: value});
        const state = states.find(item => item?.name === value.join());
        setStateId(state?.uuid);

        break;
      case 'city':
        setForm({...form, city: value, cityError: ''});
        break;
      case 'Education':
        setForm({...form, Education: value});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value});
        break;
      case 'Desingnation':
        setForm({...form, Desingnation: value});
      default:
        null;
    }
    setModalVisible(false);
  };

  const addArrayData = (data: any) => {
    if (data?.name === 'Any') {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.name === 'Any') {
            if (data?.name === 'Any' && data?.isActive === true) {
              return {...item, isActive: false, disabled: false};
            } else {
              return item?.name === 'Any'
                ? {...item, isActive: true, disabled: false}
                : {...item, isActive: true, disabled: true};
            }
          } else {
            return {...item, isActive: false, disabled: false};
          }
        }),
      );
    } else {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.name === item?.name && data?.isActive) {
            return {...item, isActive: false, disabled: false};
          } else if (data?.name === item?.name && !data?.isActive) {
            return {...item, isActive: true, disabled: false};
          } else {
            return {...item};
          }
        }),
      );
    }
  };
  const navFunc = () => navigation.navigate('Profile');
  return (
    <View style={styles.container}>
      <Header title="Partner Preferences" navFunc={navFunc} />
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <ScrollView
            style={styles.body}
            contentContainerStyle={{alignItems: 'center'}}>
            <Text style={styles.greyContent}>
              Matches will exactly meet your partner preferences.
            </Text>
            <Text style={styles.greyContent}>Tap on the field to edit</Text>
            <View style={[styles.card, styles.shadow]}>
              <CardHeader
                src={ICONS.basicPreferneces}
                Title="Basic Preferences"
              />
              <Text style={styles.sectionHeading}>Age</Text>
              <View style={styles.row}>
                <View style={styles.wrapper}>
                  <TextInputCustom
                    value={form.ageFrom}
                    error={form.ageFromError}
                    activeIcon={toogleFunc}
                    onChangeText={ageFrom =>
                      setForm({...form, ageFrom, ageFromError: ''})
                    }
                    placeholder="18"
                    label="From"
                  />
                </View>
                <View style={styles.wrapper}>
                  <TextInputCustom
                    placeholder="25"
                    value={form.ageTo}
                    error={form.ageToError}
                    activeIcon={toogleFunc}
                    onChangeText={ageTo =>
                      setForm({...form, ageTo, ageToError: ''})
                    }
                    label="To"
                  />
                </View>
              </View>
              <Text style={styles.sectionHeading}>Height</Text>
              <View style={styles.row}>
                <View style={styles.wrapper}>
                  <TextInputCustom
                    value={form.heightFrom}
                    error={form.heightFromError}
                    activeIcon={toogleFunc}
                    onChangeText={heightFrom =>
                      setForm({...form, heightFrom, heightFromError: ''})
                    }
                    placeholder="4.5"
                    label="From"
                  />
                </View>
                <View style={styles.wrapper}>
                  <TextInputCustom
                    placeholder="5"
                    value={form.heightTo}
                    error={form.heightToError}
                    activeIcon={toogleFunc}
                    onChangeText={heightTo =>
                      setForm({...form, heightTo, heightToError: ''})
                    }
                    label="To"
                  />
                </View>
              </View>
              <TextInputCustom
                placeholder="Select"
                value={form.maritalStatus}
                error={form.maritalStatusError}
                activeIcon={toogleFunc}
                label="Marital Status"
                backIcon={ICONS.rightArrowInput}
                numberOfLines={1}
                width={'90%'}
              />
            </View>
            <View style={[styles.card, styles.shadow]}>
              <CardHeader
                src={ICONS.religiousPreferences}
                Title="Religious Preferences"
              />
              <TextInputCustom
                placeholder="Select"
                value={form.religion}
                error={form.religionError}
                activeIcon={toogleFunc}
                label="Religion"
                backIcon={ICONS.rightArrowInput}
                numberOfLines={1}
                width={'90%'}
              />
              <TextInputCustom
                placeholder="Select "
                value={form.caste}
                error={form.casteError}
                activeIcon={toogleFunc}
                label="Caste"
                backIcon={ICONS.rightArrowInput}
                numberOfLines={1}
                width={'90%'}
              />
              <TextInputCustom
                placeholder="Select"
                label="Raasi/MoonSign"
                value={form.raasiAndMoonSign}
                error={form.raasiAndMoonSignError}
                activeIcon={toogleFunc}
                backIcon={ICONS.rightArrowInput}
                numberOfLines={1}
                width={'90%'}
              />
              <TextInputCustom
                placeholder={
                  starDetails.length ? 'select' : 'Select Raasi/MoonSign'
                }
                label="Star"
                value={starDetails.length ? form.Star : ''}
                error={form.StarError}
                activeIcon={toogleFunc}
                backIcon={ICONS.rightArrowInput}
                numberOfLines={1}
                width={'90%'}
                specialDisabledField={!!starDetails.length}
              />
              {currentUser?.religionDetails?.dosham !== '' && (
                <TextInputCustom
                  placeholder="Select "
                  value={form.dosham}
                  error={form.doshamError}
                  activeIcon={toogleFunc}
                  label="Dosham"
                  backIcon={ICONS.rightArrowInput}
                  numberOfLines={1}
                  width={'90%'}
                />
              )}
            </View>
            {!showMore && (
              <TouchableOpacity onPress={() => setShowMore(true)}>
                <Text
                  style={[styles.greyContent, {color: colors.SECONDARY_COLOR}]}>
                  Show More
                </Text>
              </TouchableOpacity>
            )}
            {showMore && (
              <>
                <View style={[styles.card, styles.shadow]}>
                  <CardHeader
                    src={ICONS.LocationPreferences}
                    Title="Location Preferences"
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Location"
                    value={form.location}
                    error={form.locationError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    width={'90%'}
                  />
                  <View style={styles.row}>
                    <View style={styles.wrapper}>
                      <TextInputCustom
                        placeholder="Select"
                        value={form.state}
                        backIcon={ICONS.rightArrowInput}
                        error={form.stateError}
                        activeIcon={toogleFunc}
                        onChangeText={state =>
                          setForm({...form, state, stateError: ''})
                        }
                        // placeholder={}
                        label="State"
                        width={'80%'}
                        editable={!!countryId && states.length !== 0}
                      />
                    </View>
                    <View style={styles.wrapper}>
                      <TextInputCustom
                        value={cities.length ? form.city : 'select state'}
                        error={form.cityError}
                        activeIcon={toogleFunc}
                        onChangeText={city =>
                          setForm({...form, city, cityError: ''})
                        }
                        backIcon={stateId ? ICONS.rightArrowInput : false}
                        placeholder="Select"
                        label="City"
                        width={stateId ? '70%' : '90%'}
                        editable={!cityListLoading}
                        // editable={true}
                        specialDisabledField={stateId ? true : false}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.card, styles.shadow]}>
                  <CardHeader
                    src={ICONS.ProfessionalPreferences}
                    Title="Professional Preferences"
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Education"
                    value={form.Education}
                    error={form.EducationError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Employed In"
                    value={form.employedIn}
                    error={form.employedInError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Designation"
                    value={form.Desingnation}
                    error={form.DesingnationError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                </View>
                <View style={[styles.card, styles.shadow]}>
                  <CardHeader
                    src={ICONS.OtherPreferences}
                    Title="Other Preferences"
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Physical Status"
                    value={form.physicalStatus}
                    error={form.physicalStatusError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                  <TextInputCustom
                    placeholder="Select"
                    value={form.dietHabits}
                    error={form.dietHabitsError}
                    activeIcon={toogleFunc}
                    label="Diet Habits"
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                  <TextInputCustom
                    placeholder="Select"
                    label="Smoking Habits"
                    value={form.smokingHabits}
                    error={form.smokingHabitsError}
                    activeIcon={toogleFunc}
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                  <TextInputCustom
                    placeholder="Select"
                    value={form.drinkingHabits}
                    error={form.drinkingHabitsError}
                    activeIcon={toogleFunc}
                    label="Drinking Habits"
                    backIcon={ICONS.rightArrowInput}
                    numberOfLines={1}
                    width={'90%'}
                  />
                </View>
                <TouchableOpacity onPress={() => setShowMore(false)}>
                  <Text
                    style={[
                      styles.greyContent,
                      {color: colors.SECONDARY_COLOR},
                    ]}>
                    Show Less
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <Button title={'Save Changes'} MV={10} onPressFunc={RegisterFunc} />
          </ScrollView>
        )}
      </View>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        search={true}
        checkbox={checked}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        loading={
          cityListLoading ||
          stateListLoading ||
          casteListLoading ||
          professionListLoading
        }
        isSearching={isSearching}
        searchName={
          feildValue === 'state'
            ? stateQuery
            : feildValue === 'city'
            ? cityQuery
            : feildValue === 'caste'
            ? casteQuery
            : feildValue === 'Education'
            ? eduQuery
            : feildValue === 'Desingnation'
            ? designationQuery
            : ''
        }
        setsearchValue={
          feildValue === 'state'
            ? setStateQuery
            : feildValue === 'city'
            ? setCityQuery
            : feildValue === 'caste'
            ? setCasteQuery
            : feildValue === 'Education'
            ? setEduQuery
            : feildValue === 'Desingnation'
            ? setDesignationQuery
            : () => {}
        }
        scrollFunction={() => {
          chooseScrollFunc(feildValue);
        }}
      />
      <Toast />
    </View>
  );
};

export default PartnerPreferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.8,
    padding: 8,
  },
  greyContent: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.S_TEXT,
    lineHeight: 20,
    textAlign: 'center',
    marginVertical: 2,
  },
  shadow: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  card: {
    width: '95%',
    padding: '5%',
    borderRadius: 6,
    marginVertical: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginBottom: 5,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  marginBottom: {
    height: 50,
  },
  wrapper: {
    width: '45%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
