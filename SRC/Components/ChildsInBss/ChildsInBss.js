import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';

const ChildsInBss = ({leftText, rightText}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // paddingVertical: wp('0.5'),
      }}>
      <View style={{flex: 0.35}}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.leftText}>
          {leftText}
        </Text>
      </View>
      <View
        style={{
          flex: 0.65,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: wp('3'),
        }}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.rightText}>
          {rightText}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  leftText: {
    color: 'black',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    fontSize: '0.6rem',
  },
  rightText: {
    color: 'black',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.55rem',
  },
});

export default ChildsInBss;
