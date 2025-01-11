import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import tabs from '../../navigation/tabs/MainTab';
import Permission from './Permission';
import {View, Text} from 'react-native';

export type AppStackParamList = {
  Tab: undefined;
  Profile: undefined;
  Setting: undefined;
  Permission: undefined;
};

const Drawer = createDrawerNavigator<AppStackParamList>();

const Profile = () => {
  return (
    <View>
      <Text>Profile Drawer</Text>
    </View>
  );
};

const Setting = () => {
  return (
    <View>
      <Text>Setting Drawer</Text>
    </View>
  );
};

const App = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tab" component={tabs} />
      <Drawer.Screen name="Permission" component={Permission} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default App;
