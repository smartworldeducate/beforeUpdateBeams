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

import LinearGradient from 'react-native-linear-gradient';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const InspireDeleteModal = ({
  modalVisible,
  onPressBtn1,
  onPressBtn2,
  textUpper,
  textLower,
  btnText1,
  btnText2,
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
          paddingHorizontal: wp('15'),
        }}>
        <View
          style={{
            flex: 0.35,
          }}></View>

        <View
          style={{
            flex: 0.3,
            borderRadius: wp('3'),

            backgroundColor: colors.whiteColor,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 0.81,

              flexDirection: 'column',
            }}>
            <View style={{flex: 0.27}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1C37A5', '#4D69DC']}
                style={{
                  flex: 1,
                  justifyContent: 'center',

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 24,

                  borderBottomRightRadius: wp('3'),
                  borderBottomLeftRadius: wp('3'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2.5'),
                    fontFamily: fontFamily.ceraMedium,
                    color: 'white',
                    fontWeight: '500',
                    paddingVertical: hp(1),
                    paddingLeft: wp('5'),
                  }}>
                  {textUpper}
                </Text>
              </LinearGradient>
            </View>

            <View style={{flex: 0.73}}>
              <Text
                style={{
                  fontSize: hp('1.75'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                  letterSpacing: 0.5,
                  paddingTop: hp('1.5'),
                  paddingHorizontal: wp('3'),
                }}>
                {textLower}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.17,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: wp('50'),
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressBtn1}
              style={{
                flex: 0.35,
                backgroundColor: '#1C37A4',
                borderRadius: wp('50'),
                height: hp('5'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp('1.9'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'white',
                }}>
                {btnText1}
              </Text>
            </TouchableOpacity>
            <View style={{flex: 0.1, backgroundColor: 'yellow'}}></View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressBtn2}
              style={{
                flex: 0.35,
                backgroundColor: '#EB4C35',
                borderRadius: wp('50'),
                height: hp('5'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp('1.9'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'white',
                }}>
                {btnText2}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 0.02}}></View>
        </View>

        <View
          style={{
            flex: 0.35,
          }}></View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({});
export default InspireDeleteModal;
