import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import RenderHtml from 'react-native-render-html';

const MessageModal = ({
  modalVisible,
  onPressOpacity,
  userImg,
  empName,
  messageDate,
  title,
  htmlDescription,
  thumbsUpIcon,
  onPressThumbUpIcon,
}) => {
  const {width} = useWindowDimensions();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPressOpacity}>
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
              height: hp(7),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.topText}>Message</Text>
            </View>
            <View style={{flex: 0.5}}></View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressOpacity}
                style={{
                  justifyContent: 'center',
                  marginTop: hp(0),
                  // backgroundColor: 'red',
                  padding: hp('1.25'),
                }}>
                <Icon type="light" name="xmark" size={hp(3)} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={{marginHorizontal: wp('5')}}>
          <View
            style={{
              marginTop: hp('2.5'),
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: userImg}}
                style={{
                  height: hp('5'),
                  width: wp('10'),
                  borderRadius: wp('50'),
                }}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{
                flex: 0.85,
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {empName}
              </Text>
              <Text style={styles.messageCardDate}>{messageDate}</Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: wp('2'),
              marginTop: hp('3'),
            }}>
            <Text
              style={{
                fontSize: hp('2'),
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '500',
                color: '#1C37A4',
                paddingBottom: hp('1'),
              }}>
              {title}
            </Text>

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: colors.appBackGroundColor,
              }}>
              <View
                style={{
                  marginTop: hp('0'),
                  marginHorizontal: wp('0.5'),
                  marginBottom: hp('25'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2'),
                    fontFamily: fontFamily.ceraMedium,
                    fontWeight: '500',
                    color: '#1C37A4',
                    paddingBottom: hp('1'),
                  }}>
                  {htmlDescription}
                </Text>
                {/* <RenderHtml
                  contentWidth={width}
                  source={{
                    html: htmlDescription
                      ? '<p>' + htmlDescription + '</p>'
                      : '',
                  }}
                  tagsStyles={tagsStyles}
                /> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.75}}></View>
        <TouchableOpacity
          onPress={onPressThumbUpIcon}
          style={{
            flex: 0.25,
            paddingVertical: hp('1.25'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            type={thumbsUpIcon}
            name="thumbs-up"
            color="#1C37A4"
            size={hp(4)}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(7),
    justifyContent: 'center',
  },
  topText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.75rem',
    letterSpacing: 1,
  },
  messageCardEmpName: {
    color: '#6A6A6A',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});

const tagsStyles = {
  p: {
    fontSize: hp('1.65'),
    color: '#353535',
    letterSpacing: 0.5,
    color: '#343434',
  },
};
export default MessageModal;
