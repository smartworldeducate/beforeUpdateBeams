import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import {useSelector} from 'react-redux';

import Loader from '../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceInfo = props => {
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [deviceType, setDeviceType] = useState(null);
  const [getDeviceId, setGetDeviceId] = useState(null);
  const [getDeviceBrand, setGetDeviceBrand] = useState(null);
  const [getDeviceVersion, setGetDeviceVersion] = useState(null);
  const [getUserAppInstallVersion, setGetUserAppInstallVersion] =
    useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [deviceApiLevel, setDeviceApiLevel] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    async function ourFunc() {
      const here1 = await AsyncStorage.getItem('deviceTypeAsyncStorage');
      const here2 = await AsyncStorage.getItem('getDeviceIdAsyncStorage');
      const here3 = await AsyncStorage.getItem('getDeviceBrandAsyncStorage');
      const here4 = await AsyncStorage.getItem('getDeviceVersionAsyncStorage');
      const here5 = await AsyncStorage.getItem(
        'getUserAppInstallVersionAsyncStorage',
      );
      const here6 = await AsyncStorage.getItem('deviceNameAsyncStorage');

      const here7 = await AsyncStorage.getItem('deviceApiLevelAsyncStorage');

      const here8 = await AsyncStorage.getItem('fcm');

      setDeviceType(here1);
      setGetDeviceId(here2);
      setGetDeviceBrand(here3);
      setGetDeviceVersion(here4);
      setGetUserAppInstallVersion(here5);
      setDeviceName(here6);

      setDeviceApiLevel(here7);
      setDeviceToken(here8);
    }
    ourFunc();
  }, []);

  useEffect(() => {
    const delay = 2500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onPressGetInfoViaEmail = () => {
    console.log('onPressGetInfoViaEmail');
    // dispatch(
    //   UserDeviceInfoAction({
    //     user_id: userId,
    //     phone_number: phoneNumberLogin,
    //     device_type: deviceType,
    //     device_identifier: deviceIdentifier,
    //     device_token: deviceToken,
    //     device_name: deviceName,
    //     device_os_version: deviceOSVersion,
    //     app_install_version: appInstallVersion,
    //   }),
    // );
  };

  return (
    <>
      <View>
        <MainHeader
          text={`Device Info`}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View
          style={{
            marginVertical: hp('1'),
            marginHorizontal: wp('2'),
            paddingHorizontal: wp('1'),
          }}>
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <View
                style={{
                  margin: wp('3'),
                  borderColor: colors.appColor,
                  borderRadius: wp('0'),
                  borderWidth: wp('0.25'),
                  marginTop: hp('2'),
                }}>
                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Employee Id</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {profileHereEmpId}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device Type</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {deviceType}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device Id</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {getDeviceId}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device Brand</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {getDeviceBrand}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device Version</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {getDeviceVersion}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>App Install Version</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {getUserAppInstallVersion}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device Name</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {deviceName}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>Device API Level</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {deviceApiLevel}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainInnerView}>
                  <View style={{}}>
                    <Text style={styles.textStyle}>FCM Token</Text>
                  </View>
                  <View style={{}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>
                      {deviceToken}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{margin: hp('3')}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onPressGetInfoViaEmail}
                  style={{
                    height: hp('6'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1C37A4',
                    borderRadius: wp('50'),
                  }}>
                  <Text style={[styles.btnText, {textAlign: 'center'}]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default DeviceInfo;

const styles = EStyleSheet.create({
  mainInnerView: {
    flexDirection: 'column',
    borderBottomColor: '#1C37A4',
    borderBottomWidth: wp('0.15'),
    padding: wp('1.5'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.ceraMedium,
    color: '#1C37A4',
  },
  btnText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.65rem',
    letterSpacing: 0.6,
  },
});
