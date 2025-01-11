/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Image} from 'react-native';
import React, {memo} from 'react';
import Text from '../../components/common/GlobalText';
import colors from '../../configurations/config/color.config';
import {ICONS} from '../../assets/Icons';

const PlanDetails = ({selectedPlan, planName}: any) => {
  return (
    <View style={styles.planDetails}>
      <View style={styles.detailsContainer}>
        <View style={{paddingLeft: '15%'}}>
          <Image source={ICONS.premiumCrown} style={styles.planIcon} />
        </View>
        <View style={{paddingLeft: '1%'}}>
          <Text style={styles.titlePlan}>{planName} Plan </Text>
        </View>
      </View>
      <View>
        {selectedPlan?.map((item: any, index: number) => (
          <View
            style={[styles.row, {marginVertical: 5, alignItems: 'center'}]}
            key={index}>
            <Image source={ICONS.planDetailsClick} style={styles.tick} />
            <Text style={styles.planDetailsText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default memo(PlanDetails);

const styles = StyleSheet.create({
  tick: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  planDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  planIcon: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row',
  },
  titlePlan: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.SECONDARY_COLOR,
    marginLeft: 5,
  },
  planDetailsText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.P_TEXT,
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
});
