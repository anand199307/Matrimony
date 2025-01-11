/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import color from '../../configurations/config/color.config';
import ProfileItem from '../app/ProfileItems';
import CouplesCard from '../app/CouplesCard';
import ActivityFooter from '../app/ActivityFooter';
import {
  Carousel,
  CarouselRating,
  CarouselCouple,
  footerContentActivity,
} from '../../utilis/staticData/Slider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/tabs/Home';

interface slider {
  renderComponentName?: any;
  countNumber?: any;
  profileStatus?: any;
}

const Slider = ({renderComponentName, countNumber, profileStatus}: slider) => {
  const flatListRef = useRef<any>();
  const index = useRef<any>(0);
  const [currentIndex, setcurrentIndex] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  let enable = true,
    width = Dimensions.get('window').width,
    count = countNumber ? countNumber : 3,
    duration = 6000;
  useEffect(() => {
    if (enable && width && count) {
      setInterval(autoScrollTo, duration);
    }
  }, []);

  const autoScrollTo = () => {
    const newIndex = index.current;
    if (newIndex < count) {
      flatListRef?.current?.scrollToOffset({
        animated: true,
        offset: width * newIndex,
      });
      index.current = newIndex + 1;
    } else {
      index.current = 0;
    }
  };

  const renderItemWelcome = ({item}: any) => {
    return <Image source={item.img} style={styles.itemImage} />;
  };

  const navFunc = () => {
    navigation.navigate('Profile');
  };

  const getVisibleItems = (status: any) => {
    // Define the filter logic based on the profile status
    switch (status) {
      case 2:
        return CarouselRating; // Show all items
      case 3:
        return CarouselRating.slice(1); // Show items 2, 3, and 4
      case 4:
        return CarouselRating.slice(2); // Show items 3 and 4
      default:
        return []; // Don't show anything for other statuses
    }
  };

  const visibleItems = getVisibleItems(profileStatus);

  const renderItemProfile = ({item}: any) => {
    return (
      <>
        <ProfileItem
          content={item?.content}
          src={item?.src}
          navFunc={navFunc}
          key={item?.id}
        />
      </>
    );
  };

  const renderItemCouple = ({item}: any) => {
    return (
      <CouplesCard content={item?.content} src={item?.src} key={item?.id} />
    );
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const current = Math.floor(offset / totalWidth);
    setcurrentIndex(current);
  };

  return (
    <>
      {renderComponentName === 'Welcome' && (
        <View style={styles.carouselContainer}>
          <View style={styles.upperLayer}>
            <View style={styles.flatlist}>
              <FlatList
                ref={flatListRef}
                data={Carousel}
                renderItem={renderItemWelcome}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                bounces={false}
                onScroll={onScroll}
              />
            </View>
          </View>

          <View style={styles.gradientContainer}>
            <View style={styles.dotContainer}>
              {Carousel?.map((e, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    currentIndex === i ? styles.dotActive : {},
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      )}

      {renderComponentName === 'ProfileRating' && (
        <View style={styles.Container}>
          <FlatList
            ref={flatListRef}
            data={visibleItems}
            renderItem={renderItemProfile}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            bounces={false}
            onScroll={onScroll}
          />
        </View>
      )}

      {renderComponentName === 'royalMatrimonyCouples' && (
        <View style={styles.Container}>
          <FlatList
            ref={flatListRef}
            data={CarouselCouple}
            renderItem={renderItemCouple}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            bounces={false}
            onScroll={onScroll}
          />
        </View>
      )}
      {renderComponentName === 'activity' && (
        <View style={styles.Container}>
          <FlatList
            ref={flatListRef}
            data={footerContentActivity}
            renderItem={({item}: any) => <ActivityFooter item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            bounces={false}
            onScroll={onScroll}
          />
        </View>
      )}
    </>
  );
};
export default Slider;

const styles = StyleSheet.create({
  carouselContainer: {
    width: Dimensions.get('window').width,
    height: 500,
    backgroundColor: color.PRIMARY_COLOR,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  itemImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    height: 600,
    resizeMode: 'cover',
  },
  flatlist: {
    width: Dimensions.get('window').width,
  },
  upperLayer: {
    position: 'absolute',
    top: -150,
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: Dimensions.get('window').width + 180,
    height: 600,
    backgroundColor: color.TRANSPARENT,
    borderWidth: 10,
    borderLeftColor: color.SECONDARY_COLOR,
    borderRightColor: color.SECONDARY_COLOR,
    borderBottomColor: color.SECONDARY_COLOR,
    borderRadius: 600 / 2,
  },
  gradientContainer: {
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.TRANSPARENT,
  },
  dotContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 6,
    width: 6,
    marginHorizontal: 6,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    height: 6,
    width: 20,
    marginHorizontal: 4,
    borderRadius: 100,
    backgroundColor: color.SECONDARY_COLOR,
  },
  Container: {
    width: Dimensions.get('window').width,
    backgroundColor: color.TRANSPARENT,
  },
});
