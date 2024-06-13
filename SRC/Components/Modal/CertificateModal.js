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
  yearValue,
  onPressYearDropdown,
  upperText,
  PrintText,
  isYearSelected,
  data,
  renderItem,
  keyExtractor,
  styleFlatlist,
  onPressPrint,
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
        }}>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.45,
          }}></TouchableOpacity>

        <View
          style={{
            flex: 0.55,
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
              marginTop: hp('2'),
              height: hp('10'),
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
                  color: 'grey',
                }}>
                {
                  'Select the financial year to download your provident fund certificate.'
                }
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressYearDropdown}
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
                  flex: 0.85,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.65'),
                    fontFamily: fontFamily.ceraMedium,
                    color: 'grey',
                    paddingLeft: wp('3'),
                  }}>
                  {yearValue}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#E7E7E7',
                  borderTopRightRadius: wp('0.5'),
                  borderBottomRightRadius: wp('0.5'),
                }}>
                <FontAwesomeIcon
                  icon={isYearSelected ? 'fat fa-xmark' : 'fat fa-chevron-down'}
                  size={hp(2.5)}
                  style={{color: 'grey'}}
                />
              </View>
            </TouchableOpacity>

            {isYearSelected && (
              <View
                style={{
                  marginHorizontal: wp('3'),
                  borderColor: 'silver',
                  borderWidth: wp('0.07'),
                  // marginBottom: hp('15'),
                  flex: 1,
                }}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  style={styleFlatlist}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={onPressPrint}
              style={{
                flex: 1,
                // backgroundColor: 'red',
                marginBottom: hp('1'),
              }}>
              <View
                style={{
                  backgroundColor: '#E7E7E7',
                  borderRadius: wp('2'),
                  marginHorizontal: wp('3'),
                  height: hp('5'),
                  width: wp('85'),
                  justifyContent: 'center',
                  alignItems: 'center',

                  marginTop: isYearSelected ? hp('1') : hp('4'),
                }}>
                <Text
                  style={{
                    fontSize: hp('1.85'),
                    fontFamily: fontFamily.ceraMedium,
                    color: '#1C37A4',
                    letterSpacing: 0.5,
                  }}>
                  {PrintText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({});
export default CertificateModal;
