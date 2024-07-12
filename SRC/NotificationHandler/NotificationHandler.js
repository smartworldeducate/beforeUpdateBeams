import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import {Linking, PermissionsAndroid, Platform, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

export async function requestNotificationPermission() {
  try {
    DeviceInfo.getApiLevel().then(apiLevel => {
      console.log('apiLevelInApp.js', apiLevel);
    });
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    // );

    // console.log('granted', granted);

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('granted');

    // if (apiLevel >= 33) {
    //   const granted = await PermissionsAndroid.request(
    //     // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    //     'android.permission.POST_NOTIFICATIONS',
    //   );

    //   console.log('granted', granted);
    // }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('enabled', enabled);

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }

    // getFcmToken();
    // }
    else {
      await AsyncStorage.setItem('fcm', 'user not allowed notfication');
      // Permission denied
      console.log('Notification permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

// export async function requestNotificationPermission() {
//   try {
//     if (Platform.OS === 'android') {
//       const apiLevel = await DeviceInfo.getApiLevel();
//       console.log('apiLevel', apiLevel);

//       if (apiLevel >= 33) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Notification permission granted.');
//           const authStatus = await messaging().requestPermission();
//           const enabled =
//             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//             authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//           if (enabled) {
//             console.log('Authorization status:', authStatus);
//             getFcmToken();
//           } else {
//             console.log('Notification permission denied');
//             await AsyncStorage.setItem('fcm', 'user not allowed notification');
//           }
//         } else {
//           console.log('Notification permission denied');
//           await AsyncStorage.setItem('fcm', 'user not allowed notification');
//         }
//       } else {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//           console.log('Authorization status:', authStatus);
//           getFcmToken();
//         } else {
//           console.log('Notification permission denied');
//           await AsyncStorage.setItem('fcm', 'user not allowed notification');
//         }
//       }
//     } else {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//         getFcmToken();
//       } else {
//         console.log('Notification permission denied');
//         await AsyncStorage.setItem('fcm', 'user not allowed notification');
//       }
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

const getFcmToken = async () => {
  let fcmTokenAlreadyExist = await AsyncStorage.getItem('fcm');
  console.log('fcmTokenAlreadyExist', fcmTokenAlreadyExist);

  if (!fcmTokenAlreadyExist) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('fcmTokenHandler', fcmToken);
      await AsyncStorage.setItem('fcm', fcmToken);
    } catch (error) {
      console.log('error', error);
      // await AsyncStorage.setItem('fcm', 'user not allowed notfication');
    }
  }
};

export async function notificationListener() {
  // at the background case
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification in background state:', remoteMessage);
  });

  // at the foreground case
  messaging().onMessage(remoteMessage => {
    console.log('Notification inforeground state:', remoteMessage);
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
      [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
        //   {text: 'OK', onPress: () => handleNavigation(message.data)},
      ],
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Perform your background logic here
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}

const requestUserPermission = async () => {
  if (Platform.OS === 'ios') {
    //Request iOS permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      // console.log('Authorization status:', authStatus);
    }
  } else if (Platform.OS === 'android') {
    //Request Android permission (For API level 33+, for 32 or below is not required)
    const res = await PermissionsAndroid.request(
      // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      'android.permission.POST_NOTIFICATIONS',
    );

    // console.log('res', res);
  }
};
