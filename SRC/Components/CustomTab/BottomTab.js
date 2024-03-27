import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';

import fontFamily from '../../Styles/fontFamily';

const BottomTab = ({state, descriptors, navigation, props}) => {
  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <View key={index} style={styles.innerMainView}>
                {index === 0 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <View
                      style={{
                        height: hp('5'),
                        justifyContent: 'center',
                        paddingTop: hp('0.5'),
                      }}>
                      <Menu
                        name="home"
                        size={hp(3)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                        style={{}}
                      />
                    </View>

                    {isFocused && (
                      <View style={{height: hp('1.5')}}>
                        <Ficon
                          type="solid"
                          name="circle"
                          size={hp(1)}
                          color={'#1C37A4'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : index === 1 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <View
                      style={{
                        height: hp('5'),
                        justifyContent: 'center',
                        paddingTop: hp('0.5'),
                      }}>
                      <Ficon
                        type="light"
                        name="book-bookmark"
                        size={hp(3)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>
                    {isFocused && (
                      <View style={{height: hp('1.5')}}>
                        <Ficon
                          type="solid"
                          name="circle"
                          size={hp(1)}
                          color={'#1C37A4'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : index === 2 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={[
                      styles.touchableIcon,
                      {
                        backgroundColor: isFocused ? '#1C37A4' : 'black',
                        borderRadius: wp('8'),
                        paddingHorizontal: wp('3'),
                      },
                    ]}>
                    <Ficon
                      type="light"
                      name="qrcode"
                      size={hp(2.25)}
                      color={isFocused ? 'white' : 'white'}
                    />
                    {/* {isFocused && (
                      <Ficon
                        type="solid"
                        name="circle"
                        size={hp(1)}
                        color={'#1C37A4'}
                      />
                    )} */}
                  </TouchableOpacity>
                ) : index === 3 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <View
                      style={{
                        height: hp('5'),
                        justifyContent: 'center',
                        paddingTop: hp('0.5'),
                      }}>
                      <Ficon
                        type="light"
                        name="calendar-days"
                        size={hp(3)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>
                    {isFocused && (
                      <View style={{height: hp('1.5')}}>
                        <Ficon
                          type="solid"
                          name="circle"
                          size={hp(1)}
                          color={'#1C37A4'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : index === 4 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <View
                      style={{
                        height: hp('5'),
                        justifyContent: 'center',
                        paddingTop: hp('0.5'),
                      }}>
                      <Ficon
                        type="light"
                        name="user-tie"
                        size={hp(3)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>
                    {isFocused && (
                      <View style={{height: hp('1.5')}}>
                        <Ficon
                          type="solid"
                          name="circle"
                          size={hp(1)}
                          color={'#1C37A4'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};
const styles = EStyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? hp('7') : hp('7'),
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    // paddingBottom: hp('1'),
  },
  innerMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('2'),
    // backgroundColor: 'pink',
  },
  imgStyle: {
    height: hp('5.25'),
    width: wp('10.5'),
  },
  centralIcon: {
    alignItems: 'center',
    // marginTop: hp('-3.25'),
  },
  centralImgStyle: {
    height: hp('10'),
    width: wp('20'),
  },
  textStyle: {
    alignItems: 'center',
    fontSize: '0.53rem',
    fontFamily: fontFamily.ceraMedium,
    color: 'grey',
    letterSpacing: 0.5,
  },
  centralText: {
    alignItems: 'center',
    fontSize: '0.53rem',
    fontFamily: fontFamily.ceraMedium,
    color: 'grey',
    letterSpacing: wp('0.1'),
  },
});

export default BottomTab;
