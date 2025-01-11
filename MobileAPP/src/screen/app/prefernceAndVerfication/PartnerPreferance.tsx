/* eslint-disable no-fallthrough */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/auth/AuthHeader';
import {IMAGES} from '../../../assets/Images';
import TextInputCustom from '../../../components/common/TextInputCustom';
import {ICONS} from '../../../assets/Icons';
import ButtonCustom from '../../../components/common/Button';
import Text from '../../../components/common/GlobalText';
import SlideModal from '../../../components/auth/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../auth/Auth';
import colors from '../../../configurations/config/color.config';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import AppApi from '../../../configurations/Api/AppApi';
import {
  smokingAndDrinkingHabits,
  dietHabits,
  physicalStatus,
} from '../../../utilis/feildStaticData/PrefernceVerification';
import {
  maritalStatus,
  employedIn,
} from '../../../utilis/feildStaticData/Registeration';
import {ToastAndNotification} from '../../../components/common/ToastAndNotification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const PartnerPreferance = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const countryList = useSelector((state: any) => state?.auth?.country);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const language = useSelector((state: any) => state?.auth?.language);
  const religion = useSelector((state: any) => state?.auth?.religion);
  const caste = useSelector((state: any) => state?.auth?.caste);
  const education = useSelector((state: any) => state?.auth?.education);
  const dispatch = useDispatch();
  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>();
  const [zodiacDetails, setzodiacDetails] = useState<any[]>([]);
  const [starDetails, setStarDetails] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedData, setselectedData] = useState<any[]>();
  const [convertedEducationList, setConvertedEducationList] = useState<any>('');
  const [dhosams, setDhosams] = useState<any[]>([]);
  const [profession, setProfessions] = useState<any[]>([]);

  useEffect(() => {
    let educationList: any = [];
    education?.map((item: any) => {
      educationList.push({id: Math.random(), heading: item?.department});
      item?.departmentDetails?.map((nestedItem: any) => {
        educationList.push({
          id: Math.random(),
          name: nestedItem?.short_name,
        });
      });
    });
    setConvertedEducationList(educationList);
  }, [education]);

  const RegisterFunc = () => {
    const body = {
      profileStatus: 4,
      partnerPreferences: {
        basicInformation: {
          age: {
            from: form.ageFrom,
            to: form.ageTo,
          },
          height: {
            from: form.heightFrom,
            to: form.heightTo,
          },
          martialStatus: form.maritalStatus,
          motherTongue: form.motherTongue,
          physicalStatus: form.physicalStatus,
          dietHabit: form.dietHabits,
          smokingHabit: form.smokingHabits,
          drinkingHabit: form.drinkingHabits,
        },
        religiousPreferences: {
          religion: form.religion,
          caste: form.caste,
          star: form.Star,
          dosham: form.dosham !== '' ? form.dosham : 'none',
        },
        professionalPreferences: {
          education: form.Education,
          employedIn: form.employedIn,
          occupation: form.Desingnation,
        },
        locationPreferences: {
          country: form.location,
          city: form.city,
          state: form.state,
        },
        aboutYourPartner: form.aboutMyself,
      },
    };
    onBoard(body);
  };

  const onBoard = async (body: any) => {
    try {
      let response = await AppApi.onBoardRegister({body});
      if (response.status === 200) {
        setForm({...partnerPrefernceFormValue});
        navigation.navigate('IdVerification');
      }
    } catch (error) {
      console.log('error in oboarding api', error);
    }
  };

  useEffect(() => {
    fetchDosamList();
    fetchProfiessions();
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
  }, []);

  //  function to filter star details
  const getStar = (inputArray: string | string[]) => {
    // Check if "Any" is in the inputArray
    if (inputArray.includes('Any')) {
      // If "Any" is present, return all star details
      const resp = zodiacDetails.flatMap(zodiac => zodiac.startDetails);
      setStarDetails(resp);
    } else {
      // Filter star details based on the inputArray
      const filteredStarDetails: React.SetStateAction<any[]> = [];
      zodiacDetails.forEach(zodiac => {
        if (inputArray.includes(zodiac.name)) {
          filteredStarDetails.push(...zodiac.startDetails);
        }
      });
      setStarDetails(filteredStarDetails);
    }
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
        .catch(error => console.log('states-error', error));
    } else {
      console.log('getState-undefined');
    }
  };
  //  get city list
  const getCities = (value: string) => {
    const resp = states.find(item => item?.name === value[0]);
    if (resp?.uuid) {
      const url = `states/${resp?.uuid}/cities?page=1&limit=200&search`;
      AppApi.cities({url})
        .then(res => {
          if (res?.status === 200) {
            setCities(res?.data?.response?.data);
          }
        })
        .catch(({error}) => console.log('cities-error', error));
    } else {
      console.log('error in cites api call');
    }
  };

  //  fetch List of Dhosams
  const fetchDosamList = async () => {
    try {
      const resp = await AppApi.getDoshamList();
      if (resp.status === 200) {
        setDhosams(resp.data?.response?.data);
      }
    } catch (error) {
      console.log('error in dosham list api');
    }
  };

  const fetchProfiessions = async () => {
    try {
      let resp = await AppApi.getProfessions();
      if (resp.status === 200) {
        setProfessions(resp.data?.response?.data);
      }
    } catch (error) {
      console.log('error in profission list', error);
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Mother Tongue':
        settingModal('motherTongue', language), setChecked(true);
        break;
      case 'Marital status':
        settingModal('maritalStatus', maritalStatus), setChecked(true);
        break;
      case 'Physical Status':
        settingModal('physicalStatus', physicalStatus), setChecked(true);
        break;
      case 'Smoking Habits':
        settingModal('smokingHabits', smokingAndDrinkingHabits),
          setChecked(false);
        break;
      case 'Drinking Habits':
        settingModal('drinkingHabits', smokingAndDrinkingHabits),
          setChecked(false);
        break;
      case 'Diet Habits':
        settingModal('dietHabits', dietHabits), setChecked(true);
        break;
      case 'Religion':
        settingModal('religion', religion), setChecked(true);
        break;
      case 'Caste':
        settingModal('caste', caste), setChecked(true);
        break;
      case 'Dosham':
        settingModal('dosham', dhosams), setChecked(true);
        break;
      case 'Raasi/MoonSign':
        settingModal('raasiAndMoonSign', zodiacDetails), setChecked(true);
        break;
      case 'Star':
        settingModal('Star', starDetails), setChecked(true);
        break;
      case 'Location':
        settingModal('location', countryList), setChecked(true);
        break;
      case 'State':
        settingModal('state', states), setChecked(true);
        break;
      case 'City':
        settingModal('city', cities), setChecked(true);
        break;
      case 'Education':
        settingModal('Education', convertedEducationList), setChecked(true);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn), setChecked(true);
        break;
      case 'Designation':
        settingModal('Desingnation', profession), setChecked(true);
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setFeildValue(feilName);
    setModalVisible(true);
    if (
      feilName === 'smokingHabits' ||
      feilName === 'drinkingHabits' ||
      feilName === 'location'
    ) {
      setList([...data]);
    } else {
      let value: any = [{id: 0, name: 'Any', isActive: false}];
      data?.forEach((item: any) => value.push({...item, isActive: false}));
      setList([...value]);
    }
  };

  useEffect(() => {
    if (!modalVisible && checked) {
      selectedPopupData(selectedData);
    }
  }, [modalVisible]);

  const addArrayData = (data: any) => {
    if (data?.name === 'Any') {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.name === 'Any') {
            if (data?.name === 'Any' && data?.isActive === true) {
              return {...item, isActive: false, disabled: false};
            } else {
              return item?.name === 'Any'
                ? {...item, isActive: true, disabled: false}
                : {...item, isActive: true, disabled: true};
            }
          } else {
            return {...item, isActive: false, disabled: false};
          }
        }),
      );
    } else {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.name === item?.name && data?.isActive) {
            return {...item, isActive: false, disabled: false};
          } else if (data?.name === item?.name && !data?.isActive) {
            return {...item, isActive: true, disabled: false};
          } else {
            return {...item};
          }
        }),
      );
    }
  };

  useEffect(() => {
    const arrList = list;
    const verifiedList = arrList?.filter(item => item?.isActive === true);
    const existsInData = verifiedList?.map(item => item.name);
    if (existsInData?.includes('Any')) {
      setselectedData(['Any']);
    } else {
      setselectedData(existsInData);
    }
  }, [list]);

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value});
        break;
      case 'maritalStatus':
        setForm({...form, maritalStatus: value});
        break;
      case 'physicalStatus':
        setForm({...form, physicalStatus: value});
        break;
      case 'smokingHabits':
        setForm({...form, smokingHabits: value?.name});
        break;
      case 'drinkingHabits':
        setForm({...form, drinkingHabits: value?.name});
        break;
      case 'dietHabits':
        setForm({...form, dietHabits: value});
        break;
      case 'religion':
        setForm({...form, religion: value});
        break;
      case 'caste':
        setForm({...form, caste: value});
        break;
      case 'dosham':
        setForm({...form, dosham: value});
        break;
      case 'raasiAndMoonSign':
        setForm({
          ...form,
          raasiAndMoonSign: value,
        });
        getStar(value);
        break;
      case 'Star':
        setForm({...form, Star: value});
        break;
      case 'location':
        setForm({...form, location: value}), getState(value?.uuid);
        break;
      case 'state':
        setForm({...form, state: value});
        getCities(value);
        break;
      case 'city':
        setForm({...form, city: value, cityError: ''});
        break;
      case 'Education':
        setForm({...form, Education: value});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value});
        break;
      case 'Desingnation':
        setForm({...form, Desingnation: value});
      default:
        null;
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        imgSrc={IMAGES.partnerPrefernce}
        navigationText="PartnerPreferance"
      />
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.contentHeading}>Partner Preferences</Text>
        <Text style={styles.heading}>Basic Preferences</Text>
        <Text style={styles.sectionHeading}>Age</Text>
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.ageFrom}
              error={form.ageFromError}
              activeIcon={toogleFunc}
              onChangeText={ageFrom =>
                setForm({...form, ageFrom, ageFromError: ''})
              }
              placeholder="18"
              label="From"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="25"
              value={form.ageTo}
              error={form.ageToError}
              activeIcon={toogleFunc}
              onChangeText={ageTo => setForm({...form, ageTo, ageToError: ''})}
              label="To"
            />
          </View>
        </View>
        <Text style={styles.sectionHeading}>Height</Text>
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.heightFrom}
              error={form.heightFromError}
              activeIcon={toogleFunc}
              onChangeText={heightFrom =>
                setForm({...form, heightFrom, heightFromError: ''})
              }
              placeholder="4.5"
              label="From"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="5"
              value={form.heightTo}
              error={form.heightToError}
              activeIcon={toogleFunc}
              onChangeText={heightTo =>
                setForm({...form, heightTo, heightToError: ''})
              }
              label="To"
            />
          </View>
        </View>
        <TextInputCustom
          placeholder="Never Married"
          value={form.maritalStatus}
          error={form.maritalStatusError}
          activeIcon={toogleFunc}
          label="Marital status"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Tamil"
          label="Mother Tongue"
          value={form.motherTongue}
          error={form.motherTongueError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Physical Status"
          value={form.physicalStatus}
          error={form.physicalStatusError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.dietHabits}
          error={form.dietHabitsError}
          activeIcon={toogleFunc}
          label="Diet Habits"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Smoking Habits"
          value={form.smokingHabits}
          error={form.smokingHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.drinkingHabits}
          error={form.drinkingHabitsError}
          activeIcon={toogleFunc}
          label="Drinking Habits"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />

        <Text style={styles.heading}>Religious Preferences </Text>
        <TextInputCustom
          placeholder="Hindu"
          value={form.religion}
          error={form.religionError}
          activeIcon={toogleFunc}
          label="Religion"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select "
          value={form.caste}
          error={form.casteError}
          activeIcon={toogleFunc}
          label="Caste"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Raasi/MoonSign"
          value={form.raasiAndMoonSign}
          error={form.raasiAndMoonSignError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Star"
          value={form.Star}
          error={form.StarError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        {currentUser?.religionDetails?.dosham !== '' && (
          <TextInputCustom
            placeholder="Select "
            value={form.dosham}
            error={form.doshamError}
            activeIcon={toogleFunc}
            label="Dosham"
            backIcon={ICONS.rightArrowInput}
            numberOfLines={1}
          />
        )}

        <Text style={styles.sectionHeading}>Professional Preferences</Text>
        <TextInputCustom
          placeholder="Select"
          label="Education"
          value={form.Education}
          error={form.EducationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Employed In"
          value={form.employedIn}
          error={form.employedInError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Designation"
          value={form.Desingnation}
          error={form.DesingnationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />

        <Text style={styles.sectionHeading}>Location Preferences</Text>
        <TextInputCustom
          placeholder="Select"
          label="Location"
          value={form.location}
          error={form.locationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter Your State"
          label="State"
          value={form.state}
          error={form.stateError}
          activeIcon={toogleFunc}
          onChangeText={state => {
            setForm({...form, state, stateError: ''});
          }}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          label="City"
          placeholder="Enter Your City"
          value={form.city}
          error={form.cityError}
          activeIcon={toogleFunc}
          onChangeText={city => setForm({...form, city, cityError: ''})}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder=""
          label="About your Partner (Expectation)"
          value={form.aboutMyself}
          error={form.aboutMyselfError}
          onChangeText={aboutMyself =>
            setForm({...form, aboutMyself, aboutMyselfError: ''})
          }
          activeIcon={toogleFunc}
          multpileline={true}
          multiline
          numberOfLines={4}
        />

        <ButtonCustom title="Continue" onPressFunc={RegisterFunc} MV={10} />

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        search={true}
        checkbox={checked}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PartnerPreferance;

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
  sectionHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginBottom: 5,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
});
