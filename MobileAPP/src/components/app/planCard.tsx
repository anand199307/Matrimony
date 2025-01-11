import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import colors from '../../configurations/config/color.config';
import {WIDTH} from '../../configurations/config/app.config';

const planCard = ({item, selectedCard, selectedPlan}: any) => {
  const sale = parseInt(item?.price, 10);
  const totalValue = parseInt(item?.price, 10) + 2000;
  const percentage = ((totalValue - sale) / totalValue) * 100;

  return (
    <TouchableOpacity
      style={[
        item?.id === selectedPlan?.id ? styles.activePlanCard : styles.planCard,
      ]}
      onPress={() => selectedCard(item)}>
      {item?.name === 'Platinum' && (
        <View style={styles.activeContainer}>
          <Text style={styles.activeText}>most popular</Text>
        </View>
      )}
      <Text style={styles.textBold}>{item?.durationInMonths} Months</Text>
      <Text style={styles.contentlimit}>{item?.contactLimit} Contacts</Text>
      <View style={styles.horizontalLine} />
      <Text style={styles.row}>
        <Text style={styles.textLineThrough}>
          {parseInt(item?.price, 10) + 2000}{' '}
        </Text>
        <Text style={styles.textOffer}>{percentage.toFixed() + '%'}</Text>
      </Text>
      <Text style={styles.textAlign}>{item?.price}</Text>
    </TouchableOpacity>
  );
};

export default planCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  activeText: {
    fontSize: 9,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
    backgroundColor: colors.SECONDARY_COLOR,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 5,
    textTransform: 'uppercase',
  },
  activeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
  },
  activePlanCard: {
    width: WIDTH / 3.8,
    height: 165,
    borderWidth: 1,
    borderColor: colors.SECONDARY_COLOR,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  planCard: {
    width: WIDTH / 3.8,
    height: 165,
    borderWidth: 1,
    borderColor: colors.BORDER_FORM,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.P_TEXT,
    lineHeight: 25,
  },
  horizontalLine: {
    width: 40,
    height: 1,
    backgroundColor: colors.BORDER_FORM,
    marginVertical: 10,
  },
  contentlimit: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.S_TEXT,
    lineHeight: 25,
  },
  textLineThrough: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.S_TEXT,
    textDecorationLine: 'line-through',
  },
  textOffer: {
    fontSize: 10,
    fontWeight: '700',
    color: '#27AE60',
    paddingVertical: 15,
  },
  textAlign: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.S_TEXT,
    marginVertical: 5,
  },
});
