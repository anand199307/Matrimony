import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {request, PERMISSIONS} from 'react-native-permissions';

const Permission = () => {
  const permissionRequest = (permission: any) => {
    request(permission).then(result => {
      console.log(result);
    });
  };

  const askPermission = (permissionType: String) => {
    if (Platform.OS === 'ios') {
      switch (permissionType) {
        case 'contact':
          permissionRequest(PERMISSIONS.IOS.CONTACTS);
          break;
        case 'Media':
          permissionRequest(PERMISSIONS.IOS.MEDIA_LIBRARY);
          break;
        case 'Camera':
          permissionRequest(PERMISSIONS.IOS.CAMERA);
          break;
        default:
          return null;
      }
    } else {
      switch (permissionType) {
        case 'Contact':
          permissionRequest(PERMISSIONS.ANDROID.READ_CONTACTS);
          break;
        case 'Media':
          permissionRequest(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          break;
        case 'Camera':
          permissionRequest(PERMISSIONS.ANDROID.CAMERA);
          break;
        default:
          return null;
      }
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => askPermission('Contact')}>
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => askPermission('Media')}>
        <Text style={styles.buttonText}>Media</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => askPermission('Camera')}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Permission;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3f51b5',
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
