import {StyleSheet} from 'react-native';
import colors from '../../configurations/config/color.config';

export const GlobalStyles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.P_TEXT,
    lineHeight: 30,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.S_TEXT,
    textAlign: 'center',
    width: '80%',
  },
});
