import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Slider from '../common/Slider';

const RoyalMatrimonyCouples = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.content}>Met on</Text>
        <View style={styles.horizontalLine} />
      </View>
      <Text style={styles.heading}>Royal Matrimony</Text>
      <Slider renderComponentName="royalMatrimonyCouples" />
    </View>
  );
};

export default RoyalMatrimonyCouples;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT_PINK_BG,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.SECONDARY_COLOR,
  },
  content: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
    fontFamily: 'Poppins-Regular',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.SECONDARY_COLOR,
    fontFamily: 'Poppins-Regular',
  },
});
