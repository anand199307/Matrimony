/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MatchesScreen from '../../screen/app/matches/Matches';
import SearchScreen from '../../screen/app/search/Search';
import DiscoverScreen from '../../screen/app/discover/Discover';
import {HomeStack} from './Home';
import {ChatStack} from './Chat';
import {StyleSheet} from 'react-native';
import {ICONS} from '../../assets/Icons';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/src/types';
import TabButton from '../../components/app/TabButton';

export type TabBottomStackParamList = {
  Home: undefined;
  Search: undefined;
  Matches: undefined;
  Discover: undefined;
  Chat: undefined;
};
const Tab = createBottomTabNavigator<TabBottomStackParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarStyle: styles.tabBarStyle,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabButton
              onPressFunc={props.onPress}
              activeIcon={ICONS.navHomeActive}
              InActiveIcon={ICONS.navHomeInActive}
              selectedTab={props?.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabButton
              onPressFunc={props.onPress}
              activeIcon={ICONS.navSearchActive}
              InActiveIcon={ICONS.navSearchInActive}
              selectedTab={props?.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabButton
              onPressFunc={props.onPress}
              activeIcon={ICONS.navHeartActive}
              InActiveIcon={ICONS.navHeartInActive}
              selectedTab={props?.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabButton
              onPressFunc={props.onPress}
              activeIcon={ICONS.navDiscoverActive}
              InActiveIcon={ICONS.navDiscoverInActive}
              selectedTab={props?.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabButton
              onPressFunc={props.onPress}
              activeIcon={ICONS.navMessageActive}
              InActiveIcon={ICONS.navMessageInActive}
              selectedTab={props?.accessibilityState?.selected}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    borderTopWidth: 0,
    position: 'absolute',
    height: 50,
    shadowOffset: {
      width: 9,
      height: -8,
    },
    shadowOpacity: 0.09,
    shadowRadius: 12,
  },
});
