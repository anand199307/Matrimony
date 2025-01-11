import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Avatar from '../common/Avatar';
import NameAvatar from '../common/NameAvatar';

interface chat {
  profilePicture?: string;
  OnPress?: (value: any) => void;
  name?: string;
  message?: string;
  time?: string | number;
  count?: string;
  data?: any;
}

const ChatContainer = ({
  profilePicture,
  OnPress,
  name,
  message,
  time,
  count,
}: chat) => {
  const profileNavigate = () => {};
  return (
    <TouchableOpacity style={styles.chatContainer} onPress={OnPress}>
      {profilePicture ? (
        <Avatar
          WIDTH={60}
          HEIGHT={60}
          src={profilePicture}
          PressFunc={profileNavigate}
        />
      ) : (
        <NameAvatar size={40} text={name} backgroundColor="#3498db" />
      )}
      <View style={styles.middleContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.messageActive} numberOfLines={1}>
          {message}
        </Text>
        {/* <Text style={styles.messageInActive} numberOfLines={1}>
              Hi, morning too Virat!
            </Text> */}
      </View>
      <View style={styles.lastContainer}>
        <View style={styles.unReadCount}>
          <Text style={styles.Count}>{count}</Text>
        </View>
        <Text style={styles.messageInActive}>{time}</Text>
        {/* <Text style={styles.messageInActive}>Yesterday</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ChatContainer;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  middleContainer: {
    width: '60%',
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.P_TEXT,
    fontFamily: 'Poppins-Regular',
  },
  messageInActive: {
    fontSize: 12,
    fontWeight: '100',
    color: colors.P_TEXT,
    marginTop: 7,
    fontFamily: 'Poppins-Regular',
  },
  lastContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  messageActive: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.P_TEXT,
    marginTop: 7,
    fontFamily: 'Poppins-Regular',
  },
  unReadCount: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: colors.SECONDARY_COLOR,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Count: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
    fontFamily: 'Poppins-Regular',
  },
});
