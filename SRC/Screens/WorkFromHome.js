import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {wfhInsertHandler} from '../features/insertwfh/createSlice';
import {wfhHandler} from '../features/wfh/createSlice';
import moment from 'moment';
const WorkFromHome = props => {
  const dispatch = useDispatch();
  const [wfh, setWfh] = useState('');
  const [timeState, setTimeState] = useState(true);
  const [outState, setOutState] = useState(false);
  const [timeOne, setTimeOne] = useState('10:00');
  const [timeTwo, setTimeTwo] = useState('5:00');
  const [totalTime, setTotalTime] = useState('00');
  const [totalMinut, setTotalMinut] = useState('00');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDisabledTimein, setIsDisabledTimein] = useState(false);
  const [isDisabledTimeout, setIsDisabledTimeout] = useState(false);
  const prData = props.route.params;
  const prDataCount = props.route.params;
  // console.log("wfhdatatime==",totalTime)
  const [locadata, setLocalData] = useState(prDataCount?.myKey1);
  // const [myCountGet, setMyCountGet] = useState(prDataCount?.myCount);
  const calculateTotalTime = () => {
    if (timeOne != '' || timeTwo != '') {
      const format = 'HH:mm:ss';
      const momentTimeOne = moment(timeOne, format);
      const momentTimeTwo = moment(timeTwo, format);

      if (momentTimeOne && momentTimeTwo) {
        const duration = moment.duration(momentTimeTwo.diff(momentTimeOne));
        const hours = duration.hours();
        const minutes = duration.minutes();
        setTotalTime(hours);
        setTotalMinut(minutes);
      }
    } else {
      setTotalTime('');
    }
  };

  const timeinHandler = () => {
    setTimeState(true);
    setOutState(false);
  };
  const timeiOutHandler = () => {
    setOutState(true);
    setTimeState(false);
  };

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setLocalData(parsedData);
        const wfhData = await dispatch(
          wfhHandler({employee_id: parsedData?.EMPLOYEE_ID}),
        );
        const wfhObj = Object.assign({}, ...wfhData?.payload?.data);
        setWfh(wfhObj);
        if (wfhObj?.count == 1) {
          setTimeOne(wfhObj?.time_in);
        } else if (wfhObj?.count == 2) {
          setTimeTwo(wfhObj?.time_out);
        } else {
        }
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useEffect(() => {
    getData('loginData');
  }, []);

  const inTimeHandler = async () => {
    await dispatch(wfhInsertHandler({employee_id: locadata?.EMPLOYEE_ID}));
    setIsDisabledTimein(true);
    getData('loginData');
    calculateTotalTime();
  };

  const [formattedTime, setFormattedTime] = useState(
    moment().format('h:mm:ss'),
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime(moment().format('h:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {wfh?.count == 1 || wfh?.count == 2 ? (
        <View
          style={{
            position: 'absolute',
            top: hp(15),
            left: hp(5),
            height: hp(4),
            width: wp(80),
            backgroundColor: '#ABEBC6',
            borderRadius: hp(0),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#239B56', fontSize: hp(2), alignItems: 'center'}}>
            {wfh?.message}
          </Text>
        </View>
      ) : (
        ''
      )}

      <View>
        <MainHeader
          text={'Work From Home'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {timeState == true && (
        <>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.time1}>{formattedTime}</Text>
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
              onPress={inTimeHandler}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={wfh?.count == 2 ? isDisabledTimein : null}>
              <Image
                style={{width: wp(55), height: hp(27.5)}}
                source={{uri: wfh?.count == 0 ? 'timein' : 'outimg'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: wp('10'),
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                flex: 0.334,
                alignItems: 'center',
                paddingVertical: wp('4'),
              }}>
              <Image
                style={{width: wp(8), height: hp(4)}}
                source={{uri: 'timeione'}}
                resizeMode="contain"
              />
              <Text style={[styles.serviceSection]}>{`09:10:12`}</Text>
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
                source={{uri: 'timeout'}}
                resizeMode="contain"
              />
              <Text style={[styles.serviceSection]}>{`09:10:12`}</Text>
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
              <Text style={[styles.serviceSection]}>{`09:10:12`}</Text>
              <Text style={[styles.bootContText2]}>{`Working hr’s`}</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default WorkFromHome;

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
