import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import {searchFilter} from '../../utilis/staticData/Search';
import Box from '../app/QuickActionBox';

// Define the type for the count prop
type CountType = {
  [key: string]: number;
};

interface QuickActionProps {
  count: CountType;
}

const QuickAction = ({count}: QuickActionProps) => {
  return (
    <>
      <Text style={styles.heading}>Quick Actions</Text>
      <FlatList
        data={searchFilter}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <Box
            startColor={item?.startColor}
            endColor={item?.endColor}
            quickActionText={item?.quickActionText}
            quickActionNumber={count[`${item.valueText}`]}
            key={item.id}
          />
        )}
        keyExtractor={item => item?.id}
      />
    </>
  );
};

export default QuickAction;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.P_TEXT,
    marginHorizontal: 20,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
  },
});
