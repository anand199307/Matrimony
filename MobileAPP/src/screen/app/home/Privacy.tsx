import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../../configurations/config/color.config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import Header from '../../../components/app/ProfileHeader';
import HorizontalNavigationLine from '../../../components/app/HorizontalNavigationLine';
import {PrivacyHeadingList} from '../../../utilis/staticData/Profile';

const Privacy = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.navigate('Profile');

  const reDirect = (title: any) => {
    title === 'Privacy Policy' &&
      navigation.navigate('PrivacyPolicy', {componentName: 'Privacy Policy'});
    title === 'Terms of Services' &&
      navigation.navigate('PrivacyPolicy', {
        componentName: 'Terms of Services',
      });
    title === 'FAQ' &&
      navigation.navigate('PrivacyPolicy', {componentName: 'FAQ'});
  };

  return (
    <View style={styles.container}>
      <Header title="Privacy" navFunc={navFunc} />
      <View style={styles.body}>
        {PrivacyHeadingList?.map((item: any) => (
          <HorizontalNavigationLine
            title={item?.content}
            icon={item?.icon}
            key={item?.id}
            navFunc={reDirect}
          />
        ))}
      </View>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
  },
});
