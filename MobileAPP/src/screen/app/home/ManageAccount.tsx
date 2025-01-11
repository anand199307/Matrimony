import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/app/ProfileHeader';
import Text from '../../../components/common/GlobalText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import colors from '../../../configurations/config/color.config';
import {ICONS} from '../../../assets/Icons';
import AppApi from '../../../configurations/Api/AppApi';

const ManageAccount = () => {
  const [userInfomation, setUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.navigate('Settings');
  const reDirect = (name: any) => {
    name === 'Delete Account' && navigation.navigate('DeleteAccount'),
      name === 'Change Password' && navigation.navigate('ChangePassword');
  };

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
  const manageAccountList1: any[] = [
    {
      id: 1,
      icon: ICONS.call,
      content: 'Phone Number',
      data: userInfomation?.phoneNumber,
    },
    {
      id: 2,
      icon: ICONS.email,
      content: 'Email',
      data: userInfomation?.email,
    },
    {
      id: 3,
      icon: ICONS.calender,
      content: 'Date of Birth',
      data: userInfomation?.dateOfBirth,
    },
  ];
  return (
    <View style={styles.container}>
      <Header title="Manage Account" navFunc={navFunc} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.heading}>Account Information</Text>
          {manageAccountList1.map((item: any) => (
            <View style={styles.row} key={item?.id}>
              <Image
                source={item?.icon}
                style={styles.leftIcon}
                resizeMode="contain"
              />
              <View style={styles.contentRow}>
                <Text style={styles.title}>{item?.content}</Text>
                <Text style={styles.title} numberOfLines={1}>
                  {item?.data}
                </Text>
              </View>
            </View>
          ))}
          <Text style={styles.heading}>Account Control</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => reDirect('Change Password')}>
            <Image
              source={ICONS.Password}
              style={styles.leftIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => reDirect('Delete Account')}>
            <Image
              source={ICONS.delete}
              style={styles.leftIcon}
              resizeMode="contain"
            />
            <Text style={styles.titleRed}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: '#212121',
    marginTop: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    height: 25,
  },
  contentRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.P_TEXT,
    letterSpacing: 0.5,
    width: '50%',
  },
  titleRed: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
    letterSpacing: 0.5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
