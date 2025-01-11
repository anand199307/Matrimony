/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
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
  IdVerificationvalueType,
  IdVerificationFormValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {IDSelect} from '../../../utilis/feildStaticData/PrefernceVerification';

//redux
import {useDispatch} from 'react-redux';
import {authAction} from '../../../redux/actions';
import {isValidIDInformation} from '../../../utilis/formValidation/formValidation';
import {request, PERMISSIONS} from 'react-native-permissions';
import AppApi from '../../../configurations/Api/AppApi';
import {
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';

const IdVerification = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const [image, setImage] = useState<any>();

  const [form, setForm] = useState<IdVerificationvalueType>({
    ...IdVerificationFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>('');
  const [showBtn, setShowBtn] = useState(false);

  const RegisterFunc = () => {
    const [isValid, newForm] = isValidIDInformation({...form});
    setForm(newForm);
    if (isValid) {
      setForm({...IdVerificationFormValue});
      const body = {
        profileStatus: 5,
        userVerificationDetails: {
          idType: form.selectedId,
          idNumber: form.IdValue,
          idDoc: image,
        },
      };
      onBoard(body);
    }
  };
  const onBoard = async (body: any) => {
    try {
      let response = await AppApi.onBoardRegister({body});
      if (response.status === 200) {
        setForm({...IdVerificationFormValue});
        setShowBtn(false);
        dispatch(authAction.setLogin(true));
      }
    } catch (error) {
      setShowBtn(false);
      console.log('error in oboarding api', error);
    }
  };
  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Select the ID':
        settingModal('selectedId', IDSelect);
        break;
      default:
        null;
    }
  };
  const selectedPopupData = (value: any) =>
    setForm({...form, selectedId: value?.title, selectedIdError: ''});

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    setList([...data]);
  };

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

  const apiCall = async (imageProp: any) => {
    setImage(imageProp?.assets[0]?.uri);

    await AppApi.signedUrl({imageType: 'Id'})
      .then(res => {
        if (res?.data?.statusCode === 200) {
          const url = `${res?.data?.response?.url}`;
          const parts = url.split('?');
          const imageName = parts[0];
          setImage(imageName);
          setForm({...form, uplodedValue: imageName, uplodedIdError: ''});
          uploadingInGoogleStorage(url, imageProp);
        }
      })
      .catch(error => {
        console.log('signedUrl-error', error.data);
      });
  };

  const uploadingInGoogleStorage = async (url: any, imageProp: any) => {
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
        setShowBtn(true);
      } else {
        console.log('Image upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
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

  return (
    <View style={styles.container}>
      <Header imgSrc={IMAGES.IDVerfication} navigationText="IdVerification" />
      <ScrollView style={styles.form}>
        <Text style={styles.contentHeading}>ID Verification</Text>
        <Text style={styles.sectionHeading}>
          Find you the perfect match by completing your KYC verification today.
        </Text>
        <TextInputCustom
          placeholder="Select"
          label="Select the ID"
          value={form.selectedId}
          error={form.selectedIdError}
          backIcon={ICONS.rightArrowInput}
          activeIcon={toogleFunc}
        />
        <TextInputCustom
          placeholder="ID Number"
          value={form.IdValue}
          error={form.idValueError}
          label="Enter the id number"
          activeIcon={() => {}}
          onChangeText={IdValue =>
            setForm({...form, IdValue, idValueError: ''})
          }
        />
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => askPermission('Media')}>
          <Image source={ICONS.documentUpload} style={styles.iconArrow} />
          <Text>Upload Document </Text>
        </TouchableOpacity>
        {showBtn && (
          <ButtonCustom title="Submit" onPressFunc={RegisterFunc} MV={10} />
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
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        selectedArrayData={() => {}}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default IdVerification;

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
    marginVertical: 20,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  uploadBtn: {
    borderColor: '#D9D9D9',
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
