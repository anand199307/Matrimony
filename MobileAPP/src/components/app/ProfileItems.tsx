import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Button from '../common/Button';

interface profileItem {
  content?: string;
  src?: any;
  navFunc?: () => void;
}

const ProfileItems = ({content, src, navFunc}: profileItem) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.row}>
        <Button
          title="Update"
          styledContainer={styles.navBtn}
          onPressFunc={navFunc}
          Height={43}
        />
        <Image source={src} style={styles.rightImage} resizeMode="contain" />
      </View>
    </View>
  );
};

export default ProfileItems;

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 170,
    backgroundColor: colors.PRIMARY_COLOR,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.P_TEXT,
    width: '80%',
    lineHeight: 21,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtn: {
    width: 'auto',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rightImage: {
    width: 100,
    height: 90,
  },
});
