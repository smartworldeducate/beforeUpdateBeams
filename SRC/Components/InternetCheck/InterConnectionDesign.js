import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';

const InterConnectionDesign = ({setIsConnected}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginHorizontal: wp('8'),
        borderRadius: wp('50'),
        bottom: hp('9'),
        backgroundColor: colors.transparentBlackLight,
        left: wp('12.5'),
        height: hp('5'),
        borderColor: 'white',
        borderWidth: wp('0.1'),
      }}>
      <Text
        style={{
          fontSize: hp('1.6'),
          fontFamily: fontFamily.interSemiBold,
          color: 'white',
          textAlign: 'center',
          paddingHorizontal: wp('3'),
        }}>
        Internet connection has been lost.
      </Text>
    </View>
  );
};

export default InterConnectionDesign;
