import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../common/GlobalText';
import {ICONS} from '../../assets/Icons/index';
import colors from '../../configurations/config/color.config';
import AppApi from '../../configurations/Api/AppApi';
import Toast from 'react-native-toast-message';

interface homeTop {
  userId: string;
  idVerificationStatus: boolean;
}
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
const HomeTop = ({userId, idVerificationStatus}: homeTop) => {
  // send id verification request
  const [isLoading, setIsLoading] = useState(false);
  const profileVerify = async () => {
    try {
      let body = {
        user: userId,
        requestType: 'IdVerification',
      };
      setIsLoading(true);
      let resp = await AppApi.createRequest({body});
      if (resp.status === 200) {
        setIsLoading(false);
        showToast({
          messageType: 'success',
          heading: 'Info',
          details: 'Request upadted successfully',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showToast({
        messageType: 'error',
        heading: 'Info',
        details: 'Something worng please try after sometime.',
      });
      console.log('error in id request', error);
    }
  };
  return (
    <>
      {idVerificationStatus === false && (
        <>
          <View style={styles.profileVerification}>
            <Text style={styles.verification}>
              Your profile verification is pending
            </Text>
            <View>
              {isLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <TouchableOpacity
                  style={styles.verifyBtn}
                  onPress={profileVerify}>
                  <Text style={styles.verifyText}>Verify</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.divider} />
        </>
      )}
      <View style={styles.profileVerification}>
        <Text style={styles.dimGreyText}>
          Royal Matrimony, India’s No.1 AI Based Matchmaking Service.
        </Text>
        <View>
          <Image
            source={ICONS.rightArrowInput}
            style={styles.rightArrow}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.divider} />
      <Toast />
    </>
  );
};

export default HomeTop;

const styles = StyleSheet.create({
  profileVerification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  verification: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4E4E4E',
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEDEDE',
    marginVertical: 20,
  },
  websiteNavigation: {},
  dimGreyText: {
    width: '90%',
    fontSize: 14,
    fontWeight: '600',
    color: colors.DIM_GREY,
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
  },
  rightArrow: {
    width: 20,
    height: 20,
  },
  verifyBtn: {
    width: 68,
    height: 29,
    borderRadius: 5,
    backgroundColor: '#EE2150',
    justifyContent: 'center',
  },
  verifyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
  },
});
