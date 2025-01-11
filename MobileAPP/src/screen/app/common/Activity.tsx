import {
  StyleSheet,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import colors from '../../../configurations/config/color.config';
import ProfileDetailsCard from '../../../components/app/ProfileDetailsCard';
import LinearGradient from 'react-native-linear-gradient';
import FilterBtn from '../../../components/app/HeaderFilterButton';
import Text from '../../../components/common/GlobalText';
import {GlobalStyles} from '../../../utilis/styles/styles';
import {IMAGES} from '../../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import Button from '../../../components/common/SecondaryButton';
import Slider from '../../../components/common/Slider';
import {ICONS} from '../../../assets/Icons';

//redux
import {useDispatch} from 'react-redux';
import {appAction} from '../../../redux/actions';

const profile: any = [
  {
    id: '1',
    img: 'cool',
  },
  {
    id: '2',
    img: 'cool',
  },
  {
    id: '3',
    img: 'cool',
  },
  {
    id: '4',
    img: 'cool',
  },
];

const filterList: any = [
  {
    id: '1',
    img: 'Discover Matches',
  },
  {
    id: '2',
    img: 'Pending Matches',
  },
  {
    id: '3',
    img: 'Approved Matches',
  },
  {
    id: '4',
    img: 'near me',
  },
  {
    id: '5',
    img: 'newly joined',
  },
  {
    id: '6',
    img: 'matches for you',
  },
  {
    id: '7',
    img: 'online',
  },
];

const Activity = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<any>('');
  const dispatch = useDispatch();

  const selectedBtn = (val: any) => {
    setActiveBtn(val?.id);
    dispatch(appAction.setSelectedDiscoverData(val?.img));
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, []);
  const navigating = () => navigation.navigate('HomeScreens');

  const selectedCard = useCallback(
    (prop: any) => {
      setSelectedPlan(prop);
      navigation.navigate('ProfileDetails');
    },
    [selectedPlan],
  );

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
          <TouchableOpacity onPress={navigating}>
            <Image
              source={ICONS.leftArrowWhite}
              style={styles.navigationStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Activity</Text>
        </View>

        <View style={styles.btnList}>
          <FlatList
            data={filterList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FilterBtn
                item={item}
                activeId={true}
                selectedBtn={selectedBtn}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.design} />
      </LinearGradient>
      {/* <View style={styles.initialContainer}>
        <Text style={GlobalStyles.title}>Attract more matches!</Text>
        <Text style={GlobalStyles.description}>
          Here are some tips for you to enhance your profile
        </Text>
        <Image
          source={IMAGES.activityLogo}
          style={styles.initialNotificationLogo}
        />
        <Text style={GlobalStyles.title}>Tell us about your preferences</Text>
        <Text style={GlobalStyles.description}>
          Help us know you about your preferences to find you a better partner
        </Text>
        <View style={{ width: "60%" }}>
          <Button title="Manage preferences" MV={20} Height={44} />
        </View>
      </View>
      <View style={styles.footer}>
        <Slider renderComponentName="activity" countNumber={4} />
      </View> */}
      <View style={styles.body}>
        <FlatList
          data={profile}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ProfileDetailsCard
              parentCompName="Activity"
              onPress={selectedCard}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    flex: 0.24,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  body: {
    flex: 0.76,
  },
  footer: {
    flex: 0.2,
    backgroundColor: colors.BABY_PINK_BG,
  },
  navigationStyle: {
    width: 30,
    height: 19,
    marginTop: 6,
    marginLeft: 12,
    marginRight: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    // textAlign: "center",
    color: colors.WHITE_TEXT,
  },
  design: {
    width: '100%',
    height: 30,
    backgroundColor: colors.WHITE_TEXT,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  btnList: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialContainer: {
    flex: 0.56,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialNotificationLogo: {
    width: 200,
    height: 200,
    marginVertical: 15,
  },
  nav: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
    marginTop: 20,
  },
});
