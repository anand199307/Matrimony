/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../common/GlobalText';
import TextInputCustom from '../common/TextInputCustom';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../utilis/types/PrefernceVerification';
import {ICONS} from '../../assets/Icons';
import colors from '../../configurations/config/color.config';
import SlideModal from '../auth/SlideModal';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';
import {maritalStatus} from '../../utilis/feildStaticData/Registeration';
import {physicalStatus} from '../../utilis/feildStaticData/PrefernceVerification';
import AppApi from '../../configurations/Api/AppApi';
import {API_LIMIT, DEBOUNCE_TIME} from '../../utilis/helper/apiHelpers';
import {useDebounce} from '../../utilis/hooks/debounc';

interface BasicDetails {
  setBasicDetails: any;
}

const BasicDetails = ({setBasicDetails}: BasicDetails) => {
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [fieldValue, setFieldValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>();
  const [languageList, setLanguage] = useState<any[]>([]);

  const [languagePage, setLanguageListCurrentPage] = useState(2);
  const [languagePageLoading, setLanguageListLoading] = useState(false);
  const [totalLanguages, setTotalLanguages] = useState(0);
  const [langListLoading, setLangListLoading] = useState(false);
  const [langSearchQuery, setLangSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState('');

  const bounceLanguageQuery = useDebounce(langSearchQuery, DEBOUNCE_TIME);

  const searchPreference = async () => {
    const fallbackValue = [...list];
    const fallbackLength = totalLanguages;
    if (!bounceLanguageQuery) {
      return fetchLanguage(true);
    }
    setIsSearching(true);
    try {
      const {data} = await AppApi.language(1, API_LIMIT, bounceLanguageQuery);
      setSearchNotFound('');

      if (!data.response.count) {
        setSearchNotFound('No language found');
        setList([]);
        setTotalLanguages(0);
      }
      setLanguageListCurrentPage(2);
      setList(data.response.data);
      setLanguage(data.response.data);
      setTotalLanguages(data.response.count);
    } catch (error) {
      console.log('error searching basic details');
      setList([...fallbackValue]);
      setTotalLanguages(fallbackLength);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchLanguage = async (fromSearch: boolean = false) => {
    fromSearch ? setIsSearching(true) : setLangListLoading(true);
    try {
      const resp = await AppApi.language(1, API_LIMIT, bounceLanguageQuery);
      if (resp.status === 200) {
        setLanguageListCurrentPage(2);
        setLanguage(resp.data.response.data);
        setTotalLanguages(resp.data.response.count);
      }
    } catch (error) {
      console.log('error is advanced search fetch language api', error);
    } finally {
      fromSearch ? setIsSearching(false) : setLangListLoading(false);
    }
  };

  const updateList = async () => {
    if (languagePageLoading) {
      return;
    }
    if (list.length < totalLanguages) {
      setLanguageListLoading(true);
      setLanguageListCurrentPage(prev => prev + 1);
      try {
        const {
          data: {
            response: {data: contentToAppend},
          },
        } = await AppApi.language(languagePage, API_LIMIT, bounceLanguageQuery);
        setList(prev => [...prev, ...contentToAppend]);
      } catch (error) {
        console.log('error fetching languages');
      } finally {
        setLanguageListLoading(false);
      }
    }
  };

  const toggleFunc = (text: string) => {
    switch (text) {
      case 'Mother Tongue':
        settingModal('motherTongue', languageList), setChecked(true);
        break;
      case 'Marital status':
        settingModal('maritalStatus', maritalStatus), setChecked(true);
        break;
      case 'Physical Status':
        settingModal('physicalStatus', physicalStatus), setChecked(true);
        break;
      default:
        null;
    }
  };

  const settingModal = (fieldName: string, data: any) => {
    setModalVisible(true);
    setFieldValue(fieldName);
    let value: any = [{id: 0, name: 'Any', isActive: false, disabled: false}];
    data?.forEach((item: any) =>
      value.push({...item, isActive: false, disabled: false}),
    );
    setList([...value]);
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData);
    }
  }, [modalVisible]);

  useEffect(() => {
    fetchLanguage();
  }, []);

  useEffect(() => {
    searchPreference();
  }, [bounceLanguageQuery]);

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
    setBasicDetails(form);
  }, [form]);

  const selectedPopupData = (value: any) => {
    switch (fieldValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value});
        break;
      case 'maritalStatus':
        setForm({...form, maritalStatus: value});
        break;
      case 'physicalStatus':
        setForm({...form, physicalStatus: value});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.wrapper}>
          <TextInputCustom
            value={form.ageFrom}
            error={form.ageFromError}
            activeIcon={toggleFunc}
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
            activeIcon={toggleFunc}
            onChangeText={ageTo => setForm({...form, ageTo, ageToError: ''})}
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
            activeIcon={toggleFunc}
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
            activeIcon={toggleFunc}
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
        activeIcon={toggleFunc}
        label="Marital status"
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
      />
      <TextInputCustom
        placeholder="Select"
        label="Mother Tongue"
        value={form.motherTongue}
        error={form.motherTongueError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
        editable={!langListLoading}
      />
      <TextInputCustom
        placeholder="Select"
        label="Physical Status"
        value={form.physicalStatus}
        error={form.physicalStatusError}
        activeIcon={toggleFunc}
        backIcon={ICONS.rightArrowInput}
        numberOfLines={1}
      />
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={fieldValue}
        search={fieldValue === 'motherTongue' ? true : false}
        // change this acc to field name
        scrollFunction={fieldValue === 'motherTongue' ? updateList : () => {}}
        checkbox={checked}
        isSearching={isSearching}
        searchNotFound={searchNotFound}
        setsearchValue={setLangSearchQuery}
        searchName={langSearchQuery}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        loading={languagePageLoading}
      />
    </View>
  );
};

export default BasicDetails;

const styles = StyleSheet.create({
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
  wrapper: {
    width: '45%',
  },
});
