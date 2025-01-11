/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import Header from '../../../components/app/ProfileHeader';
import {ICONS} from '../../../assets/Icons';
import {HEIGHT, WIDTH} from '../../../configurations/config/app.config';
import {useNavigation} from '@react-navigation/native';
import AppApi from '../../../configurations/Api/AppApi';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import TextInputCustom from '../../../components/common/TextInputCustom';
import {
  editProfile,
  editeProfileValue,
} from '../../../utilis/types/Registration';
import SlideModal from '../../../components/auth/SlideModal';
import ButtonCustom from '../../../components/common/Button';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  interCommunity,
  height,
  physicalStatus,
} from '../../../utilis/feildStaticData/Registeration';
import {bodyType} from '../../../utilis/feildStaticData/PrefernceVerification';
import PersonalDetails from '../prefernceAndVerfication/PersonalDetails';
import {homeAction} from '../../../redux/actions';
import LocationDetails from '../../../components/app/LocationDetails';

const EditProfile = ({}) => {
  const userEditType = useSelector(
    (state: any) => state?.home?.editProfileStage,
  );
  const dispatch = useDispatch();
  const [userInfomation, setUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<editProfile>({...editeProfileValue});
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [locationsValue, setLocationDetails] = useState();
  const [list, setList] = useState<any>('');
  const navigation = useNavigation();
  const navigation2 =
    useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => {
    dispatch(homeAction.setEditProfile(1));
    navigation.goBack();
  };
  const showCoupon = () => {};
  const onPressFunc = () => {
    const body = {
      basicDetails: {
        height: form.height,
        weight: form.weight,
        physicalStatus: form.physicalStatus,
        bodyType: form.bodyType,
        willingToInterCommunity: form.interCommunity,
      },
      locationDetails: {
        address: form.address,
        country: form.location,
        city: form.city,
        state: form.state,
      },
      careerDetails: {
        education: form.education,
        employedIn: form.employedIn,
        occupation: form.occupation,
        currency: form.currency,
        income: form.income,
        educationInstitution: form.educationInstitution,
        organization: form.Organization,
      },
      lifeStyleDetails: {
        smokingHabit: form.smokingHabits,
        drinkingHabit: form.drinkingHabits,
        dietHabit: form.dietHabits,
      },
      familyDetails: {
        fatherName: form.fatherName,
        motherName: form.motherName,
        noOfBrothers: form.maleCount,
        maleMarried: form.maleMarriedCount,
        noOfSisters: form.femaleCount,
        femaleMarried: form.femaleMarriedCount,
        fatherOccupation: form.fatherOccupation,
        motherOccupation: form.motherOccupation,
        ancestralOrigin: form.ancestralOrigin,
        familyStatus: form.familyStatus,
        familyValue: form.familyValue,
        familyType: form.familyType,
        description: form.aboutMyself,
      },
    };
    updateUserProfile(body);
  };

  const updateUserProfile = async (body: any) => {
    try {
      const resp = await AppApi.updateProfile({body}, userInfomation?.uuid);
      if (resp.status === 200) {
        navigation2.navigate('ProfileDetails');
      }
    } catch (error) {
      console.log('error in updating user profile', error);
    }
  };

  const fetchUserInforamtion = async () => {
    try {
      const resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        setUserInfo(resp?.data?.response?.data);
        let info = resp?.data?.response?.data;
        setForm({
          ...form,
          bodyType: info?.basicDetails?.bodyType,
          weight: info?.basicDetails?.weight,
          height: info?.basicDetails?.height,
          physicalStatus: info?.basicDetails?.physicalStatus,
          interCommunity: info?.basicDetails?.willingToInterCommunity,
          smokingHabits: info?.lifeStyleDetails?.smokingHabit,
          drinkingHabits: info?.lifeStyleDetails?.drinkingHabit,
          dietHabits: info?.lifeStyleDetails?.dietHabit,
          education: info?.careerDetails?.education,
          employedIn: info?.careerDetails?.employedIn,
          occupation: info?.careerDetails?.occupation,
          currency: info?.careerDetails?.currency,
          income: info?.careerDetails?.income,
          educationInstitution: info?.careerDetails?.educationInstitution,
          Organization: info?.careerDetails?.organization,
          fatherName: info?.familyDetails?.fatherName,
          motherName: info?.familyDetails?.motherName,
          maleCount: info?.familyDetails?.noOfBrothers,
          maleMarriedCount: info?.familyDetails?.maleMarried,
          femaleCount: info?.familyDetails?.noOfSisters,
          femaleMarriedCount: info?.familyDetails?.femaleMarried,
          fatherOccupation: info?.familyDetails?.fatherOccupation,
          motherOccupation: info?.familyDetails?.motherOccupation,
          ancestralOrigin: info?.familyDetails?.ancestralOrigin,
          familyStatus: info?.familyDetails?.familyStatus,
          familyValue: info?.familyDetails?.familyValue,
          familyType: info?.familyDetails?.familyType,
          aboutMyself: info?.familyDetails?.description,
          location: info?.locationDetails?.country,
          city: info?.locationDetails?.city,
          state: info?.locationDetails?.state,
          address: info?.locationDetails?.address,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('error in profile info page', error.message);
    }
  };

  useEffect(() => {
    fetchUserInforamtion();
  }, []);
  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'interCommunity':
        setForm({
          ...form,
          interCommunity: value?.title,
          interCommunityError: '',
        });
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
  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Willing To Inter Community':
        settingModal('interCommunity', interCommunity);
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
        title={'Edit User Info'}
        navFunc={navFunc}
        showRightIcon={false}
        rightIconAction={showCoupon}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <View style={styles.container}>
          {userEditType === 1 && (
            <ScrollView
              style={styles.body}
              centerContent
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.Container}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.heading}>Basic Details</Text>
                </View>
                <TextInputCustom
                  placeholder="Select"
                  label="Height"
                  value={form.height}
                  error={form.heightError}
                  activeIcon={toogleFunc}
                  onChangeText={() => {}}
                />
                <TextInputCustom
                  placeholder="Enter your weight"
                  value={form.weight}
                  error={form.weightError}
                  activeIcon={() => {}}
                  onChangeText={weight =>
                    setForm({...form, weight, weightError: ''})
                  }
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
              </View>
            </ScrollView>
          )}
          {userEditType === 2 && (
            <PersonalDetails
              showHeader={false}
              formType={2}
              formValues={form}
              updateForm={setForm}
            />
          )}
          {userEditType === 3 && (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.heading}>Location Details</Text>
              </View>
              <View style={styles.form}>
                <LocationDetails
                  setLocationDetails={setLocationDetails}
                  formType={2}
                  formValues={form}
                />
              </View>
            </View>
          )}
          <View style={styles.wrapper}>
            <ButtonCustom
              title="Save Changes"
              onPressFunc={onPressFunc}
              MV={10}
            />
          </View>
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
      )}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 0.85,
  },
  Container: {
    padding: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.P_TEXT,
    lineHeight: 24,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
