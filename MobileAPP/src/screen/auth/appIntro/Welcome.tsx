/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Animated, StatusBar} from 'react-native';
import React, {useState, useRef} from 'react';
import Button from '../../../components/common/Button';
import SecondaryButton from '../../../components/common/SecondaryButton';
import WelcomeContent from '../../../components/auth/WelcomeContent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import Slider from '../../../components/common/Slider';
import colors from '../../../configurations/config/color.config';

const welocome1ContentBold = [
  'Find your perfect match',
  'for a lifetime of love.',
];

const welocome1Contentsmall = [
  'Discover your soulmate, and make a lifetime.',
  'Create a beautiful journey of togetherness.',
];

const welocome2ContentBold = ['Your journey towards', 'love begins here.'];

const welocome2Contentsmall = [
  'The Ultimate Destination for Finding Love, ',
  ' Build Meaningful Relationships.',
];
const welocome3ContentBold = [
  'Explore, Connect, ',
  'Find Love - All in One Place.',
];

const welocome3Contentsmall = [
  'Find Love that Lasts a Lifetime, ',
  '  Build a Future Together.',
];

const Welcome = () => {
  const [content, setcontent] = useState<number>(1);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  const fadeInWelcomeContent2 = () => {
    setcontent(2);
    Animated.timing(fadeAnim1, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeInWelcomeContent3 = () => {
    setcontent(3);
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <Slider renderComponentName="Welcome" />
      <View style={styles.container}>
        {content === 1 && (
          <>
            <WelcomeContent
              contentBold={welocome1ContentBold}
              contentSmall={welocome1Contentsmall}
            />
            <View style={styles.button}>
              <View style={styles.width}>
                <SecondaryButton
                  title="Next"
                  MV={10}
                  onPressFunc={fadeInWelcomeContent2}
                />
              </View>
            </View>
          </>
        )}

        {content === 2 && (
          <Animated.View style={{opacity: fadeAnim1}}>
            <WelcomeContent
              contentBold={welocome2ContentBold}
              contentSmall={welocome2Contentsmall}
            />
            <View style={styles.button}>
              <View style={styles.width}>
                <SecondaryButton
                  title="Next"
                  MV={10}
                  onPressFunc={fadeInWelcomeContent3}
                />
              </View>
            </View>
          </Animated.View>
        )}

        {content === 3 && (
          <Animated.View style={{opacity: fadeAnim2}}>
            <WelcomeContent
              contentBold={welocome3ContentBold}
              contentSmall={welocome3Contentsmall}
            />
            <View style={styles.flex}>
              <View style={{width: '40%'}}>
                <Button
                  title="Login"
                  MV={10}
                  onPressFunc={() => {
                    navigation.navigate('Login');
                  }}
                />
              </View>
              <View style={{width: '40%'}}>
                <SecondaryButton
                  title="Register"
                  MV={10}
                  onPressFunc={() => {
                    navigation.navigate('SignUp');
                  }}
                />
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  width: {
    width: '40%',
  },
  carousel: {
    height: 500,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  boldText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.P_TEXT,
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#BABABA',
  },
  button: {
    marginTop: 30,
    width: '100%',
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
