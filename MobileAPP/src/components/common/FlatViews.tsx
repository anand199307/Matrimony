import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

interface flatData {
  data: string[];
}

const FlatView = ({data}: flatData) => {
  const renderItem = ({item}: {item: string}) => (
    <View style={styles.item}>
      <Text style={styles.infoText}>{item}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true} // Display horizontally
    />
  );
};

const styles = StyleSheet.create({
  item: {
    height: 27,
    backgroundColor: '#e0e0e0', // Tag background color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10, // Adjust to control tag roundness
    margin: 2, // Adjust to control spacing between tags
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
});

export default FlatView;
