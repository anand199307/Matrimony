import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';

interface profile {
  text1?: string;
  src?: any;
}

const DiscoverProfileCard = ({text1, src}: profile) => {
  return (
    <View style={styles.circleContainer}>
      <Image source={src} style={styles.circleIcon} />
      <Text style={styles.navTitle}>{text1}</Text>
    </View>
  );
};

export default DiscoverProfileCard;

const styles = StyleSheet.create({
  circleContainer: {
    width: 110,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIcon: {
    width: 50,
    height: 50,
  },
  navTitle: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    color: '#898989',
    marginTop: 5,
  },
});
