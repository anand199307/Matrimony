import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import {ICONS} from '../../assets/Icons';

interface matchesProfile {
  src?: any;
  firstName?: string;
  lastName?: string;
  age?: string;
  basicDetails?: any;
  gender: string;
  careerDetails?: any;
}

const MatchesProfile = ({
  src,
  firstName,
  lastName,
  age,
  gender,
  basicDetails,
  careerDetails,
}: matchesProfile) => {
  return (
    <View style={styles.profileContainer}>
      <View>
        <Image
          source={
            src
              ? {uri: src}
              : gender === 'Female'
              ? ICONS.femaleIcon
              : ICONS.maleIcon
          }
          style={styles.matchesProfile}
        />
        <View>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
        </View>
        <View>
          <Text style={styles.description} numberOfLines={1}>
            {age + ','} {basicDetails?.height + ','} {careerDetails?.education}{' '}
            {careerDetails?.occupation}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MatchesProfile;

const styles = StyleSheet.create({
  matchesProfile: {
    width: 149,
    height: 150,
    borderRadius: 5,
  },
  description: {
    fontSize: 12,
    width: 150,
    fontWeight: '400',
    color: '#717171',
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  name: {
    fontSize: 14,
    width: 150,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
  },
  profileContainer: {
    margin: 5,
    width: 150,
    height: 200,
    alignItems: 'center',
  },
});
