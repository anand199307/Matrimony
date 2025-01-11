import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import TextInputCustom from '../../../components/common/TextInputCustom';
import Button from '../../../components/common/Button';
import Header from '../../../components/auth/AuthHeader';
import {IMAGES} from '../../../assets/Images';
import Text from '../../../components/common/GlobalText';
import {isValidLogin} from '../../../utilis/formValidation/formValidation';
import colors from '../../../configurations/config/color.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';

//redux
import {useDispatch} from 'react-redux';
import {authAction} from '../../../redux/actions';
import AppApi from '../../../configurations/Api/AppApi';
import Toast from 'react-native-toast-message';

interface valueType {
  mail: any;
  password: any;
  mailError: string;
  passwordError: string;
}

const formValue = {
  mail: '',
  password: '',
  mailError: '',
  passwordError: '',
};

// Toast
const showToast = (message: {
  heading?: string;
  messageType?: string;
  details?: string;
}) => {
  Toast.show({
    type: message?.messageType, // 'success', 'error', 'info', or 'custom'
    text1: message?.heading,
    text2: message?.details,
    position: 'top', // 'top' or 'bottom'
    visibilityTime: 2000, // 3 seconds
    topOffset: 100,
    autoHide: true,
  });
};

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //state
  const [form, setForm] = useState<valueType>({...formValue});
  const login = async () => {
    const [isValid, newForm] = isValidLogin({...form});

    if (isValid) {
      setForm({...form, mail: '', password: ''});

      const body = {
        email: form.mail,
        password: form.password,
      };
      userLogin(body);
    } else {
      setForm(newForm);
    }
  };

  const userLogin = async (data: {email: any; password: any}) => {
    try {
      setIsLoading(true);
      let resp = await AppApi.signIn({body: data});
      if (resp.status === 200) {
        dispatch(authAction.setAuthToken(resp?.data?.response?.authToken));
        await AsyncStorage.setItem('token', resp?.data?.response?.authToken);
        fetchCurentUser();
      }
    } catch (error: any) {
      setIsLoading(false);
      showToast({
        messageType: 'error',
        heading: 'Info',
        details: error?.data?.error || 'Username or Password incorrect.',
      });
      console.log('error in login', error?.data?.error);
    }
  };

  const fetchCurentUser = async () => {
    try {
      let resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        dispatch(authAction.setCurrentUser(resp?.data?.response?.data));
        setLogin();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error in login page curent user api', error);
    }
  };

  const setLogin = () => {
    dispatch(authAction.setLogin(true));
  };

  const toogleFunc = () => {};

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.loginHeader} navigationText="Register" />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <TextInputCustom
            placeholder="Email"
            label="Email"
            value={form.mail}
            error={form.mailError}
            keyboardType="email-address"
            activeIcon={toogleFunc}
            onChangeText={mail => setForm({...form, mail, mailError: ''})}
          />
          <TextInputCustom
            placeholder="Password"
            label="Password"
            value={form.password}
            keyboardType="default"
            activeIcon={toogleFunc}
            showHideControll={true}
            onChangeText={password =>
              setForm({...form, password, passwordError: ''})
            }
            error={form.passwordError}
          />
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.buttonText}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>

          <Button title="Login" MV={10} onPressFunc={login} />
        </ScrollView>
      )}
      <Toast />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  form: {
    height: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
