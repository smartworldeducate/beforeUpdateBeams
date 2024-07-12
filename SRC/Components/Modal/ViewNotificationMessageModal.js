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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import RenderHtml from 'react-native-render-html';

const ViewNotificationMessageModal = ({
  modalVisible,
  closeModal,
  headTitleText,
  htmlSource,
  renderers,
}) => {
  const {width} = useWindowDimensions();

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
          paddingHorizontal: wp('10'),
        }}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            flex: 0.3,
          }}></TouchableOpacity>

        <View
          style={{
            flex: 0.4,
            backgroundColor: colors.whiteColor,
            flexDirection: 'column',
            borderRadius: wp('3'),
          }}>
          <View style={{flex: 0.15}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#1C37A4',
                borderTopLeftRadius: wp('3'),
                borderTopRightRadius: wp('3'),
              }}>
              <View style={{flex: 0.15}}></View>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: fontFamily.ceraMedium,
                    fontSize: hp('2'),
                    letterSpacing: 0.25,
                    paddingVertical: hp('1.35'),
                  }}>
                  {headTitleText}
                </Text>
              </View>
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon="fat fa-xmark"
                  size={hp(2.75)}
                  style={{color: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 0.85, paddingHorizontal: wp('1')}}>
            <ScrollView>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  flexGrow: 1,
                }}>
                <View style={{marginHorizontal: wp('1')}}>
                  <RenderHtml
                    contentWidth={width}
                    source={{
                      html: htmlSource || '<p></p>',
                    }}
                    tagsStyles={tagsStyles}
                    renderers={renderers}
                    ignoredDomTags={["wb'<", 'customTag', 'center']}
                  />
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity
          onPress={closeModal}
          style={{
            flex: 0.3,
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

export default ViewNotificationMessageModal;
