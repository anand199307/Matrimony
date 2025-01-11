import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../configurations/config/color.config';
import Text from './GlobalText';

interface dropDown {
  list?: any[];
  selectedData: (value: any) => void;
  dropdownToggle?: Boolean;
}

const Dropdown = ({list, selectedData, dropdownToggle}: dropDown) => {
  return dropdownToggle ? (
    <View style={[styles.dropDown, styles.dropDownIos, styles.dropDownAndroid]}>
      {list?.map((item: any) => (
        <TouchableOpacity
          onPress={() => selectedData(item?.content)}
          key={item?.id}>
          <Text
            style={[
              item?.text ? styles.activeDropDownText : styles.dropDownText,
            ]}>
            {item?.content}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : null;
};

export default Dropdown;

const styles = StyleSheet.create({
  dropDown: {
    zIndex: 1,
    position: 'absolute',
    top: 85,
    right: 25,
    borderRadius: 14,
    borderTopRightRadius: 0,
    backgroundColor: colors.PRIMARY_COLOR,
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 20,
  },
  dropDownIos: {
    elevation: 50,
    shadowColor: colors.BLACK,
  },
  dropDownAndroid: {
    shadowColor: colors.BLACK,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  dropDownText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.P_TEXT,
    textAlign: 'center',
    marginVertical: 12,
  },
  activeDropDownText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
    textAlign: 'center',
    marginVertical: 12,
  },
});
