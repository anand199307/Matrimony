/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import {ICONS} from '../../../assets/Icons/index';
import {IMAGES} from '../../../assets/Images/index';

//redux

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    setTimeout(() => navigation.navigate('Welcome'), 1500);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <ImageBackground source={IMAGES.splashBG} style={styles.BgImage}>
        <Image source={ICONS.appLogo} style={styles.logo} />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 120,
  },
  BgImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
  },
});
