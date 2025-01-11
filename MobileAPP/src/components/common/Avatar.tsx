/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

interface avatarProps {
  WIDTH?: number;
  HEIGHT?: number;
  src?: any;
  PressFunc?: () => void;
  srcObj?: boolean;
}

const Avatar = ({WIDTH, HEIGHT, src, PressFunc, srcObj}: avatarProps) => {
  return (
    <TouchableOpacity
      onPress={PressFunc}
      style={[
        styles.containner,
        {width: WIDTH, height: HEIGHT, borderRadius: 100},
      ]}>
      {srcObj ? (
        <Image
          source={src}
          style={{height: HEIGHT, width: WIDTH, borderRadius: 100}}
        />
      ) : (
        <Image
          source={{uri: src}}
          style={{height: HEIGHT, width: WIDTH, borderRadius: 100}}
        />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  containner: {
    backgroundColor: 'rgba(117, 117, 117, 0.12)',
    justifyContent: 'center',
  },
});
