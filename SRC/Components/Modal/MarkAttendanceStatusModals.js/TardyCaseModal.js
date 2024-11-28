import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../Styles/colors';
import fontFamily from '../../../Styles/fontFamily';

const TardyCaseModal = ({modalVisible, onPressOpacity, onPressSave}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPressOpacity}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
        }}>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.6,
          }}></TouchableOpacity>

        <View
          style={{
            flex: 0.4,
            borderRadius: wp('3'),
            backgroundColor: colors.whiteColor,
            flexDirection: 'column',
            borderTopLeftRadius: wp('5'),
            borderTopRightRadius: wp('5'),
            paddingHorizontal: wp('4'),
          }}>
          <View style={{flex: 2}}></View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: hp('6'),
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressOpacity}
                style={{
                  flex: 0.3,
                  backgroundColor: '#C9C9C9',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('3'),
                }}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                  CLOSE
                </Text>
              </TouchableOpacity>
              <View style={{flex: 0.4}}></View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flex: 0.3,
                  backgroundColor: selectedStatus != null ? '#1C37A4' : 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('3'),
                }}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  linearGradiantStyle: {
    flex: 0.153,
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  linearGradiantText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
  },
  boxTextView: {
    flex: 0.15,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 9,
    color: '#66656A',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
    lineHeight: 11,
  },
});
export default TardyCaseModal;
