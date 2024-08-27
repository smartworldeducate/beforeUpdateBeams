import React, {useEffect, useState, useRef, useCallback} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import {useSelector} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';

import fontFamily from '../../Styles/fontFamily';
import fontSize from '../../Styles/fontSize';
import LinearGradient from 'react-native-linear-gradient';

import Swiper from 'react-native-swiper';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const HeaderTop = ({
  onPressUserImg,
  userImg,
  welcomeText,
  userName,
  onPressNotificationIcon,
  onPressIcon,
}) => {
  const navigation = useNavigation();
  const profileHere = useSelector(state => state.profileStore);

  const events = profileHere?.userData?.reporting_result?.events || [];

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={[styles.mainHeader]}>
        <View
          style={[
            styles.headerChild,
            {
              marginBottom:
                profileHere?.userSearchAccess == 1 ? hp('1.5') : hp('1.75'),
            },
          ]}>
          <TouchableOpacity
            onPress={onPressUserImg}
            activeOpacity={0.6}
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: hp(5),
              borderColor: 'white',
              borderWidth: wp('0.25'),
              width: wp(13),
              height: hp(7),
            }}>
            <Image
              style={{width: wp(13), height: hp(6.5), borderRadius: hp(5)}}
              source={{uri: userImg}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.02,
              flexDirection: 'column',
              marginLeft: wp('-3'),
            }}>
            <View style={{flex: 0.7}}></View>
            <View
              style={{
                backgroundColor:
                  profileHere?.userData?.profile_result?.CONFIRMATION_DATE ==
                    null ||
                  profileHere?.userData?.profile_result?.CONFIRMATION_DATE == ''
                    ? 'orange'
                    : '#10B727',
                flex: 0.2,
                borderRadius: wp('50'),
                height: hp('2'),
                width: wp('2.5'),
              }}></View>
            <View style={{flex: 0.1}}></View>
          </View>
          <View
            style={{
              flex: 0.48,
              justifyContent: 'center',
              paddingLeft: wp('3'),
            }}>
            <Text style={styles.welCome}>{welcomeText}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.userName}>
              {userName}
            </Text>
          </View>

          <View style={{flex: 0.07}}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressNotificationIcon}
            style={{
              flex: 0.14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon="fat fa-bell"
              size={hp(3.3)}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressIcon}
            style={{
              flex: 0.14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon="fat fa-bars-staggered"
              size={hp(3)}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
        </View>

        {profileHere?.userSearchAccess == 1 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Search')}
            style={{
              backgroundColor: '#fff',
              marginHorizontal: wp('5'),
              marginTop: hp('0.5'),
              borderRadius: hp(1.5),
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 4,
              flexDirection: 'row',
              height: hp('5.5'),
              marginBottom: hp('2.65'),
            }}>
            <View
              style={{
                flex: 0.85,
                borderTopLeftRadius: hp(1.5),
                borderBottomLeftRadius: hp(1.5),
                justifyContent: 'center',
                paddingLeft: wp('3'),
              }}>
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'grey',
                  fontFamily: fontFamily.ceraLight,
                  letterSpacing: 0.5,
                }}>
                Search Employee
              </Text>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopRightRadius: hp(1.5),
                borderBottomRightRadius: hp(1.5),
              }}>
              <FontAwesomeIcon
                icon="fat fa-magnifying-glass"
                size={hp(3)}
                style={{color: '#292D32'}}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {profileHere?.userData?.reporting_result?.events?.length > 1 ? (
          <View
            style={{
              marginHorizontal: wp('5'),
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('4'),
            }}>
            <Swiper
              style={{}}
              autoplay={
                profileHere?.userData?.reporting_result?.events?.length > 1
                  ? true
                  : false
              }
              loop={true}
              showsPagination={false}
              autoplayTimeout={3}
              showsButtons={false}
              horizontal={false}>
              {events?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <FontAwesomeIcon
                    icon={item?.first_icon}
                    size={hp(2)}
                    style={{color: item?.first_icon_color}}
                  />
                  <Text>{` `}</Text>
                  <Text key={index} style={styles.slideText}>
                    {item?.message}
                  </Text>
                  <Text>{` `}</Text>
                  <FontAwesomeIcon
                    icon={item?.last_icon}
                    size={hp(2)}
                    style={{color: item?.last_icon_color}}
                  />
                </View>
              ))}
            </Swiper>
          </View>
        ) : (
          <></>
        )}
      </LinearGradient>
    </>
  );
};

export default HeaderTop;

const styles = EStyleSheet.create({
  mainHeader: {
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
  },
  headerChild: {
    flexDirection: 'row',
    marginHorizontal: hp(2),
    marginTop: hp('1.5'),
  },
  textstyle: {
    color: '#fff',
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  botContainer: {
    backgroundColor: '#F0F3F4',
    marginTop: hp(2),
    flexDirection: 'row',
    marginHorizontal: hp(3.5),
  },
  zetext: {
    color: '#fff',
    fontSize: fontSize.small,
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },
  bootContText: {
    fontSize: '0.5rem',
    fontWeight: '900',
    fontFamily: fontFamily.ceraLight,
    paddingHorizontal: hp(3),
    color: '#979797',
  },
  bootContText2: {
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraLight,
    paddingHorizontal: hp(2),
    color: '#979797',
    textTransform: 'uppercase',
  },
  bootContText1: {
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    paddingHorizontal: hp(2),
    color: '#353535',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: '0.77rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    lineHeight: hp('2.5'),
    letterSpacing: 0.15,
  },

  welCome: {
    color: '#FFFFFF',
    fontSize: '0.56rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    paddingBottom: hp(0.2),
    letterSpacing: 1,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: '#292D32',
    fontSize: '0.7rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
  },
  firstRow: {
    flexDirection: 'row',
    paddingTop: hp(1),
  },
  homeSearch: {
    marginTop: hp(2.2),
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginHorizontal: hp(2.5),
    borderRadius: hp(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'red',
  },
  welcomTitle: {marginTop: hp(1), marginLeft: hp(-2)},
  imageList: {
    marginLeft: hp(-0.5),
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: hp(50),
  },
  homesearchView: {
    width: wp(45),
    height: hp(6),
    backgroundColor: '#58D68D ',
    borderRadius: hp(2),
    marginHorizontal: hp(1),
    backgroundColor: 'green',
  },
  firstRowView: {
    width: wp(12),
    height: hp(6),
    borderRadius: hp(2),
    marginVertical: hp(1),
    marginRight: hp(3),
  },
  userImage: {width: wp(12), height: hp(6), borderRadius: hp(1)},
  firstRowRightSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(0.6),
  },
  bell: {marginTop: hp(1), marginRight: hp(2)},
  menu: {marginTop: hp(1.3)},
  headerImageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3'),
  },
  imgStyle: {width: wp(10), height: hp(5), borderRadius: hp(50)},
  menustyle: {
    width: '1rem',
    height: '1rem',
  },
  searchicon: {marginTop: hp(1.5), marginRight: hp(2)},
  placeholderStyle: {
    fontSize: '0.575rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
  },
  overlyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  slideText: {
    color: '#FFFFFF',
    fontSize: '0.56rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
