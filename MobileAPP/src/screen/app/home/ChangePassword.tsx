import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/app/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import colors from '../../../configurations/config/color.config';
import Content from '../../../components/app/ManageAccountPageContent';
import Button from '../../../components/common/Button';
import TextInputCustom from '../../../components/common/TextInputCustom';
import {valueType, formValue} from '../../../utilis/types/SignUp';

const ChangePassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [form, setForm] = useState<valueType>({...formValue});

  const navFunc = () => navigation.navigate('ManageAccount');
  const toogleFunc = () => {};
  return (
    <View style={styles.container}>
      <Header title="Change Password" navFunc={navFunc} />
      <View style={styles.body}>
        <View>
          <Content
            title="Change Password"
            content="Before you go, let us understand why you’ve decided to delete your account."
          />
          <View style={styles.feildBox}>
            <TextInputCustom
              placeholder="Enter Your Password"
              value={form.password}
              error={form.passwordError}
              activeIcon={toogleFunc}
              showHideControll={true}
              onChangeText={password =>
                setForm({...form, password, passwordError: ''})
              }
              label="Existing Password"
            />
            <TextInputCustom
              placeholder="Enter Your Password"
              value={form.password}
              error={form.passwordError}
              activeIcon={toogleFunc}
              showHideControll={true}
              onChangeText={password =>
                setForm({...form, password, passwordError: ''})
              }
              label="Password"
            />
            <TextInputCustom
              placeholder="Enter Your Password"
              value={form.passwordConfirmation}
              error={form.passwordConfirmationError}
              activeIcon={toogleFunc}
              showHideControll={true}
              onChangeText={passwordConfirmation =>
                setForm({
                  ...form,
                  passwordConfirmation,
                  passwordConfirmationError: '',
                })
              }
              label="Re-Enter New Password"
            />
          </View>
        </View>
        <Button title="Change Password" MV={10} />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  feildBox: {
    marginTop: 25,
  },
});
