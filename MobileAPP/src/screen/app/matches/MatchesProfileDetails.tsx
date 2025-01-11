/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import Header from '../../../components/app/ProfileHeader';
import {IMAGES} from '../../../assets/Images';
import {ICONS} from '../../../assets/Icons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FlatView from '../../../components/common/FlatViews';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from 'navigation/tabs/Home';
import AppApi from '../../../configurations/Api/AppApi';

const MatchesProfileDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [contact, setContact] = useState({
    modalState: false,
    phoneNumber: '',
    loading: false,
  });
  const [horoscope, setHoroscope] = useState({
    modalState: false,
    horoscope: '',
  });
  const navFunc = () => {
    navigation.goBack();
  };
  const profileInfo = useSelector((state: any) => state?.home?.profileInfo);
  let idStatus =
    profileInfo?.userProfile?.idVerified === true ? 'Verified' : 'Not Verified';

  const maritalStatus = ['Widowed', 'Divorced', 'Awaiting Divorced'];
  const {membership} = useSelector((store: any) => store.auth.currentUser);

  const isMember = () => {
    if (membership === 'Gold') {
      navigation.navigate('Upgrade');
      return;
    }
  };
  const getContact = async () => {
    isMember();

    setContact(prev => ({...prev, loading: true}));
    try {
      const response = await AppApi.getPhoneNumber(
        profileInfo?.userProfile?.uuid,
      );
      setContact(prev => ({
        ...prev,
        modalState: true,
        phoneNumber: response.data.response.data,
      }));
    } catch (error) {
      console.log('error in Appapi', error);
    } finally {
      setContact(prev => ({...prev, loading: false}));
    }
  };

  const getHoroscope = () => {
    // need to integrate horoscope API.
    setHoroscope(prev => ({...prev, modalState: true}));
  };

  return (
    <View style={styles.container}>
      <Header
        title={profileInfo?.userProfile?.profileId?.toUpperCase()}
        navFunc={navFunc}
        showRightIcon={false}
      />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              profileInfo?.userProfile?.avatar
                ? {uri: profileInfo?.userProfile?.avatar}
                : profileInfo?.userProfile?.gender === 'Female'
                ? IMAGES.femalePic
                : IMAGES.profilepicture
            }
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.iconContainner}>
          <View style={styles.circleContainer}>
            <Image
              source={
                idStatus === 'Verified' ? ICONS.greenVerify : ICONS.blueTick
              }
              style={styles.iconStyle}
            />
            <Text style={styles.navTitle}>{idStatus}</Text>
          </View>
          <View style={styles.circleContainer}>
            <Image source={ICONS.ranking} style={styles.iconStyle} />
            <Text style={styles.navTitle}>
              {profileInfo?.userProfile?.membership}
            </Text>
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.headingContent}>
            {profileInfo?.userProfile?.firstName}{' '}
            {profileInfo?.userProfile?.lastName}
          </Text>
          <View>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.age},{' '}
              {profileInfo?.userProfile?.generalDetails?.height},{' '}
              {profileInfo?.userProfile?.locationDetails?.city}
            </Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.profileId?.toUpperCase()}
            </Text>
          </View>
          <View style={styles.infosections}>
            <Text style={styles.headingContent}>Basic Information</Text>
            <Text style={styles.infoText}>
              Profile created by {profileInfo?.userProfile?.profileType}
            </Text>
            <Text style={styles.infoText}>
              Matial Status : {''}
              {profileInfo?.userProfile?.basicDetails?.maritalStatus}
            </Text>
            {maritalStatus.includes(
              profileInfo?.userProfile?.religionDetails?.maritalStatus,
            ) && (
              <View>
                <Text style={styles.infoText}>
                  Children : {''}
                  {profileInfo?.userProfile?.religionDetails?.children}
                </Text>
                {profileInfo?.userProfile?.religionDetails?.children.toUpperCase() ===
                  'Yes' && (
                  <Text style={styles.infoText}>
                    Num of Children : {''}
                    {profileInfo?.userProfile?.religionDetails?.noOfChildrens}
                  </Text>
                )}
              </View>
            )}
            <Text style={styles.infoText}>
              Mother tongue is : {''}
              {profileInfo?.userProfile?.religionDetails?.motherTongue}
            </Text>
            <Text style={styles.infoText}>
              Physical Status : {''}
              {profileInfo?.userProfile?.basicDetails?.physicalStatus}
            </Text>
            <Text style={styles.infoText}>
              Food Habit : {''}
              {profileInfo?.userProfile?.lifeStyleDetails?.dietHabit}
            </Text>
            <Text style={styles.infoText}>
              Smoking Habit : {''}
              {profileInfo?.userProfile?.lifeStyleDetails?.smokingHabit}
            </Text>
            <Text style={styles.infoText}>
              Driking Habit : {''}
              {profileInfo?.userProfile?.lifeStyleDetails?.drinkingHabit}
            </Text>
            <TouchableOpacity
              disabled={contact.loading}
              style={styles.actionBtn}
              onPress={() => getContact()}>
              {contact.loading ? (
                <ActivityIndicator size="small" color="#ED1F50" />
              ) : (
                <Text style={styles.actionText}>View Contact</Text>
              )}
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
          </View>
          <View>
            <Text style={styles.headingContent}>Religious Information</Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.religionDetails?.religion}
            </Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.religionDetails?.caste}
            </Text>
            <Text style={styles.infoText}>
              Birth Star :{' '}
              {profileInfo?.userProfile?.religiousDetails?.moonSign}{' '}
            </Text>
            <Text style={styles.infoText}>
              Rasi : {profileInfo?.userProfile?.religiousDetails?.star}
            </Text>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => getHoroscope()}>
              <Text style={styles.actionText}>View Horoscope</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={styles.headingContent}>Professional Information</Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.careerDetails?.education},{' '}
              {profileInfo?.userProfile?.careerDetails?.educationInstitution}
            </Text>
            <Text style={styles.infoText}>
              Employed In : {''}
              {profileInfo?.userProfile?.careerDetails?.employedIn}
            </Text>
            <Text style={styles.infoText}>
              Earns {profileInfo?.userProfile?.careerDetails?.currency}{' '}
              {profileInfo?.userProfile?.careerDetails?.income} Lakhs annually
            </Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.careerDetails?.occupation},{' '}
              {profileInfo?.userProfile?.careerDetails?.organization}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={styles.headingContent}>Family Information</Text>
            <Text style={styles.infoText}>
              Father Name :{' '}
              {profileInfo?.userProfile?.familyDetails?.fatherName}
            </Text>
            <Text style={styles.infoText}>
              Father Occupation :{' '}
              {profileInfo?.userProfile?.familyDetails?.fatherOccupation}
            </Text>
            <Text style={styles.infoText}>
              Mother Name :{' '}
              {profileInfo?.userProfile?.familyDetails?.motherName}
            </Text>
            <Text style={styles.infoText}>
              Mother Occupation :{' '}
              {profileInfo?.userProfile?.familyDetails?.motherOccupation}
            </Text>
            <Text style={styles.infoText}>
              No Of Brothers :{' '}
              {profileInfo?.userProfile?.familyDetails?.noOfBrothers} , , Maried{' '}
              {profileInfo?.userProfile?.familyDetails?.maleMarried}
            </Text>
            <Text style={styles.infoText}>
              No Of Sisters :{' '}
              {profileInfo?.userProfile?.familyDetails?.noOfSisters} , Maried{' '}
              {profileInfo?.userProfile?.familyDetails?.femaleMarried}
            </Text>
            <Text style={styles.infoText}>
              Family Status :{' '}
              {profileInfo?.userProfile?.familyDetails?.familyStatus}
            </Text>
            <Text style={styles.infoText}>
              Origin :{' '}
              {profileInfo?.userProfile?.familyDetails?.ancestralOrigin}
            </Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.familyDetails?.familyType} family with{' '}
              {profileInfo?.userProfile?.familyDetails?.familyValue} value.
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={styles.headingContent}>Preferences</Text>
            <Text style={styles.infoText}>
              Age :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.age?.from
              }{' '}
              to{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.age?.to
              }
            </Text>
            <Text style={styles.infoText}>
              Height :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.height?.from
              }{' '}
              to{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.height?.to
              }
            </Text>
            <Text style={styles.infoText}>
              Martial Status :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.martialStatus
              }
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>Languages : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences?.basicInformation
                    ?.motherTongue
                }
              />
            </View>
            <Text style={styles.infoText}>
              Physical Status :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.physicalStatus[0]
              }
            </Text>
            <Text style={styles.infoText}>
              Lifestyle :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.dietHabit[0]
              }
            </Text>
            <Text style={styles.infoText}>
              Smoking Habit :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.smokingHabit
              }
            </Text>
            <Text style={styles.infoText}>
              Drinking Habit :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences?.basicInformation
                  ?.drinkingHabit
              }
            </Text>
            <Text style={styles.infoText}>
              Religion :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences
                  ?.religiousPreferences?.religion[0]
              }
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>Caste : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.religiousPreferences?.caste
                }
              />
            </View>
            <Text style={styles.infoText}>
              Dosham :{' '}
              {
                profileInfo?.userProfile?.partnerPreferences
                  ?.religiousPreferences?.dosham
              }
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>Education : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.professionalPreferences?.education
                }
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>Occupation : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.professionalPreferences?.occupation
                }
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>Country : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.locationPreferences?.country
                }
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>City : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.locationPreferences?.city
                }
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoText}>State : </Text>
              <FlatView
                data={
                  profileInfo?.userProfile?.partnerPreferences
                    ?.locationPreferences?.state
                }
              />
            </View>
            <Text style={styles.infoText}>
              About Partner :{' '}
              {profileInfo?.userProfile?.partnerPreferences?.aboutYourPartner}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={styles.headingContent}>Location</Text>
            <Text style={styles.infoText}>
              {profileInfo?.userProfile?.locationDetails?.city},{' '}
              {profileInfo?.userProfile?.locationDetails?.state},{' '}
              {profileInfo?.userProfile?.locationDetails?.country}.
            </Text>
          </View>
          <View style={styles.horizontalLine} />
        </View>
      </ScrollView>
      <DetailsModal setModalVisible={setContact} modalVisible={contact}>
        <Text>contact: {contact.phoneNumber}</Text>
      </DetailsModal>
      <DetailsModal setModalVisible={setHoroscope} modalVisible={horoscope}>
        <Text>HoroScope</Text>
      </DetailsModal>
    </View>
  );
};

const DetailsModal = ({modalVisible, setModalVisible, children}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible.modalState}
      statusBarTranslucent
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        // setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          backgroundColor: '#000000a6',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '90%',
            minHeight: 200,
            position: 'relative',
            padding: 20,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              backgroundColor: 'red',
              padding: 5,
            }}
            onPress={() => {
              setModalVisible({...modalVisible, modalState: false});
            }}>
            <Image
              source={require('../../../assets/Icons/chatExit.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default MatchesProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    // objectPosition: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    marginVertical: 20,
  },
  headingContent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  profileImageContainer: {
    width: 428,
    height: 500,
    backgroundColor: '#D9D9D9',
  },
  iconContainner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  circleContainer: {
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  navTitle: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#535353',
    marginTop: 5,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25,
    color: '#000000',
    top: 5,
  },
  textWrapper: {
    padding: 20,
  },
  infosections: {
    top: 10,
  },
  actionBtn: {
    borderColor: '#ED1F50',
    borderRadius: 20,
    borderWidth: 1,
    width: 144,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    lineHeight: 18,
    color: '#ED1F50',
  },
});
