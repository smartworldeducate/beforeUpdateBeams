import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-fontawesome-pro';
import {StackActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutSuccess} from '../features/loginSlice/loginSlice';
import {clearUserProfileState} from '../features/profileSlice/profileSlice';

import RNExitApp from 'react-native-exit-app';

const CustomDrawer = ({navigation}) => {
  const profileHere = useSelector(state => state.profileStore);

  const exitNow = () => {
    const delay = 100;
    setTimeout(() => {
      RNExitApp.exitApp();
    }, delay);
  };

  const dispatch = useDispatch();
  async function saveData() {
    console.log('logout');
    await AsyncStorage.removeItem('loginData');
    await AsyncStorage.removeItem('branchId');
    await AsyncStorage.removeItem('deptId');
    //  dispatch({ type: 'RESET_APP_STATE' });
    // dispatch(clearUserProfileState());
    // dispatch(logoutSuccess());
    exitNow();

    // navigation.dispatch(StackActions.replace('Login'));
  }

  const leaveHistoryHere = useSelector(state => state.salaryYearsStore);

  console.log('leaveHistoryHere', leaveHistoryHere);

  const getIndex = leaveHistoryHere?.userData?.total_years_count - 1;
  console.log('getIndex', getIndex);

  const lastYear =
    leaveHistoryHere?.userData?.total_years &&
    leaveHistoryHere?.userData?.total_years[getIndex];

  console.log('lastYear', lastYear);
  console.log('lastYearType', typeof lastYear);

  return (
    <>
      {/* <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#1C37A5', '#4D69DC']}
        style={{flex: 1}}> */}

      <ImageBackground
        source={{uri: 'drawerbg'}}
        // source={require('../Images/splashhere.jpg')}
        style={{flex: 1}}
        resizeMode={'cover'}>
        <View
          style={{
            height: hp(7),
            flexDirection: 'row',
            marginTop: hp(6.5),
          }}>
          <View
            style={{
              flex: 0.8,
            }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                color: '#fff',
                fontSize: hp(3),
              }}>
              <Icon type="light" name="xmark" size={hp(3)} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginHorizontal: hp(3)}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileDrawer')}
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Image
                style={{
                  width: wp(16),
                  borderColor: '#b0bbeb',
                  height: hp(8),
                  borderRadius: hp(50),
                }}
                source={{uri: profileHere?.userData?.emp_result?.EMP_PHOTO}}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flex: 0.75,
                justifyContent: 'center',
                paddingLeft: wp('1'),
              }}>
              <View style={{}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.username}>
                  {profileHere?.userData?.emp_result?.EMP_NAME}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(0)}}>
                <View style={{marginRight: hp(1)}}>
                  <View style={{flexDirection: 'row', marginTop: hp(0)}}>
                    <View style={{marginRight: hp(1)}}>
                      <Text style={styles.viewProfile}>View Profile</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.listnameStyle, {marginTop: hp(3)}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreenDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Home</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AttendanceDrawer', {
                  lastYearParam: lastYear,
                })
              }>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Attendance</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FinancialDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Financials</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TimeLineDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Timeline</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {profileHere?.userData?.reporting_result?.reportee_length > 0 && (
            <View style={styles.listnameStyle}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReporteeDrawer')}>
                <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                  <View style={styles.homeleft}>
                    <Text style={styles.textlistStyle}>Reportees</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ApprocialDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Appraisal</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {profileHere?.userData?.emp_result?.MARITAL_STATUS == 'M' && (
            <View style={styles.listnameStyle}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChildBSSDrawer')}>
                <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                  <View style={styles.homeleft}>
                    <Text style={styles.textlistStyle}>Children in BSS</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://index.beaconhouse.net/')}
              //  onPress={() => navigation.navigate('Profile')}
            >
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Index</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FeedBackDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Feedback</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UtilityDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Miscellaneous</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={saveData}>
              <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {/* </LinearGradient> */}
    </>
  );
};

export default CustomDrawer;

const styles = EStyleSheet.create({
  username: {
    fontSize: '0.7rem',
    color: '#fff',
    fontWeight: '700',
    // marginTop: hp(1),
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  viewProfile: {
    fontSize: '0.5rem',
    color: '#FFF',
    fontSize: hp(1.5),
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  textlistStyle: {
    fontSize: '0.7rem',
    color: '#fff',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  listnameStyle: {
    width: wp(50),
    height: hp('5.5'),
    marginTop: hp(0.4),
    justifyContent: 'center',
  },
  homeleft: {marginLeft: hp(0.5)},
});
