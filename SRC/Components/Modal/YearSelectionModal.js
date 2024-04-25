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

const YearSelectionModal = ({
  modalVisible,
  onPressOpacity,
  yaersListData,
  renderItem,
  keyExtractor,
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
            flex: 0.35,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.3,
            marginHorizontal: wp('8'),
            borderRadius: wp('1'),
            paddingHorizontal: wp('4'),
            backgroundColor: colors.whiteColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: hp('2.75'),
              fontFamily: fontFamily.ceraMedium,
              color: 'black',
              fontWeight: '500',
              paddingVertical: hp(1),
            }}>
            Select Year
          </Text>

          <View
            style={{
              flex: 1,
            }}>
            <FlatList
              data={yaersListData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
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
export default YearSelectionModal;
