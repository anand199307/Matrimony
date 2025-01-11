/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
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
import {AuthStackParamList} from '../../auth/Auth';
import colors from '../../../configurations/config/color.config';
import {
  valueType,
  formValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import AppApi from '../../../configurations/Api/AppApi';
import {
  smokingAndDrinkingHabits,
  dietHabits,
  fatherAndMotherOccupation,
} from '../../../utilis/feildStaticData/PrefernceVerification';
import {
  employedIn,
  familyStatus,
  familyType,
  familyValues,
} from '../../../utilis/feildStaticData/Registeration';

//redux
import {useSelector} from 'react-redux';
interface personalInfo {
  showHeader?: boolean;
  formType?: number;
  formValues?: any;
  updateForm?: any;
}
const PersonalDetails = ({
  showHeader = true,
  formType = 1,
  formValues = formValue,
  updateForm,
}: personalInfo) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const education = useSelector((state: any) => state?.auth?.education);
  const [form, setForm] = useState<valueType>({...formValues});
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');
  const [searchName, setsearchValue] = useState('');
  const [convertedEducationList, setConvertedEducationList] = useState<any>('');
  const [occupation, setOccupation] = useState<any>('');

  useEffect(() => {
    fetchProfiessions();
    fetchEducationList();
  }, [education]);

  const fetchProfiessions = async () => {
    try {
      let resp = await AppApi.getProfessions();
      if (resp.status === 200) {
        setOccupation(resp.data?.response?.data);
      }
    } catch (error: any) {
      console.log('error in profission list', error);
    }
  };

  const fetchEducationList = async () => {
    try {
      let resp = await AppApi.education();
      if (resp.status === 200) {
        let educationList: any = [];
        resp.data.response.data?.map((item: any) => {
          educationList.push({id: Math.random(), heading: item?.department});
          item?.departmentDetails?.map((nestedItem: any) => {
            educationList.push({
              id: Math.random(),
              name: nestedItem?.short_name,
            });
          });
        });
        setConvertedEducationList(educationList);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (formType === 2) {
      updateForm(form);
    }
  }, [form]);

  const RegisterFunc = () => {
    const body = {
      profileStatus: 3,
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
    if (formType === 1) {
      onBoardRegisterThree(body);
    }
  };

  const onBoardRegisterThree = async (body: any) => {
    try {
      let resp = await AppApi.onBoardRegister({body});
      if (resp.status === 200) {
        navigation.navigate('PartnerPreferance');
      }
    } catch (error: any) {
      console.log('error in personal details', error);
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Smoking Habits':
        settingModal('smokingHabits', smokingAndDrinkingHabits);
        break;
      case 'Drinking Habits':
        settingModal('drinkingHabits', smokingAndDrinkingHabits);
        break;
      case 'Diet Habits':
        settingModal('dietHabits', dietHabits);
        break;
      case 'Father Status':
        settingModal('fatherOccupation', fatherAndMotherOccupation);
        break;
      case 'Mother Status':
        settingModal('motherOccupation', fatherAndMotherOccupation);
        break;
      case 'Education':
        settingModal('education', convertedEducationList);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn);
        break;
      case 'Occupation':
        settingModal('occupation', occupation);
        break;
      case 'Family Status':
        settingModal('familyStatus', familyStatus);
        break;
      case 'Family Type':
        settingModal('familyType', familyType);
        break;
      case 'Family Value':
        settingModal('familyValue', familyValues);
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

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'smokingHabits':
        setForm({
          ...form,
          smokingHabits: value?.name,
          smokingHabitsError: '',
        });
        break;
      case 'drinkingHabits':
        setForm({
          ...form,
          drinkingHabits: value?.name,
          drinkingHabitsError: '',
        });
        break;
      case 'dietHabits':
        setForm({...form, dietHabits: value?.name, dietHabitsError: ''});
        break;
      case 'fatherOccupation':
        setForm({
          ...form,
          fatherOccupation: value?.title,
          fatherOccupationError: '',
        });
        break;
      case 'motherOccupation':
        setForm({
          ...form,
          motherOccupation: value?.title,
          motherOccupationError: '',
        });
        break;
      case 'education':
        setForm({...form, education: value?.name, educationError: ''});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value?.name, employedInError: ''});
        break;
      case 'occupation':
        setForm({...form, occupation: value?.name, occupationError: ''});
        break;
      case 'familyStatus':
        setForm({...form, familyStatus: value?.title, familyStatusError: ''});
        break;
      case 'familyType':
        setForm({...form, familyType: value?.title, familyTypeError: ''});
        break;
      case 'familyValue':
        setForm({...form, familyValue: value?.title, familyValueError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {showHeader === true && (
        <Header
          title="Personal Details"
          content="Give us more information that stand out your profile."
          imgSrc={ICONS.verified}
          showContent={true}
          navigation={true}
        />
      )}
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Education & Profession Details</Text>
        <TextInputCustom
          placeholder="Select"
          value={form.education}
          error={form.educationError}
          activeIcon={toogleFunc}
          label="Education"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter College/Institution"
          label="Education Institution"
          value={form.educationInstitution}
          error={form.educationInstitutionError}
          activeIcon={toogleFunc}
          onChangeText={educationInstitution =>
            setForm({
              ...form,
              educationInstitution,
              educationInstitutionError: '',
            })
          }
        />
        <TextInputCustom
          placeholder="Select "
          value={form.employedIn}
          error={form.employedInError}
          activeIcon={toogleFunc}
          label="Employed In"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter Organization Name"
          value={form.Organization}
          error={form.OrganizationError}
          activeIcon={toogleFunc}
          onChangeText={Organization =>
            setForm({
              ...form,
              Organization,
              OrganizationError: '',
            })
          }
          label="Organization"
        />
        <TextInputCustom
          placeholder="Select"
          label="Occupation"
          value={form.occupation}
          error={form.occupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <Text style={styles.heading}>Annual Income</Text>
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
        </View>
        <Text style={styles.heading}>Lifestyle Information </Text>
        <TextInputCustom
          placeholder="Select"
          label="Smoking Habits"
          value={form.smokingHabits}
          error={form.smokingHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.drinkingHabits}
          error={form.drinkingHabitsError}
          activeIcon={toogleFunc}
          label="Drinking Habits"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Flexitarian"
          label="Diet Habits"
          value={form.dietHabits}
          error={form.dietHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <Text style={styles.heading}>Family Information</Text>
        <TextInputCustom
          placeholder="Enter the name."
          label="Father Name"
          value={form.fatherName}
          error={form.fatherNameError}
          activeIcon={() => {}}
          onChangeText={fatherName =>
            setForm({
              ...form,
              fatherName,
              fatherNameError: '',
            })
          }
        />
        <TextInputCustom
          placeholder="Employed"
          label="Father Status"
          value={form.fatherOccupation}
          error={form.fatherOccupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Enter the name"
          label="Mother Name"
          value={form.motherName}
          error={form.motherNameError}
          activeIcon={() => {}}
          onChangeText={motherName =>
            setForm({
              ...form,
              motherName,
              motherNameError: '',
            })
          }
        />
        <TextInputCustom
          placeholder="Employed"
          label="Mother Status"
          value={form.motherOccupation}
          error={form.motherOccupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter the value"
              label="No. of Brothers"
              value={form.maleCount}
              error={form.maleCountError}
              keyboardType="number-pad"
              activeIcon={() => {}}
              onChangeText={maleCount =>
                setForm({
                  ...form,
                  maleCount,
                  maleCountError: '',
                })
              }
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter the value"
              label="Married"
              value={form.maleMarriedCount}
              error={form.maleMarriedCountError}
              keyboardType="number-pad"
              activeIcon={() => {}}
              onChangeText={maleMarriedCount =>
                setForm({
                  ...form,
                  maleMarriedCount,
                  maleMarriedCountError: '',
                })
              }
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter the value"
              label="No. of Sisters"
              value={form.femaleCount}
              error={form.femaleCountError}
              keyboardType="number-pad"
              activeIcon={() => {}}
              onChangeText={femaleCount =>
                setForm({
                  ...form,
                  femaleCount,
                  femaleCountError: '',
                })
              }
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter the value"
              label="Married"
              value={form.femaleMarriedCount}
              error={form.femaleMarriedCountError}
              keyboardType="number-pad"
              activeIcon={() => {}}
              onChangeText={femaleMarriedCount =>
                setForm({
                  ...form,
                  femaleMarriedCount,
                  femaleMarriedCountError: '',
                })
              }
            />
          </View>
        </View>
        <TextInputCustom
          placeholder="Select "
          value={form.familyStatus}
          error={form.familyStatusError}
          activeIcon={toogleFunc}
          label="Family Status"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Family Type"
          value={form.familyType}
          error={form.familyTypeError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
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
        />
        {formType === 1 && (
          <ButtonCustom title="Continue" onPressFunc={RegisterFunc} MV={10} />
        )}

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        list={list}
        search={true}
        selectedArrayData={toogleFunc}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        searchName={searchName}
        setsearchValue={setsearchValue}
      />
    </View>
  );
};

export default PersonalDetails;

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
});
