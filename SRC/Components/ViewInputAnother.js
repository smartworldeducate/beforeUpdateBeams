import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import Ficon from 'react-native-fontawesome-pro';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ViewInputAnother = ({placeholder, dateText, dateFun, imgName}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={dateFun}
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 0.16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FDEB13',
          borderRadius: wp('10'),
        }}>
        {/* <FontAwesomeIcon
          icon={iconName}
          size={hp(3)}
          style={{color: iconColor}}
        /> */}
        <Image
          source={{uri: imgName}}
          style={{height: hp('3.5'), width: wp('7')}}
          resizeMode={'center'}
        />
      </View>

      <View
        style={{
          flex: 0.7,
          height: hp('7'),
          justifyContent: 'center',
          paddingLeft: wp(1),
        }}>
        <View>
          {dateText ? (
            <Text style={[styles.inpText, {marginTop: hp(3.5)}]}>
              {dateText}
            </Text>
          ) : (
            <Text
              style={[styles.inpText, {marginTop: hp(3.5), color: '#363636'}]}>
              {placeholder}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={dateFun}
        style={{
          flex: 0.14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ficon type="light" name="angles-up-down" color="#cdcdcd" size={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default ViewInputAnother;

const styles = EStyleSheet.create({
  zetext1: {
    fontSize: '0.72rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    color: '#343434',
    fontStyle: 'normal',
  },
  ztitle: {
    fontSize: hp(1.5),
    fontWeight: '600',
    marginTop: hp(1),
    fontFamily: fontFamily.ceraBlack,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
  },
  inpText: {
    fontSize: '0.7rem',
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('2'),
    color: '#363636',
    fontWait: '500',
    fontFamily: fontFamily.ceraMedium,
  },
});
