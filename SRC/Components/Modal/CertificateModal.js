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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const CertificateModal = ({
  modalVisible,
  onPressOpacity,
  upperText,
  PrintText,
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
          // paddingHorizontal: wp('10'),
        }}>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.6,
          }}></TouchableOpacity>

        <View
          style={{
            flex: 0.4,
            borderRadius: wp('1'),
            backgroundColor: 'white',
            borderTopLeftRadius: wp('4'),
            borderTopRightRadius: wp('4'),
          }}>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flex: 0.8, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: hp('2'),
                  fontFamily: fontFamily.ceraBold,
                  color: 'black',
                  paddingLeft: wp('3'),
                }}>
                {upperText}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressOpacity}
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon
                icon="fat fa-xmark"
                size={hp(3.25)}
                style={{color: 'grey'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: hp('0.07'), backgroundColor: 'silver'}}></View>

          <View
            style={{
              flex: 0.75,
              marginHorizontal: wp('3'),
              marginTop: hp('3'),
              height: hp('10'),
              borderRadius: wp('0.5'),
              borderWidth: wp('0.07'),
              borderColor: 'silver',
            }}>
            <View
              style={{
                marginHorizontal: wp('3'),
                marginTop: hp('3'),
              }}>
              <Text
                style={{
                  fontSize: hp('2'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                }}>
                Financial Year
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                height: hp('6'),
                marginTop: hp('3'),
                marginHorizontal: wp('3'),
                borderRadius: wp('0.5'),
                borderWidth: wp('0.07'),
                borderColor: 'silver',
              }}>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.75'),
                    fontFamily: fontFamily.ceraMedium,
                    color: 'black',
                    paddingLeft: wp('3'),
                  }}>
                  Jul 2022-Jun 2023
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f5f5f5',
                  borderTopRightRadius: wp('0.5'),
                  borderBottomRightRadius: wp('0.5'),
                }}>
                <FontAwesomeIcon
                  icon="fat fa-chevron-down"
                  size={hp(2.5)}
                  style={{color: 'grey'}}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onPressOpacity}
              style={{
                marginTop: hp('3'),
                height: hp('5'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E7E7E7',
                borderRadius: wp('2'),
                marginHorizontal: wp('3'),
              }}>
              <Text
                style={{
                  fontSize: hp('1.75'),
                  fontFamily: fontFamily.ceraMedium,
                  color: '#1C37A4',
                  textDecorationLine: 'underline',
                  textDecorationColor: '#1C37A4',
                  letterSpacing: 0.5,
                }}>
                {PrintText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.3,
          }}></TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({});
export default CertificateModal;
