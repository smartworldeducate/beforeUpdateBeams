import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const AttendanceCardTextInput = ({
  leftText,
  rightImg,
  onPressRightImg,
  value,
  onChangeText,
  placeholder,
  placeholderColor,
  isChecked,
}) => {
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            paddingVertical: hp('0.5'),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 18,
              color: '#201F24',
              fontWeight: '500',
              fontFamily: fontFamily.ceraMedium,
            }}>
            {leftText}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressRightImg}
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('0.5'),
          }}>
          <Image
            source={{uri: rightImg}}
            style={{height: 20, width: 20}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      {isChecked && (
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textinputStyle}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            maxLength={100}
            keyboardType={'default'}
            returnKeyType={'done'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    marginTop: hp('1'),
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    height: hp('7'),
    borderRadius: wp('50'),
    marginBottom: hp('1'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },
  textinputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: wp('4'),
    paddingRight: wp('1'),
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    borderRadius: wp('50'),
  },
});

export default AttendanceCardTextInput;
