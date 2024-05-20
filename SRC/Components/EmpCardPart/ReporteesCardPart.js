import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';
import Check from 'react-native-vector-icons/AntDesign';

const ReporteesCardPart = ({
  statusValue,
  firstText,
  secondText,
  thirdText,
  serviceLengthValue,
  ageValue,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 0.831, flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={{uri: 'total'}}
            style={{height: hp('3'), width: wp('6')}}
            resizeMode={'contain'}
          />
          {/* <Icon type="light" name="circle-check" size={hp(3)} color="green" /> */}
        </View>
        <View style={{flex: 0.7, paddingLeft: wp('1')}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.firstText}>
            {statusValue}
          </Text>
          <Text style={styles.secondText}>{firstText}</Text>
        </View>
      </View>
      <View style={{flex: 0.0563}}></View>

      <View style={{flex: 0.831, flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={{uri: 'present'}}
            style={{height: hp('3'), width: wp('6')}}
            resizeMode={'contain'}
          />
          {/* <Icon type="light" name="wrench" size={hp(3)} color="green" /> */}
        </View>
        <View style={{flex: 0.7, paddingLeft: wp('1')}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.firstText}>
            {serviceLengthValue}
          </Text>
          <Text style={styles.secondText}>{secondText}</Text>
        </View>
      </View>
      <View style={{flex: 0.0563}}></View>
      <View style={{flex: 0.831, flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={{uri: 'absent'}}
            style={{height: hp('3'), width: wp('6')}}
            resizeMode={'contain'}
          />
          {/* <Check name="checkcircleo" size={hp(3)} color="#CD6155" /> */}
        </View>
        <View style={{flex: 0.7, paddingLeft: wp('1')}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.firstText}>
            {ageValue}
          </Text>
          <Text style={styles.secondText}>{thirdText}</Text>
        </View>
      </View>
      <View style={{flex: 0.0587}}></View>
    </View>
  );
};

const styles = EStyleSheet.create({
  firstText: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraBold,
    color: '#353535',
    fontWeight: '700',
  },
  secondText: {
    fontSize: '0.45rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#979797',
    fontWeight: '500',
  },
});

export default ReporteesCardPart;
