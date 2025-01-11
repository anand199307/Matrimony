import RazorpayCheckout from 'react-native-razorpay';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../../../components/common/GlobalText';
import colors from '../../../configurations/config/color.config';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRouteProps, StackParamList} from '../../../navigation/tabs/Home';
import Header from '../../../components/app/ProfileHeader';
import Avatar from '../../../components/common/Avatar';
import {ICONS} from '../../../assets/Icons';
import Modal from '../../../components/common/Modal';
import {authAction} from '../../../redux/actions';
//redux
import {useDispatch, useSelector} from 'react-redux';
//API
import AppApi from '../../../configurations/Api/AppApi';

const YourCart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {params} = useRoute<RootRouteProps<'Cart'>>();

  const plan = useSelector((state: any) => state?.home?.selectedPlan);
  const {
    firstName: name,
    email,
    phoneNumber: contact,
  } = useSelector((store: any) => store.auth.currentUser);

  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userInfomation, setUserInfo] = useState<any>();

  const navFunc = () => navigation.goBack();
  const showCoupon = () => {};
  const profileNavigate = () => {};
  const navigateFunc = () => {};
  const fetchUserInfo = async () => {
    try {
      const resp = await AppApi.getCurrentUser();
      if (resp.status === 200) {
        setUserInfo(resp?.data?.response?.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('error in profile info page', error.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await AppApi.getCurrentUser();
      if (response?.status === 200) {
        dispatch(authAction.setCurrentUser(response?.data?.response?.data));
        navigation.navigate('Upgrade');
      }
    } catch (error) {
      console.log('error while updating current User', error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const verifyPaymentSignature = async (data: any) => {
    setIsButtonLoading(true);
    const body = {
      response: data,
    };
    try {
      const {data: res} = await AppApi.verifyPaymentSignature({body});
      if (res.statusCode === 200 && res.response.verified) {
        getCurrentUser();
      }
    } catch (error) {
      Alert.alert('payment Failed');
      console.log('error verifying payment signature', error);
    }
  };

  const Payment = async (
    id: string = '49051096-f9ca-4fb5-9572-4ee9504f168f',
  ) => {
    setIsButtonLoading(true);
    const body = {
      subscriptionId: id,
    };
    try {
      const {data: response} = await AppApi.getPaymentOrderId({body});

      // orderId
      const razorPayOrderId = response.response.data.razorPayOrderId;

      if (response.statusCode === 201) {
        let options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.jpg',
          currency: 'INR',
          key: 'rzp_test_PzDniaLFPoCEYF',
          amount: 0,
          name: 'Royal Matrimony',
          order_id: razorPayOrderId,
          prefill: {
            email,
            contact,
            name,
          },
          theme: {color: '#EE2150'},
        };
        RazorpayCheckout.open(options)
          .then((data: any) => {
            verifyPaymentSignature(data);
          })
          .catch((error: any) => {
            console.log('payment error', error?.error?.description);
          });
      }
    } catch (error) {
      console.log(error, 'error in send profile request APi');
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cart" navFunc={navFunc} rightIconAction={showCoupon} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.profileRow}>
            <Avatar
              WIDTH={60}
              HEIGHT={60}
              src={userInfomation?.avatar}
              PressFunc={profileNavigate}
            />
            <Text style={styles.couponCard}>
              {userInfomation?.profileId.toUpperCase()}
            </Text>
          </View>
          <View style={styles.containerPlanDetails}>
            <View style={styles.rowSpaceBetween}>
              <View style={styles.row}>
                <Image source={ICONS.premiumCrown} style={styles.planIcon} />
                <Text style={styles.title}>{plan?.name} Plan</Text>
              </View>
              <Text style={styles.planCost}>₹{plan?.price}</Text>
            </View>
            <View style={styles.rowSpaceBetween}>
              <Text
                style={
                  styles.cardDescription
                }>{`Expires in ${plan?.durationInMonths} months`}</Text>
              <Text style={styles.cardDescription}>₹ {plan?.price}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.underLineText}>Change Plan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentContainer}>
            <View>
              <Text style={styles.payHighLight}>You Pay</Text>
              <Text style={styles.cardDescription}>Prices includes 18%GST</Text>
            </View>
            <Text style={styles.planCost}>₹ {plan?.price}</Text>
          </View>
          <View style={styles.center}>
            <Text
              style={[
                styles.cardDescription,
                {textAlign: 'center', width: '70%'},
              ]}>
              We have 100% safe and secure payment gateway because your worry is
              our concern.
            </Text>
            <View style={styles.couponContainer}>
              <View style={styles.couponInner}>
                <TextInput
                  placeholder="coupon code"
                  style={styles.couponInput}
                />
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.applyButtonContainer}>
                  <Text style={styles.applyButton}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.buttonLoader, styles.loaderContainer]}>
              {isButtonLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <TouchableOpacity
                  style={[styles.loaderContainer, {flexGrow: 1, width: '100%'}]}
                  onPress={() => {
                    // setModalVisible(true);
                    Payment(params.id);
                  }}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                // <Button title="con" MV={40} onPressFunc={() => {}} />
              )}
            </View>
          </View>
        </View>
      )}
      <Modal
        show={modalVisible}
        modalName="couponCode"
        setModalShow={setModalVisible}
        navigateFunc={navigateFunc}
      />
    </View>
  );
};

export default YourCart;

const styles = StyleSheet.create({
  couponContainer: {
    marginTop: 40,
  },
  couponInner: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'red',
  },
  couponInput: {
    overflow: 'hidden',
    width: '70%',
    paddingEnd: 10,
  },
  applyButtonContainer: {
    textAlign: 'center',
    alignItems: 'center',
    width: '20%',
  },
  applyButton: {},
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    // padding: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
  },
  couponCard: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.SECONDARY_COLOR,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  planIcon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  planCost: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.P_TEXT,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.S_TEXT,
    letterSpacing: 0.2,
  },
  underLineText: {
    textDecorationLine: 'underline',
    fontSize: 12,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
    marginVertical: 5,
  },
  paymentContainer: {
    width: '100%',
    height: 100,
    backgroundColor: colors.LIGHT_PINK_BG,
    marginVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerPlanDetails: {
    marginHorizontal: 20,
  },
  payHighLight: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoader: {
    backgroundColor: colors.SECONDARY_COLOR,
    width: '90%',
    minHeight: 50,
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
  },
});
