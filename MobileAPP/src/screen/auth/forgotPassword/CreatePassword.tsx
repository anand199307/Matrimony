/* eslint-disable no-sequences */
import {StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/auth/ForgotPasswordHeader';
import {IMAGES} from '../../../assets/Images';
import {ICONS} from '../../../assets/Icons';
import Text from '../../../components/common/GlobalText';
import TextInput from '../../../components/common/TextInputCustom';
import Button from '../../../components/common/Button';
import colors from '../../../configurations/config/color.config';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import AppApi from '../../../configurations/Api/AppApi';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';

type screenNavigationProps = RouteProp<AuthStackParamList, 'CreatePassword'>;

interface valueType {
  password: any;
  passwordConfirmation: any;
  passwordError: string;
  passwordConfirmationError: string;
}

const formValue = {
  password: '',
  passwordConfirmation: '',
  passwordError: '',
  passwordConfirmationError: '',
};

const CreatePassword = () => {
  const [form, setForm] = useState<valueType>({...formValue});

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    params: {resetToken},
  } = useRoute<screenNavigationProps>();
  const toogleFunc = () => {};

  const sendPassWord = async () => {
    let isValid = true,
      newForm = {...form};
    if (!newForm.password) {
      (newForm.passwordError = 'Password is required'), (isValid = false);
    }
    if (newForm.password.length < 8) {
      (newForm.passwordError = 'Password should contain min 8 char'),
        (isValid = false);
    }
    if (
      newForm.password &&
      !newForm.password.match(
        /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
      )
    ) {
      (newForm.passwordError = 'Valid password is required'), (isValid = false);
    }
    if (!newForm.passwordConfirmation) {
      (newForm.passwordError = 'Password is required'), (isValid = false);
    }
    if (newForm.passwordConfirmation.length < 8) {
      (newForm.passwordConfirmationError =
        'Password Verification should contain min 8 char'),
        (isValid = false);
    }
    if (
      newForm.passwordConfirmation &&
      !newForm.passwordConfirmation.match(
        /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
      )
    ) {
      (newForm.passwordError = 'Valid password is required'), (isValid = false);
    }
    if (newForm.password !== newForm.passwordConfirmation) {
      (newForm.passwordConfirmationError =
        'Password and Confirm password should be same'),
        (isValid = false);
    }

    setForm(newForm);

    if (isValid) {
      setForm({...form, passwordError: '', passwordConfirmationError: ''});

      const body = {
        pwd: form.password,
        confirmPwd: form.passwordConfirmation,
      };

      await AppApi.resetPassword({body}, resetToken)
        .then(res => {
          console.log('resetPassword', res);
          if (res?.data?.statusCode === 200) {
            console.log('resetPassword', res);
            navigation.navigate('Login');
            ToastAndNotification(res?.data?.response?.data, 'Password');
          }
        })
        .catch(error => {
          console.log('resetPassword-error', error.data);
          ToastAndNotification(error.data.error, 'Password');
        });
    }
  };
  return (
    <View style={styles.container}>
      <Header icon={false} title="Create Password" />
      <View style={styles.logoAlign}>
        <Image
          source={IMAGES.createPassword}
          style={styles.forgotPasswordLogo}
        />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.heading}>Create Your New Password</Text>
          <TextInput
            placeholder="Enter password"
            label="Password"
            value={form.password}
            activeIcon={toogleFunc}
            onChangeText={password =>
              setForm({...form, password, passwordError: ''})
            }
            error={form.passwordError}
            frontIcon={ICONS.passwordLock}
            backIcon={false}
            showLabel={false}
            showHideControll={true}
            styleContainer={styles.textInputStyle}
          />
          <TextInput
            placeholder="Re-Enter the password"
            label="Confirm Password"
            value={form.passwordConfirmation}
            activeIcon={toogleFunc}
            onChangeText={passwordConfirmation =>
              setForm({
                ...form,
                passwordConfirmation,
                passwordConfirmationError: '',
              })
            }
            error={form.passwordConfirmationError}
            frontIcon={ICONS.passwordLock}
            backIcon={false}
            showLabel={false}
            showHideControll={true}
            styleContainer={styles.textInputStyle}
          />
        </View>
        <Button title="Continue" MV={0} onPressFunc={sendPassWord} />
      </View>
    </View>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingTop: 40,
    paddingHorizontal: 22,
  },
  logoAlign: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordLogo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.T_TEXT,
    marginVertical: 8,
  },
  textInputStyle: {
    backgroundColor: colors.BG_FORM_LIGHT_GREY,
    borderWidth: 0,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 55,
    maxHeight: 55,
  },
  body: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
