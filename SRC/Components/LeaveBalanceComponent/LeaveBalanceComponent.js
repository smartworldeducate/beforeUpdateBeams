import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import Icon from 'react-native-fontawesome-pro';

const LeaveBalanceComponent = ({
  iconName,
  iconColor,
  upperText,
  LowerText,
  availLeaves,
  totalLeaves,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon type="light" name={iconName} size={hp(3.5)} color={iconColor} />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
        }}>
        <Text style={styles.upperText}>{upperText}</Text>
        <Text style={styles.lowerText}>{LowerText}</Text>
      </View>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.availedLeaves}>
          {`${availLeaves}`}/
          <Text style={styles.totalProvidedLeaves}>{totalLeaves}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  upperText: {
    fontSize: '0.8rem',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    color: '#343434',
    letterSpacing: 0.5,
  },
  lowerText: {
    fontSize: '0.66rem',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    color: '#343434',
    letterSpacing: 0.25,
  },
  availedLeaves: {
    fontSize: '1.15rem',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    color: '#363636',
    letterSpacing: 0.5,
  },
  totalProvidedLeaves: {
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    color: '#363636',
    letterSpacing: 0.5,
  },
});

export default LeaveBalanceComponent;
