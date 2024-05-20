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

const MessageSuccessModal = ({
  modalVisible,
  onPressOpacity,
  textUpper,
  textLower,
  btnText,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
          paddingHorizontal: wp('12'),
        }}>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.35,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.3,
            borderRadius: wp('3'),

            backgroundColor: colors.whiteColor,
            flexDirection: 'column',
          }}>
          <View style={{flex: 0.85, paddingHorizontal: wp('4')}}>
            <Text
              style={{
                fontSize: hp('2.85'),
                fontFamily: fontFamily.ceraMedium,
                color: 'black',
                fontWeight: '500',
                paddingVertical: hp(1),
              }}>
              {textUpper}
            </Text>
            <Text
              style={{
                fontSize: hp('1.85'),
                fontFamily: fontFamily.ceraLight,
                color: 'black',
              }}>
              {textLower}
            </Text>
          </View>
          <View style={{flexDirection: 'row', flex: 0.15}}>
            <View style={{flex: 0.75}}></View>

            <TouchableOpacity
              onPress={onPressOpacity}
              activeOpacity={0.6}
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: hp('2.15'),
                  fontFamily: fontFamily.ceraMedium,
                  color: '#1C37A4',

                  paddingHorizontal: wp('5'),
                  paddingVertical: hp('1'),
                }}>
                {btnText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.35,
          }}></TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({});
export default MessageSuccessModal;
