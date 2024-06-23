import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetCheck = ({setIsConnected}) => {
  // console.log('in InternetCheck.js');

  const theme = useColorScheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      //   console.log('state', state);
      //   console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <></>;
};

export default InternetCheck;
