import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import colors from '../../configurations/config/color.config';
import {WIDTH} from '../../configurations/config/app.config';

const ActivityFooter = ({item}: any) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.boldText}>{item?.contentTitle1}</Text>
      <Text style={styles.smallText}>{item?.content}</Text>
    </View>
  );
};

export default ActivityFooter;

const styles = StyleSheet.create({
  sliderContainer: {
    width: WIDTH,
    height: 'auto',
    padding: 15,
  },
  boldText: {
    fontSize: 31,
    width: 270,
    fontWeight: '700',
    color: colors.P_TEXT,
    letterSpacing: 1,
  },
  smallText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.S_TEXT,
    lineHeight: 20,
    marginTop: 6,
    letterSpacing: 0.4,
  },
});
