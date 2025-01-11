import {StyleSheet, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/common/GlobalText';
import Header from '../../../components/app/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import color from '../../../configurations/config/color.config';
import Button from '../../../components/common/Button';
import SlideModal from '../../../components/auth/SlideModal';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import {ReportList} from '../../../utilis/staticData/Profile';

const Report = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [form, setForm] = useState<any>({});
  const [activeComment, setComment] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const selectedPopupData = (value: any) => {
    setModalVisible(false);
    if (value === 'Others') {
      setComment(true);
    }
  };
  const navFunc = () => navigation.navigate('Settings');
  const toogleFunc = () => {};

  return (
    <View style={styles.container}>
      <Header title="Report a profile" navFunc={navFunc} />
      <View style={styles.body}>
        <View>
          <Text style={styles.content}>
            You can anonymously report a profiles and messages & we will take
            strict actions against the system.
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="ID of the profile"
              value={form.password}
              onChangeText={password =>
                setForm({...form, password, passwordError: ''})
              }
              style={styles.testBox}
            />
            <TextInput
              placeholder="Reason"
              value={form.password}
              onChangeText={password =>
                setForm({...form, password, passwordError: ''})
              }
              onPressIn={() => setModalVisible(true)}
              style={styles.testBox}
            />
            {activeComment && (
              <TextInput
                placeholder="If other, comment "
                value={form.password}
                onChangeText={password =>
                  setForm({...form, password, passwordError: ''})
                }
                style={styles.testBox}
              />
            )}
          </View>
        </View>

        <Button title="Report" MV={10} />
      </View>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        list={ReportList}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        selectedArrayData={toogleFunc}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default Report;

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
  content: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.P_TEXT,
    letterSpacing: 0.2,
    lineHeight: 25,
  },
  testBox: {
    borderBottomWidth: 1,
    borderBottomColor: color.BORDER_FORM,
    marginVertical: 5,
  },
  textInputContainer: {
    marginVertical: 20,
  },
});
