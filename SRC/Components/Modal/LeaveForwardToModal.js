import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import LineSeprator from '../LineSeprator/LineSeprator';

const LeaveForwardToModal = ({
  modalVisible,
  onPressOpacity,
  leaveTypesData,
  renderItem,
  keyExtractor,
  topText,
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
            flex: 0.7,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.3,
            borderTopLeftRadius: wp('7'),
            borderTopRightRadius: wp('7'),
            paddingHorizontal: wp('4'),
            backgroundColor: colors.whiteColor,
          }}>
          <View style={{margin: hp(2)}}>
            <Text
              style={{
                fontSize: hp('2.75'),
                fontFamily: fontFamily.ceraMedium,
                color: 'black',
                fontWeight: '500',
                paddingVertical: hp(1),
              }}>
              {topText}
            </Text>
          </View>

          <View style={{}}>
            <FlatList
              data={leaveTypesData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{marginHorizontal: hp('2')}}
              ListEmptyComponent={
                <View
                  style={{
                    marginHorizontal: wp('4'),
                    marginVertical: hp('0.5'),
                  }}>
                  <Text style={{color: 'black', fontSize: hp('1.25')}}>
                    If your line manager name is not listed here please consult
                    HR department.
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  text: {
    fontSize: '0.75rem',
    fontFamily: fontFamily.ceraMedium,
    color: 'black',
    fontWeight: '500',
  },
  reporteeName: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#343434',
  },
});
export default LeaveForwardToModal;
