import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const LeftRightText = ({leftText, rightText, rightInner}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View style={{flex: 0.67, justifyContent: 'center'}}>
        <Text style={[styles.text, {paddingLeft: wp('3')}]}>{leftText}</Text>
      </View>
      <View
        style={{
          flex: 0.33,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text style={[styles.text, {paddingRight: wp('3')}]}>
          {rightText}
          <Text>{rightInner}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  text: {
    color: 'black',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.6rem',
  },
});

export default LeftRightText;
