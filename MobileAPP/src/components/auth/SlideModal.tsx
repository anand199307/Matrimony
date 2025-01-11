import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import Text from '../common/GlobalText';
import color from '../../configurations/config/color.config';
import TextInput from '../common/TextInputCustom';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  hideModal: () => void;
  selectedPopupData: (value: any) => void;
  selectedArrayData: (value: any) => void;
  hideCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
  feildName?: string;
  list?: any;
  search?: boolean;
  checkbox?: boolean;
  setsearchValue?: (value: string) => void;
  searchName?: string;
  // fetchLanguage: (page: number, limit?: number, scroll?: boolean) => void;
  scrollFunction?: () => void;
  loading?: boolean;
  isSearching?: boolean;
  searchNotFound?: string;
  searchPlaceHolder?: string;
}

const SlideModal = ({
  list,
  search,
  checkbox,
  selectedPopupData,
  selectedArrayData,
  setsearchValue,
  scrollFunction = () => {},
  searchName,
  loading = false,
  searchNotFound,
  isSearching = false,
  searchPlaceHolder = 'Search by name',
  ...props
}: Props & Partial<ModalProps>) => {
  const renderItem = ({item}: any) => {
    return (
      <View
        key={
          Number(item?.id)
            ? Number(item?.id)
            : item?.uuid
            ? item?.uuid
            : item?._id
        }>
        {checkbox ? (
          <View style={styles.row}>
            {!item?.heading && (
              <CheckBox
                value={item?.isActive}
                id={item?.uuid}
                disabled={item?.disabled}
                onValueChange={() => selectedArrayData(item)}
              />
            )}
            {item?.heading ? (
              <Text style={styles.listHeading}>{item?.heading}</Text>
            ) : (
              <Text style={styles.checkboxList}>
                {item?.name ? item?.name : item?.title}
              </Text>
            )}
          </View>
        ) : (
          <Pressable
            onPress={() => selectedPopupData(item)}
            style={({pressed}: any) => [
              {backgroundColor: pressed ? '#FAFAFA' : 'white'},
              styles.press,
            ]}>
            {item?.heading ? (
              <Text style={styles.listHeading}>{item?.heading}</Text>
            ) : (
              <Text style={styles.list}>
                {item?.name ? item?.name : item?.title}
              </Text>
            )}
          </Pressable>
        )}
      </View>
    );
  };

  const toggleFunc = () => {};

  return (
    <Modal {...props} style={styles.container}>
      {search && (
        <TextInput
          placeholder={searchPlaceHolder}
          value={searchName}
          activeIcon={toggleFunc}
          onChangeText={value => setsearchValue?.(value)}
          label="Search"
        />
      )}
      <View style={{height: 20, display: isSearching ? 'flex' : 'none'}}>
        <ActivityIndicator animating={true} />
      </View>
      {!!searchNotFound && (
        <View>
          <Text>{searchNotFound}</Text>
        </View>
      )}
      <FlatList
        data={list && list}
        renderItem={renderItem}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#000000" /> : <></>
        }
        onEndReached={() => {
          console.log('threshold reached');
          scrollFunction();
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any, index) =>
          `${
            Number(item?.id)
              ? Number(item?.id)
              : item?.uuid
              ? item?.uuid
              : item?._id
          }${index}`
        }
      />
    </Modal>
  );
};

export default SlideModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.PRIMARY_COLOR,
    margin: 0,
    marginLeft: 130,
    padding: 15,
  },
  list: {
    fontSize: 15,
    fontWeight: '400',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    color: color.P_TEXT,
  },
  listHeading: {
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: color.P_TEXT,
  },
  press: {
    borderRadius: 8,
  },
  row: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxList: {
    fontSize: 15,
    fontWeight: '400',
    color: color.P_TEXT,
  },
});
