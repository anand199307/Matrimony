/* eslint-disable react/react-in-jsx-scope */
import HomeScreen from '../../screen/app/home/Home';
import ProfileScreen from '../../screen/app/home/Profile';
import NotificationScreen from '../../screen/app/home/Notification';
import ActivityScreen from '../../screen/app/common/Activity';
import PrivacyScreen from '../../screen/app/home/Privacy';
import PrivacyPolicy from '../../screen/app/home/PrivacyPolicy';
import SettingsScreen from '../../screen/app/home/Settings';
import ManageAccountScreen from '../../screen/app/home/ManageAccount';
import ChangePasswordScreen from '../../screen/app/home/ChangePassword';
import DeleteAccountScreen from '../../screen/app/home/DeleteAccount';
import HelpCenterScreen from '../../screen/app/home/HelpCenter';
import ReportScreen from '../../screen/app/home/Report';
import UpgradeScreen from '../../screen/app/home/Upgrade';
import CartScreen from '../../screen/app/home/YourCart';
import PartnerPreferencesScreen from '../../screen/app/home/PartnerPreferences';
import ProfileDetailsScreen from '../../screen/app/home/ProfileDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MatchesProfileDetails from '../../screen/app/matches/MatchesProfileDetails';
import PersonalDetails from '../../screen/app/prefernceAndVerfication/PersonalDetails';
import DiscoverScreen from '../../screen/app/discover/Discover';
import EditProfile from '../../screen/app/home/EditProfile';

import {RouteProp} from '@react-navigation/native';

export type StackParamList = {
  HomeScreens: undefined;
  Profile: undefined;
  Notification: undefined;
  Activity: undefined;
  Privacy: undefined;
  Settings: undefined;
  ManageAccount: undefined;
  PrivacyPolicy: {componentName?: string};
  ChangePassword: undefined;
  DeleteAccount: undefined;
  HelpCenter: undefined;
  Report: undefined;
  Upgrade: undefined;
  Preferences: undefined;
  Cart: {id: string};
  ProfileDetails: undefined;
  MatchesProfileDetails: undefined;
  Main: undefined;
  PersonalDetails: undefined;
  PartnerPreferance: undefined;
  Discover: undefined;
  EditProfile: undefined;
};

export type RootStackParamList = {
  Cart: {id: string};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

const Stack = createNativeStackNavigator<StackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreens"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageAccount"
        component={ManageAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
        initialParams={{componentName: ''}}
      />
      <Stack.Screen
        name="Preferences"
        component={PartnerPreferencesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Upgrade"
        component={UpgradeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MatchesProfileDetails"
        component={MatchesProfileDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
