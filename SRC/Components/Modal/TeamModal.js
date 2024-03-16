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

const TeamModal = ({
  modalVisible,
  onPressOpacity,
  onPressMainReportee,
  empName,
  myData,
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
            flex: 0.25,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.5,
            marginHorizontal: wp('8'),
            borderRadius: wp('1'),
            paddingHorizontal: wp('4'),
            backgroundColor: colors.whiteColor,
          }}>
          <TouchableOpacity
            onPress={onPressMainReportee}
            style={{
              paddingTop: hp('2.5'),
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'salman'}}
                style={{
                  height: hp('4.5'),
                  width: wp('9'),
                  borderRadius: wp('5'),
                }}
                resizeMode={'cover'}
              />
            </View>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeName}>
                {empName}
              </Text>
            </View>
          </TouchableOpacity>
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1')}
          />
          <FlatList
            data={myData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={{marginVertical: hp('1.5')}}
          />
        </View>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{
            flex: 0.25,
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
export default TeamModal;
