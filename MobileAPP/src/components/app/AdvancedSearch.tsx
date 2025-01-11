/* eslint-disable no-sequences */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Box from '../../components/app/FilterBox';
import {
  searchFilter,
  showProfile,
  profileCreated,
} from '../../utilis/staticData/Search';
import SlideModal from '../auth/SlideModal';
import {WIDTH, HEIGHT} from '../../configurations/config/app.config';

const AdvancedSearch = () => {
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>();
  const [selectedData, setselectedData] = useState<any[]>([]);

  const toggleFunc = (text: string) => {
    switch (text) {
      case 'Show profile':
        settingModal('motherTongue', showProfile), setChecked(true);
        break;
      case 'Profile created':
        settingModal('maritalStatus', profileCreated), setChecked(true);
        break;
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);

    let value: any = [{id: 0, title: 'Any', isActive: false}];
    data?.forEach((item: any) => value.push({...item, isActive: false}));
    setList([...value]);
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData?.join());
    }
  }, [modalVisible]);

  const addArrayData = (data: any) => {
    if (data?.title === 'Any') {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (!data?.isActive) {
            return {...item, isActive: true};
          } else {
            return {...item, isActive: false};
          }
        }),
      );
    } else {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.title === item?.title && data?.isActive) {
            return {...item, isActive: false};
          } else if (data?.title === item?.title && !data?.isActive) {
            return {...item, isActive: true};
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

    const List: any = [];
    verifiedList?.map((data: any) => List.push(data?.title));

    const getAny = List?.find((item: any) => item === 'Any');
    if (getAny === 'Any') {
      const allList: any = [];
      list?.map(
        (data: any) => data?.title !== 'Any' && allList.push(data?.title),
      );
      setselectedData(allList);
    } else {
      setselectedData(List);
    }
  }, [list]);

  const selectedPopupData = (value: any) => {
    setModalVisible(false);
  };

  return (
    <>
      <Text style={styles.sectionHeader}>advanced search </Text>
      <View style={styles.advancedSearch}>
        {searchFilter?.slice(0, 2).map((item: any) => (
          <Box
            startColor={item?.startColor}
            endColor={item?.endColor}
            src={item?.src}
            title={item?.title}
            selectedBox={toggleFunc}
            key={item?.id}
          />
        ))}
      </View>
      <View style={styles.advancedSearch}>
        {searchFilter?.slice(2, 4).map((item: any) => (
          <Box
            startColor={item?.startColor}
            endColor={item?.endColor}
            src={item?.src}
            title={item?.title}
            selectedBox={toggleFunc}
            key={item?.id}
          />
        ))}
      </View>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        search={false}
        checkbox={checked}
        list={list}
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

export default AdvancedSearch;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.P_TEXT,
    textTransform: 'uppercase',
    marginBottom: 25,
    letterSpacing: 2,
  },
  advancedSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});
