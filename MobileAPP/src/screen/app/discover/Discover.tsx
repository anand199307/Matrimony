/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../configurations/config/color.config';
import ProfileDetailsCard from '../../../components/app/ProfileDetailsCard';
import LinearGradient from 'react-native-linear-gradient';
import FilterBtn from '../../../components/app/HeaderFilterButton';
import Text from '../../../components/common/GlobalText';
import AppApi from '../../../configurations/Api/AppApi';
import {MatchesProfile} from '../../../utilis/Interfaces';

//redux
import {useDispatch} from 'react-redux';
import {appAction} from '../../../redux/actions';
import {ICONS} from '../../../assets/Icons';
import {useNavigation} from '@react-navigation/native';

const filterList: any[] = [
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
    img: 'Your Favourites',
  },
  {
    id: '5',
    img: 'Favourited you',
  },
];
const Discover = () => {
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const [profiles, setProfiles] = useState<MatchesProfile[]>([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedBtn = (val: any) => {
    setActiveBtn(val?.id);
    dispatch(appAction.setSelectedDiscoverData(val?.img));
  };
  useEffect(() => {
    fetchNewMatches();
  }, []);

  const fetchNewMatches = async () => {
    try {
      const res = await AppApi.getNewMatches({limit: 20});
      setProfiles(res.data.response.data);
    } catch (error: any) {
      console.error(error);
    }
  };
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
        <View style={styles.IconWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={ICONS.backArrow}
              style={styles.navigationStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Discover</Text>
        </View>
        <View />
      </LinearGradient>
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
        <View style={styles.btnList}>
          <FlatList
            data={filterList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FilterBtn
                item={item}
                activeId={activeBtn}
                selectedBtn={selectedBtn}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.design} />
      </LinearGradient>
      <View style={styles.body}>
        <FlatList
          data={profiles}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
            paddingTop: 20,
          }}
          renderItem={({item}) => (
            <ProfileDetailsCard
              _id={item._id}
              parentCompName="Discover"
              firstName={item?.firstName}
              lastName={item.lastName}
              age={item.age}
              gender={item.gender}
              profileId={item.profileId}
              basicDetails={item.basicDetails}
              careerDetails={item.careerDetails}
              membership={item.membership}
              src={item.avatar}
              locationDetails={item?.locationDetails}
              uuid={item.uuid}
              religionDetails={item.religionDetails}
            />
          )}
          keyExtractor={(item, index) =>
            item?.uuid ? item.uuid.toString() : index.toString()
          }
        />
      </View>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_TEXT,
  },
  heading: {
    flex: 0.13,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.WHITE_TEXT,
  },
  design: {
    width: '100%',
    height: 20,
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
  header: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  navigationStyle: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  IconWrapper: {
    width: 40,
    height: 40,
  },
});
