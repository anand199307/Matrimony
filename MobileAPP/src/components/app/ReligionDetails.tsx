/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import TextInputCustom from '../common/TextInputCustom';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../utilis/types/PrefernceVerification';
import {ICONS} from '../../assets/Icons';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import SlideModal from '../auth/SlideModal';
import AppApi from '../../configurations/Api/AppApi';
import {API_LIMIT, DEBOUNCE_TIME} from '../../utilis/helper/apiHelpers';
import {useDebounce} from '../../utilis/hooks/debounc';

interface ReligiousInfo {
  setReligiousDetails: any;
}

const ReligionDetails = ({setReligiousDetails}: ReligiousInfo) => {
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [fieldValue, setFieldValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>();
  const [caste, setCaste] = useState<any[]>([]);
  const [religion, setReligion] = useState<any[]>([]);

  const [casteListCurrentPage, setCasteListCurrentPage] = useState(2);
  const [casteListLoading, setCasteListLoading] = useState(false);
  const [totalCasteCount, setTotalCasteCount] = useState(0);

  const [religionListCurrentPage, setReligionListCurrentPage] = useState(2);
  const [religionListLoading, setReligionListLoading] = useState(false);
  const [totalReligionCount, setTotalReligionCount] = useState(0);

  const [isSearching, setIsSearching] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState('');

  const [religionSearchQuery, setReligionSearchQuery] = useState('');
  const [casteSearchQuery, setCasteSearchQuery] = useState('');

  const bounceReligionQuery = useDebounce(religionSearchQuery, DEBOUNCE_TIME);
  const BounceCasteQuery = useDebounce(casteSearchQuery, DEBOUNCE_TIME);

  const searchURL = {
    religion: (page: number, limit: number, query: string) =>
      AppApi.religion(page, limit, query),
    caste: (page: number, limit: number, query: string) =>
      AppApi.caste(page, limit, query),
  };

  const fetchCaste = async (fromSearch: boolean = false) => {
    fromSearch ? setIsSearching(true) : setCasteListLoading(true);

    try {
      let {data, status} = await searchURL.caste(
        1,
        API_LIMIT,
        BounceCasteQuery,
      );

      const {
        response: {data: castList, count},
      } = data;

      if (status === 200) {
        setCaste(castList);
        setSearchNotFound('');
        setCasteListCurrentPage(2);
        setTotalCasteCount(count);
        fromSearch && setList(castList);
      }
    } catch (error) {
      console.log('error in caste API', error);
    } finally {
      fromSearch ? setIsSearching(false) : setCasteListLoading(false);
    }
  };

  const updateCasteList = async () => {
    if (casteListLoading) {
      return;
    }
    if (list.length < totalCasteCount) {
      setCasteListLoading(true);
      setCasteListCurrentPage(prev => prev + 1);
      try {
        const {
          data: {
            response: {data: contentToAppend},
          },
        } = await searchURL.caste(
          casteListCurrentPage,
          API_LIMIT,
          BounceCasteQuery,
        );
        setList(prev => [...prev, ...contentToAppend]);
      } catch (error) {
        console.log('error fetching caste');
      } finally {
        setCasteListLoading(false);
      }
    }
  };

  const fetchReligion = async (fromSearch: boolean = false) => {
    fromSearch ? setIsSearching(true) : setReligionListLoading(true);
    try {
      let {data, status} = await searchURL.religion(
        1,
        API_LIMIT,
        bounceReligionQuery,
      );

      const {
        response: {data: religionList, count},
      } = data;

      if (status === 200) {
        setReligion(religionList);
        setTotalReligionCount(count);
        setReligionListCurrentPage(2);
        setSearchNotFound('');
        fromSearch && setList(religionList);
      }
    } catch (error) {
      console.log('error in religions API', error);
    } finally {
      fromSearch ? setIsSearching(false) : setReligionListLoading(false);
    }
  };

  const updateReligionList = async () => {
    if (religionListLoading) {
      return;
    }
    if (list.length < totalReligionCount) {
      setReligionListLoading(true);
      setReligionListCurrentPage(prev => prev + 1);
      try {
        const {
          data: {
            response: {data: contentToAppend},
          },
        } = await searchURL.religion(
          religionListCurrentPage,
          API_LIMIT,
          bounceReligionQuery,
        );
        setList(prev => [...prev, ...contentToAppend]);
      } catch (error) {
        console.log('error fetching caste');
      } finally {
        setReligionListLoading(false);
      }
    }
  };

  useEffect(() => {
    searchPreference(
      'religion',
      bounceReligionQuery,
      setTotalReligionCount,
      setReligionListCurrentPage,
      setReligion,
    );
  }, [bounceReligionQuery]);

  useEffect(() => {
    searchPreference(
      'caste',
      BounceCasteQuery,
      setTotalCasteCount,
      setCasteListCurrentPage,
      setCaste,
    );
  }, [BounceCasteQuery]);

  const searchPreference = async (
    apiName: 'religion' | 'caste',
    searchQuery: string,
    setCount: (count: number) => void,
    setPage: (page: number) => void,
    setData: (data: any[]) => void,
  ) => {
    const fallbackValue = [...list];
    const fallbackLength =
      fieldValue === 'religion' ? totalReligionCount : totalCasteCount;
    if (!searchQuery) {
      fieldValue === 'religion'
        ? fetchReligion(true)
        : fieldValue === 'caste'
        ? fetchCaste(true)
        : '';
      return;
    }
    try {
      setIsSearching(true);
      const {
        data: {response},
      } = await searchURL[apiName](1, API_LIMIT, searchQuery);
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
    fetchReligion();
    fetchCaste();
  }, []);

  const toggleFunc = (text: string) => {
    switch (text) {
      case 'Religion':
        settingModal('religion', religion), setChecked(true);
        break;
      case 'Caste':
        settingModal('caste', caste), setChecked(true);
        break;
      default:
        null;
    }
  };

  const settingModal = (fieldName: string, data: any) => {
    setModalVisible(true);
    setFieldValue(fieldName);
    let value: any = [{id: 0, name: 'Any', isActive: false, disabled: false}];
    data?.forEach((item: any) => value.push({...item, isActive: false}));
    setList([...value]);
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData);
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
      case 'religion':
        setForm({...form, religion: value});
        break;
      case 'caste':
        setForm({...form, caste: value});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };
  useEffect(() => {
    setReligiousDetails(form);
  }, [form]);
  return (
    <>
      <TextInputCustom
        placeholder="Select"
        value={form.religion}
        error={form.religionError}
        activeIcon={toggleFunc}
        label="Religion"
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
        editable={!religionListLoading}
      />
      <TextInputCustom
        placeholder="Select"
        value={form.caste}
        error={form.casteError}
        activeIcon={toggleFunc}
        label="Caste"
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
        editable={!casteListLoading}
      />
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={fieldValue}
        search={true}
        checkbox={checked}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        loading={casteListLoading || religionListLoading}
        onBackdropPress={() => setModalVisible(false)}
        scrollFunction={
          fieldValue === 'caste' ? updateCasteList : updateReligionList
        }
        onBackButtonPress={() => setModalVisible(false)}
        isSearching={isSearching}
        searchNotFound={searchNotFound}
        searchName={
          fieldValue === 'religion'
            ? religionSearchQuery
            : fieldValue === 'caste'
            ? casteSearchQuery
            : ''
        }
        setsearchValue={
          fieldValue === 'religion'
            ? setReligionSearchQuery
            : fieldValue === 'caste'
            ? setCasteSearchQuery
            : () => {}
        }
      />
    </>
  );
};

export default ReligionDetails;
