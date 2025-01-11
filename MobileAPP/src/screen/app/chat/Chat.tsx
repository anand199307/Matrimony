/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/common/GlobalText';
import Header from '../../../components/app/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Chat';
import {ICONS} from '../../../assets/Icons';
import Button from '../../../components/common/Button';
import Dropdown from '../../../components/common/Dropdown';
import {useSelector} from 'react-redux';
import AppApi from '../../../configurations/Api/AppApi';
import {getWhatsAppLikeTime} from '../../../utilis/helper/TimeConvertion';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const list: any[] = [
  {
    id: 1,
    content: 'View profile',
  },
  {
    id: 2,
    content: 'Request Horoscope',
  },
  {
    id: 3,
    content: 'Block and report',
    text: 'red',
  },
];
const Chat = () => {
  const [activeDropdown, setActiveDropdown] = useState<Boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [chats, setChats] = useState<any[]>([]);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const roomId = useSelector((state: any) => state?.home?.chatRoomId);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [sendingMessage, setsendingMessage] = useState(false);

  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, []);
  const navFunc = () => navigation.navigate('messageScreens');
  const onPressFunc = () => {};
  const menuFunc = () => setActiveDropdown(!activeDropdown);
  const selectedData = () => setActiveDropdown(false);

  const fetchChats = async () => {
    try {
      let resp = await AppApi.getChatMessage({
        limit: 200,
        page: '1',
        roomId: roomId,
      });
      if (resp.status === 200) {
        setChats(resp.data.response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error is fetching chatmessage', error);
    }
  };

  const sendMessage = async () => {
    try {
      setsendingMessage(true);
      const body = {
        message: chatMessage,
        chatRoomId: roomId,
      };
      let resp = await AppApi.sendMessage({body});
      if (resp.status === 200) {
        setChatMessage('');
        setsendingMessage(false);
      }
    } catch (error) {
      setsendingMessage(false);
      console.log('error in sending chatmessage', error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchChats();
      console.log('calling');
      // const intervalId = setInterval(fetchChats, 3000);
      // Clean up the interval when the component unmounts
      // return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EE2150', '#B4173C']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <Header
          title="Chat"
          titleDark
          navFunc={navFunc}
          ShowLeftIcon={true}
          ShowRightIcon={true}
          menuFunc={menuFunc}
        />
      </LinearGradient>
      <Dropdown
        dropdownToggle={activeDropdown}
        selectedData={selectedData}
        list={list}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {chats.length === 0 && (
            <View style={styles.initialChatContainer}>
              <View style={styles.close}>
                <Image source={ICONS.chatExit} style={styles.chatExitStyle} />
              </View>
              <Image
                style={styles.msgIcon}
                source={ICONS.chatMessage}
                resizeMode="contain"
              />
              <Text style={styles.contentHeading}>
                Want to learn more about them?
              </Text>
              <Text style={styles.content}>
                Stop hanging around for Brindha. Make the first move and see
                what happens!
              </Text>
              <View style={{width: '80%'}}>
                <Button
                  title='Say "Hi"'
                  MV={15}
                  onPressFunc={onPressFunc}
                  Height={40}
                />
              </View>
            </View>
          )}
          {chats?.length > 0 && (
            <View style={styles.container}>
              <ScrollView
                style={styles.chatContainer}
                showsVerticalScrollIndicator={false}>
                {chats?.reverse().map(item => {
                  return (
                    <View>
                      {item?.senderId === currentUser?.uuid && (
                        <View style={styles.margin}>
                          <View style={styles.leftChat}>
                            <Text style={styles.leftChatText}>
                              {item?.message}
                            </Text>
                            <Text style={styles.leftChatTime}>
                              {getWhatsAppLikeTime(item?.createdAt)}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item?.senderId !== currentUser?.uuid && (
                        <View style={styles.margin}>
                          <View style={styles.rightChat}>
                            <Text style={styles.rightChatText}>
                              {item?.message}
                            </Text>
                            <Text style={styles.rightChatTime}>
                              {getWhatsAppLikeTime(item?.createdAt)}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.footer}>
                <View style={styles.inputMessage}>
                  <Image source={ICONS.smile} style={styles.smile} />
                  <TextInput
                    style={styles.textInput}
                    value={chatMessage}
                    onChangeText={newText => setChatMessage(newText)}
                    placeholder={'Type your message here..'}
                  />
                </View>
                {sendingMessage ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                  </View>
                ) : (
                  <TouchableOpacity onPress={sendMessage}>
                    <Image source={ICONS.connectNow} style={styles.mic} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    // paddingVertical: 20,
    position: 'relative',
    justifyContent: 'space-between',
  },
  chatContainer: {
    flex: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mic: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
  },
  inputMessage: {
    width: '80%',
    height: 58,
    backgroundColor: colors.BG_FORM_LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  footer: {
    // top: '5%',
    backgroundColor: colors.PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  initialChatContainer: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    backgroundColor: colors.BABY_PINK_BG,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  smile: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  chatExitStyle: {
    width: 16,
    height: 16,
  },
  margin: {
    marginVertical: 10,
  },
  textInput: {
    width: 250,
    height: 55,
    backgroundColor: colors.BG_FORM_LIGHT_GREY,
  },
  leftChat: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    maxWidth: 300,
    height: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderTopEndRadius: 7,
    backgroundColor: colors.SECONDARY_COLOR,
  },
  rightChat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 300,
    height: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderTopStartRadius: 7,
    marginVertical: 5,
    backgroundColor: colors.BG_LIGHT_GREY,
  },
  rightChatText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.T_TEXT,
  },
  close: {
    position: 'absolute',
    top: 25,
    right: 30,
  },
  rightChatTime: {
    marginTop: 'auto',
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    color: colors.Q_TEXT,
  },
  leftChatText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
  leftChatTime: {
    marginTop: 'auto',
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
  msgIcon: {
    height: 50,
    width: 50,
  },
  contentHeading: {
    fontSize: 19,
    fontWeight: '700',
    color: '#333333',
    marginVertical: 10,
  },
  content: {
    width: '80%',
    fontSize: 15,
    fontWeight: '400',
    color: '#626262',
    textAlign: 'center',
    lineHeight: 21,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
