/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from 'navigation/tabs/Home';
import {useNavigation} from '@react-navigation/native';
import {homeAction} from '../../redux/actions';
import AppApi from '../../configurations/Api/AppApi';
import {IMAGES} from '../../assets/Images';
import {ICONS} from '../../assets/Icons';
import {HEIGHT} from '../../configurations/config/app.config';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface SwipeableCardProps {
  item: {
    id: string;
    cardTitle: string;
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    generalDetails: any;
    age: string;
    locationDetails: any;
    uuid: string;
  };
  removeCard: (uuid: string) => void;
  swipedDirection: (direction: string) => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  item,
  removeCard,
  swipedDirection,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const dispatch = useDispatch();
  const [xPosition] = useState(new Animated.Value(0));
  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => false,
    onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
    onStartShouldSetPanResponderCapture: (_evt, _gestureState) => false,
    onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
    onPanResponderMove: (_evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = 'Right';
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = 'Left';
      }
    },
    onPanResponderRelease: (_evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(item?.uuid);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(item.uuid);
        });
      }
    },
  });

  const navProfileCard = async (uuid: string) => {
    const resp = await AppApi.getProfileInfo({id: uuid});
    if (resp.status === 200) {
      dispatch(homeAction.setUserProfileInfo(resp.data.response));
      navigation.navigate('MatchesProfileDetails');
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          opacity: cardOpacity,
          transform: [{translateX: xPosition}, {rotate: rotateCard}],
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navProfileCard(item.uuid);
        }}
        style={{backgroundColor: '#FFFFFFF', borderRadius: 18}}>
        <View>
          <ImageBackground
            source={
              item?.avatar
                ? {uri: item.avatar}
                : item?.gender === 'Female'
                ? IMAGES.femalePic
                : IMAGES.profilepicture
            }
            imageStyle={{borderRadius: 18}}
            resizeMode={'contain'}
            style={styles.imageBackground}>
            <View style={styles.bottom}>
              <View style={{flexDirection: 'row', paddingLeft: 20}}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.firstName} {item?.lastName} ,{' '}
                </Text>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.age}
                </Text>
              </View>
              <Text style={{paddingLeft: 20}}>
                {item?.generalDetails?.education}, {item?.locationDetails?.city}
                , {item?.locationDetails?.state}.
              </Text>
            </View>
          </ImageBackground>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 20,
            }}>
            <Pressable>
              <Image source={ICONS.notInterested} style={styles.iconStyle} />
            </Pressable>
            <Pressable onPress={() => setActive(!active)}>
              {active ? (
                <Image
                  source={ICONS.activeHeart}
                  style={styles.heartIcon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={ICONS.inActiveHeart}
                  style={styles.heartIcon}
                  resizeMode="contain"
                />
              )}
            </Pressable>
            <Pressable>
              <Image source={ICONS.connectNow} style={styles.iconStyle} />
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardStyle: {
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 15,
  },
  cardTitleStyle: {
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageBackground: {
    flex: 1, // Take up the full size of the parent
    borderRadius: 18,
    width: SCREEN_WIDTH * 0.9,
    height: HEIGHT / 1.8,
    justifyContent: 'flex-end',
    backgroundColor: '#D9D9D9',
    objectFit: 'fill',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: 100,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    filter: 'blur(30px)',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#070F26',
    fontFamily: 'Poppins-Regular',
  },
  imageStyle: {
    borderRadius: 18,
    width: '100%',
    height: '100%',
  },
  description: {
    fontWeight: '400',
    color: '#070F26',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  iconStyle: {
    width: 80,
    height: 80,
    bottom: 20,
  },
  heartIcon: {
    width: 60,
    height: 60,
    top: 25,
  },
});
