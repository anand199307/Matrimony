import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Text from '../../components/common/GlobalText';
import colors from '../../configurations/config/color.config';
// import Avatar from '../../components/common/Avatar';
import NameAvatar from '../../components/common/NameAvatar';

interface notification {
  notificationId: string;
  avatar?: any;
  profileName?: any;
  notificationText?: any;
  time?: any;
  btnName?: any;
  navFunc?: () => void;
  boldText?: boolean;
  updateSatus?: () => {};
  isLoading: any;
}

const NotificationList = ({
  // navFunc,
  // avatar,
  notificationId,
  profileName,
  notificationText,
  time,
  btnName,
  boldText,
  updateSatus,
  isLoading,
}: notification) => {
  // const profileNav = () => {};
  return (
    <View style={styles?.containner}>
      <View style={styles.divider} />
      <View style={styles.row}>
        <View style={styles.leftAlign}>
          <NameAvatar size={40} text={profileName} />
          <View style={styles.textAlign}>
            <Text style={styles.text}>
              {profileName && (
                <Text style={styles.thickText}>
                  {profileName} {''}
                </Text>
              )}
              {boldText ? (
                <Text style={styles.thickText}>{notificationText}</Text>
              ) : (
                <Text style={styles.thinText}>{notificationText}</Text>
              )}
            </Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
        <View style={styles.rightAlign}>
          {isLoading && notificationId ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : (
            <TouchableOpacity onPress={updateSatus} style={styles.btnBorder}>
              <Text style={styles.btnText}>{btnName}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
    backgroundColor: colors.GRAY_HORIZONTAL_LINE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  thickText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.P_TEXT,
    letterSpacing: 0.4,
  },
  thinText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.S_TEXT,
    letterSpacing: 0.4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#7B7B7B',
    letterSpacing: 0.4,
    marginTop: 6,
  },
  leftAlign: {
    flexDirection: 'row',
    width: '62%',
  },
  textAlign: {
    marginLeft: 15,
  },
  text: {
    lineHeight: 18,
  },
  rightAlign: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBorder: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: colors.SECONDARY_COLOR,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: colors.SECONDARY_COLOR,
    fontSize: 12,
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
