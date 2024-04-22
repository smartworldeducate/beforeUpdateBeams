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
import LineSeprator from '../LineSeprator/LineSeprator';
import MainHeader from '../Headers/MainHeader';
import RenderHtml from 'react-native-render-html';

const ViewMessageDetailModal = ({
  modalVisible,
  closeModal,
  msgSubject,
  empPhoto,
  empName,
  msgDate,
  headTitleText,
  htmlSource,
  activeOpacityLikeIcon,
  onPressLikeIcon,
  inconType,
}) => {
  const {width} = useWindowDimensions();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackGroundColor,
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1C37A5', '#4D69DC']}
          style={styles.mainHeader}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(2.5),
              height: hp('5'),
              marginHorizontal: wp('2'),
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name={'arrow-left'}
                size={hp(2.5)}
                color="#fff"
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textstyle}>{headTitleText}</Text>
            </View>
            <View style={{flex: 0.15}}></View>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('6'),
              marginTop: hp('5'),
            }}>
            <View
              style={{
                flex: 0.85,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                letterSpacing={'tail'}
                style={[styles.messageCardEmpName, {fontSize: hp('2.5')}]}>
                {msgSubject}
              </Text>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Icon type="solid" name="star" size={hp('3')} color="#41CE68" /> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('6'),
              marginTop: hp('3'),
            }}>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: empPhoto}}
                style={{
                  height: hp('6'),
                  width: wp('12'),
                  borderRadius: wp('50'),
                }}
                resizeMode={'contain'}
              />
            </View>

            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                marginLeft: wp('2'),
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {empName}
              </Text>
              <Text style={styles.messageCardDate}>{msgDate}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={activeOpacityLikeIcon}
              onPress={onPressLikeIcon}
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type={inconType}
                name="thumbs-up"
                color="#1C37A4"
                size={hp(3.5)}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal: wp('6')}}>
            {/* {messageDetailHere.isLoading && <Loader></Loader>} */}

            <View style={{paddingBottom: hp('2')}}>
              <RenderHtml
                contentWidth={width}
                source={{
                  html: htmlSource || '<p></p>',
                }}
                tagsStyles={tagsStyles}
                ignoredDomTags={["wb'<", 'customTag', 'center']}
              />
            </View>
          </View>
        </ScrollView>
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
export default ViewMessageDetailModal;
