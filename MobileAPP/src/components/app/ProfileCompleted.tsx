import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Slider from '../common/Slider';

interface profileItem {
  content?: string;
  src?: any;
  navFunc?: (value: any) => void;
  profileStatus: number;
  avatar: string;
  completedPrecentage: number;
}

const ProfileCompleted = ({
  completedPrecentage,
  profileStatus,
}: profileItem) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          styles.name
        }>{`Your profile is only ${completedPrecentage}% completed`}</Text>
      <Text style={styles.description}>
        Add more details to complete profile information.
      </Text>
      <Slider
        renderComponentName="ProfileRating"
        profileStatus={profileStatus}
      />
    </View>
  );
};

export default ProfileCompleted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SKY_BLUE_BG,
    paddingVertical: 20,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
    marginHorizontal: 20,
    marginTop: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginHorizontal: 20,
  },
});
