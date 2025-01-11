/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../screen/auth/Auth';
import AppStack from './tabs/MainTab';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authAction} from '../redux/actions';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state?.auth?.is_logged);
  const authToken = useSelector((state: any) => state?.auth?.authToken);
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    async function checkAuthToken() {
      try {
        const value = await AsyncStorage.getItem('token');
        dispatch(authAction.setLogin(true));
        dispatch(authAction.setAuthToken(value));
        setToken(value); // Update the state with the token value
      } catch (error) {
        console.log('unable to set token', error);
      }
    }
    checkAuthToken();
  }, [isLogged, authToken]);
  return (
    <NavigationContainer>
      {(authToken !== null && isLogged === true) || token !== null ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
