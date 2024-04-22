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
import {useSelector, useDispatch} from 'react-redux';
import fontFamily from '../../Styles/fontFamily';

const AttendenceAndLeaveTab = ({state, descriptors, navigation, props}) => {
  const messagesHere = useSelector(state => state.messagesStore?.unReadLength);
  console.log('messagesHereBTab', messagesHere);

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
                  <View style={{flex: 1}}>
                    {/* {messagesHere > 0 ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          zIndex: 1,
                          marginBottom: hp('-2'),
                          right: wp('-8'),
                          top: hp('0.5'),

                          backgroundColor: 'red',
                          height: hp('2'),
                          width: wp('7'),
                          borderRadius: wp('50'),
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: hp('1.35'),
                            fontFamily: fontFamily.ceraBold,
                          }}>
                          {messagesHere}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )} */}

                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={onPress}
                      style={{
                        height: hp('7'),
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Ficon
                          type={isFocused ? 'solid' : 'light'}
                          name="calendar-days"
                          size={hp(2.5)}
                          color={isFocused ? '#1C37A4' : '#8a8a8a'}
                        />
                      </View>

                      {isFocused && (
                        <View style={{}}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={styles.tabText}>
                            Calendar
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : index === 1 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={{
                      height: hp('7'),
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Ficon
                        type={isFocused ? 'solid' : 'light'}
                        name="paper-plane"
                        size={hp(2.6)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>Apply</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ) : index === 2 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={{
                      height: hp('7'),
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Ficon
                        type={isFocused ? 'solid' : 'light'}
                        name="chart-simple"
                        size={hp(2.35)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>Balance</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ) : index === 3 ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={onPress}
                    style={{
                      height: hp('7'),
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Ficon
                        type={isFocused ? 'solid' : 'light'}
                        name="rectangle-history"
                        size={hp(2.35)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>History</Text>
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
    paddingHorizontal: wp('4'),
    // backgroundColor: 'green',
  },
  touchableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1.5'),
    marginHorizontal: wp('3'),
    flexDirection: 'row',
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
  tabText: {
    color: '#1C37A4',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    paddingLeft: wp('1'),
  },
});

export default AttendenceAndLeaveTab;
