import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import {IMAGES} from '../../assets/Images/index';
import Avatar from '../common/Avatar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/tabs/Home';
const matchesProfile: any[] = [
  {
    id: 1,
    src: IMAGES.matches1,
    name: 'Thamanna Bhatia M',
    description: '26, 5’4”, Software Engin....',
  },
  {
    id: 2,
    src: IMAGES.matches2,
    name: 'Sherya Sherin J',
    description: '28, 5’4”, Private Teache....',
  },
  {
    id: 3,
    src: IMAGES.matches3,
    name: 'Anushka Reddy G',
    description: '25, 5’6”, Assistant Profe....',
  },
];

const AIMatching = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const profileNav = () => {
    navigation.navigate('Discover');
  };
  return (
    <TouchableOpacity onPress={profileNav}>
      <ImageBackground
        source={IMAGES.AImatching}
        style={styles.aiMatchingContainer}
        resizeMode="cover">
        <Text style={styles.heading}>Daily recommendations</Text>
        <View style={styles.multipleAvatar}>
          {matchesProfile?.map((item: any) => (
            <View style={styles.avatarBorder} key={item?.id}>
              <Avatar
                WIDTH={60}
                HEIGHT={60}
                src={item?.src}
                PressFunc={profileNav}
                srcObj={true}
              />
            </View>
          ))}
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>AI Matchmaking </Text>
          <Text style={styles.description}>
            Searching for your life partner? Waiting for the perfect match? Let
            our AI help find your soulmate!
          </Text>
          <TouchableOpacity onPress={profileNav}>
            <Text style={styles.profileNavigate}>View Profiles</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AIMatching;

const styles = StyleSheet.create({
  aiMatchingContainer: {
    width: '100%',
    height: 280,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.P_TEXT,
    marginHorizontal: 20,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
  },
  body: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ED1F50',
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
    lineHeight: 21,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  profileNavigate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginTop: 12,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
  },
  multipleAvatar: {
    flexDirection: 'row',
    marginLeft: 40,
    marginTop: 20,
  },
  avatarBorder: {
    borderWidth: 1,
    borderColor: colors.LIGHT_PINK_BG,
    borderRadius: 50,
    marginLeft: -25,
  },
});
