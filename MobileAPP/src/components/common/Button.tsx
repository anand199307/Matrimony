/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Text from './GlobalText';
import color from '../../configurations/config/color.config';

interface button {
  title?: string;
  MV?: number;
  onPressFunc?: () => void;
  Height?: number;
  styledContainer?: StyleProp<ViewStyle>;
}

const Button = ({title, MV, onPressFunc, Height, styledContainer}: button) => {
  return (
    <TouchableOpacity
      onPress={onPressFunc}
      style={[
        styles.button,
        styledContainer,
        {marginVertical: MV, height: Height ? Height : 50},
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: color.SECONDARY_COLOR,
    borderRadius: 8,
    // height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: color.PRIMARY_COLOR,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
  },
});
