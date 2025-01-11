import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import {ICONS} from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../screen/auth/Auth';
import color from '../../configurations/config/color.config';

interface header {
  title: string;
  icon?: boolean;
}

const ForgotPasswordHeader = ({title, icon}: header) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <View style={styles.header}>
        {icon && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={ICONS.leftArrowBlack} style={styles.headerImg} />
          </TouchableOpacity>
        )}

        <Text style={styles.headingStyle}>{title}</Text>
      </View>
    </>
  );
};

export default ForgotPasswordHeader;

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerImg: {
    height: 16,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3,
  },
  headingStyle: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: '400',
    color: color.P_TEXT,
  },
});
