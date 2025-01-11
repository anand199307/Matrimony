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
import {employedIn} from '../../utilis/feildStaticData/Registeration';
import SlideModal from '../auth/SlideModal';
import AppApi from '../../configurations/Api/AppApi';
import {API_LIMIT, DEBOUNCE_TIME} from '../../utilis/helper/apiHelpers';
import {useDebounce} from '../../utilis/hooks/debounc';

interface ProfessionalInfo {
  setProfessionDetails: any;
}

const ProfessionalDetails = ({setProfessionDetails}: ProfessionalInfo) => {
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [fieldValue, setFieldValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>();
  const [education, setEducation] = useState<any[]>([]);
  const [profession, setProfessions] = useState<any[]>([]);

  const [professionListCurrentPage, setProfessionListCurrentPage] = useState(2);
  const [professionListLoading, setProfessionListLoading] = useState(false);
  const [totalProfessionCount, setTotalProfessionCount] = useState(0);

  const [educationListLoading, setEducationListLoading] = useState(false);
  const [educationSearchQuery, setEducationSearchQuery] = useState('');
  const [professionSearchQuery, setProfessionSearchQuery] = useState('');

  const educationBounceQuery = useDebounce(educationSearchQuery, DEBOUNCE_TIME);
  const ProfessionBounceQuery = useDebounce(
    professionSearchQuery,
    DEBOUNCE_TIME,
  );

  const [isSearching, setIsSearching] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState('');

  const searchURL = {
    education: (query: string) => AppApi.education(query),
    profession: (page: number, limit: number, query: string) =>
      AppApi.getProfessions(page, limit, query),
  };

  // education search function.
  const searchEducation = async () => {
    const fallback = [...list];
    if (!educationBounceQuery) {
      fetchProfessions(true);
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
        setSearchNotFound('No Domain Found');
        setList([]);
        return;
      }
      const converted = convertedEducationList(data);
      setSearchNotFound('');
      setList(converted);
    } catch (error) {
      console.log('error searching', 'error');
      setList([...fallback]);
    } finally {
      setIsSearching(false);
    }
  };

  // profession search function.
  const searchProfession = async () => {
    const fallback = [...list];
    try {
      setIsSearching(true);
      const {
        data: {
          response: {data, count},
        },
      } = await searchURL.profession(1, API_LIMIT, ProfessionBounceQuery);
      setSearchNotFound('');
      if (!count) {
        setSearchNotFound('No Profession Found');
        setProfessions([]);
        setList([]);
        setTotalProfessionCount(0);
      }
      setProfessions([...data]);
      setList([...data]);
      setTotalProfessionCount(count);
      setProfessionListCurrentPage(2);
    } catch (error) {
      console.log('error in search');
      setList([...fallback]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    searchEducation();
  }, [educationBounceQuery]);

  useEffect(() => {
    searchProfession();
  }, [ProfessionBounceQuery]);

  // API Calls
  const fetchEducationList = async () => {
    setEducationListLoading(true);
    try {
      let res = await searchURL.education(educationBounceQuery);
      if (res.status === 200) {
        convertedEducationList(res.data?.response?.data);
      }
    } catch (error) {
      console.log('error in educationList api', error);
    } finally {
      setEducationListLoading(false);
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

  const fetchProfessions = async (RequestFromSearch: boolean = false) => {
    RequestFromSearch ? setIsSearching(true) : setProfessionListLoading(true);
    try {
      let resp = await searchURL.profession(
        1,
        API_LIMIT,
        ProfessionBounceQuery,
      );
      if (resp.status === 200) {
        setProfessions(resp.data?.response?.data);
        setTotalProfessionCount(resp.data?.response?.count);
      }
    } catch (error) {
      console.log('error in profession list', error);
    } finally {
      RequestFromSearch
        ? setIsSearching(false)
        : setProfessionListLoading(false);
    }
  };

  const updateProfessionList = async () => {
    if (professionListLoading) {
      return;
    }
    if (list.length < totalProfessionCount) {
      setProfessionListLoading(true);
      setProfessionListCurrentPage(prev => prev + 1);

      try {
        const {
          data: {
            response: {data: contentToAppend},
          },
        } = await searchURL.profession(
          professionListCurrentPage,
          API_LIMIT,
          ProfessionBounceQuery,
        );
        setList(prev => [...prev, ...contentToAppend]);
      } catch (error) {
        console.log('error fetching caste');
      } finally {
        setProfessionListLoading(false);
      }
    }
  };

  // Hit API's
  useEffect(() => {
    fetchEducationList();
    fetchProfessions();
  }, []);

  const toggleFunc = (text: string) => {
    switch (text) {
      case 'Education':
        settingModal('Education', education), setChecked(true);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn), setChecked(true);
        break;
      case 'Profession':
        settingModal('Profession', profession), setChecked(true);
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

  useEffect(() => {
    setProfessionDetails(form);
  }, [form]);

  const selectedPopupData = (value: any) => {
    switch (fieldValue) {
      case 'Education':
        setForm({...form, Education: value});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value});
        break;
      case 'Profession':
        setForm({...form, Desingnation: value});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };
  return (
    <>
      <TextInputCustom
        placeholder="Select"
        label="Education"
        value={form.Education}
        error={form.EducationError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
        editable={!educationListLoading}
      />
      <TextInputCustom
        placeholder="Select"
        label="Employed In"
        value={form.employedIn}
        error={form.employedInError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
      />
      <TextInputCustom
        placeholder="Select"
        label="Profession"
        value={form.Desingnation}
        error={form.DesingnationError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
        editable={!professionListLoading}
      />
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={fieldValue}
        search={['Education', 'Profession'].includes(fieldValue)}
        checkbox={checked}
        list={list}
        scrollFunction={
          fieldValue === 'Profession' ? updateProfessionList : () => {}
        }
        loading={professionListLoading}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isSearching={isSearching}
        setsearchValue={
          fieldValue === 'Education'
            ? setEducationSearchQuery
            : fieldValue === 'Profession'
            ? setProfessionSearchQuery
            : () => {}
        }
        searchName={
          fieldValue === 'Education'
            ? educationSearchQuery
            : fieldValue === 'Profession'
            ? professionSearchQuery
            : ''
        }
        searchPlaceHolder={
          fieldValue === 'Education'
            ? 'Search by domain name'
            : 'Search by name'
        }
        searchNotFound={searchNotFound}
      />
    </>
  );
};

export default ProfessionalDetails;
