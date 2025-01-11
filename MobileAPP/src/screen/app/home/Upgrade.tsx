/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/common/GlobalText';
import Header from '../../../components/app/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Home';
import PlanCard from '../../../components/app/planCard';
import Button from '../../../components/common/Button';
import ActivePlanCard from '../../../components/app/ActivePlanCard';
import PlanDetails from '../../../components/app/PlanDetails';
import AppApi from '../../../configurations/Api/AppApi';

//  redux
import {useDispatch} from 'react-redux';
import {homeAction} from '../../../redux/actions';

const Upgrade = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.goBack();
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<[]>();
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const dispatch = useDispatch();

  const selectedCard = useCallback((prop: any) => {
    setSelectedPlan(prop);
    dispatch(homeAction.setSelectedPlan(prop));
  }, []);

  const gotToCart = (id: string) => navigation.navigate('Cart', {id});
  //  get plan details

  const getSubscription = async () => {
    try {
      let resp = await AppApi.getPlans();
      if (resp.status === 200) {
        setIsLoading(false);
        setPlans(resp.data.response.data);
        selectedCard(resp.data.response.data[1]);
      }
    } catch (error) {
      console.log('error in plan details page', error);
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Choose your Plan" navFunc={navFunc} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView style={styles.body}>
          <Text style={styles.planHeading}>Your Current Plan</Text>
          <ActivePlanCard />
          <PlanDetails
            selectedPlan={selectedPlan?.features}
            planName={selectedPlan?.name}
          />
          <ScrollView
            contentContainerStyle={styles.planCardContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {plans?.map((item: any) => (
              <PlanCard
                item={item}
                key={item?.uuid}
                selectedCard={selectedCard}
                selectedPlan={selectedPlan}
              />
            ))}
          </ScrollView>
          <Button
            title={`Get ${selectedPlan?.durationInMonths} Months For Rs.${selectedPlan?.price}`}
            MV={10}
            onPressFunc={() => {
              gotToCart(selectedPlan.uuid);
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Upgrade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
  },
  planHeading: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.SECONDARY_COLOR,
    lineHeight: 25,
    marginVertical: 15,
  },
  planCardContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
