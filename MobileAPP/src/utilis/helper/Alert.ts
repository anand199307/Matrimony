import { Alert } from 'react-native'

interface alert{
    title?: any;
    message?: any;
    alertOk?: () => void;
    alertCancel?: () => void;
    customOption?: boolean;
    customOptionText?: string;
    customOptionFunc?:() => void;
}

export const AlertPopup = (title?: any, message?: any, alertOk?: () => void, alertCancel?: () => void, customOption?: boolean, customOptionText?: any, customOptionFunc?: () => void,) => {
    
  customOption &&
  Alert.alert(title, message, [
      {
        text: customOptionText,
        onPress:customOptionFunc,
      },
      {
        text: 'Cancel',
        onPress: alertCancel,
        style: 'cancel',
      },
      {text: 'OK', onPress:  alertOk},
  ])
    !customOption &&
Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress:alertCancel,
        style: 'cancel',
      },
      {text: 'OK', onPress: alertOk},
  ])
}
