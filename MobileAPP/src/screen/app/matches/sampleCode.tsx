import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import {IMAGES} from '../../../assets/Images';
import {ICONS} from '../../../assets/Icons';
import colors from '../../../configurations/config/color.config';

interface CardProps {
  data: any[];
  i: number;
  item: {
    uuid: string;
    avatar: string;
    firstName: string;
    lastName: string;
    gender: string;
    generalDetails: any;
    locationDetails: any;
    age: string;
  };
  removeItem: (value: any) => void;
  setAction: (color?: string) => void;
}

export const Card = ({data, i, item, removeItem, setAction}: CardProps) => {
  const [active, setActive] = useState<boolean>(false);
  const {width} = Dimensions.get('window');
  const offset = width / 5;

  const isPositive = useRef(false);
  const isNegative = useRef(false);
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-40deg', '0deg', '40deg'],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
        listener: (_: GestureResponderEvent, gestureState: any) => {
          if (!isPositive.current && gestureState.dx > offset) {
            isPositive.current = true;
            setAction('#00ff0066');
            setTimeout(() => {
              //  selected();
            }, 100);
          } else if (isPositive.current && gestureState.dx > offset) {
            isPositive.current = false;
            setAction();
          } else if (isPositive.current && gestureState.dx < offset) {
            isPositive.current = false;
            setAction();
          } else if (isNegative.current && gestureState.dx < -offset) {
            isNegative.current = true;
            setAction('#ff000066');
          } else if (isNegative.current && gestureState.dx > -offset) {
            isNegative.current = false;
            setAction();
          }
        },
      }),
      onPanResponderRelease: (_: GestureResponderEvent, gestureState) => {
        if (
          Math.abs(gestureState.vx) > 1 ||
          Math.abs(gestureState.dx) > offset
        ) {
          Animated.spring(pan, {
            toValue: {
              x: width * 2 * (gestureState.dx < 0 ? -1 : 1),
              y: 0,
            },
            useNativeDriver: true,
            bounciness: 0,
          }).start();
          setTimeout(() => {
            removeItem(item);
          }, 100);
          console.log('remove');
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        }
        isPositive.current = false;
        isNegative.current = false;
        setAction();
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
        isPositive.current = false;
        isNegative.current = false;
        setAction();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {zIndex: data.length - i},
      ]}>
      <Animated.View
        style={[
          styles.item,
          {
            transform: [{translateX: pan.x}, {rotate}],
            width: 80 - i * 1 + '%',
          },
        ]}>
        <View style={styles.body}>
          <ImageBackground
            source={
              item?.avatar
                ? {uri: item.avatar}
                : item?.gender === 'Female'
                ? IMAGES.femalePic
                : IMAGES.profilepicture
            }
            imageStyle={styles.imageCard}
            resizeMode="cover"
            style={styles.matchesCard}>
            <View style={styles.bottom}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.firstName} {item?.lastName}, {item.age}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {item?.generalDetails?.education}, {item?.locationDetails?.city}
                , {item?.locationDetails?.state}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.likeAction}>
            <Pressable onPress={() => setActive(!active)}>
              {active ? (
                <Image
                  source={ICONS.activeHeart}
                  style={styles.middleIcon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={ICONS.inActiveHeart}
                  style={styles.middleIcon}
                  resizeMode="contain"
                />
              )}
            </Pressable>
          </View>
          <View style={styles.actions}>
            <Image source={ICONS.notInterested} style={styles.leftIcon} />
            <Image source={ICONS.connectNow} style={styles.rightIcon} />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  body: {
    height: '90%',
    width: 400,
    padding: 20,
    position: 'relative',
  },
  matchesCard: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  bottom: {
    padding: 20,
    width: '100%',
    height: 125,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.P_TEXT,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.P_TEXT,
  },
  actions: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 25,
    left: 0,
  },
  likeAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    zIndex: 1,
  },
  middleIcon: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  leftIcon: {
    marginLeft: 40,
    width: 80,
    height: 80,
  },
  rightIcon: {
    width: 80,
    height: 80,
  },
  mainContainer: {
    flex: 0.9,
  },
  imageCard: {
    borderRadius: 12,
  },
});

export default Card;
