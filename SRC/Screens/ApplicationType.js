import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import EStyleSheet from 'react-native-extended-stylesheet';
import Menu from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {LeaveTypeAction} from '../features/LeaveTypeSlice/LeaveTypeSlice';

const ApplicationType = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const leaveTypeHere = useSelector(state => state.LeaveTypeStore);

  console.log('leaveTypeHere', leaveTypeHere?.userData?.leave_types);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          LeaveTypeAction({
            employee_id: parsedLoginData,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: hp(0.8)}}>
        <MainHeader
          text={'Application Type'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
        <View style={styles.ap1}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('ApplyLeave')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="calendar-days"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Leave</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('Outstation')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
                // marginVertical: hp(1),
                marginHorizontal: hp(1),
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="business-time"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Outstation</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('AttendenceNotMarked')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
                // marginVertical: hp(1),
                marginHorizontal: hp(1),
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="calendar-circle-exclamation"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Attendance Not Marked</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('LateArivel')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
                // marginVertical: hp(1),
                marginHorizontal: hp(1),
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="calendar-circle-exclamation"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Late Arrival</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('EarliLeaving')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
                // marginVertical: hp(1),
                marginHorizontal: hp(1),
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="calendar-circle-exclamation"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Early Leaving</Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('ToilLeave')}
            style={styles.typeContainer}>
            <View
              style={{
                height: hp(10.5),
                flexDirection: 'row',
                // marginVertical: hp(1),
                marginHorizontal: hp(1),
              }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="calendar-circle-exclamation"
                  size={hp(3.25)}
                  color="#979797"
                />
              </View>
              <View
                style={{
                  flex: 0.63,
                  justifyContent: 'center',
                }}>
                <Text style={styles.zetext1}>Toil</Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp('3'),
                  paddingBottom: wp('2'),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(2.2)}
                  color="#979797"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApplicationType;

const styles = EStyleSheet.create({
  typeContainer: {
    height: hp('10.25'),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: hp(1.5),
    backgroundColor: '#FFF',
    marginBottom: hp(2),
  },
  ap1: {
    marginHorizontal: wp(6),
    height: hp(50),
    marginTop: hp(3.5),
  },
  zetext1: {
    fontSize: '0.73rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    color: '#343434',
    fontStyle: 'normal',
  },
  ztitle: {
    fontSize: hp(1.5),
    fontWeight: '600',
    marginTop: hp(1),
    fontFamily: fontFamily.ceraBlack,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
});
