import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import RecommendationCard from './RecomendationCard';
import AppApi from '../../configurations/Api/AppApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/tabs/Home';

interface MatchProfile {
  _id: string;
  profileId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  age: string;
  basicDetails: object;
  gender: string;
  careerDetails: object;
  uuid: string;
  navFun?: () => void;
}

const DailyRecomendation = () => {
  const [dialyMatches, setDailyMatches] = useState<MatchProfile[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  useEffect(() => {
    fetchNewMatches();
  }, []);

  const fetchNewMatches = async () => {
    try {
      const res = await AppApi.getNewMatches({limit: 5});
      setDailyMatches(res.data.response.data); // Assuming the response is an array
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>Daily Recommendation</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Discover');
          }}>
          <Text style={styles.navText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dialyMatches}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <RecommendationCard
            _id={item?._id}
            firstName={item?.firstName}
            src={item?.avatar}
            basicDetails={item?.basicDetails}
            careerDetails={item?.careerDetails}
            key={item?.profileId}
            age={item.age}
            gender={item.gender}
            uuid={item.uuid}
          />
        )}
        keyExtractor={item => item?.profileId}
      />
    </View>
  );
};

export default DailyRecomendation;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  container: {
    marginVertical: 25,
  },
  navText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.P_TEXT,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    justifyContent: 'center', // or 'flex-start', 'flex-end', 'center'
    alignItems: 'center', // or 'flex-start', 'flex-end', 'center'
    objectFit: 'cover',
  },
});
