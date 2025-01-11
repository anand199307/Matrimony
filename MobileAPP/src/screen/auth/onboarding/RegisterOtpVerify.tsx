import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/auth/RegistrationHeader';
import {ICONS} from '../../../assets/Icons';
import Text from '../../../components/common/GlobalText';
import Button from '../../../components/common/Button';
import OTP from '../../../components/auth/OtpComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import colors from '../../../configurations/config/color.config';
import Modal from '../../../components/common/Modal';
import AppApi from '../../../configurations/Api/AppApi';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';
import {useSelector} from 'react-redux';

const RegisterOtpVerify = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [otp, setOTP] = useState('');
  const [count, setCount] = useState<number>(120);

  const handleOTPChange = (newOTP: React.SetStateAction<string>) => {
    setOTP(newOTP);
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showContent, setshowContent] = useState<boolean>(false);

  const currentUser = useSelector((state: any) => state?.auth?.currentUser);

  useEffect(() => {
    AppApi.sentPhoneNumberVerification()
      .then(res => {
        if (res?.data?.statusCode === 200) {
          ToastAndNotification(res?.data?.response?.data, 'OTP');
        }
      })
      .catch(error => console.log('error', error));
  }, []);

  const sendOtp = async () => {
    if (otp?.length === 6) {
      const body = {code: parseInt(otp, 10)};
      await AppApi.verfiyOtp({body})
        .then(_res => {
          setModalVisible(true);
          setshowContent(true);
        })
        .catch(error => {
          console.log('error', error);
          ToastAndNotification(error?.data?.error, 'OTP');
        });
    } else {
      ToastAndNotification('Enter OTP', 'OTP');
    }
  };

  const navigateFunc = () => navigation.navigate('AddingProfilePicture');

  const otpResend = () => {
    AppApi.sentPhoneNumberVerification()
      .then(res => {
        if (res?.data?.statusCode === 200) {
          ToastAndNotification(res?.data?.response?.data, 'OTP');
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Registration"
        content="Congratulations! You are successfully registered with Royal Matrimony."
        imgSrc={ICONS.verified}
        showContent={showContent}
      />
      <View style={styles.body}>
        <Text style={styles.primaryTextTheme}>
          Your Matrimony ID: {currentUser?.profileId}
        </Text>
        <Text style={styles.boldText}>OTP Verification</Text>
        <Text style={styles.normalText}>
          Enter code that we have sent to your number{' '}
        </Text>
        <Text style={styles.boldNumber}>{currentUser?.phoneNumber}</Text>
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
      <Modal
        show={modalVisible}
        modalName="congratulation"
        setModalShow={setModalVisible}
        navigateFunc={navigateFunc}
      />
    </View>
  );
};

export default RegisterOtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  otpBody: {
    marginVertical: 30,
  },
  body: {
    flex: 0.5,
    padding: 20,
  },
  primaryTextTheme: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.SECONDARY_COLOR,
    textAlign: 'center',
    marginVertical: 5,
  },
  boldText: {
    fontSize: 26,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginVertical: 10,
  },
  normalText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.S_TEXT,
  },
  boldNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.S_TEXT,
    marginTop: 4,
  },
});
