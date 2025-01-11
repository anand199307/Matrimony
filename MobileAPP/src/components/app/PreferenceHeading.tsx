import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import Text from '../common/GlobalText';
import {ICONS} from '../../assets/Icons';

interface heading {
  title?: string;
  toggleFunc: (value: any) => void;
  toggle?: boolean;
}
const PreferenceHeading = ({title, toggleFunc, toggle}: heading) => {
  const [active, setActive] = useState<boolean>(false);

  const openBlock = () => {
    const obj = {title: title, status: active};
    toggleFunc(obj);
    setActive(!active);
  };
  return (
    <TouchableWithoutFeedback onPress={() => openBlock()}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        {toggle ? (
          <Image
            source={ICONS.subtract}
            style={styles.mainessIcon}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={ICONS.add}
            style={styles.addIcon}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PreferenceHeading;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#454545',
    textTransform: 'capitalize',
  },
  addIcon: {
    width: 30,
    height: 30,
  },
  mainessIcon: {
    width: 15,
    height: 20,
    marginRight: 8,
    marginTop: 5,
  },
});
