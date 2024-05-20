import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';

import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../Styles/colors';
import {Div, ThemeProvider, Radio} from 'react-native-magnus';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewInput from '../Components/ViewInput';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import LeaveForwardToModal from '../Components/Modal/LeaveForwardToModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {AttendenceNotMarkedAction} from '../features/LeaveTypeSlice/AttendenceNotMarkedSlice';
import {useFocusEffect} from '@react-navigation/native';

const AttendenceNotMarked = props => {
  const dispatch = useDispatch();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const leaveTypeHere = useSelector(state => state.LeaveTypeStore);

  const attendenceNotMarkedHere = useSelector(
    state => state.AttendenceNotMarkedStore,
  );
  console.log('attendenceNotMarkedHere', attendenceNotMarkedHere);

  // all states hooks starts
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [forwardToModal, setForwardToModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [forFromDate, setForFromDate] = useState(null);
  const [empLeaveForwardToId, setEmpLeaveForwardToId] = useState(null);
  const [empLeaveForwardTo, setEmpLeaveForwardTo] = useState(null);

  const [timeInModal, setTimeInModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);
  const [timeIn, setTimeIn] = useState(true);
  const [firstDayValue, setFirstDayValue] = useState('in');
  const [timeInValue, setTimeInValue] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [timeOutValue, setTimeOutValue] = useState(null);
  const [both, setBoth] = useState(false);
  const [bothTimeValue, setBothTimeValue] = useState(null);
  const [reasonText, setReasonText] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const formattedFromDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const fromDateForTotalDays = day + '-' + month + '-' + year;
    setForFromDate(fromDateForTotalDays);

    setFromDate(formattedFromDate);
    hideDatePicker();
  };

  //second datetime picker

  const onPressTimeInModal = () => {
    console.log('onPressTimeInModal');
    setTimeInModal(true);
  };

  const hideTimeInModal = () => {
    setTimeInModal(false);
  };

  const handleTimeInConfirm = time => {
    const pakTime = new Date(time);
    setTimeInValue(
      pakTime.toLocaleTimeString('en-PK', {hour: '2-digit', minute: '2-digit'}),
    );
    hideTimeInModal();
  };

  const onPressTimeOutModal = () => {
    setTimeOutModal(true);
  };

  const hideTimeOutModal = () => {
    setTimeOutModal(false);
  };

  const handleTimeOutConfirm = time => {
    const pakTime = new Date(time);
    setTimeOutValue(
      pakTime.toLocaleTimeString('en-PK', {hour: '2-digit', minute: '2-digit'}),
    );
    hideTimeOutModal();
  };

  const onPressForwardToModal = () => {
    setForwardToModal(!forwardToModal);
  };

  const renderItemForwardTo = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => onPressSelectForwardTo({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text style={styles.leaveTypesText}>{item?.emp_name}</Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.1')} backgroundColor={'black'} />
      </>
    );
  };

  const onPressSelectForwardTo = ({item}) => {
    setEmpLeaveForwardToId(item?.employee_id);
    setEmpLeaveForwardTo(item?.emp_name);
    setForwardToModal(false);
  };

  const onPressTimeIn = () => {
    setTimeIn(true);
    setTimeInValue(null);
    setTimeOut(false);
    setBoth(false);
    setFirstDayValue('in');
  };
  const onPressTimeOut = () => {
    setTimeIn(false);
    setTimeOut(true);
    setTimeOutValue(null);
    setBoth(false);
    setFirstDayValue('out');
  };
  const onPressBoth = () => {
    setTimeIn(false);
    setTimeOut(false);
    setBoth(true);
    setTimeInValue(null);
    setTimeOutValue(null);
    setFirstDayValue('both');
  };

  const onChangeReason = val => {
    setReasonText(val);
  };

  const onPressSubmitRequest = () => {
    dispatch(
      AttendenceNotMarkedAction({
        employee_id: JSON.parse(profileHereEmpId),
        leave_type: 19,
        att_date: moment(fromDate, 'ddd, MMM DD, YYYY').format('DD/MM/YYYY'),
        in_out: firstDayValue,

        reason: reasonText,
        forward_to: empLeaveForwardToId,

        // in_time: timeIn ? timeInValue : null,

        ...(timeIn ? {in_time: timeInValue} : {}),
        ...(timeOut ? {out_time: timeOutValue} : {}),
        // ...(both && timeIn && timeOut ? {both: true} : {}),
        ...(both ? {in_time: timeInValue, out_time: timeOutValue} : {}),
      }),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // setIsFocused(true);
      // Additional logic when screen gains focus
      return () => {
        // setIsFocused(false);
        // Additional logic when screen loses focus
      };
    }, []),
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={timeInModal}
        mode="time"
        onConfirm={handleTimeInConfirm}
        onCancel={hideTimeInModal}
      />

      <DateTimePickerModal
        isVisible={timeOutModal}
        mode="time"
        onConfirm={handleTimeOutConfirm}
        onCancel={hideTimeOutModal}
      />

      <MainHeader
        text={'Attendance Not Marked'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <View
        style={{
          marginTop: hp(2),
          marginHorizontal: wp('5'),
          backgroundColor: '#fff',
          borderRadius: wp(10),
          shadowColor: '#000',
          shadowOpacity: 1,
          shadowRadius: wp('15'),
          elevation: 10,
        }}>
        <ViewInput
          dateText={fromDate == null ? 'Select Date' : fromDate}
          iconName={'fat fa-calendar-days'}
          dateFun={showDatePicker}
          rIcon={'angles-up-down'}
          placeholder={'Select Date'}
          placeholderColor={colors.loginTextColor}
          style={styles.textInputCustomStyle}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('5'),
          height: hp('4'),
          marginTop: hp('3'),
          marginBottom: hp('2'),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressTimeIn}
          style={{flex: 0.333, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: wp(6),
                height: hp(3),
              }}
              source={{uri: timeIn ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Time In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressTimeOut}
          style={{
            flex: 0.33,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: wp(6),
                height: hp(3),
              }}
              source={{uri: timeOut ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Time Out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressBoth}
          style={{
            flex: 0.334,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: wp(6),
                height: hp(3),
              }}
              source={{uri: both ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Both</Text>
          </View>
        </TouchableOpacity>
      </View>

      {(timeIn || both) && (
        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp('5'),
            backgroundColor: '#fff',
            borderRadius: wp(10),
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowRadius: wp('15'),
            elevation: 10,
          }}>
          <ViewInput
            dateText={timeInValue == null ? 'Time In' : timeInValue}
            dateFun={onPressTimeInModal}
            iconName={'fat fa-calendar-days'}
            placeholder={'Time in'}
            placeholderColor={colors.loginTextColor}
            style={styles.textInputCustomStyle}
          />
        </View>
      )}

      {(timeOut || both) && (
        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp('5'),
            backgroundColor: '#fff',
            borderRadius: wp(10),
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowRadius: wp('15'),
            elevation: 10,
          }}>
          <ViewInput
            dateText={timeOutValue == null ? 'Time Out' : timeOutValue}
            dateFun={onPressTimeOutModal}
            iconName={'fat fa-calendar-days'}
            placeholder={'Time Out'}
            placeholderColor={colors.loginTextColor}
            style={styles.textInputCustomStyle}
          />
        </View>
      )}

      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: hp(1.5),
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 8,
          marginHorizontal: wp(5.5),
          marginTop: hp('2'),
        }}>
        <TextInput
          placeholder={'Reason'}
          placeholderTextColor="#363636"
          multiline={true}
          onChangeText={onChangeReason}
          style={{
            height: hp(17),
            textAlignVertical: 'top',
            paddingLeft: wp('4'),
            color: '#363636',
            borderRadius: hp(1.5),
            fontFamily: fontFamily.ceraMedium,
            fontWeight: '500',
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressForwardToModal}
        style={{
          flexDirection: 'row',
          marginTop: hp(2),
          marginHorizontal: wp('5'),
          backgroundColor: '#FFF2CC',
          borderRadius: wp(10),
          shadowColor: '#000',
          shadowOpacity: 1,
          shadowRadius: wp('15'),
          elevation: 10,
          height: hp('7'),
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 0.16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FDEB13',
            borderRadius: wp('10'),
          }}>
          <FontAwesomeIcon
            icon={'fat fa-user-tie'}
            size={hp(3)}
            style={{color: colors.loginIconColor}}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            paddingLeft: wp(3),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.dropdown1BtnTxt}>
            {empLeaveForwardTo == null ? 'Forward To' : empLeaveForwardTo}
          </Text>
        </View>
        <View
          activeOpacity={0.8}
          style={{
            flex: 0.14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ficon type="light" name="angles-up-down" color="#cdcdcd" size={16} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressSubmitRequest}
        style={{
          marginTop: hp('15'),
          marginHorizontal: hp(2.75),
          height: hp(6.5),
          justifyContent: 'center',
          backgroundColor: '#1C37A4',
          borderRadius: hp(50),
          alignItems: 'center',
        }}>
        <Text style={styles.submittext}>SUBMIT REQUEST</Text>
      </TouchableOpacity>

      {forwardToModal && (
        <LeaveForwardToModal
          topText={'Forward To'}
          onPressOpacity={onPressForwardToModal}
          leaveTypesData={leaveTypeHere?.userData?.forward_to}
          renderItem={renderItemForwardTo}
        />
      )}
    </ScrollView>
  );
};

export default AttendenceNotMarked;

const styles = EStyleSheet.create({
  textInputView: {
    marginTop: hp('2'),
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),
    borderRadius: wp('10'),
    borderColor: colors.grey,
    borderWidth: wp('0.1'),
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

  loginWithGoogle: {
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),

    borderRadius: wp('10'),
    borderColor: colors.grey,
    borderWidth: wp('0.1'),
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
    fontSize: '0.7rem',
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('2'),
    color: '#363636',
    fontWait: '500',
    fontFamily: fontFamily.ceraMedium,
  },
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

  dropdown1BtnStyle: {
    width: wp('50'),
    height: hp(7),
    backgroundColor: '#fff',
    marginVertical: hp(0),
  },
  dropdown1BtnTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.7rem',
    color: '#363636',
    fontWaight: 700,
  },
  dropdown1DropdownStyle: {
    width: wp('90'),
    backgroundColor: '#EFEFEF',
    marginTop: hp(-3.85),
    marginLeft: hp(-7),
    borderRadius: hp(1.5),
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    width: wp(90),
  },
  dropdown1RowTxtStyle: {
    textAlign: 'left',
    color: '#363636',
    fontSize: '0.6rem',
    fontWaight: 500,
    fontFamily: fontFamily.ceraMedium,
  },
  leaveTypesText: {
    color: '#343434',
    fontSize: '0.65rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
