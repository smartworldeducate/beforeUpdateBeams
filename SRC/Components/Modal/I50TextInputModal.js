import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import Icon from 'react-native-fontawesome-pro';

const I50TextInputModal = ({
  onPress,
  textValue,
  iconName,
  iconColor,
  iconSize,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginVertical: hp('1'),
        height: hp('7'),
        // width: wp('85'),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(50),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.58,
        shadowRadius: 10,
        elevation: 5,
      }}>
      <View
        style={{
          flex: 0.85,
          justifyContent: 'center',
          paddingLeft: wp('5'),
        }}>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={{
            fontSize: hp('1.85'),
            // fontFamily: fontFamily.ceraMedium,
            fontWeight: '500',
            color: '#363636',
          }}>
          {textValue}
        </Text>
      </View>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon type="light" name={iconName} color={iconColor} size={iconSize} />
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({});
export default I50TextInputModal;
