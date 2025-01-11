/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../common/GlobalText';
import {ICONS} from '../../assets/Icons';
import Avatar from '../common/Avatar';
import {DOMAIN_CLOUD_CDN} from '../../configurations/config/app.config';

interface header {
  title?: string;
  navFunc?: () => void;
  ShowLeftIcon?: boolean;
  ShowRightIcon?: boolean;
  ShowProfile?: boolean;
  profileNav?: () => void;
  menuFunc?: () => void;
  titleDark?: boolean;
}

//redux
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const AppHeader = ({
  title,
  navFunc,
  ShowLeftIcon,
  ShowRightIcon,
  ShowProfile,
  profileNav,
  menuFunc,
  titleDark,
}: header) => {
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const profileImage: any = `${DOMAIN_CLOUD_CDN}${currentUser?.uuid}/profilePhoto/${currentUser?.avatar}`;

  return (
    <SafeAreaView>
      <View style={styles.heading}>
        <View style={[styles.center, {width: '12%'}]}>
          {ShowLeftIcon && (
            <TouchableOpacity onPress={navFunc}>
              <Image
                source={titleDark ? ICONS.backArrow : ICONS.leftArrowBlack2}
                style={[styles.navigationStyle, titleDark && {height: 40}]}
                resizeMode={titleDark ? 'cover' : 'contain'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.center, {width: '73%'}]}>
          <Text style={[styles.title, {color: titleDark ? '#fff' : '#000'}]}>
            {title}
          </Text>
        </View>

        <View style={[styles.center, {width: '15%'}]}>
          {ShowRightIcon &&
            (ShowProfile ? (
              <Avatar
                WIDTH={40}
                HEIGHT={40}
                src={profileImage}
                PressFunc={profileNav}
              />
            ) : (
              <TouchableOpacity onPress={menuFunc}>
                <Image
                  source={ICONS.dots}
                  style={styles.menuStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  heading: {
    // flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationStyle: {
    width: 30,
    height: 19,
  },
  menuStyle: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
  },
});
