/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../../components/common/Avatar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import {ICONS} from '../../../assets/Icons/index';
import QuickAction from '../../../components/app/QuickAction';
import AIMatching from '../../../components/app/AIMatching';
import NewMatches from '../../../components/app/NewMatches';
import ProfileCompleted from '../../../components/app/ProfileCompleted';
import DailyRecomendation from '../../../components/app/DailyRecomendation';
import RoyalMatrimonyCouple from '../../../components/app/RoyalMatrimonyCouples';
import HomeTop from '../../../components/app/homeTop';
import AppApi from '../../../configurations/Api/AppApi';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction, homeAction} from '../../../redux/actions';

const Home = () => {
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const quickActions = useSelector(
    (state: any) => state?.home?.quickAction_Count,
  );
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [dataFetched, setDataFetched] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        dispatch(authAction.setCurrentUser(resp.data?.response?.data));
        actionCount();
      }
    } catch (error) {
      console.log('Error in current user API call', error);
    }
  }, []);

  const actionCount = useCallback(async () => {
    try {
      const resp = await AppApi.getActionCount();
      if (resp.status === 200) {
        dispatch(homeAction.setQuickActionCounts(resp.data?.response));
      }
    } catch (error) {
      console.log('Error in getActionCount', error);
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataFetched) {
      fetchCurrentUser();
      setDataFetched(true);
    }
  }, [dataFetched, fetchCurrentUser]);

  const profileNavigate = () => navigation.navigate('Profile');
  const navFunc = () => navigation.navigate('Notification');
  const completionPercentage = (currentUser?.profileStatus / 5) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EE2150', '#B4173C']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.heading}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={'light-content'}
          translucent={true}
        />
        <View style={styles.row}>
          <Avatar
            WIDTH={50}
            HEIGHT={50}
            src={currentUser?.avatar}
            PressFunc={profileNavigate}
          />
          <Text style={styles.title}>{`Hello, ${currentUser?.firstName}`}</Text>
          <TouchableOpacity onPress={navFunc} style={styles.navigation}>
            <Image
              source={ICONS.notificationBell}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.design} />
      </LinearGradient>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <HomeTop
          userId={currentUser?.userId}
          idVerificationStatus={currentUser?.idVerified}
        />
        <QuickAction count={quickActions} />
        <AIMatching />
        <NewMatches />
        {completionPercentage < 100 && (
          <ProfileCompleted
            avatar={currentUser?.avatar}
            profileStatus={currentUser?.profileStatus}
            completedPrecentage={completionPercentage}
          />
        )}
        <DailyRecomendation />
        <RoyalMatrimonyCouple />
        <View style={styles.marginBottom} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  marginBottom: {
    height: 100,
  },
  heading: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.WHITE_TEXT,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  design: {
    width: '100%',
    height: 30,
    backgroundColor: colors.WHITE_TEXT,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  body: {
    flex: 0.8,
  },
  notificationIcon: {
    width: 28,
    height: 28,
  },
  navigation: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});
