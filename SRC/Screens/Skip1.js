import React, {useRef, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import LottieView from 'lottie-react-native';
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import fontFamily from '../Styles/fontFamily';
import Ficon from 'react-native-fontawesome-pro';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Skip1 = () => {
  const swiperRef = useRef(null);

  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const [isSkip, setIsSkip] = useState('skipped');

  const onPressLogin = () => {
    AsyncStorage.setItem('skipStartupScreen', isSkip);
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={colors.loginIconColor} />
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dotColor={'#D9D9D9'}
        activeDotColor={'#061D7A'}
        ref={swiperRef}>
        <View style={styles.slide1}>
          <ImageBackground
            source={{uri: 'appbg'}}
            style={{flex: 1}}
            resizeMode={'cover'}>
            <View
              style={{
                width: wp(100),
                flexDirection: 'row',
                marginTop: hp(5),
              }}>
              <View style={{width: wp(80)}}></View>
              <TouchableOpacity
                style={{flex: 20}}
                activeOpacity={0.4}
                onPress={onPressLogin}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: hp('1'),
                    marginTop: hp('2'),
                    marginRight: wp('2'),
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        color: 'black',
                        justifyContent: 'center',
                      }}>
                      SKIP
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Ficon
                      type="light"
                      name="angles-right"
                      color="#000"
                      size={18}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{width: wp(100), marginTop: hp(8)}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: hp(5),
                }}>
                <Text style={styles.welcomeTextSkip}>
                  Welcome to
                  <Text style={styles.welcomeText2}> BEAMS!</Text>
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{
                    width: wp(80),
                    height: hp(40),
                  }}
                  source={require('../assets/animation_lm0fv0a2.json')}
                  autoPlay
                />
              </View>
              <View
                style={{
                  marginTop: hp(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('10'),
                }}>
                <Text style={[styles.textSkip, {textAlign: 'center'}]}>
                  We're so excited to have you on board.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.slide2}>
          <ImageBackground
            source={{uri: 'appbg'}}
            style={{flex: 1}}
            resizeMode={'cover'}>
            <View
              style={{
                width: wp(100),
                flexDirection: 'row',
                marginTop: hp(5),
              }}>
              <View style={{width: wp(80)}}></View>
              <TouchableOpacity
                style={{flex: 20}}
                activeOpacity={0.4}
                onPress={onPressLogin}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: hp('1'),
                    marginTop: hp('2'),
                    marginRight: wp('2'),
                  }}>
                  <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        color: 'black',
                        justifyContent: 'center',
                      }}>
                      SKIP
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Ficon
                      type="light"
                      name="angles-right"
                      color="#000"
                      size={18}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: wp(100), marginTop: hp(8)}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: hp(5),
                }}>
                <Text style={styles.welcomeTextSkip}>
                  We
                  <Text style={styles.welcomeText2}> Redesigned!</Text>
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{
                    width: wp(80),
                    height: hp(40),
                  }}
                  source={require('../assets/animation_lm0h8lv3.json')}
                  autoPlay
                />
              </View>
              <View
                style={{
                  marginTop: hp(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('10'),
                }}>
                <Text style={[styles.textSkip, {textAlign: 'center'}]}>
                  The app to add new features that our users have been
                  requesting
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.slide3}>
          <ImageBackground
            source={{uri: 'appbg'}}
            style={{flex: 1}}
            resizeMode={'cover'}>
            <View
              style={{
                width: wp(100),
                flexDirection: 'row',
                marginTop: hp(5),
              }}>
              <View style={{width: wp(80)}}></View>
              <TouchableOpacity
                style={{flex: 20}}
                activeOpacity={0.4}
                onPress={onPressLogin}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: hp('1'),
                    marginTop: hp('2'),
                    marginRight: wp('2'),
                  }}>
                  <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        color: 'black',
                        justifyContent: 'center',
                      }}>
                      SKIP
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Ficon
                      type="light"
                      name="angles-right"
                      color="#000"
                      size={18}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: wp(100), marginTop: hp(8)}}>
              <View
                style={{
                  marginLeft: hp(16),
                  width: wp(100),
                  marginBottom: hp(5),
                }}>
                <Text style={styles.welcomeTextSkip}>
                  Explore
                  <Text style={styles.welcomeText2}> the app!</Text>
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{
                    width: wp(80),
                    height: hp(40),
                  }}
                  source={require('../assets/animation_lm0hbmk9.json')}
                  autoPlay
                />
              </View>
              <View
                style={{
                  marginTop: hp(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('10'),
                }}>
                <Text style={[styles.textSkip, {textAlign: 'center'}]}>
                  Take some time to explore the app and learn how it works.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextSkip: {
    color: '#626161',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
  },
  welcomeText2: {
    color: '#061D7A',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    marginLeft: hp(1),
  },
  textSkip: {
    color: '#626161',
    fontSize: '0.7rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
  },
  skipbText: {
    color: '#061D7A',
    fontSize: '0.7rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    marginLeft: hp(1),
  },
});

export default Skip1;
