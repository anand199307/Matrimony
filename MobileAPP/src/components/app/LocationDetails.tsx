/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import TextInputCustom from '../common/TextInputCustom';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../utilis/types/PrefernceVerification';
import {ICONS} from '../../assets/Icons';
import SlideModal from '../auth/SlideModal';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import AppApi from '../../configurations/Api/AppApi';
import {Alert} from 'react-native';
import {API_LIMIT, DEBOUNCE_TIME} from '../../utilis/helper/apiHelpers';
import {useDebounce} from '../../utilis/hooks/debounc';

interface LocationInfo {
  setLocationDetails?: any;
  formType?: number;
  formValues?: any;
}
const LocationDetails = ({
  setLocationDetails,
  formValues = partnerPrefernceFormValue,
  formType = 1,
}: LocationInfo) => {
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...formValues,
  });
  const [fieldValue, setFieldValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  // const [countryList, setCountryList] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);

  // Loading state
  const [stateListLoading, setStateListLoading] = useState(false);
  const [cityListLoading, setCityListLoading] = useState(false);
  const [countryListLoading, setCountryListLoading] = useState(false);

  // Current Page Number
  const [stateListCurrentPage, setStateListCurrentPage] = useState(2);
  const [cityListCurrentPage, setCityListCurrentPage] = useState(2);

  // Total Count
  const [stateListCount, setStateListCount] = useState(0);
  const [cityListCount, setCityListCount] = useState(0);

  // uuid
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');

  const [cities, setCities] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>();

  // Side drawer search feature
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [citySearchQuery, setCitySearchQuery] = useState('');

  // searchPreferences
  const [isSearching, setIsSearching] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState('');

  // debounced query
  const stateBounceQuery = useDebounce(stateSearchQuery, DEBOUNCE_TIME);
  const cityBounceQuery = useDebounce(citySearchQuery, DEBOUNCE_TIME);

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
  };

  //search function
  const searchPreference = async (
    ID: string,
    searchQuery: string,
    setCount: (count: number) => void,
    setPage: (page: number) => void,
    setData: (data: any[]) => void,
    api: 'states' | 'cities',
    url: (id: string, query: string, page: number) => string,
  ) => {
    const fallbackValue = [...list];
    const fallbackLength =
      fieldValue === 'state' ? stateListCount : cityListCount;
    if (!ID || !searchQuery) {
      !searchQuery &&
        (fieldValue === 'state'
          ? getState(ID, true)
          : fieldValue === 'city'
          ? getCities(stateId, true)
          : '');
      return;
    }
    try {
      setIsSearching(true);
      const {
        data: {response},
      } = await AppApi[api]({
        url: url(ID, searchQuery, 1),
      });
      setSearchNotFound('');
      setList([]);
      setCount(0);
      if (!response.data.length) {
        setSearchNotFound('No States Found');
        setData([]);
        setCount(0);
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

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (countryId) {
      searchPreference(
        countryId,
        stateBounceQuery,
        setStateListCount,
        setStateListCurrentPage,
        setStates,
        'states',
        searchURL.state,
      );
    }
  }, [stateBounceQuery]);

  useEffect(() => {
    if (stateId) {
      searchPreference(
        stateId,
        cityBounceQuery,
        setCityListCount,
        setCityListCurrentPage,
        setCities,
        'cities',
        searchURL.city,
      );
    }
  }, [cityBounceQuery]);

  //  API Calls
  const getCountry = async () => {
    setCountryListLoading(true);
    try {
      let resp = await AppApi.country();
      if (resp.status === 200) {
        // setCountryList([resp?.data?.response?.country]);
        const response = resp?.data?.response?.country;
        setCountryId(response?.uuid);
        setForm({...form, location: response?.name, state: ''});
      }
    } catch (error: any) {
      console.log('search page country api error', error);
      Alert.alert('There is an error, Please try after some time.');
    } finally {
      setCountryListLoading(false);
    }
  };

  // states

  const getState = async (
    country_uuid: string,
    FromSearchPrefernce: boolean = false,
  ) => {
    if (country_uuid) {
      FromSearchPrefernce ? setIsSearching(true) : setStateListLoading(true);
      try {
        const url = searchURL.state(countryId, stateSearchQuery, 1);
        const {
          data: {response},
        } = await AppApi.states({url});

        setStates(response.data);
        setSearchNotFound('');
        setStateListCurrentPage(2);
        setStateListCount(response.count);
        FromSearchPrefernce && setList(response.data);
      } catch (error) {
        console.log('Error fetching states', error);
      } finally {
        FromSearchPrefernce
          ? setIsSearching(false)
          : setStateListLoading(false);
      }
    } else {
      console.log('No country id found');
    }
  };

  const updateState = async () => {
    if (stateListLoading) {
      return;
    }

    if (list.length < stateListCount && countryId) {
      setStateListLoading(true);
      setStateListCurrentPage(prev => prev + 1);
      // console.log({stateListCurrentPage});

      try {
        const url = searchURL.state(
          countryId,
          stateSearchQuery,
          stateListCurrentPage,
        );
        const {
          data: {response},
        } = await AppApi.states({url});

        setStates(prev => [...prev, ...response.data]);
        setList(prev => [...prev, ...response.data]);
      } catch (error) {
        console.log(`error loading state page ${stateListCurrentPage}`, error);
      } finally {
        setStateListLoading(false);
      }
    }
  };

  //  get city list

  const getCities = async (
    stateID: string,
    FromSearchPrefernce: boolean = false,
  ) => {
    if (stateID) {
      setCityListLoading(true);
      FromSearchPrefernce ? setIsSearching(true) : setCityListLoading(true);
      try {
        const url = searchURL.city(stateID, cityBounceQuery, 1);
        const {
          data: {response},
        } = await AppApi.cities({url});
        setCities(response?.data);
        setSearchNotFound('');
        setCityListCurrentPage(2);
        setCityListCount(response.count);
        FromSearchPrefernce && setList(response.data);
      } catch (error) {
        console.log('error fetching cities data', error);
      } finally {
        FromSearchPrefernce ? setIsSearching(false) : setCityListLoading(false);
      }
    } else {
      console.log('error in cites api call');
    }
  };

  const updateCities = async () => {
    if (cityListLoading) {
      return;
    }

    if (list.length < cityListCount && stateId) {
      setCityListLoading(true);
      setCityListCurrentPage(prev => prev + 1);
      // console.log({cityListCurrentPage});

      try {
        const {
          data: {response},
        } = await AppApi.cities({
          url: searchURL.city(stateId, cityBounceQuery, cityListCurrentPage),
        });
        setList(prev => [...prev, ...response.data]);
        setCities(prev => [...prev, ...response.data]);
      } catch (error) {
        console.log(`error loading state page ${cityListCurrentPage}`, error);
      } finally {
        setCityListLoading(false);
      }
    }
  };

  const toggleFunc = (text: string) => {
    switch (text) {
      case 'Location':
        settingModal('location', ['countryList']), setChecked(false);
        break;
      case 'State':
        settingModal('state', states), setChecked(true);
        break;
      case 'City':
        settingModal('city', cities), setChecked(true);
        break;
      default:
        null;
    }
  };

  const settingModal = (fieldName: string, data: any) => {
    setModalVisible(true);
    setFieldValue(fieldName);
    if (fieldName === 'location') {
      let value: any = [];
      data?.forEach((item: any) => value.push({...item, isActive: false}));
      setList([...value]);
    } else {
      let value: any = [{id: 0, name: 'Any', isActive: false}];
      data?.forEach((item: any) => value.push({...item, isActive: false}));
      setList([...value]);
    }
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData?.join());
    }
  }, [modalVisible]);

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

  useEffect(() => {
    const arrList = list;
    const verifiedList = arrList?.filter(item => item?.isActive === true);
    const existsInData = verifiedList?.map(item => item.name);
    if (existsInData?.includes('Any')) {
      setSelectedData(['Any']);
    } else {
      setSelectedData(existsInData);
    }
  }, [list]);

  const selectedPopupData = (value: any) => {
    switch (fieldValue) {
      case 'location':
        setCountryId(value?.uuid);
        setForm({...form, location: value?.name, state: ''});
        break;
      case 'state':
        const findSelectedState = states.find(item => item?.name === value);
        setStateId(findSelectedState?.uuid);
        setForm({...form, state: value, city: ''});
        break;
      case 'city':
        setForm({...form, city: value, cityError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  useEffect(() => {
    setLocationDetails(form);
  }, [form]);

  useEffect(() => {
    if (stateId) {
      getCities(stateId);
    }
  }, [stateId]);

  useEffect(() => {
    if (countryId) {
      getState(countryId);
    }
  }, [countryId]);

  return (
    <>
      {formType === 1 && (
        <TextInputCustom
          placeholder="Enter Your Address"
          value={form.address}
          error={form.addressError}
          activeIcon={() => {}}
          label="Address"
          onChangeText={address =>
            setForm({...form, address, addressError: ''})
          }
        />
      )}
      <TextInputCustom
        placeholder="Select"
        label="Location"
        value={form.location}
        error={form.locationError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        editable={!countryListLoading}
      />
      <TextInputCustom
        placeholder="Select"
        value={form.state}
        error={form.stateError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        label="State"
        editable={!stateListLoading}
      />
      <TextInputCustom
        placeholder="Select"
        value={form.city}
        error={form.cityError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        label="City"
        editable={!cityListLoading}
      />
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={fieldValue}
        search={true}
        checkbox={checked}
        loading={stateListLoading || countryListLoading || cityListLoading}
        list={list}
        searchName={
          fieldValue === 'state'
            ? stateSearchQuery
            : fieldValue === 'city'
            ? citySearchQuery
            : ''
        }
        isSearching={isSearching}
        searchNotFound={searchNotFound}
        setsearchValue={
          fieldValue === 'state'
            ? setStateSearchQuery
            : fieldValue === 'city'
            ? setCitySearchQuery
            : () => {}
        }
        scrollFunction={
          fieldValue === 'state'
            ? updateState
            : fieldValue === 'city'
            ? updateCities
            : () => {}
        }
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </>
  );
};

export default LocationDetails;
