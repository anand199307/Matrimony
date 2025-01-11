import {
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import {ICONS} from '../../assets/Icons/index';
import AppApi from '../../configurations/Api/AppApi';
interface matchesProfile {
  _id?: string;
  src?: any;
  firstName?: string;
  lastName?: string;
  age?: string;
  gender: string;
  uuid: string;
  basicDetails?: any;
  careerDetails?: any;
}
const RecomendationCard = ({
  _id,
  src,
  firstName,
  lastName,
  age,
  gender,
  basicDetails,
  careerDetails,
  uuid,
}: matchesProfile) => {
  const [active, setActive] = useState(false);

  const favoriteAction = async () => {
    setActive(!active);
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
    <TouchableOpacity
      style={[
        styles.CardContainer,
        Platform.OS === 'ios'
          ? styles.CardContainerIOS
          : styles.CardContainerAndroid,
      ]}
      onPress={() => console.log('card', src)}>
      <Image
        source={
          src
            ? {uri: src}
            : gender === 'Female'
            ? ICONS.femaleIcon
            : ICONS.maleIcon
        }
        style={styles.profileImg}
      />
      <View style={styles.profileDetails}>
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {firstName} {''} {lastName}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {age + ','} {basicDetails?.height + ','} {careerDetails?.education}{' '}
            {careerDetails?.occupation}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={ingoreAction}>
            <Image
              source={ICONS.notInterested}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => favoriteAction()}>
            {active ? (
              <Image
                source={ICONS.activeHeart}
                style={styles.icon}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={ICONS.inActiveHeart}
                style={styles.icon}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={sendRequest}>
            <Image
              source={ICONS.connectNow}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecomendationCard;

const styles = StyleSheet.create({
  CardContainer: {
    width: 280,
    height: 140,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardContainerAndroid: {
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
  },
  CardContainerIOS: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImg: {
    height: 150,
    width: 120,
  },
  profileDetails: {
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.DIM_GREY,
    width: 150,
    fontFamily: 'Poppins-Regular',
  },
  name: {
    fontSize: 14,
    width: 150,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    height: 35,
    width: 35,
  },
});
