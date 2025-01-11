/* eslint-disable no-bitwise */
import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

interface AvatarProps {
  size: number;
  backgroundColor?: string;
  text?: string;
}

const NameAvatar: React.FC<AvatarProps> = ({size, backgroundColor, text}) => {
  // Generate a random color based on the text for the background
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    backgroundColor: backgroundColor || stringToColor(text || 'A'),
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyles = {
    color: 'white',
    fontSize: size / 2.5,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyles}>{text ? text[0].toUpperCase() : 'A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NameAvatar;
