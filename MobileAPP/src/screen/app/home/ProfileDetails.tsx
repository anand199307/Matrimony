import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import Header from '../../../components/app/ProfileHeader';
import {ICONS} from '../../../assets/Icons';
import {HEIGHT} from '../../../configurations/config/app.config';
import Button from '../../../components/common/SecondaryButton';
import {useNavigation} from '@react-navigation/native';
import AppApi from '../../../configurations/Api/AppApi';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {homeAction} from '../../../redux/actions';

const ProfileDetails = () => {
  const [userInfomation, setUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const navigation2 =
    useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => {
    navigation.goBack();
  };
  const showCoupon = () => {};
  const onPressFunc = (status: number) => {
    dispatch(homeAction.setEditProfile(status));
    navigation2.navigate('EditProfile');
  };
  const dispatch = useDispatch();

  const fetchUserInforamtion = async () => {
    try {
      const resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        setUserInfo(resp?.data?.response?.data);
        setIsLoading(false);
        setUploading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setUploading(false);
      console.error('error in profile info page', error.message);
    }
  };

  useEffect(() => {
    fetchUserInforamtion();
  }, []);
  // upload photo
  const permissionRequest = (permission: any, permissionType?: any) => {
    request(permission).then(result => {
      if (result === 'granted') {
        if (permissionType === 'Media') {
          launchImageLibrary(
            {mediaType: 'photo'},
            (response: ImagePickerResponse) => {
              if (response) {
                apiCall(response);
              }
            },
          );
        } else {
          launchCamera(
            {mediaType: 'photo'},
            (response: ImagePickerResponse) => {
              if (response) {
                apiCall(response);
              }
            },
          );
        }
      } else {
        console.log('permission denied');
      }
    });
  };
  const askPermission = (permissionType: String) => {
    if (Platform.OS === 'ios') {
      switch (permissionType) {
        case 'Media':
          permissionRequest(PERMISSIONS.IOS.MEDIA_LIBRARY, permissionType);
          break;
        case 'Camera':
          permissionRequest(PERMISSIONS.IOS.CAMERA, permissionType);
          break;
        default:
          return null;
      }
    } else {
      switch (permissionType) {
        case 'Media':
          permissionRequest(
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            permissionType,
          );
          break;
        case 'Camera':
          permissionRequest(PERMISSIONS.ANDROID.CAMERA, permissionType);
          break;
        default:
          return null;
      }
    }
  };
  const apiCall = async (imageProp: any) => {
    setUploading(true);
    await AppApi.signedUrl({imageType: 'profilePhoto'})
      .then(res => {
        if (res?.data?.statusCode === 200) {
          const url = `${res?.data?.response?.url}`;
          const parts = url.split('?');
          const imageName = parts[0];
          uploadingInGoogleStorage(url, imageProp, imageName);
        }
      })
      .catch(error => {
        setUploading(false);
        console.log('signedUrl-error', error.data);
      });
  };

  const uploadingInGoogleStorage = async (
    url: any,
    imageProp: any,
    imageName: any,
  ) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'image/png'},
        body: {
          uri: imageProp?.assets[0]?.uri,
          type: 'image/png',
        },
      });
      if (response.ok) {
        profileImageUploadApi(imageName);
      } else {
        setUploading(false);
        console.log('Image upload failed:', response.statusText);
      }
    } catch (error) {
      setUploading(false);
      console.error('Image upload failed:', error);
    }
  };

  const profileImageUploadApi = async (imageName: any) => {
    const body = {
      imageName: imageName,
      imageType: 'profile',
    };

    await AppApi.profileImageUpload({body})
      .then(res => {
        if (res?.status === 200) {
          fetchUserInforamtion();
        }
      })
      .catch(error => {
        setUploading(false);
        console.log('profileImageUploadApi-error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Profile Details'}
        navFunc={navFunc}
        showRightIcon={false}
        rightIconAction={showCoupon}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView
          style={styles.body}
          centerContent
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            {isUploading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
            ) : (
              <Image
                source={
                  userInfomation?.avatar
                    ? {uri: userInfomation?.avatar}
                    : userInfomation?.gender === 'Female'
                    ? ICONS.femaleIcon
                    : ICONS.maleIcon
                }
                style={styles.profileImage}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.Container}>
            <View style={styles.buttonRowContainer}>
              <View style={styles.btnContainner}>
                <Button
                  title="Add Photos"
                  setFontSize={14}
                  Height={40}
                  onPressFunc={() => askPermission('Media')}
                />
              </View>
              <View style={styles.btnContainner}>
                <Button title="Manage Horoscope" setFontSize={14} Height={40} />
              </View>
            </View>
            <Text style={styles.Heading}>Personal Information</Text>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>Basic Details</Text>
              <TouchableOpacity
                onPress={() => {
                  onPressFunc(1);
                }}>
                <View style={styles.row}>
                  <Text style={styles.addDetailsText}>Edit</Text>
                  <Image
                    source={ICONS.editIcon}
                    style={styles.addIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Profile Created By</Text>
              <Text style={styles.details}>{userInfomation?.profileType}</Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Name</Text>
              <Text style={styles.details}>
                {userInfomation?.firstName} {userInfomation?.lastName}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Age</Text>
              <Text style={styles.details}>{userInfomation?.age}</Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>DOB</Text>
              <Text style={styles.details}>{userInfomation?.dateOfBirth}</Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Height</Text>
              <Text style={styles.details}>
                {userInfomation?.basicDetails?.height}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Weight</Text>
              <Text style={styles.details}>
                {userInfomation?.basicDetails?.weight}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Marital Status</Text>
              <Text style={styles.details}>
                {userInfomation?.basicDetails?.maritalStatus}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Mother Tongue</Text>
              <Text style={styles.details}>
                {userInfomation?.religionDetails?.motherTongue}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Body Type</Text>
              <Text style={styles.details}>
                {userInfomation?.basicDetails?.bodyType}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>Life Style Information</Text>
              <TouchableOpacity
                onPress={() => {
                  onPressFunc(2);
                }}>
                <View style={styles.row}>
                  <Text style={styles.addDetailsText}>Edit</Text>
                  <Image
                    source={ICONS.editIcon}
                    style={styles.addIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Eating Habits</Text>
              <Text style={styles.details}>
                {userInfomation?.lifeStyleDetails?.dietHabit}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Drinking Habits</Text>
              <Text style={styles.details}>
                {userInfomation?.lifeStyleDetails?.drinkingHabit}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Smoking Habits</Text>
              <Text style={styles.details}>
                {userInfomation?.lifeStyleDetails?.smokingHabit}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>Religious Information</Text>
            </View>

            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Religion</Text>
              <Text style={styles.details}>
                {userInfomation?.religionDetails?.religion}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Caste</Text>
              <Text style={styles.details}>
                {userInfomation?.religionDetails?.caste}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Zodiac</Text>
              <Text style={styles.details}>
                {userInfomation?.religiousDetails?.moonSign}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>
                Professional Information
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onPressFunc(2);
                }}>
                <View style={styles.row}>
                  <Text style={styles.addDetailsText}>Edit</Text>
                  <Image
                    source={ICONS.editIcon}
                    style={styles.addIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Education</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.education}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>College/Institution</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.educationInstitution}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Occupation</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.occupation}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Organization</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.organization}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Employed In</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.employedIn}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Annual Income</Text>
              <Text style={styles.details}>
                {userInfomation?.careerDetails?.currency}{' '}
                {userInfomation?.careerDetails?.income}
                {'L'}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>Location Details</Text>
              <TouchableOpacity
                onPress={() => {
                  onPressFunc(3);
                }}>
                <View style={styles.row}>
                  <Text style={styles.addDetailsText}>Edit</Text>
                  <Image
                    source={ICONS.editIcon}
                    style={styles.addIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Address</Text>
              <Text style={styles.details}>
                {userInfomation?.locationDetails?.address}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>City</Text>
              <Text style={styles.details}>
                {userInfomation?.locationDetails?.city}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>State</Text>
              <Text style={styles.details}>
                {userInfomation?.locationDetails?.state}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Country</Text>
              <Text style={styles.details}>
                {userInfomation?.locationDetails?.country}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.iconWrapper}>
              <Text style={styles.headingContent}>Family Details</Text>
              <TouchableOpacity
                onPress={() => {
                  onPressFunc(2);
                }}>
                <View style={styles.row}>
                  <Text style={styles.addDetailsText}>Edit</Text>
                  <Image
                    source={ICONS.editIcon}
                    style={styles.addIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Father Name</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.fatherName}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Mother Name</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.motherName}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Father's Occupation</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.fatherOccupation}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Mother's Occupation</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.motherOccupation}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Family Value</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.familyValue}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Family Type</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.familyType}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Family Status</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.familyStatus}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>No. Of Brothers</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.noOfBrothers}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>No. Of Brothers Married</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.maleMarried}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>No Of Sisters</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.noOfSisters}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>No. Of Sisters Married</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.femaleMarried}
              </Text>
            </View>
            <View style={styles.detailsRowContainer}>
              <Text style={styles.details}>Abount MySelf</Text>
              <Text style={styles.details}>
                {userInfomation?.familyDetails?.description}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={[styles.editPreferenceCard, styles.shadowProps]}>
              <Text style={styles.content}>
                Edit your partner preferences to get perfect matches.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation2.navigate('Preferences');
                }}
                style={styles.radiusBttn}>
                <Text style={styles.bttnText}>Edit Preferences</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileDetails;

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
  profileImage: {
    width: '100%',
    height: HEIGHT / 3,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailsRowContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  details: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.P_TEXT,
    width: '50%',
    fontFamily: 'Poppins-Regular',
  },
  Heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.SECONDARY_COLOR,
    textTransform: 'uppercase',
    marginTop: 15,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: colors.GRAY_HORIZONTAL_LINE,
    marginVertical: 15,
  },
  headingContent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 5,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  editPreferenceCard: {
    width: '100%',
    // height: 100,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_COLOR,
    shadowColor: colors.BLACK,
  },
  shadowProps: {
    elevation: 5,
    shadowRadius: 1,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    lineHeight: 25,
  },
  radiusBttn: {
    width: 160,
    height: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.SECONDARY_COLOR,
    marginTop: 10,
  },
  bttnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.WHITE_TEXT,
  },
  addIcon: {
    width: 13,
    height: 13,
    marginHorizontal: 2,
    marginTop: 2,
  },
  addDetailsText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  btnContainner: {
    width: '42%',
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
