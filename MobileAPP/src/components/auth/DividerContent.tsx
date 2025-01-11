import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import color from '../../configurations/config/color.config';

const DividerContent = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.horizontalLine} />
      <Text style={styles.content}>or continue with</Text>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default DividerContent;

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  content: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: color.P_TEXT,
  },
});
