import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import color from '../../configurations/config/color.config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../screen/auth/Auth';

interface header {
  title?: string;
  content?: string;
  imgSrc?: any;
  showContent?: boolean;
  navigation?: boolean;
}

const RegistrationHeader = ({
  title,
  content,
  imgSrc,
  showContent,
  navigation,
}: header) => {
  const navigationHook =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={styles.header}>
        <View style={styles.rowAlign}>
          <Text style={styles.title}> {title}</Text>
          {navigation && (
            <TouchableOpacity
              onPress={() => navigationHook.navigate('PartnerPreferance')}>
              <Text style={styles.navigation}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
        {showContent && (
          <View style={styles.row}>
            <Image source={imgSrc} style={styles.smallLogo} />
            <Text style={styles.content}>{content}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default RegistrationHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    // height: 60,
    // minHeight: 60,
    flex: 0.23,
    backgroundColor: color.SECONDARY_COLOR,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    color: color.WHITE_TEXT,
    fontWeight: '600',
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    color: color.WHITE_TEXT,
    fontWeight: '100',
    fontSize: 14,
    width: '80%',
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
  },
  navigation: {
    color: color.WHITE_TEXT,
    fontWeight: '400',
    fontSize: 17,
    marginTop: 10,
    marginRight: 10,
    fontFamily: 'Poppins-Regular',
  },
  smallLogo: {
    width: 20,
    height: 17,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    width: '100%',
  },
});
