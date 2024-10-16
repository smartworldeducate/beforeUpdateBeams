import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import RenderHtml from 'react-native-render-html';

const AttendanceTempModal = ({modalVisible, closeModal}) => {
  const {width} = useWindowDimensions();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
          paddingHorizontal: wp('15'),
        }}>
        <TouchableOpacity
          onPress={closeModal}
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
          <View
            style={{
              flex: 0.83,
              paddingHorizontal: wp('4'),

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: hp('2.5')}}>
              Coming soon
            </Text>

            <Text style={{color: 'black', fontSize: hp('1.65')}}>
              Our leave application feature is coming soon to simplify your
              time-off requests. Stay tuned for updates!
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={closeModal}
            style={{
              flex: 0.17,
              paddingHorizontal: wp('4'),
              backgroundColor: '#1C37A4',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: wp('3'),
              borderRadius: wp('50'),
              marginHorizontal: wp('5'),
              marginBottom: hp('1'),
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                paddingVertical: hp('0'),
                fontSize: hp('2'),
                fontWeight: '500',
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={closeModal}
          style={{
            flex: 0.35,
          }}></TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(9),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
  },

  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    letterSpacing: 0.35,
  },

  topText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.75rem',
    letterSpacing: 1,
  },
  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.69rem',
    letterSpacing: 0.25,
    lineHeight: hp('2.5'),
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});

const tagsStyles = {
  // html,
  body: {
    fontSize: hp('1.65'),
    color: '#343434',
    letterSpacing: 0.65,
    fontFamily: fontFamily.ceraLight,
    whiteSpace: 'normal',

    padding: 0,
    margin: 0,
  },
};

export default AttendanceTempModal;
