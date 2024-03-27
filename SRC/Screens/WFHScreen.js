import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {WorkFromHomePostAction} from '../features/WorkFromHomeSlice/WorkFromHomePost';
import {WorkFromHomeAction} from '../features/WorkFromHomeSlice/WorkFromHomeGet';
import Time from '../Components/WFH/Time';
import Loader from '../Components/Loader/Loader';
const WFHScreen = props => {
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const WorkFromHomeGetHere = useSelector(state => state.WorkFromHomeGetStore);
  console.log('WorkFromHomeGetHere', WorkFromHomeGetHere);

  const WorkFromHomePostHere = useSelector(
    state => state.WorkFromHomePostStore,
  );

  console.log('WorkFromHomePostHere', WorkFromHomePostHere);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          WorkFromHomeAction({
            employee_id: parsedLoginData,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onPressTimeImg = () => {
    console.log('onPressTimeImg');
    dispatch(
      WorkFromHomePostAction({
        employee_id: profileHereEmpId,
      }),
    );
  };

  useEffect(() => {
    if (WorkFromHomePostHere.success == 1) {
      console.log('useEffect WorkFromHomePostHere');
      dispatch(
        WorkFromHomeAction({
          employee_id: profileHereEmpId,
        }),
      );
    }
  }, [WorkFromHomePostHere]);

  return (
    <>
      <View>
        <MainHeader
          text={'WFH Screen'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <View style={{flex: 1}}>
        {WorkFromHomeGetHere?.isLoading && <Loader></Loader>}

        <View
          style={{
            flex: 0.7,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Time />
          <Text style={styles.timetext}>{`${moment().format(
            'dddd, MMMM D',
          )}`}</Text>
        </View>

        <View
          style={{
            flex: 1.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressTimeImg}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: wp(55), height: hp(27.5)}}
              source={{
                uri:
                  WorkFromHomeGetHere?.userData?.count == 0
                    ? 'timein'
                    : 'outimg',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: wp('10'),
          }}>
          <View
            style={{
              flex: 0.334,
              alignItems: 'center',
              paddingVertical: wp('4'),
            }}>
            <Image
              style={{width: wp(8), height: hp(4)}}
              source={{uri: 'timeinoffice'}}
              resizeMode="contain"
            />
            <Text style={[styles.serviceSection]}>
              {WorkFromHomeGetHere?.userData?.count == 0
                ? `--:--:--`
                : WorkFromHomeGetHere?.userData?.time_in}
            </Text>
            <Text style={[styles.bootContText2]}>{`TIME IN`}</Text>
          </View>
          <View
            style={{
              flex: 0.334,
              alignItems: 'center',
              paddingVertical: wp('4'),
            }}>
            <Image
              style={{width: wp(8), height: hp(4)}}
              source={{uri: 'timeoutoffice'}}
              resizeMode="contain"
            />
            <Text style={[styles.serviceSection]}>
              {WorkFromHomeGetHere?.userData?.count > 1
                ? WorkFromHomeGetHere?.userData?.time_out
                : `--:--:--`}
            </Text>
            <Text style={[styles.bootContText2]}>{`TIME OUT`}</Text>
          </View>
          <View
            style={{
              flex: 0.334,
              alignItems: 'center',
              paddingVertical: wp('4'),
            }}>
            <Image
              style={{width: wp(8), height: hp(4)}}
              source={{uri: 'chkimg'}}
              resizeMode="contain"
            />
            <Text style={[styles.serviceSection]}>
              {WorkFromHomeGetHere?.userData?.count > 1
                ? WorkFromHomeGetHere?.userData?.working_hours
                : `--:--:--`}
            </Text>
            <Text style={[styles.bootContText2]}>{`Working hr’s`}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default WFHScreen;

const styles = EStyleSheet.create({
  radiotext: {
    fontSize: '0.62rem',
    fontWaight: '500',
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
  },
  submittext: {
    color: '#fff',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.7rem',
    // color:'#363636',
    fontWait: '500',
  },
  botContainer: {
    flex: 1,
    height: hp(7),
    marginTop: hp(-3),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  zetext: {
    color: '#fff',
    // fontSize: fontSize.small,
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },
  bootContText: {
    fontSize: '0.5rem',
    fontWeight: '900',
    fontFamily: fontFamily.ceraLight,
    paddingHorizontal: hp(3),
    color: '#979797',
  },
  bootContText2: {
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#979797',
    textTransform: 'uppercase',
    paddingTop: hp(0.2),
  },
  serviceSection: {
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    paddingHorizontal: hp(2),
    color: '#353535',
    paddingTop: hp(0.3),
  },
  zetext1: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },

  ztitle: {
    color: '#fff',
    fontSize: hp(1.5),
    fontWeight: '600',
    marginTop: hp(1),
    fontFamily: fontFamily.ceraLight,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
  },
  iconStyle: {
    fontSize: '1.5625rem',
    fontWeight: 300,
  },
  time1: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontSize: '2rem',
    fontWeight: '300',
  },
  timetext: {
    fontSize: hp(2.5),
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontSize: '1rem',
    fontWeight: '300',
  },
});
