import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import colors from '../../configurations/config/color.config';
import {ICONS} from '../../assets/Icons';
import {useSelector} from 'react-redux';

const ActivePlanCard = () => {
  const auth = useSelector((store: any) => store.auth.currentUser);
  return (
    <View style={styles.activePlanCard}>
      <View style={styles.row}>
        <Text style={styles.row}>
          <Text style={styles.cardHeading}>You are in </Text>
          <Text
            style={[
              styles.cardHeading,
              {color: colors.SECONDARY_COLOR, fontWeight: '700'},
            ]}>
            {auth.membership}
          </Text>
        </Text>
        <Image source={ICONS.crown} style={styles.planIcon} />
      </View>
      {auth.membership === 'Gold' && (
        <Text style={styles.cardDescription}>
          Kindly upgrade your plan to get 2x Matches, use advanced features.
        </Text>
      )}
    </View>
  );
};

export default ActivePlanCard;

const styles = StyleSheet.create({
  activePlanCard: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.BORDER_FORM,
    borderRadius: 8,
    marginVertical: 10,
  },

  row: {
    flexDirection: 'row',
  },

  cardHeading: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.S_TEXT,
    lineHeight: 25,
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.S_TEXT,
    marginVertical: 5,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  planIcon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
});
