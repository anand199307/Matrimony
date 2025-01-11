/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/auth/RegistrationHeader';
import TextInputCustom from '../../../components/common/TextInputCustom';
import {ICONS} from '../../../assets/Icons';
import ButtonCustom from '../../../components/common/Button';
import Text from '../../../components/common/GlobalText';
import SlideModal from '../../../components/auth/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Auth';
import colors from '../../../configurations/config/color.config';
import AppApi from '../../../configurations/Api/AppApi';
import {isValidOnboardPageOne} from '../../../utilis/formValidation/formValidation';
import {valueType, formValue} from '../../../utilis/types/Registration';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {
  maritalStatus,
  interCommunity,
  yesAndNo,
  numbers,
  height,
  physicalStatus,
} from '../../../utilis/feildStaticData/Registeration';
import {bodyType} from '../../../utilis/feildStaticData/PrefernceVerification';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const RegistrationFirst = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();
  const countryList = useSelector((state: any) => state?.auth?.country);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const language = useSelector((state: any) => state?.auth?.language);
  const religion = useSelector((state: any) => state?.auth?.religion);
  const caste = useSelector((state: any) => state?.auth?.caste);

  const [form, setForm] = useState<valueType>({...formValue});
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCountry();
    getLanguage();
    getReligion();
    getCaste();
    getEducation();
  }, []);

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidOnboardPageOne({...form});
    setForm(newForm);
    if (isValid) {
      setIsLoading(true);
      const body = {
        profileStatus: 1,
        basicDetails: {
          maritalStatus: form.maritalStatus,
          children: form.Children,
          noOfChildrens: form.numberOfChildren,
          height: form.height,
          weight: form.Weight,
          physicalStatus: form.physicalStatus,
          bodyType: form.bodyType,
          willingToInterCommunity: form.interCommunity,
        },
        religionDetails: {
          motherTongue: form.motherTongue,
          religion: form.religion,
          caste: form.caste,
        },
        locationDetails: {
          address: form.addressLine,
          country: form.country,
          city: form.city,
          state: form.state,
        },
      };
      onBoardRegisterOne(body);
    }
  };

  const onBoardRegisterOne = async (body: any) => {
    try {
      let resp = await AppApi.onBoardRegister({body});
      if (resp.status === 200) {
        setForm({...formValue});
        setIsLoading(false);
        navigation.navigate('RegisterSecond');
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('error in onboarding step1', error);
    }
  };

  const getLanguage = () => {
    AppApi.language()
      .then(res => {
        if (res?.data?.response?.data && res?.data?.statusCode === 200) {
          dispatch(authAction.setLanguage(res?.data?.response?.data));
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'language');
      });
  };

  const getReligion = () => {
    AppApi.religion()
      .then(res => {
        if (res?.data?.response?.data && res?.status === 200) {
          dispatch(authAction.setReligion(res?.data?.response?.data));
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'religion');
      });
  };

  const getEducation = () => {
    AppApi.education()
      .then(res => {
        if (res?.data?.response?.data && res?.data?.status === 200) {
        }
        dispatch(authAction.setEducation(res?.data?.response?.data));
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'education');
      });
  };

  const getCaste = () => {
    AppApi.caste()
      .then(res => {
        if (res?.data?.response?.data && res?.status === 200) {
          dispatch(authAction.setCaste(res?.data?.response?.data));
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'caste');
      });
  };

  const getCountry = () => {
    AppApi.country()
      .then(res => {
        if (res?.data?.response?.country && res?.data?.statusCode === 200) {
          dispatch(authAction.setCountry([{...res?.data?.response?.country}]));
          getState(res?.data?.response?.country?.uuid);
        }
      })
      .catch(error => {
        ToastAndNotification(error?.data?.error, 'country');
      });
  };

  const getState = (country_uuid: any) => {
    if (country_uuid) {
      const url = `country/${country_uuid}/states?limit=40&page=1`;
      AppApi.states({url})
        .then(res => {
          if (res?.status === 200) {
            setStates(res?.data?.response?.data);
          }
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'states');
        });
    }
  };

  const getCities = (state_uuid: any) => {
    if (state_uuid) {
      const url = `states/${state_uuid}/cities?page=1&limit=200`;
      AppApi.cities({url})
        .then(res => {
          if (res?.status === 200) {
            setCities(res?.data?.response?.data);
          }
        })
        .catch(error => ToastAndNotification(error?.data?.error, 'states'));
    }
  };

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value?.name, motherTongueError: ''});
        break;
      case 'maritalStatus':
        setForm({
          ...form,
          maritalStatus: value?.name,
          maritalStatusError: '',
        });
        break;
      case 'caste':
        setForm({...form, caste: value?.name, casteError: ''});
        break;
      case 'religion':
        setForm({...form, religion: value?.name, religionError: ''});
        break;
      case 'interCommunity':
        setForm({
          ...form,
          interCommunity: value?.title,
          interCommunityError: '',
        });
        break;
      case 'country':
        setForm({...form, country: value?.name, countryError: ''}),
          getState(value?.uuid);
        break;
      case 'Children':
        childrenValidate(value);
        break;
      case 'numberOfChildren':
        setForm({
          ...form,
          numberOfChildren: value?.name,
          numberOfChildrenError: '',
        });
        break;
      case 'state':
        setForm({...form, state: value?.name, stateError: ''}),
          getCities(value?.uuid);
        break;
      case 'city':
        setForm({...form, city: value?.name, cityError: ''});
        break;
      case 'height':
        setForm({...form, height: value?.title, heightError: ''});
        break;
      case 'physicalStatus':
        setForm({
          ...form,
          physicalStatus: value?.name,
          physicalStatusError: '',
        });
        break;
      case 'bodyType':
        setForm({...form, bodyType: value?.name, bodyTypeError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const childrenValidate = (value: any) => {
    if (value?.title === 'No') {
      setForm({
        ...form,
        numberOfChildren: JSON.stringify(0),
        Children: value?.title,
        ChildrenError: '',
        numberOfChildrenError: '',
      });
    } else {
      setForm({
        ...form,
        Children: value?.title,
        ChildrenError: '',
      });
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Mother Tongue':
        settingModal('motherTongue', language);
        break;
      case 'Marital Status':
        settingModal('maritalStatus', maritalStatus);
        break;
      case 'Religion':
        settingModal('religion', religion);
        break;
      case 'Caste':
        settingModal('caste', caste);
        break;
      case 'Willing To Inter Community':
        settingModal('interCommunity', interCommunity);
        break;
      case 'Country':
        settingModal('country', countryList);
        break;
      case 'Childrens':
        settingModal('Children', yesAndNo);
        break;
      case 'No of Childrens':
        settingModal('numberOfChildren', numbers);
        break;
      case 'State':
        settingModal('state', states);
        break;
      case 'City':
        settingModal('city', cities);
        break;
      case 'Height':
        settingModal('height', height);
        break;
      case 'Physical Status':
        settingModal('physicalStatus', physicalStatus);
        break;
      case 'Body Type':
        settingModal('bodyType', bodyType);
        break;
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    setList([...data]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Registration"
        content="Complete your registration and let us help you find your life partner."
        imgSrc={ICONS.verified}
        showContent={true}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Basic Information</Text>
          <TextInputCustom
            placeholder="Select"
            value={form.maritalStatus}
            error={form.maritalStatusError}
            activeIcon={toogleFunc}
            label="Marital Status"
            backIcon={ICONS.rightArrowInput}
          />
          {form.maritalStatus !== 'Never Married' &&
            form.maritalStatus !== '' &&
            form.maritalStatus !== undefined && (
              <TextInputCustom
                placeholder="Select"
                value={form.Children}
                error={form.ChildrenError}
                activeIcon={toogleFunc}
                backIcon={ICONS.rightArrowInput}
                label="Childrens"
              />
            )}
          {(form.Children === 'Yes.Living together' ||
            form.Children === 'Yes.Not living together') && (
            <TextInputCustom
              value={form.numberOfChildren}
              placeholder="childers count"
              keyboardType="number-pad"
              error={form.numberOfChildrenError}
              activeIcon={() => {}}
              label="No of Childrens"
              onChangeText={numberOfChildren =>
                setForm({...form, numberOfChildren, numberOfChildrenError: ''})
              }
            />
          )}
          <TextInputCustom
            placeholder="Select"
            label="Height"
            value={form.height}
            error={form.heightError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />
          <TextInputCustom
            placeholder="Enter your weight"
            value={form.Weight}
            error={form.WeightError}
            activeIcon={toogleFunc}
            onChangeText={Weight => setForm({...form, Weight, WeightError: ''})}
            label="Weight"
            keyboardType="number-pad"
            maxLength={3}
          />
          <TextInputCustom
            placeholder="Select"
            value={form.bodyType}
            error={form.bodyTypeError}
            activeIcon={toogleFunc}
            label="Body Type"
            backIcon={ICONS.rightArrowInput}
          />

          <TextInputCustom
            placeholder="Select"
            value={form.physicalStatus}
            error={form.physicalStatusError}
            activeIcon={toogleFunc}
            label="Physical Status"
            backIcon={ICONS.rightArrowInput}
          />

          <TextInputCustom
            placeholder="Select"
            label="Willing To Inter Community"
            value={form.interCommunity}
            error={form.interCommunityError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />

          <Text style={styles.heading}>Religion Information</Text>
          <TextInputCustom
            placeholder="Select"
            label="Mother Tongue"
            value={form.motherTongue}
            error={form.motherTongueError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />

          <TextInputCustom
            placeholder="Select"
            value={form.religion}
            error={form.religionError}
            activeIcon={toogleFunc}
            label="Religion"
            backIcon={ICONS.rightArrowInput}
          />
          <TextInputCustom
            placeholder="Select"
            value={form.caste}
            error={form.casteError}
            activeIcon={toogleFunc}
            label="Caste"
            backIcon={ICONS.rightArrowInput}
          />
          <Text style={styles.heading}>
            {currentUser?.gender === 'Male' ? 'Groom' : 'Bride'} Current
            Location
          </Text>
          <TextInputCustom
            placeholder="Enter Your Address"
            value={form.addressLine}
            error={form.addressLineError}
            activeIcon={() => {}}
            label="Address"
            onChangeText={addressLine =>
              setForm({...form, addressLine, addressLineError: ''})
            }
          />
          <TextInputCustom
            placeholder="Select"
            label="Country"
            value={form.country}
            error={form.countryError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />
          <View style={styles.row}>
            <View style={{width: '45%'}}>
              <TextInputCustom
                placeholder="Enter Your State"
                value={form.state}
                error={form.stateError}
                activeIcon={toogleFunc}
                label="State"
              />
            </View>
            <View style={{width: '45%'}}>
              <TextInputCustom
                value={form.city}
                error={form.cityError}
                activeIcon={toogleFunc}
                placeholder="Enter Your City"
                label="City"
              />
            </View>
          </View>

          <ButtonCustom title="Continue" onPressFunc={RegisterFunc} MV={10} />

          <View style={styles.buttom} />
        </ScrollView>
      )}
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={toogleFunc}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default RegistrationFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.P_TEXT,
    lineHeight: 24,
    marginVertical: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 0.6,
  },
  registerContent: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.P_TEXT,
    paddingHorizontal: 20,
    height: 60,
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
