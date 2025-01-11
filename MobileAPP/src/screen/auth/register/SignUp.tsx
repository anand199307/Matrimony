/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import {useDispatch} from 'react-redux';
import {authAction} from '../../../redux/actions';
import TextInputCustom from '../../../components/common/TextInputCustom';
import Header from '../../../components/auth/AuthHeader';
import {IMAGES} from '../../../assets/Images';
import {ICONS} from '../../../assets/Icons';
import ButtonCustom from '../../../components/common/Button';
import Text from '../../../components/common/GlobalText';
import SlideModal from '../../../components/auth/SlideModal';
import DatePicker from 'react-native-date-picker';
import AppApi from '../../../configurations/Api/AppApi';
import {isValidRegister} from '../../../utilis/formValidation/formValidation';
import colors from '../../../configurations/config/color.config';
import {valueType, formValue} from '../../../utilis/types/SignUp';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {Profile, Gender} from '../../../utilis/feildStaticData/SignUpStatic';
import {loginApi} from '../../../utilis/helper/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form, setForm] = useState<valueType>({...formValue});
  const [feildName, setFeildName] = useState<string>('');
  const [list, setList] = useState<any>('');
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidRegister({...form});
    setForm(newForm);
    if (isValid) {
      const body = {
        email: form.mail,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
        firstName: form.firstName,
        lastName: form.lastName,
        profileType: form.profile,
        dateOfBirth: form.dateOfBirth,
        age: form.Age,
        phoneNumber: form.mobileNumber,
        gender: form.gender,
      };
      createNewUser(body);
    }
  };

  const createNewUser = async (body: {
    email: any;
    password: any;
    passwordConfirmation: any;
    firstName: string;
    lastName: string;
    profileType: string;
    dateOfBirth: any;
    age: any;
    phoneNumber: any;
    gender: string;
  }) => {
    try {
      setIsLoading(true);
      let resp = await AppApi.signUp({body});
      if (resp.status === 200) {
        setForm({...formValue});
        userLogin({email: form.mail, password: form.password});
      }
    } catch (error: any) {
      setIsLoading(false);
      showToast({
        messageType: 'error',
        heading: 'Info',
        details: error?.data?.error,
      });
      console.log('errr', error);
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
      console.log('error in login', error?.data?.error);
    }
  };

  const fetchCurentUser = async () => {
    try {
      let resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        dispatch(authAction.setCurrentUser(resp?.data?.response?.data));
        setIsLoading(false);
        navigate();
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error in login page curent user api', error);
    }
  };

  const navigate = () => navigation.navigate('RegisterFirst');

  const calculate_age = (dob: any) => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    setForm({
      ...form,
      Age: JSON.stringify(Math.abs(age_dt.getUTCFullYear() - 1970)),
      AgeError: '',
      dateOfBirth: dob.toLocaleString()?.split(',')[0],
      dateOfBirthError: '',
    });
  };

  const selectedPopupData = (value: any) => {
    switch (feildName) {
      case 'Profile':
        validateProfile(value?.title);
        break;
      case 'Gender':
        setForm({...form, gender: value?.title, genderError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const validateProfile = (selectedData: string) => {
    if (selectedData === 'Son' || selectedData === 'Brother') {
      setForm({
        ...form,
        gender: 'Male',
        genderError: '',
        profile: selectedData,
        profileError: '',
      });
    } else if (selectedData === 'Sister' || selectedData === 'Daughter') {
      setForm({
        ...form,
        gender: 'Female',
        genderError: '',
        profile: selectedData,
        profileError: '',
      });
    } else {
      setForm({...form, profile: selectedData, profileError: ''});
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Date OF Birth':
        setOpen(true);
        break;
      case 'Select The Profile For':
        setModalVisible(true);
        setFeildName('Profile');
        setList([...Profile]);
        break;
      case 'Gender':
        setModalVisible(true);
        setFeildName('Gender');
        setList([...Gender]);
        break;
      default:
        null;
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 70);

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.registerHeader} navigationText="Login" />
      <Text style={styles.registerContent}>
        Hurray! Finding the perfect life partner starts here.
      </Text>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <TextInputCustom
            placeholder="Select The Profile"
            label="Select The Profile For"
            value={form.profile}
            error={form.profileError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
            showSoftInputOnFocus={false}
          />
          <TextInputCustom
            placeholder="Type Your First Name"
            value={form.firstName}
            error={form.firstNameError}
            activeIcon={toogleFunc}
            onChangeText={firstName =>
              setForm({...form, firstName, firstNameError: ''})
            }
            label="First Name"
          />
          <TextInputCustom
            placeholder="Enter Your Last Name"
            value={form.lastName}
            error={form.lastNameError}
            activeIcon={toogleFunc}
            onChangeText={lastName =>
              setForm({...form, lastName, lastNameError: ''})
            }
            label="Last Name"
          />
          <TextInputCustom
            placeholder="Select Your Gender"
            value={form.gender}
            error={form.genderError}
            activeIcon={toogleFunc}
            label="Gender"
            backIcon={ICONS.rightArrowInput}
            showSoftInputOnFocus={false}
          />
          <View style={styles.row}>
            <View style={{width: '72%'}}>
              <TextInputCustom
                placeholder="dd/mm/yyyy"
                label="Date OF Birth"
                value={form.dateOfBirth}
                error={form.dateOfBirthError}
                activeIcon={toogleFunc}
                // editable={false}
                // keyboardType="none"
                width={220}
                spellCheck={false}
                autoCorrect={false}
                backIcon={ICONS.calender}
              />

              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                minimumDate={minDate}
                maximumDate={maxDate}
                androidVariant="iosClone"
                onConfirm={dates => {
                  setOpen(false);
                  calculate_age(dates);
                }}
                onCancel={() => setOpen(false)}
              />
            </View>
            <View style={{width: '25%'}}>
              <TextInputCustom
                value={form.Age}
                error={form.AgeError}
                editable={false}
                activeIcon={toogleFunc}
                label="Age"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{width: '25%'}}>
              <TextInputCustom
                value={form.mobileCode}
                error={form.mobileCodeError}
                editable={false}
                activeIcon={toogleFunc}
                label="Code"
              />
            </View>
            <View style={{width: '72%'}}>
              <TextInputCustom
                placeholder="Enter Your Number"
                value={form.mobileNumber}
                error={form.mobileNumberError}
                maxLength={10}
                keyboardType="number-pad"
                activeIcon={toogleFunc}
                onChangeText={mobileNumber =>
                  setForm({...form, mobileNumber, mobileNumberError: ''})
                }
                label="Number"
              />
            </View>
          </View>
          <TextInputCustom
            placeholder="Mail Id"
            value={form.mail}
            keyboardType="email-address"
            error={form.mailError}
            activeIcon={toogleFunc}
            onChangeText={mail => setForm({...form, mail, mailError: ''})}
            label="Enter Your Email"
          />
          <TextInputCustom
            placeholder="Enter Your Password"
            value={form.password}
            error={form.passwordError}
            activeIcon={toogleFunc}
            showHideControll={true}
            onChangeText={password =>
              setForm({...form, password, passwordError: ''})
            }
            label="Password"
          />
          <TextInputCustom
            placeholder="Enter Confirm Password"
            value={form.passwordConfirmation}
            error={form.passwordConfirmationError}
            activeIcon={toogleFunc}
            showHideControll={true}
            onChangeText={passwordConfirmation =>
              setForm({
                ...form,
                passwordConfirmation,
                passwordConfirmationError: '',
              })
            }
            label="Confirm Password"
          />

          <ButtonCustom
            title="Register Free"
            onPressFunc={RegisterFunc}
            MV={10}
          />

          <Text style={[styles.bold, {paddingTop: 10}]}>
            By clicking this Button,you accepted our
          </Text>
          <View style={styles.rowHorizontal}>
            <Text style={styles.primaryColor}>Terms and Condition</Text>
            <Text style={styles.bold}> &</Text>
            <Text style={styles.primaryColor}>Privacy Policy </Text>
          </View>

          <View style={styles.buttom} />
        </ScrollView>
      )}
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        selectedArrayData={toogleFunc}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
      <Toast />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    flex: 1,
  },
  registerContent: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.P_TEXT,
    paddingHorizontal: 20,
    height: 60,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowHorizontal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
  bold: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.P_TEXT,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  primaryColor: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.SECONDARY_COLOR,
    marginHorizontal: 4,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
