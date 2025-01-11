import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../../configurations/config/color.config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import Header from '../../../components/app/ProfileHeader';
import HorizontalNavigationLine from '../../../components/app/HorizontalNavigationLine';
import {SettingHeadingList} from '../../../utilis/staticData/Profile';

const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.navigate('Profile');

  const reDirect = (title: any) => {
    title === 'Manage Account' && navigation.navigate('ManageAccount');
    title === 'Report' && navigation.navigate('Report');
    title === 'Help Center' && navigation.navigate('HelpCenter');
  };
  return (
    <View style={styles.container}>
      <Header title="Settings" navFunc={navFunc} />
      <View style={styles.body}>
        {SettingHeadingList?.map((item: any) => (
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

export default Settings;

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
