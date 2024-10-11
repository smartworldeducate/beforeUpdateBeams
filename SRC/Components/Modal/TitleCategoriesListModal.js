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

const TitleCategoriesListModal = ({
  modalVisible,
  onPressOpacity,
  text,
  leaveTypesData,
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
            flex: 0.3,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.7,
            borderTopLeftRadius: wp('7'),
            borderTopRightRadius: wp('7'),
            paddingHorizontal: wp('4'),
            backgroundColor: colors.whiteColor,
          }}>
          <View style={{margin: hp(2)}}>
            <Text
              style={{
                fontSize: hp('2.85'),
                fontFamily: fontFamily.ceraMedium,
                color: 'black',
                fontWeight: '500',
                paddingVertical: hp(1),
              }}>
              {text}
            </Text>
          </View>

          <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
              data={leaveTypesData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{marginHorizontal: hp('2')}}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({});
export default TitleCategoriesListModal;
