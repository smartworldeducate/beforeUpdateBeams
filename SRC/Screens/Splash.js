import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

const Splash = props => {
  const [intialRoute, setIntialRoute] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (intialRoute != '') {
      handleNavigate(intialRoute);
    }
  }, [intialRoute]);

  setTimeout(() => {
    getToken();
  }, 4000);

  const handleNavigate = routeName => {
    navigation.navigate(routeName);
  };

  const getToken = async () => {
    const isSkipped = await AsyncStorage.getItem('skipStartupScreen');
    console.log('isSkipped', isSkipped);
    const token = await AsyncStorage.getItem('loginData');
    console.log(token, 'token');
    if (token != undefined) {
      setIntialRoute('HomeScreen');
    } else if (isSkipped) {
      setIntialRoute('Login');
    } else {
      setIntialRoute('Skip1');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
      }}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        source={{uri: 'splash'}}
        style={{flex: 1}}
        resizeMode={'cover'}></ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
const styles = StyleSheet.create({});
