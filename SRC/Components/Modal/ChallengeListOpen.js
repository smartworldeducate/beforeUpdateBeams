import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import Swiper from 'react-native-swiper';

const ChallengeListOpen = ({
  modalVisible,
  onpressBtn,
  textHeader,

  imagesListData,
  renderItem,
  keyExtractor,

  text1,
  text2,
  date,
  dayTime,
  campus,
  city,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1C37A5', '#4D69DC']}
          style={styles.mainHeader}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('2'),

              justifyContent: 'center',
              alignItems: 'center',
              height: hp(7),
            }}>
            <TouchableOpacity
              onPress={onpressBtn}
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
              <Text style={styles.textstyle}>{textHeader}</Text>
            </View>
            <View style={{flex: 0.15}}></View>
          </View>
        </LinearGradient>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: wp('5'),
          }}>
          <View style={styles.infoMainView}>
            <Swiper
              //   loop={true}
              style={styles.wrapper}
              showsPagination={true}
              paginationStyle={styles.paginationDotStyle}
              dotColor={'#eeeee4'}
              dotStyle={{height: hp('1'), width: hp('1')}}
              activeDotColor={'black'}
              activeDotStyle={{height: hp('1'), width: hp('1')}}
              showsButtons={false}
              scrollEnabled={true}>
              {imagesListData?.map((item, index) => (
                <View
                  style={{
                    borderRadius: wp('3'),
                    paddingHorizontal: wp('1'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <Image
                    source={{
                      uri: item?.imageUrl,
                    }}
                    style={{
                      height: hp('35'),
                      width: wp('89.5'),
                      borderRadius: wp('3'),
                    }}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </Swiper>
          </View>

          <View style={{marginTop: hp('3')}}>
            <Text
              style={{
                color: '#363636',
                fontSize: hp('1.85'),
                fontWeight: '500',
                fontFamily: fontFamily.ceraMedium,
              }}>
              {text1}
            </Text>

            <Text
              style={{
                color: '#363636',
                fontSize: hp('2.5'),
                fontWeight: '700',
                fontFamily: fontFamily.ceraBold,
                paddingVertical: hp('1'),
              }}>
              {text2}
            </Text>

            <View style={{flexDirection: 'row', marginTop: hp('2')}}>
              <View
                style={{
                  flex: 0.15,
                  backgroundColor: '#5265FF1A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: hp('2.15'),
                  borderRadius: wp('50'),
                }}>
                <Icon
                  type="light"
                  name={'calendar-check'}
                  size={hp(2.5)}
                  color="#1C37A4"
                />
              </View>

              <View
                style={{
                  flex: 0.85,
                  marginLeft: wp('2'),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#09101D',
                    fontSize: hp('2'),
                    fontWeight: '700',
                    fontFamily: fontFamily.ceraBold,
                  }}>
                  {date}
                </Text>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: hp('1.75'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {dayTime}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: hp('2')}}>
              <View
                style={{
                  flex: 0.15,
                  backgroundColor: '#5265FF1A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: hp('2.15'),
                  borderRadius: wp('50'),
                }}>
                <Icon
                  type="light"
                  name={'location-dot'}
                  size={hp(2.5)}
                  color="#1C37A4"
                />
              </View>

              <View
                style={{
                  flex: 0.85,
                  marginLeft: wp('2'),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#09101D',
                    fontSize: hp('2'),
                    fontWeight: '700',
                    fontFamily: fontFamily.ceraBold,
                  }}>
                  {campus}
                </Text>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: hp('1.75'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {city}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('1'),
              marginTop: hp('3'),
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#7AE6E4', '#29D09F']}
              style={{
                flex: 0.45,
                flexDirection: 'row',
                backgroundColor: 'pink',
                justifyContent: 'center',
                height: hp('7.75'),
                borderRadius: wp('1.5'),
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('2'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {`Teacher\nImpacted`}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('3.25'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {`7`}
                </Text>
              </View>
            </LinearGradient>

            <View style={{flex: 0.1, backgroundColor: 'white'}}></View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFA9AA', '#FF5255']}
              style={{
                flex: 0.45,
                flexDirection: 'row',
                backgroundColor: 'pink',
                justifyContent: 'center',
                height: hp('7.75'),
                borderRadius: wp('1.5'),
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('2'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {`Student\nImpacted`}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('3.25'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {`70`}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(8),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
    justifyContent: 'center',
  },
  headerChild: {
    marginTop: hp(6),
    flexDirection: 'row',
    width: wp(90),
    justifyContent: 'space-between',
    marginHorizontal: hp(2.5),
  },
  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.8rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    letterSpacing: 0.35,
  },

  infoMainView: {
    marginTop: hp('3'),
    height: hp('35'),
  },

  wrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  paginationDotStyle: {
    bottom: hp('-2'),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});
export default ChallengeListOpen;
