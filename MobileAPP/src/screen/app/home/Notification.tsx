/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../components/common/GlobalText';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configurations/config/color.config';
import {ICONS} from '../../../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import NotificationList from '../../../components/app/NotificationList';
import AppApi from '../../../configurations/Api/AppApi';
import {useSelector} from 'react-redux';
import {getWhatsAppLikeTime} from '../../../utilis/helper/TimeConvertion';

import NotificationIcon from '../../../assets/vector/Notification.icon';
const Notification = () => {
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [notificationList, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationAction, setNotificationAction] = useState(false);
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, []);
  const navFunc = () => navigation.navigate('HomeScreens');
  const navigating = () => {};
  // fetchNotifications
  const notifications = async () => {
    try {
      const res = await AppApi.getNotifications({
        uuid: currentUser?.uuid,
        page: '1',
        limit: 100,
      });
      if (res.status === 200) {
        console.log(res.data.response.data);
        setIsLoading(false);
        setNotifications(res.data.response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error in fetching notifications', error);
    }
  };

  // updataNotification
  const updateSatus = async (notificationId: string) => {
    try {
      setNotificationAction(true);
      const res = await AppApi.updateNotificationStatus({id: notificationId});
      if (res.status === 200) {
        notifications();
        setNotificationAction(false);
      }
    } catch (error) {
      setNotificationAction(false);
      console.log('error in update notifications', error);
    }
  };

  useEffect(() => {
    notifications();
  }, []);
  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={navFunc}>
          <Image
            source={ICONS.backArrow}
            style={styles.navigationStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View />
      </LinearGradient>
      {notificationList.length === 0 && !isLoading && (
        <View style={styles.noNotification}>
          <NotificationIcon />

          <Text style={styles.notificationHeading}>
            Stay updated with your notification here!
          </Text>
          <Text style={styles.noNotificationContent}>
            You’ll be notified when your profile sees some activity until then,
            send interests to matches you like!
          </Text>
          <TouchableOpacity
            style={{marginTop: 16}}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Text style={styles.buttonText}>View Profiles</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        notificationList?.length !== 0 && (
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>New</Text>
            {notificationList.map(item => {
              return (
                <NotificationList
                  navFunc={navigating}
                  key={item.id}
                  // avatar={IMAGES.samplePicture}
                  profileName={item?.sender?.firstName}
                  notificationText={item?.body}
                  time={getWhatsAppLikeTime(item?.createdAt)}
                  btnName="Close"
                  updateSatus={() => updateSatus(item.notificationId)}
                  isLoading={isNotificationAction}
                  notificationId={item.notificationId}
                />
              );
            })}
          </ScrollView>
        )
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  header: {
    flex: 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    height: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: 20,
    color: colors.WHITE_TEXT,
    marginTop: 20,
  },
  body: {
    flex: 0.83,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  initialContainer: {
    flex: 0.83,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialNotificationLogo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  nav: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotification: {
    flex: 1,
    marginTop: '30%',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  noNotificationText: {
    height: 200,
    width: 200,
  },
  notificationHeading: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    color: '#000',
    marginVertical: 16,
  },
  noNotificationContent: {
    color: '#898989',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  buttonText: {
    color: '#ED1F50',
    fontFamily: 'Poppins-Regular',
  },
});
