import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';

import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../Styles/colors';
import {Div, ThemeProvider, Radio} from 'react-native-magnus';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewInput from '../Components/ViewInput';
import Button from '../Components/Button/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import ViewInputTwo from '../Components/ViewInputTwo';
import {useDispatch, useSelector} from 'react-redux';
import {getLineMangerHandller} from '../features/lineManager/createSlice';
import {reporteeHandleFun} from '../features/reportee/createSlice';
import LeaveTypeModal from '../Components/Modal/LeaveTypeModal';
import {LeaveTypeAction} from '../features/LeaveTypeSlice/LeaveTypeSlice';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import LeaveForwardToModal from '../Components/Modal/LeaveForwardToModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import ViewInputAnother from '../Components/ViewInputAnother';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearAllStateEarlyLeaving,
  EarlyLeavingAction,
} from '../features/LeaveTypeSlice/EarlyLeavingSlice';
import MessageSuccessModal from '../Components/Modal/MessageSuccessModal';
import Loader from '../Components/Loader/Loader';

const EarlyLeaving = ({route, ...props}) => {
  const routeValueAttenDate = route?.params?.attenValue;

  const routeValueLeaveTime = route?.params?.earlyLeavingTime;

  const formatDate = dateString => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    if (route?.params != undefined) {
      return new Date(dateString).toLocaleDateString('en-US', options);
    }
  };

  const formattedDate = formatDate(routeValueAttenDate);

  const dispatch = useDispatch();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const leaveApplyForwardToHere = useSelector(
    state => state.profileStore?.leavesApplyForwardTo,
  );

  const leaveTypeHere = useSelector(state => state.LeaveTypeStore);

  const earlyLeavinglHere = useSelector(state => state.EarlyLeavingStore);
  console.log('earlyLeavinglHere>>>', earlyLeavinglHere);

  const earlyLeavingResponseHere = useSelector(
    state => state.EarlyLeavingStore.success,
  );

  // all states hooks starts
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleTwo, setDatePickerVisibilityTwo] = useState(false);
  const [timePickerVisible, setTimePickerVisibility] = useState(false);

  const [leaveTypeModal, setLeaveTypeModal] = useState(false);
  const [forwardToModal, setForwardToModal] = useState(false);
  const [fromDate, setFromDate] = useState(
    formattedDate != undefined || formattedDate != null ? formattedDate : null,
  );
  const [toDate, setToDate] = useState(
    formattedDate != undefined || formattedDate != null ? formattedDate : null,
  );
  const [totalDays, setTotalDays] = useState(null);
  const [lateArrivalTime, setLateArrivalTime] = useState(
    route?.params?.earlyLeavingTime
      ? route?.params?.earlyLeavingTime.substring(0, 5)
      : null,
  );

  const [forFromDate, setForFromDate] = useState(null);
  const [forToDate, setForToDate] = useState(null);
  const [empLeaveTypeId, setEmpLeaveTypeId] = useState(null);
  const [empLeaveForwardToId, setEmpLeaveForwardToId] = useState(
    leaveApplyForwardToHere[0]?.employee_id,
  );
  const [empLeaveForwardTo, setEmpLeaveForwardTo] = useState(
    leaveApplyForwardToHere[0]?.emp_name,
  );
  const [reasonText, setReasonText] = useState('');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    setForToDate(fromDateForTotalDays);

    setToDate(formattedFromDate);

    hideDatePicker();
  };

  //second datetime picker
  const showDatePickerTwo = () => {
    setDatePickerVisibilityTwo(true);
  };

  const hideDatePickerTwo = () => {
    setDatePickerVisibilityTwo(false);
  };

  const handleDateConfirmTwo = date => {
    const formattedToDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const toDateForTotalDays = day + '-' + month + '-' + year;
    console.log('toDateForTotalDays', toDateForTotalDays);
    setForToDate(toDateForTotalDays);

    setToDate(formattedToDate);
    hideDatePickerTwo();
  };

  const showLateArrivalTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideLateArrivalTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleLateArrivalTimeConfirm = time => {
    const pakTime = new Date(time);
    setLateArrivalTime(
      pakTime.toLocaleTimeString('en-PK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    );
    hideLateArrivalTimePicker();
  };

  const calculateDifferenceInDays = (startDateString, endDateString) => {
    const currentYear = moment().year();
    const startMoment = moment(
      `${startDateString} ${currentYear}`,
      'ddd, MMM D YYYY',
    );
    const endMoment = moment(
      `${endDateString} ${currentYear}`,
      'ddd, MMM D YYYY',
    );

    const diffInDays = endMoment.diff(startMoment, 'days') + 1;
    return diffInDays;
  };

  useEffect(() => {
    if (forFromDate != null && forToDate != null) {
      const startMoment = moment(forFromDate, 'DD-MM-YYYY');
      const endMoment = moment(forToDate, 'DD-MM-YYYY');

      const diffInDays = endMoment.diff(startMoment, 'days') + 1;
      setTotalDays(diffInDays);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    console.log('inSecond', fromDate, toDate);
    if (fromDate != undefined && toDate != undefined) {
      const diffInDays = calculateDifferenceInDays(fromDate, toDate);
      console.log('diffInDays', diffInDays);
      setTotalDays(diffInDays);
    }
  }, [fromDate, toDate]);

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

  const onChangeReason = val => {
    setReasonText(val);
  };

  const onPressSubmitRequest = () => {
    dispatch(
      EarlyLeavingAction({
        employee_id: JSON.parse(profileHereEmpId),
        leave_type: 20,

        from_date:
          fromDate == null
            ? null
            : moment(fromDate, 'ddd, MMM DD, YYYY').format('DD/MM/YYYY'),
        to_date:
          toDate == null
            ? null
            : moment(toDate, 'ddd, MMM DD, YYYY').format('DD/MM/YYYY'),
        total_days: JSON.parse(totalDays),

        txt_exp_tm: lateArrivalTime.replace(':', ''),
        reason: reasonText,
        forward_to: JSON.parse(empLeaveForwardToId),
      }),
    );
  };

  useEffect(() => {
    if (earlyLeavingResponseHere == 0) {
      setShowErrorModal(true);
    } else if (earlyLeavingResponseHere == 1) {
      setShowSuccessModal(true);

      setFromDate(null);
      setToDate(null);
      setForFromDate(null);
      setForToDate(null);
      setTotalDays(null);
      setLateArrivalTime(null);

      setReasonText('');
    }
  }, [earlyLeavingResponseHere]);

  const closeModal = () => {
    dispatch(clearAllStateEarlyLeaving());
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Additional logic when screen gains focus
  //     return () => {
  //       // Additional logic when screen loses focus
  //     };
  //   }, []),
  // );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
      {earlyLeavinglHere?.isLoading && <Loader></Loader>}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisibleTwo}
        onConfirm={handleDateConfirmTwo}
        onCancel={hideDatePickerTwo}
      />
      <DateTimePickerModal
        mode="time"
        is24Hour={true}
        display={'clock'}
        isVisible={timePickerVisible}
        onConfirm={handleLateArrivalTimeConfirm}
        onCancel={hideLateArrivalTimePicker}
      />
      <MainHeader
        text={'Early Leaving'}
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
        <ViewInputAnother
          dateText={fromDate == null ? 'From Date' : fromDate}
          dateFun={showDatePicker}
          imgName={'leftarrowdot'}
          rIcon={'angles-up-down'}
          placeholder={'Tue, Jun 27, 2023'}
          placeholderColor={colors.loginTextColor}
          style={styles.textInputCustomStyle}
        />
      </View>

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
        <ViewInputAnother
          dateText={toDate == null ? 'To Date' : toDate}
          dateFun={showDatePickerTwo}
          imgName={'rightarrowdot'}
          placeholder={'Tue, Jun 27, 2023'}
          placeholderColor={colors.loginTextColor}
          style={styles.textInputCustomStyle}
        />
      </View>
      <View
        style={{
          marginTop: hp(1.5),
          marginHorizontal: wp('5'),
          backgroundColor:
            totalDays == null || totalDays == 0 ? 'white' : '#FFF2CC',
          borderRadius: wp(10),
          shadowColor: '#000',
          shadowOpacity: 1,
          shadowRadius: wp('15'),
          elevation: 10,
        }}>
        <ViewInput
          dateText={totalDays}
          iconName={'fat fa-calendar-days'}
          placeholder={'Total Days'}
          placeholderColor={colors.loginTextColor}
          iconColor={colors.loginIconColor}
          style={styles.textInputCustomStyle}
        />
      </View>

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
          dateText={lateArrivalTime == null ? 'Departure' : lateArrivalTime}
          dateFun={showLateArrivalTimePicker}
          iconName={'fat fa-clock-three'}
          placeholder={'Departure'}
          placeholderColor={colors.loginTextColor}
          iconColor={colors.loginIconColor}
          style={styles.textInputCustomStyle}
        />
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: hp(1.5),
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 8,
          marginHorizontal: wp(5.5),
          marginTop: hp('3'),
        }}>
        <TextInput
          placeholder={'Reason'}
          placeholderTextColor="#363636"
          multiline={true}
          value={reasonText}
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
          marginTop: hp(6),
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
          leaveTypesData={leaveApplyForwardToHere}
          renderItem={renderItemForwardTo}
        />
      )}

      {showErrorModal && (
        <MessageSuccessModal
          textUpper={'Request Status'}
          textLower={earlyLeavinglHere?.message}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}

      {showSuccessModal && (
        <MessageSuccessModal
          textUpper={'Request Status'}
          textLower={earlyLeavinglHere?.message}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}
    </ScrollView>
  );
};

export default EarlyLeaving;

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
