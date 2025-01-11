/* eslint-disable no-sequences */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {isValidOnboardPageTwo} from '../../../utilis/formValidation/formValidation';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {
  registerSecondValueType,
  registerSecondFormValue,
} from '../../../utilis/types/Registration';
import {
  // height,
  // physicalStatus,
  // employedIn,
  // familyStatus,
  // familyType,
  // familyValues,
  dosham,
  doshamYes,
} from '../../../utilis/feildStaticData/Registeration';
import {amAndPm} from '../../../utilis/feildStaticData/PrefernceVerification';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const RegistrationSecond = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const education = useSelector((state: any) => state?.auth?.education);
  const dispatch = useDispatch();

  const [form, setForm] = useState<registerSecondValueType>({
    ...registerSecondFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');
  const [zodiacDetails, setzodiacDetails] = useState([]);
  const [starDetails, setStarDetails] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState<any[]>([]);
  const [countryList, setCountry] = useState<any[]>([]);

  useEffect(() => {
    fetchProfiessions();
    let educationList: any = [];
    education?.map((item: any) => {
      educationList.push({id: Math.random(), heading: item?.department});
      item?.departmentDetails?.map((nestedItem: any) => {
        educationList.push({
          id: Math.random(),
          title: nestedItem?.short_name,
        });
      });
    });
    // setConvertedEducationList(educationList);
  }, [education]);

  const fetchProfiessions = async () => {
    try {
      let resp = await AppApi.getProfessions();
      if (resp.status === 200) {
        // setOccupation(resp.data?.response?.data);
      }
    } catch (error) {
      console.log('error in profission list', error);
    }
  };

  useEffect(() => {
    AppApi.zodiacDetails()
      .then(res => {
        if (res?.status === 200) {
          let detailsList: any = [];
          res?.data?.response?.data?.map((item: any) => {
            detailsList.push({...item, _id: Math.random()});
          });
          setzodiacDetails(detailsList);
        }
      })
      .catch(error => {
        console.log('zodiacDetails-error', error);
      });
  }, []);

  const getStar = (name: string) => {
    const data: any = zodiacDetails;
    const filteredData = data.filter((item: any) => name === item?.name);
    setStarDetails(filteredData[0]?.startDetails);
  };

  const getCountry = async () => {
    try {
      let res = await AppApi.country();
      if (res.status === 200) {
        setCountry([res.data.response.country]);
      }
    } catch (error: any) {
      console.log('fetching country details', error);
    }
  };
  const getState = (country_uuid: any) => {
    if (country_uuid) {
      const url = `country/${country_uuid}/states?limit=100&page=1}`;
      AppApi.states({url})
        .then(res => {
          if (res?.status === 200) {
            setStates(res?.data?.response?.data);
          }
        })
        .catch(({error}) => console.log('states-error', error));
    } else {
      console.log('error in fetching state');
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
        .catch(({error}) => console.log('cities-error', error));
    } else {
      console.log('undefined');
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidOnboardPageTwo({...form});
    if (isValid) {
      setForm({...registerSecondFormValue});
      const body = {
        profileStatus: 2,
        religiousDetails: {
          moonSign: form.raasiAndMoonSign,
          star: form.Star,
          dosham: form.dosham,
          doshamYes: form.doshamYes,
        },
        horoscopeDetails: {
          placeOfBirth: {
            country: form.country,
            city: form.city,
            state: form.state,
          },
          timeOfBirth: {
            hours: form.Hour,
            minutes: form.Minutes,
            hourPeriod: form.AMAndPM,
          },
        },
      };

      AppApi.onBoardRegister({body})
        .then(res => {
          if (res?.status === 200) {
            AppApi.getCurrentUser()
              .then(response => {
                if (response?.status === 200) {
                  dispatch(
                    authAction.setCurrentUser(response?.data?.response?.data),
                  );
                  navigation.navigate('RegisterOtpVerify');
                }
              })
              .catch(error => {
                console.log('getCurrentUser', error);
              });
          } else {
            ToastAndNotification('error', 'Register');
          }
        })
        .catch(error => {
          ToastAndNotification(error?.data?.error, 'Register');
          console.log('onBoardRegister', error);
        });
    } else {
      setForm(newForm);
    }
  };

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      // case 'education':
      //   setForm({...form, education: value?.title, educationError: ''});
      //   break;
      // case 'employedIn':
      //   setForm({...form, employedIn: value?.title, employedInError: ''});
      //   break;
      // case 'occupation':
      //   setForm({...form, occupation: value?.name, occupationError: ''});
      //   break;
      // case 'familyStatus':
      //   setForm({...form, familyStatus: value?.title, familyStatusError: ''});
      //   break;
      // case 'familyType':
      //   setForm({...form, familyType: value?.title, familyTypeError: ''});
      //   break;
      // case 'familyValue':
      //   setForm({...form, familyValue: value?.title, familyValueError: ''});
      //   break;
      case 'dosham':
        setForm({...form, dosham: value?.title, doshamError: ''});
        break;
      case 'doshamYes':
        setForm({...form, doshamYes: value?.title, doshamYesError: ''});
        break;
      case 'raasiAndMoonSign':
        setForm({
          ...form,
          raasiAndMoonSign: value?.name,
          raasiAndMoonSignError: '',
        }),
          getStar(value?.name);
        break;
      case 'Star':
        setForm({...form, Star: value?.name, StarError: ''});
        break;
      case 'country':
        setForm({...form, country: value?.name, countryError: ''}),
          getState(value?.uuid);
        break;
      case 'state':
        setForm({...form, state: value?.name, stateError: ''}),
          getCities(value?.uuid);
        break;
      case 'city':
        setForm({...form, city: value?.name, cityError: ''});
        break;
      case 'AMAndPM':
        setForm({...form, AMAndPM: value?.title, AMAndPMError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      // case 'Education':
      //   settingModal('education', convertedEducationList);
      //   break;
      // case 'Employed In':
      //   settingModal('employedIn', employedIn);
      //   break;
      // case 'Occupation':
      //   settingModal('occupation', occupation);
      //   break;
      // case 'Family Status':
      //   settingModal('familyStatus', familyStatus);
      //   break;
      // case 'Family Type':
      //   settingModal('familyType', familyType);
      //   break;
      // case 'Family Value':
      //   settingModal('familyValue', familyValues);
      //   break;
      case 'Dosham':
        settingModal('dosham', dosham);
        break;
      case 'Dosham Type':
        settingModal('doshamYes', doshamYes);
        break;
      case 'Raasi/Moon Sign':
        settingModal('raasiAndMoonSign', zodiacDetails);
        break;
      case 'Star':
        settingModal('Star', starDetails);
        break;
      case 'Country':
        settingModal('country', countryList);
        break;
      case 'State':
        settingModal('state', states);
        break;
      case 'City':
        settingModal('city', cities);
        break;
      case 'AM/PM':
        settingModal('AMAndPM', amAndPm);
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
        content="Get one step closer to your happily ever after by registering with us."
        imgSrc={ICONS.verified}
        showContent={true}
      />
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Religious Information </Text>
        <TextInputCustom
          placeholder="Select"
          label="Raasi/Moon Sign"
          value={form.raasiAndMoonSign}
          error={form.raasiAndMoonSignError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Star"
          value={form.Star}
          error={form.StarError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.dosham}
          error={form.doshamError}
          activeIcon={toogleFunc}
          label="Dosham"
          backIcon={ICONS.rightArrowInput}
        />
        {form.dosham === 'Yes' && (
          <TextInputCustom
            placeholder="Select"
            label="Dosham Type"
            value={form.doshamYes}
            error={form.doshamYesError}
            activeIcon={toogleFunc}
            backIcon={ICONS.rightArrowInput}
          />
        )}
        <Text style={styles.heading}>Horoscope Information</Text>

        <Text style={styles.heading}>Place of Birth</Text>
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
              onChangeText={city => setForm({...form, city, cityError: ''})}
              placeholder="Enter Your City"
              label="City"
            />
          </View>
        </View>

        <Text style={styles.heading}>Time of Birth</Text>
        <View style={styles.row}>
          <View style={{width: '30%'}}>
            <TextInputCustom
              value={form.Hour}
              error={form.HourError}
              activeIcon={toogleFunc}
              keyboardType="number-pad"
              onChangeText={Hour => setForm({...form, Hour, HourError: ''})}
              placeholder="12"
              label="Hour"
            />
          </View>
          <View style={{width: '30%'}}>
            <TextInputCustom
              placeholder="00"
              value={form.Minutes}
              error={form.MinutesError}
              activeIcon={toogleFunc}
              keyboardType="number-pad"
              onChangeText={Minutes =>
                setForm({...form, Minutes, MinutesError: ''})
              }
              label="Minutes"
            />
          </View>
          <View style={{width: '30%'}}>
            <TextInputCustom
              placeholder="Select"
              value={form.AMAndPM}
              error={form.AMAndPMError}
              activeIcon={toogleFunc}
              label="AM/PM"
            />
          </View>
        </View>
        {/* <TextInputCustom
          placeholder="Select"
          value={form.education}
          error={form.educationError}
          activeIcon={toogleFunc}
          label="Education"
          backIcon={ICONS.rightArrowInput}
        /> */}
        {/* <TextInputCustom
          placeholder="Select "
          value={form.employedIn}
          error={form.employedInError}
          activeIcon={toogleFunc}
          label="Employed In"
          backIcon={ICONS.rightArrowInput}
        /> */}
        {/* <TextInputCustom
          placeholder="Select"
          label="Occupation"
          value={form.occupation}
          error={form.occupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        /> */}
        {/* <Text style={styles.heading}>Annual Income</Text>
        <View style={styles.row}>
          <View style={{width: '30%'}}>
            <TextInputCustom
              value={form.currency}
              editable={false}
              activeIcon={toogleFunc}
              placeholder="INR"
              label="Currency"
            />
          </View>
          <View style={{width: '67%'}}>
            <TextInputCustom
              placeholder="Annual Income"
              value={form.income}
              error={form.incomeError}
              activeIcon={toogleFunc}
              label="Income"
              keyboardType="number-pad"
              onChangeText={income =>
                setForm({...form, income, incomeError: ''})
              }
            />
          </View>
        </View> */}
        {/* <TextInputCustom
          placeholder="Select "
          value={form.familyStatus}
          error={form.familyStatusError}
          activeIcon={toogleFunc}
          label="Family Status"
          backIcon={ICONS.rightArrowInput}
        /> */}
        {/* <TextInputCustom
          placeholder="Select"
          label="Family Type"
          value={form.familyType}
          error={form.familyTypeError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        /> */}
        {/* <TextInputCustom
          placeholder="Select"
          label="Family Value"
          value={form.familyValue}
          error={form.familyValueError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter Ancestral Origin"
          label="Ancestral Origin"
          value={form.ancestralOrigin}
          error={form.ancestralOriginError}
          activeIcon={toogleFunc}
          onChangeText={ancestralOrigin =>
            setForm({...form, ancestralOrigin, ancestralOriginError: ''})
          }
        />
        <TextInputCustom
          label="About Myself"
          value={form.aboutMyself}
          error={form.aboutMyselfError}
          activeIcon={toogleFunc}
          onChangeText={aboutMyself =>
            setForm({...form, aboutMyself, aboutMyselfError: ''})
          }
          multpileline={true}
          multiline
          numberOfLines={4}
        /> */}
        <ButtonCustom
          title="Complete Registration "
          onPressFunc={RegisterFunc}
          MV={10}
        />

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        selectedArrayData={toogleFunc}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default RegistrationSecond;

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
