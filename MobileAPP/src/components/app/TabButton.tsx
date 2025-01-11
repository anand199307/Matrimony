/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets/Images/index';

interface tabButton {
  onPressFunc?: (value: any) => void;
  activeIcon?: any;
  InActiveIcon?: any;
  selectedTab?: any;
}

const TabButton = ({
  onPressFunc,
  activeIcon,
  InActiveIcon,
  selectedTab,
}: tabButton) => {
  return (
    <>
      {/* {selectedTab ? (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.tabContainer}
          onPress={onPressFunc}>
          <Image source={activeIcon} style={styles.activeBtn} />
          <Image
            source={IMAGES.curve}
            style={styles.curveStyle}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : (
      <TouchableOpacity
        style={styles.inActiveTabContainer}
        onPress={onPressFunc}
        activeOpacity={1}>
        <Image source={InActiveIcon} style={styles.inActiveBtn} />
      </TouchableOpacity>
      )} */}
      <TouchableOpacity
        style={styles.inActiveTabContainer}
        onPress={onPressFunc}
        activeOpacity={1}>
        {selectedTab ? (
          <Image source={activeIcon} style={styles.inActiveBtn} />
        ) : (
          <Image source={InActiveIcon} style={styles.inActiveBtn} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  inActiveBtn: {
    height: 35,
    width: 35,
  },
  curveStyle: {
    width: 83,
    height: 53,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveTabContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftGapFiller: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
  },
  rightGapFiller: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    top: -35,
    width: 55,
    height: 55,
    borderRadius: 50 / 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
