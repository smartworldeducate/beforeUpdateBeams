import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import TextInputCustom from '../Components/TextInput/TextInput';
import colors from '../Styles/colors';

const ForgotPassword = () => {
  const [employeeId, setEmployeeId] = useState();
  const [employeePassword, setEmployeePassword] = useState();

  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 20;

  const onChangeEmpId = val => {
    setEmployeeId(val);
  };
  const onChangeEmpPassword = val => {
    setEmployeePassword(val);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={colors.loginIconColor} />
      <ImageBackground
        source={{uri: 'appbg'}}
        style={{flex: 1}}
        resizeMode={'cover'}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={{marginHorizontal: wp('5')}}>
            <View
              style={{
                marginTop: hp('8'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'logonew'}}
                style={{height: hp('25'), width: wp('50')}}
                resizeMode={'contain'}
              />
            </View>

            <View style={{marginHorizontal: wp('2')}}>
              <View style={{marginTop: hp('3'), marginBottom: hp('2')}}>
                <Text
                  style={{fontSize: hp('2.75'), color: colors.loginTextColor}}>
                  Forgot Password
                </Text>
              </View>

              <View style={styles.textInputView}>
                <TextInputCustom
                  value={employeeId}
                  onChangeText={onChangeEmpId}
                  keyboardType={'numeric'}
                  maxLength={11}
                  returnKeyType={'done'}
                  iconName={'user-tie'}
                  placeholder={'Employee ID'}
                  placeholderColor={colors.loginTextColor}
                  iconColor={colors.loginIconColor}
                  style={styles.textInputCustomStyle}
                />
              </View>

              <View style={styles.textInputView}>
                <TextInputCustom
                  value={employeePassword}
                  onChangeText={onChangeEmpPassword}
                  keyboardType={'default'}
                  maxLength={11}
                  returnKeyType={'done'}
                  iconName={'mobile-button'}
                  placeholder={'Mobile Number'}
                  placeholderColor={colors.loginTextColor}
                  iconColor={colors.loginIconColor}
                  style={styles.textInputCustomStyle}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: hp('4'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
                style={{
                  height: hp('7'),
                  width: wp('85'),
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp(10),
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 12},
                  shadowOpacity: 0.58,
                  shadowRadius: 16,
                  elevation: 7,
                }}>
                <Text style={{color: '#061D7A'}}>Reset Password</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('18'),
                justifyContent: 'flex-end',
              }}>
              <View style={{flex: 0.3}}></View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={{
                  flex: 0.4,
                  alignItems: 'center',
                  paddingVertical: wp('2.5'),
                }}>
                <Text
                  style={{
                    fontSize: hp('1.5'),
                    color: colors.loginTextColor,
                    textDecorationLine: 'underline',
                  }}>
                  BACK TO <Text style={{color: '#061D7A'}}>LOGIN</Text>
                </Text>
              </TouchableOpacity>
              <View style={{flex: 0.3}}></View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    marginTop: hp('2'),
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),
    borderRadius: wp('10'),
    marginBottom: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('6'),
    color: colors.loginIconColor,
  },
});

export default ForgotPassword;
