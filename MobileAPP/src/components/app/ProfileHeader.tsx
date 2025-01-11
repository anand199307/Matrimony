import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import LinearGradient from 'react-native-linear-gradient';
import {ICONS} from '../../assets/Icons';
import colors from '../../configurations/config/color.config';

interface profileHeader {
  title?: any;
  navFunc?: () => void;
  showRightIcon?: boolean;
  rightIconAction?: () => void;
}

const ProfileHeader = ({
  title,
  navFunc,
  showRightIcon,
  rightIconAction,
}: profileHeader) => {
  return (
    <LinearGradient
      colors={['#EE2150', '#B4173C']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.header}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={navFunc}>
            <Image
              source={ICONS.backArrow}
              style={styles.navigationStyle}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        {showRightIcon && (
          <TouchableOpacity onPress={rightIconAction}>
            <Image
              source={ICONS.backArrow}
              style={styles.couponCardStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flex: 0.12,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 20,
    color: colors.P_TEXT,
    textTransform: 'capitalize',
  },
  navigationStyle: {
    width: 40,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20,
  },
  couponCardStyle: {
    width: 40,
    height: 23,
    marginTop: 5,
    marginRight: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
});
