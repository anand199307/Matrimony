import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
import Profile from '../../components/app/MatchesProfile';
import AppApi from '../../configurations/Api/AppApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/tabs/Home';

// Define an interface for a single match profile
interface MatchProfile {
  profileId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  age: string;
  basicDetails: object;
  gender: string;
  careerDetails: object;
}

const NewMatches = () => {
  const [matchesProfile, setMatchesProfile] = useState<MatchProfile[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  useEffect(() => {
    fetchNewMatches();
  }, []);

  const fetchNewMatches = async () => {
    try {
      const res = await AppApi.getNewMatches({limit: 5});
      setMatchesProfile(res.data.response.data); // Assuming the response is an array
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>New Matches</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Discover');
          }}>
          <Text style={styles.navText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={matchesProfile}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <Profile
            firstName={item.firstName}
            lastName={item.lastName}
            age={item.age}
            src={item.avatar}
            basicDetails={item?.basicDetails}
            careerDetails={item?.careerDetails}
            key={item.profileId}
            gender={item.gender}
          />
        )}
        keyExtractor={item => item.profileId}
      />
    </View>
  );
};

export default NewMatches;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.P_TEXT,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  container: {
    marginVertical: 20,
  },
  navText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
});
