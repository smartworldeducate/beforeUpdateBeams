import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import MainHeader from '../../Components/Headers/MainHeader';
import moment from 'moment';
import Swiper from 'react-native-swiper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const ChallengeListOpen = ({route}) => {
  console.log('route', route?.params?.sendingItemParam);
  const navigation = useNavigation();

  const inspireTrainingsHere = useSelector(
    state => state.InspireTrainingsStore,
  );

  return (
    <>
      <MainHeader
        text={'Impact 20M'}
        iconName={'arrow-left'}
        onpressBtn={() => navigation.goBack()}
      />

      <>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: wp('5'),
          }}>
          <View style={styles.infoMainView}>
            <Swiper
              // loop={true}
              autoplay
              style={styles.wrapper}
              showsPagination={true}
              paginationStyle={styles.paginationDotStyle}
              dotColor={'grey'}
              dotStyle={{height: hp('1'), width: hp('1')}}
              activeDotColor={'black'}
              activeDotStyle={{height: hp('1'), width: hp('1')}}
              showsButtons={false}
              scrollEnabled={true}>
              {route?.params?.sendingItemParam?.training_files?.map(
                (item, index) => (
                  <View
                    style={{
                      borderRadius: wp('3'),
                      paddingHorizontal: wp('1'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp('3'),
                      borderWidth: wp('0.15'),
                      borderColor: 'silver',
                      paddingVertical: hp('0'),
                      height: hp('35'),
                    }}
                    key={index}>
                    <Image
                      source={{
                        uri: item?.file_path,
                      }}
                      style={{
                        height: hp('34.8'),
                        width: wp('89.5'),
                        borderRadius: wp('3'),
                      }}
                      resizeMode="cover"
                    />
                  </View>
                ),
              )}
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
              {route?.params?.sendingItemParam?.category_title}
            </Text>

            <Text
              style={{
                color: '#363636',
                fontSize: hp('2.5'),
                fontWeight: '700',
                fontFamily: fontFamily.ceraBold,
                paddingVertical: hp('1'),
              }}>
              {route?.params?.sendingItemParam?.training_title}
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
                <FontAwesomeIcon
                  icon="far fa-calendar-check"
                  size={hp(2.5)}
                  style={{color: '#1C37A4'}}
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
                  {moment(
                    route?.params?.sendingItemParam?.training_date,
                    'DD-MMM-YY',
                  ).format('DD MMM, YYYY')}
                </Text>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: hp('1.75'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {route?.params?.sendingItemParam?.training_duration == 1
                    ? `${route?.params?.sendingItemParam?.training_duration} hour`
                    : `${route?.params?.sendingItemParam?.training_duration} hours`}
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
                <FontAwesomeIcon
                  icon="fas fa-location-dot"
                  size={hp(2.25)}
                  style={{color: '#1C37A4'}}
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
                  {route?.params?.sendingItemParam?.school_name}
                </Text>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: hp('1.75'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {route?.params?.sendingItemParam?.city_name}
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
              colors={['#29D09F', '#7AE6E4']}
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
                    fontFamily: fontFamily.ceraMedium,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  }}>
                  {`Teacher\nImpacted`}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('2.75'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {
                    inspireTrainingsHere?.userData?.training_hours
                      ?.teachers_impacted
                  }
                </Text>
              </View>
            </LinearGradient>

            <View style={{flex: 0.1, backgroundColor: 'white'}}></View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF5255', '#FFA9AA']}
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
                    fontFamily: fontFamily.ceraMedium,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  }}>
                  {`Student\nImpacted`}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('2.75'),
                    fontFamily: fontFamily.ceraBold,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  {
                    inspireTrainingsHere?.userData?.training_hours
                      ?.students_impacted
                  }
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </>
    </>
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
    paddingVertical: hp('0'),
  },

  wrapper: {},

  paginationDotStyle: {
    bottom: hp('-2'),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});

export default ChallengeListOpen;
