import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';

const ProfileCardBody = ({leftText, rightText}) => {
  return (
    <View
      style={{
        flexDirection: 'row',

        paddingHorizontal: wp('3'),
        height: hp('4'),
      }}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
        }}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.leftText}>
          {leftText}
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.rightText}>
          {rightText}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  leftText: {
    fontSize: '0.57rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
  },
  rightText: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#353535',
    fontWeight: '500',
  },
});

export default ProfileCardBody;
