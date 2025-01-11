/* eslint-disable @typescript-eslint/no-shadow */
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/common/GlobalText';
import React, {useEffect, useState} from 'react';
import SwipeableCard from '../../../components/common/SwipeableCard';
import AppApi from '../../../configurations/Api/AppApi';
import {ICONS} from '../../../assets/Icons';
import LinearGradient from 'react-native-linear-gradient';

const Matches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.goBack();
  const [matchingProfiles, setMatchesProfiles] = useState([]);
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = (uuid: string) => {
    matchingProfiles.splice(
      matchingProfiles.findIndex(item => item?.uuid === uuid),
      1,
    );
    setMatchesProfiles(matchingProfiles);
    if (matchingProfiles.length === 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (
    swipeDirection: React.SetStateAction<string>,
  ) => {
    setSwipeDirection(swipeDirection);
  };

  useEffect(() => {
    fetchNewMatches();
    setNoMoreCard(false);
  }, []);

  const fetchNewMatches = async () => {
    try {
      const res = await AppApi.getNewMatches({limit: 5});
      setMatchesProfiles(res.data.response.data);
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
        style={{}}>
        <View style={styles.header}>
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
          <Text style={styles.title}>Matches</Text>
          <View />
        </View>
        <View style={styles.design} />
      </LinearGradient>
      <View style={styles.headContainer}>
        <Text style={styles.heading}>Matches for You</Text>
      </View>
      <View style={styles.aniMationContainer}>
        {matchingProfiles.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={uuid => removeCard(uuid)}
            swipedDirection={() => lastSwipedDirection(swipeDirection)}
          />
        ))}
        {noMoreCard ? (
          <Text style={styles.heading}> No Matches Found.</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  aniMationContainer: {
    flex: 1,
    alignItems: 'center',
    top: 10,
  },
  heading: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.P_TEXT,
    textTransform: 'uppercase',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.08,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  navigationStyle: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  design: {
    width: '100%',
    height: 30,
    backgroundColor: colors.WHITE_TEXT,
    // backgroundColor: 'red',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFF',
    fontFamily: 'Poppins-Regular',
    top: '5%',
  },
});
