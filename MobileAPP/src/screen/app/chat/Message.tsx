import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import Header from '../../../components/app/AppHeader';
import ChatCard from '../../../components/app/ChatContainer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Chat';
import Avatar from '../../../components/common/Avatar';
import {IMAGES} from '../../../assets/Images/index';
import AppApi from '../../../configurations/Api/AppApi';
import {getWhatsAppLikeTime} from '../../../utilis/helper/TimeConvertion';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {homeAction} from '../../../redux/actions';
import LinearGradient from 'react-native-linear-gradient';

const Message = () => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [recentMatches, setMatches] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const dispatch = useDispatch();
  const profileNavigate = () => {};

  const navFunc = () => {
    navigation.goBack();
  };
  const goChat = (roomId: any) => {
    dispatch(homeAction.setChatRoomId(roomId));
    navigation.navigate('chatScreens');
  };

  const fectChatRooms = async () => {
    setIsLoading(true);
    try {
      let resp = await AppApi.getChatRooms();
      if (resp.status === 200) {
        setChatRooms(resp?.data?.response?.data);
        fetchMatches();
      }
    } catch (error) {
      console.log('error is chatroom api', error);
    }
  };

  const fetchMatches = async () => {
    try {
      let resp = await AppApi.getNewMatches({limit: 5});
      if (resp.status === 200) {
        setMatches(resp?.data?.response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error is profiles api', error);
    }
  };

  useEffect(() => {
    fectChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EE2150', '#B4173C']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <Header
          title="Messages"
          navFunc={navFunc}
          ShowLeftIcon={true}
          titleDark
        />
      </LinearGradient>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <View style={styles.container}>
          {recentMatches?.length > 0 && (
            <View style={styles.recentMatches}>
              <Text style={styles.sideHeading}>Recent Matches</Text>
              <FlatList
                data={recentMatches || []}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={item => (
                  <View style={styles.matchesContainer} key={item.index}>
                    <View style={styles.borderAvatar}>
                      <Avatar
                        WIDTH={50}
                        HEIGHT={50}
                        srcObj
                        src={IMAGES.matches3}
                        PressFunc={profileNavigate}
                      />
                    </View>
                    <Text style={styles.matchesName} numberOfLines={1}>
                      Thalapathy
                    </Text>
                  </View>
                )}
                keyExtractor={item => item._id}
              />
            </View>
          )}
          <View style={styles.messageContainer}>
            <Text style={styles.sideHeading}>Messages</Text>
            <FlatList
              data={chatRooms || []}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ChatCard
                  data={item}
                  profilePicture={item?.userDetails[0]?.userProfilePhoto}
                  OnPress={() => {
                    goChat(item?.uuid);
                  }}
                  name={item?.userDetails[0]?.userFirstName}
                  message={item?.lastMessage}
                  time={getWhatsAppLikeTime(item?.createdAt)}
                  count="1"
                />
              )}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    // paddingTop: 25,
  },
  sideHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.P_TEXT,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  borderAvatar: {
    width: 83,
    height: 83,
    borderRadius: 100,
    marginTop: 7,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.SECONDARY_COLOR,
  },
  recentMatches: {
    marginTop: 10,
    flex: 0.24,
  },
  messageContainer: {
    flex: 0.7,
  },
  matchesName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.P_TEXT,
    textAlign: 'center',
    width: 80,
    marginTop: 5,
  },
  matchesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
