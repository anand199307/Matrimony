import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../screen/auth/Auth';
import {ICONS} from '../../assets/Icons';
import Text from '../common/GlobalText';
import color from '../../configurations/config/color.config';

//redux
import {useDispatch} from 'react-redux';
import {authAction} from '../../redux/actions';

interface header {
  navigationText?: string;
  imgSrc?: any;
}

const AuthHeader = ({navigationText, imgSrc}: header) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const navigationFunc = () => {
    if (navigationText === 'Register') {
      navigation.navigate('SignUp');
    } else if (navigationText === 'PartnerPreferance') {
      navigation.navigate('IdVerification');
    } else if (navigationText === 'IdVerification') {
      dispatch(authAction.setLogin(true));
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground source={imgSrc} style={styles.BgImage}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <TouchableOpacity
        style={styles.navigation}
        onPress={() => navigationFunc()}>
        {navigationText === 'PartnerPreferance' ||
        navigationText === 'IdVerification' ? (
          <Text style={styles.skipText}>Skip</Text>
        ) : (
          <>
            <Text style={styles.buttonText}>{navigationText}</Text>
            <Image source={ICONS.rightArrow} style={styles.arrow} />
          </>
        )}
      </TouchableOpacity>
      {navigationText === 'Register' && (
        <>
          <Text style={styles.title}>Hello Again</Text>
          <Text style={styles.description}>
            Welcome back,You’ve been missed!
          </Text>
        </>
      )}
      {navigationText === 'Login' && (
        <View style={styles.loginContent}>
          <Text style={styles.loginText}>Lets Get Started</Text>
          <Text style={styles.loginText}>Create Your Account</Text>
        </View>
      )}
      {navigationText === 'PartnerPreferance' && (
        <View style={styles.partnerPrefernceContent}>
          <Text style={styles.loginText}>
            The Matches you’ll receive will meet{' '}
          </Text>
          <Text style={styles.loginText}>your partner preferences.</Text>
        </View>
      )}
      {navigationText === 'IdVerification' && (
        <View style={styles.IdVerificationContent}>
          <Text style={styles.loginText}>
            Let's make your profile more trustworthy
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default AuthHeader;
const styles = StyleSheet.create({
  BgImage: {
    paddingHorizontal: 15,
    height: 380,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '400',
    color: color.P_TEXT,
  },
  loginContent: {
    paddingTop: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerPrefernceContent: {
    paddingTop: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IdVerificationContent: {
    paddingTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: color.SECONDARY_COLOR,
    textAlign: 'center',
    paddingRight: 3,
    fontSize: 15,
    fontWeight: '500',
  },
  skipText: {
    color: color.P_TEXT,
    textAlign: 'center',
    paddingRight: 3,
    fontSize: 20,
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: color.S_TEXT,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: color.P_TEXT,
    marginBottom: 5,
  },
  arrow: {
    width: 20,
    height: 18,
  },
  navigation: {
    paddingTop: 50,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
