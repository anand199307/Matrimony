/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../common/GlobalText';
import colors from '../../configurations/config/color.config';
// import Heading from '../../components/app/PreferenceHeading';
import Button from '../common/Button';
// import {preferenceHeading} from '../../utilis/staticData/Search';
import BasicDetails from './BasicDetails';
import ReligionDetails from './ReligionDetails';
import ProfessionalDetails from './ProfessionalDetails';
import LocationDetails from './LocationDetails';
// import AppApi from 'configurations/Api/AppApi';

const SearchPrefernce = () => {
  // const [blockName, setBlock] = useState<any>('');
  // const [profile, setProfile] = useState<any>([]);
  const [basicDetails, setBasicDetails] = useState();
  const [religiousDetails, setReligiousDetails] = useState();
  const [locationDetails, setLocationDetails] = useState();
  const [professionDetails, setProfessionDetails] = useState();

  // const toggleFunc = (value: any) => {
  //   value?.status ? setBlock('') : setBlock(value?.title);
  //   setProfile((prevState: any) =>
  //     prevState?.map((item: any) => {
  //       if (value?.title === item?.title && !value?.status) {
  //         return {...item, active: true};
  //       } else {
  //         return {...item, active: false};
  //       }
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   setProfile(preferenceHeading);
  // }, []);

  // const searchProfile = async () => {
  //   try {
  //     const resp = AppApi.getNewMatches({limit: 10, body: {}});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      <Text style={[styles.sectionHeader]}>Search by preferences</Text>
      <BasicDetails setBasicDetails={setBasicDetails} />
      <ReligionDetails setReligiousDetails={setReligiousDetails} />
      <ProfessionalDetails setProfessionDetails={setProfessionDetails} />
      <LocationDetails setLocationDetails={setLocationDetails} formType={2} />
      {/* {profile.map((item: any) => (
        <View key={item.id}>
          <Heading
            title={item?.title}
            toggle={item?.active}
            toggleFunc={toggleFunc}
          />
          {item?.title === blockName && blockName === 'Basic details' && (
            <BasicDetails setBasicDetails={setBasicDetails} />
          )}
          {item?.title === blockName && blockName === 'religious details' && (
            <ReligionDetails setReligiousDetails={setReligiousDetails} />
          )}
          {item?.title === blockName &&
            blockName === 'professional details' && (
              <ProfessionalDetails
                setProfessionDetails={setProfessionDetails}
              />
            )}
          {item?.title === blockName && blockName === 'location details' && (
            <LocationDetails
              setLocationDetails={setLocationDetails}
              formType={2}
            />
          )}
        </View>
      ))} */}
      <View style={styles.wrapper}>
        <Button
          title="Search Profiles"
          MV={10}
          onPressFunc={() => {
            console.log(
              'bass',
              basicDetails,
              religiousDetails,
              professionDetails,
              locationDetails,
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchPrefernce;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.P_TEXT,
    textTransform: 'uppercase',
    marginBottom: 25,
    letterSpacing: 2,
  },
  wrapper: {
    marginBottom: '10%',
  },
});
