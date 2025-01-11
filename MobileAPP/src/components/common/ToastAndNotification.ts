import { StyleSheet, View, ToastAndroid, Alert, Platform } from 'react-native'

export const ToastAndNotification = (toastMessage: any, alertTitle: any) => {
    Platform.OS === 'ios' ?
    Alert.alert(alertTitle, toastMessage, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]) :
    ToastAndroid.show(toastMessage, 3000)
}

