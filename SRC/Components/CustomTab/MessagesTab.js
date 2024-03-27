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

const MessagesTab = ({state, descriptors, navigation, props}) => {
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
                        name="envelope"
                        size={hp(2.85)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>Mail</Text>
                      </View>
                    )}
                  </TouchableOpacity>
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
                        name="star"
                        size={hp(2.85)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>Favourites</Text>
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
                        name="box-archive"
                        size={hp(2.75)}
                        color={isFocused ? '#1C37A4' : '#8a8a8a'}
                      />
                    </View>

                    {isFocused && (
                      <View style={{}}>
                        <Text style={styles.tabText}>Archive</Text>
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
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    paddingLeft: wp('1'),
  },
});

export default MessagesTab;
