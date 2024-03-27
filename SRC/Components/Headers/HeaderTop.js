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
import colors from '../../Styles/colors';
import Card from '../Card';
import fontFamily from '../../Styles/fontFamily';
import fontSize from '../../Styles/fontSize';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderTop = ({
  onPressAllReportiess,
  onPressReporteesProfile,
  onPressUserImg,
  userImg,
  welcomeText,
  userName,
  onPressIcon,
}) => {
  const navigation = useNavigation();

  const profileHere = useSelector(state => state.profileStore);
  // console.log('logInHTop>', profileHere?.userData);

  const slicedData = profileHere?.userData?.reporting_result?.data.slice(0, 7);

  // console.log('slicedData', profileHere?.userData?.reporting_result);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={index === 6 ? onPressAllReportiess : onPressReporteesProfile}
        activeOpacity={0.6}
        style={{
          paddingLeft: index == 0 ? wp('2') : wp('0'),
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item?.EMP_PHOTO}}
          style={{
            height: hp('4.5'),
            width: wp('9'),
            borderRadius: wp('10'),
            marginLeft: wp('-1.5'),
            backgroundColor: index === 3 && 'rgba(0,0,0,0.5)',
          }}
          resizeMode={'cover'}
        />

        {index === 6 && (
          <View
            style={{
              position: 'absolute',
              // top: '0%',
              left: '-20%',
              // transform: [{translateX: wp('-2.8')}, {translateY: hp('-1.4')}],
              backgroundColor: 'rgba(0,0,0,0.5)',
              // backgroundColor: 'red',
              borderRadius: wp('10'),
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('4.5'),
              width: wp('9'),
            }}>
            <Icon type="regular" name="plus" size={hp('2')} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={[
          styles.mainHeader,
          {
            height:
              profileHere?.userData?.reporting_result?.reportee_length > 0
                ? hp('23')
                : hp('20'),
          },
        ]}>
        <View style={styles.headerChild}>
          <TouchableOpacity
            onPress={onPressUserImg}
            activeOpacity={0.6}
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: wp(12), height: hp(6), borderRadius: hp(5)}}
              source={{uri: userImg}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.55,
              justifyContent: 'center',
            }}>
            <Text style={styles.welCome}>{welcomeText}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.userName}>
              {userName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleNavigate('Notification')}
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="light" name="bell" size={hp(3)} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressIcon}
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.menustyle}
              source={{uri: 'menuicon'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Search')}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: wp('5'),
            marginTop: hp('2.2'),
            borderRadius: hp(1.5),
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
            flexDirection: 'row',
            height: hp('5'),
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
            <Icon
              type="light"
              name="magnifying-glass"
              size={hp(3)}
              color="#292D32"
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: wp('10'),
            marginTop: hp('2'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={slicedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default HeaderTop;

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(27),
    borderBottomRightRadius: hp(5),
    borderBottomLeftRadius: hp(5),
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
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    lineHeight: hp('2.15'),
  },

  welCome: {
    color: '#fff',
    fontSize: '0.575rem',
    fontWeight: '300',
    marginTop: hp(0.5),
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
});
