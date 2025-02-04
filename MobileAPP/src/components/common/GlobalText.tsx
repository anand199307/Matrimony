import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';

const GlobalText: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[{...styles.text}, props.style]}>
      {props.children}
    </Text>
  );
};

export default GlobalText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  },
});
