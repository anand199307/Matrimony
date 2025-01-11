import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../../../components/common/GlobalText';
import Button from '../../../components/common/Button';
import Header from '../../../components/auth/ForgotPasswordHeader';
import OTP from '../../../components/auth/OtpComponent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import colors from '../../../configurations/config/color.config';
import AppApi from '../../../configurations/Api/AppApi';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';
import {useFocusEffect} from '@react-navigation/native';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

type screenNavigationProps = RouteProp<
  AuthStackParamList,
  'ForgotPasswordOtpVerify'
>;

const OtpVerify = () => {
  const [code, setCode] = useState<string>('');
  const [token, setToken] = useState<any>('');
  const [count, setCount] = useState<number>(120);
  const [showActive, setShowActive] = useState<boolean>(false);
  const handleOTPChange = (newOTP: React.SetStateAction<string>) => {
    setCode(newOTP);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    params: {resetToken},
  } = useRoute<screenNavigationProps>();

  const tokenAndNumber = useSelector(
    (state: any) => state?.auth?.forgotPasswordMobileNumber,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setToken(resetToken);
  }, [resetToken]);

  useEffect(() => {
    setCount(120);
  }, [showActive]);

  useFocusEffect(() => {
    setShowActive(true);
    return () => setShowActive(false);
  });

  const sendOtp = async () => {
    // navigation.navigate('CreatePassword', { resetToken: token })
    if (code?.length === 6 && count > 0) {
      const body = {code: parseInt(code, 10)};
      await AppApi.forgotPasswordOtp({body}, token)
        .then(res => {
          if (res?.data?.statusCode === 200) {
            navigation.navigate('CreatePassword', {resetToken: token});
          }
          if (res?.data?.response?.data) {
            ToastAndNotification(res?.data?.response?.data, 'OTP');
          }
        })
        .catch(error => {
          console.log('error', error);
          ToastAndNotification(error?.data?.error, 'OTP');
        });
    } else {
      if (code?.length !== 6) {
        ToastAndNotification('Enter OTP', 'OTP');
      }
      if (count === 0) {
        ToastAndNotification('OTP is Expired', 'OTP');
      }
      setCode('');
    }
  };

  const otpResend = async () => {
    const body = {phoneNumber: tokenAndNumber?.mobileNumber};
    if (tokenAndNumber?.mobileNumber) {
      await AppApi.forgotPassword({body})
        .then(res => {
          if (res?.data?.statusCode === 200) {
            ToastAndNotification(res?.data?.response?.data, 'OTP');
            dispatch(
              authAction.setForgotPasswordNumber({
                mobileNumber: tokenAndNumber?.mobileNumber,
                token: res?.data?.response?.token,
              }),
            );
            console.log(res?.data);

            setToken(res?.data?.response?.token);
            setCount(120);
            setCode('');
          }
        })
        .catch(error => {
          ToastAndNotification(error.data.error, 'Forgot Password ');
        });
    } else {
      navigation.navigate('ForgotPassword');
    }
  };

  return (
    <View style={styles.container}>
      <Header icon={false} title="Forgot Password" />
      <Text style={styles.text}>
        Code has been send to {tokenAndNumber?.mobileNumber}
      </Text>
      <View style={styles.otpBody}>
        <OTP
          onOTPChange={handleOTPChange}
          count={count}
          reSend={otpResend}
          settingCount={setCount}
        />
      </View>
      <Button title="Verify" MV={20} onPressFunc={sendOtp} />
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingTop: 40,
    paddingHorizontal: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.T_TEXT,
    textAlign: 'center',
    marginTop: 50,
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  otpBody: {
    flex: 0.4,
    marginTop: 30,
  },
});
