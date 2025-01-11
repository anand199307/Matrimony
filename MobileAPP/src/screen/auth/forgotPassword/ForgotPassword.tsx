import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../../../components/common/GlobalText';
import Header from '../../../components/auth/ForgotPasswordHeader';
import {IMAGES} from '../../../assets/Images';
import Button from '../../../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import colors from '../../../configurations/config/color.config';
import TextInputCustom from '../../../components/common/TextInputCustom';
import AppApi from '../../../configurations/Api/AppApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';
import {CommonActions} from '@react-navigation/native';

//redux
import {useDispatch} from 'react-redux';
import {authAction} from '../../../redux/actions';

interface valueType {
  mobileCode: any;
  mobileNumber: any;
  mobileCodeError: string;
  mobileNumberError: string;
}

const formValue = {
  mobileCode: '+91',
  mobileNumber: '',
  mobileCodeError: '',
  mobileNumberError: '',
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.setItem('token', '');
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const sendOtp = async () => {
    let isValid = true,
      newForm = {...form};
    if (!newForm.mobileNumber) {
      (newForm.mobileNumberError = 'Required Registerd Mobile Number '),
        (isValid = false);
    }
    if (
      newForm.mobileNumber &&
      !newForm.mobileNumber.match(
        /^(?:\+\d{1,3}\s?)?(?:\d{3}|\(\d{3}\))[\s.-]?\d{3}[\s.-]?\d{4}$/,
      )
    ) {
      (newForm.mobileNumberError = 'Valid Mobile Number is required'),
        (isValid = false);
    }

    setForm(newForm);

    if (isValid) {
      setForm({...form, mobileNumber: '', mobileNumberError: ''});

      const body = {phoneNumber: form.mobileNumber};

      await AppApi.forgotPassword({body})
        .then(res => {
          if (res?.data?.statusCode === 200) {
            ToastAndNotification(res?.data?.response?.data, 'Login Info');
            if (res?.data?.response?.token) {
              dispatch(
                authAction.setForgotPasswordNumber({
                  mobileNumber: form.mobileNumber,
                  token: res?.data?.response?.token,
                }),
              );
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'ForgotPasswordOtpVerify',
                      params: {resetToken: res?.data?.response?.token},
                    },
                  ],
                }),
              );
            }
          }
        })
        .catch(error => {
          console.log('forgotPassword-error', error.data);
          ToastAndNotification(error?.data?.error, 'Forgot Password ');
        });
    }
  };

  const [form, setForm] = useState<valueType>({...formValue});
  const toogleFunc = () => {};

  return (
    <View style={styles.container}>
      <Header icon={true} title="Forget Password" />
      <View style={styles.logoAlign}>
        <Image
          source={IMAGES.forgotPassword}
          style={styles.forgotPasswordLogo}
        />
      </View>
      <Text style={styles.otpText}>
        Kindly enter the registered mobile number.
      </Text>
      <Text style={styles.otpText}>The OTP will be sent to this number.</Text>

      <View style={styles.inputRow}>
        <View style={{width: '25%'}}>
          <TextInputCustom
            value={form.mobileCode}
            error={form.mobileCodeError}
            editable={false}
            activeIcon={toogleFunc}
            label="Code"
          />
        </View>
        <View style={{width: '70%'}}>
          <TextInputCustom
            placeholder="Enter Your Number"
            value={form.mobileNumber}
            error={form.mobileNumberError}
            keyboardType="number-pad"
            activeIcon={toogleFunc}
            maxLength={10}
            onChangeText={mobileNumber =>
              setForm({...form, mobileNumber, mobileNumberError: ''})
            }
            label="Number"
          />
        </View>
      </View>

      <View style={styles.fotter}>
        <Button title="Send OTP" MV={10} onPressFunc={sendOtp} />
        <View style={styles.row}>
          <Text style={styles.bold}>Don’t have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.primaryColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingTop: 40,
    paddingHorizontal: 22,
  },
  forgotPasswordLogo: {
    height: 220,
    width: 220,
    resizeMode: 'contain',
  },
  logoAlign: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.T_TEXT,
    lineHeight: 30,
  },
  boxAlign: {
    flex: 0.2,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileNumberBox: {
    height: 130,
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.SECONDARY_COLOR,
    borderRadius: 15,
  },
  otpNumber: {
    width: '60%',
    padding: 10,
  },
  messageIcon: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.Q_TEXT,
  },
  phNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.P_TEXT,
    marginTop: 4,
  },
  fotter: {
    flex: 0.2,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputRow: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  bold: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.P_TEXT,
  },
  primaryColor: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
  },
});
