import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import {IMAGES} from '../../assets/Images';
import ProfileCard from '../../components/app/DiscoverProfileCard';
import {ICONS} from '../../assets/Icons';
//redux
import {MatchesProfile} from '../../utilis/Interfaces';
import AppApi from '../../configurations/Api/AppApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from 'navigation/tabs/Home';
import {useDispatch} from 'react-redux';
import {homeAction} from '../../redux/actions';

interface profileDetails extends Partial<MatchesProfile> {
  parentCompName?: any;
  onPress?: (value: any) => void;
}
const ProfileDetailsCard = ({
  _id,
  firstName,
  lastName,
  age,
  gender,
  basicDetails,
  src,
  // onPress,
  uuid,
  // profileId,
  membership,
  locationDetails,
  religionDetails,
  careerDetails,
}: profileDetails) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const dispatch = useDispatch();
  const navProfileCard = async () => {
    const resp = await AppApi.getProfileInfo({id: uuid});
    if (resp.status === 200) {
      dispatch(homeAction.setUserProfileInfo(resp.data.response));
      navigation.navigate('MatchesProfileDetails');
    }
  };
  const favoriteAction = async () => {
    await AppApi.addToFavouriteList({id: uuid})
      .then(response => {
        if (response.status === 200) {
          console.log('rrr', response.data);
        }
      })
      .catch(eror => {
        console.error(eror.data.error);
      });
  };

  const ingoreAction = async () => {
    await AppApi.addToIngoreList({id: uuid})
      .then(response => {
        if (response.status === 200) {
          console.log('rrr', response.data);
        }
      })
      .catch(eror => {
        console.error(eror.data.error);
      });
  };

  const sendRequest = async () => {
    try {
      let body = {
        receiverUserId: _id,
      };
      const res = await AppApi.sendProfileRequest({body});
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error, 'error in send profile request APi');
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navProfileCard();
        }}
        style={styles.cardContainer}>
        <View style={styles.row}>
          <Image
            source={
              src
                ? {uri: src}
                : gender === 'Female'
                ? IMAGES.femalePic
                : IMAGES.profilepicture
            }
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <View style={styles.profileStatus}>
              <Image source={ICONS.greenVerify} style={styles.iconVerified} />
              <Text style={styles.smallText}>Verified</Text>
              <Image source={ICONS.premiumStar} style={styles.iconStar} />
              <Text style={styles.smallText}>{membership}</Text>
            </View>
            <Text style={styles.profileName}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.detailsText} numberOfLines={1}>
              {age} yrs, {basicDetails?.height}, {religionDetails?.caste}
            </Text>
            <Text style={styles.detailsText} numberOfLines={1}>
              {careerDetails?.education}, {careerDetails?.employedIn}
            </Text>
            <Text style={styles.detailsText} numberOfLines={1}>
              Annual Incom: {careerDetails?.currency} {careerDetails?.income}
            </Text>
            <Text style={styles.detailsText} numberOfLines={1}>
              {locationDetails?.city}, {locationDetails?.state},
              {locationDetails?.country}.
            </Text>
          </View>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={ingoreAction}>
            <ProfileCard src={ICONS.notInterested} text1="Not Interested" />
          </TouchableOpacity>

          <TouchableOpacity onPress={favoriteAction}>
            <ProfileCard src={ICONS.matchesHeart} text1="Favourite" />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendRequest}>
            <ProfileCard src={ICONS.connectNow} text1="Send Interest" />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDetailsCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cardContainer: {
    padding: 15,
  },
  circleIcon: {
    width: 30,
    height: 30,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.CHAT_INACTIVE_TEXT,
    fontFamily: 'Poppins-Regular',
  },
  profileDetails: {
    width: '60%',
    padding: 7,
    paddingLeft: 12,
  },
  profileImage: {
    width: 130,
    height: 165,
    borderRadius: 10,
    objectFit: 'contain',
  },
  iconVerified: {
    width: 15,
    height: 15,
  },
  iconStar: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  smallText: {
    fontSize: 9,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.CHAT_INACTIVE_TEXT,
    marginRight: 8,
    fontFamily: 'Poppins-Regular',
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.P_TEXT,
    paddingBottom: 6,
    paddingTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  detailsText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.CHAT_INACTIVE_TEXT,
    paddingVertical: 3.5,
    fontFamily: 'Poppins-Regular',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#DEDEDE',
  },
  icon: {
    height: 35,
    width: 35,
    // borderWidth: 1,
    // borderColor: "red",
  },
});
