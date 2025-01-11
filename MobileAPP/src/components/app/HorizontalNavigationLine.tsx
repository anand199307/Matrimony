/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import {ICONS} from '../../assets/Icons';
import colors from '../../configurations/config/color.config';

const HorizontalNavigationLine = ({title, icon, navFunc}: any) => {
  return (
    <TouchableOpacity onPress={() => navFunc(title)} style={styles.row}>
      <Image source={icon} style={styles.leftIcon} resizeMode="contain" />
      <View style={{width: '85%', paddingLeft: '5%'}}>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <Image
        source={ICONS.rightArrowInput}
        style={styles.rightIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default HorizontalNavigationLine;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  leftIcon: {
    width: 20,
    height: 20,
  },
  rightIcon: {
    width: 18,
    height: 18,
  },
  heading: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.P_TEXT,
    letterSpacing: 0.5,
  },
});
