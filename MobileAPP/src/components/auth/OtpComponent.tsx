import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import color from '../../configurations/config/color.config';

interface OTPInputProps {
  onOTPChange: (otp: string) => void;
  count?: number;
  reSend?: () => void;
  settingCount: Dispatch<SetStateAction<any>>;
}

const OTPInput: React.FC<OTPInputProps> = ({
  onOTPChange,
  count,
  reSend,
  settingCount,
}) => {
  const [otp, setOTP] = useState<string>('');
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newOTP = otp.split('');
    newOTP[index] = text;
    const newFullOTP = newOTP.join('');
    setOTP(newFullOTP);
    if (index < inputRefs.current.length - 1 && text) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
    }
    onOTPChange(newFullOTP);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      settingCount(count - 1);
    }, 1000);

    count === 0 && clearTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count, settingCount]);

  return (
    <View>
      <View style={styles.container}>
        {Array.from({length: 6}).map((_, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={text => handleTextChange(text, index)}
              value={otp[index] || ''}
            />
          </View>
        ))}
      </View>
      <View style={styles.Contentrow}>
        {count === 0 ? (
          <TouchableOpacity onPress={reSend}>
            <Text style={styles.primaryColor}>Resend</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.bold}>Resend </Text>
        )}
        <Text style={styles.bold}>code in</Text>
        <Text style={styles.primaryColor}>{count}</Text>
        <Text style={styles.bold}>s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    width: 50, // Adjust the width as needed to accommodate the text
    height: 50, // You can also adjust the height if needed
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
  },
  underlineStyleBase: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    height: 60,
    color: color.P_TEXT,
    backgroundColor: '#FAFAFA',
  },
  underlineStyleHighLighted: {
    borderWidth: 1,
    borderColor: color.SECONDARY_COLOR,
    borderRadius: 12,
    height: 60,
    color: color.SECONDARY_COLOR,
    backgroundColor: 'rgba(255, 77, 103, 0.08)',
  },
  bold: {
    fontSize: 15,
    fontWeight: '500',
    color: color.P_TEXT,
  },
  primaryColor: {
    fontSize: 15,
    fontWeight: '500',
    color: color.SECONDARY_COLOR,
    marginHorizontal: 4,
  },
  Contentrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default OTPInput;
