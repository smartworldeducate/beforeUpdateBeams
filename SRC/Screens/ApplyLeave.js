import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  Alert,
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
import InputBackground from '../Components/InputBackground';
import Icon from 'react-native-fontawesome-pro';
import {useDispatch, useSelector} from 'react-redux';
import {getLineMangerHandller} from '../features/lineManager/createSlice';
import {reporteeHandleFun} from '../features/reportee/createSlice';
import LeaveTypeModal from '../Components/Modal/LeaveTypeModal';
import {LeaveTypeAction} from '../features/LeaveTypeSlice/LeaveTypeSlice';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import LeaveForwardToModal from '../Components/Modal/LeaveForwardToModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {
  ApplyLeaveAction,
  clearAllStateApplyLeave,
} from '../features/LeaveTypeSlice/ApplyLeaveSlice';
import ViewInputAnother from '../Components/ViewInputAnother';
import {useFocusEffect} from '@react-navigation/native';
import MessageSuccessModal from '../Components/Modal/MessageSuccessModal';

const ApplyLeave = props => {
  const dispatch = useDispatch();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const leaveTypeHere = useSelector(state => state.LeaveTypeStore);

  const applyLeaveHere = useSelector(state => state.ApplyLeaveStore);
  console.log('applyLeaveHere', applyLeaveHere);

  const applyLeaveSuccessResponseHere = useSelector(
    state => state.ApplyLeaveStore.success,
  );
  console.log('applyLeaveSuccessResponseHere', applyLeaveSuccessResponseHere);

  // all states hooks starts
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleTwo, setDatePickerVisibilityTwo] = useState(false);
  const [leaveTypeModal, setLeaveTypeModal] = useState(false);
  const [forwardToModal, setForwardToModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [forFromDate, setForFromDate] = useState(null);
  const [forToDate, setForToDate] = useState(null);
  const [empLeaveTypeId, setEmpLeaveTypeId] = useState(null);
  const [empLeaveType, setEmpLeaveType] = useState(null);
  const [empLeaveForwardToId, setEmpLeaveForwardToId] = useState(null);
  const [empLeaveForwardTo, setEmpLeaveForwardTo] = useState(null);

  const [fullDay, setFullDay] = useState(true);
  const [firstDayValue, setFirstDayValue] = useState('F');
  const [halfDay, setHalfDay] = useState(false);
  const [shortLeave, setShortLeave] = useState(false);
  const [withPay, setWithPay] = useState(true);
  const [payValue, setPayValue] = useState('Y');
  const [withoutPay, setWithoutPay] = useState(false);
  const [reasonText, setReasonText] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

  useEffect(() => {
    if (forFromDate != null && forToDate != null) {
      const startMoment = moment(forFromDate, 'DD-MM-YYYY');
      const endMoment = moment(forToDate, 'DD-MM-YYYY');

      const diffInDays = endMoment.diff(startMoment, 'days') + 1;
      setTotalDays(diffInDays);
    }
  }, [fromDate, toDate]);

  const onPressLeaveTypeModal = () => {
    setLeaveTypeModal(!leaveTypeModal);
  };

  const onPressForwardToModal = () => {
    setForwardToModal(!forwardToModal);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const loginData = await AsyncStorage.getItem('loginData');
  //       const parsedLoginData = JSON.parse(loginData);

  //       dispatch(
  //         LeaveTypeAction({
  //           employee_id: parsedLoginData,
  //         }),
  //       );
  //     } catch (error) {
  //       console.error('Error retrieving values from AsyncStorage:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  const renderItemLeaveTypes = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressLeaveType({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text style={styles.leaveTypesText}>
            {item?.leave_type_desc}
            {''} {`${item?.balance != null ? +'(' + item?.balance + ')' : ''}`}
          </Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressLeaveType = ({item}) => {
    setEmpLeaveTypeId(item?.leavetype_id);
    setEmpLeaveType(item?.leave_type_desc);
    setLeaveTypeModal(false);
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

  const onPressFullDay = () => {
    setFullDay(true);
    setHalfDay(false);
    setShortLeave(false);
    setFirstDayValue('F');
  };
  const onPressHalfDay = () => {
    setFullDay(false);
    setHalfDay(true);
    setShortLeave(false);
    setFirstDayValue('H');
  };
  const onPressShortLeave = () => {
    setFullDay(false);
    setHalfDay(false);
    setShortLeave(true);
    setFirstDayValue('Q');
  };
  const onPressWithPay = () => {
    setWithPay(true);
    setWithoutPay(false);
    setPayValue('Y');
  };
  const onPressWithoutPay = () => {
    setWithPay(false);
    setWithoutPay(true);
    setPayValue('N');
  };

  const onChangeReason = val => {
    setReasonText(val);
  };

  const onPressSubmitRequest = () => {
    dispatch(
      ApplyLeaveAction({
        employee_id: JSON.parse(profileHereEmpId),
        from_date: moment(fromDate, 'ddd, MMM DD, YYYY').format('DD/MM/YYYY'),
        to_date: moment(toDate, 'ddd, MMM DD, YYYY').format('DD/MM/YYYY'),
        total_days: totalDays,
        leave_type: empLeaveTypeId,
        op_leave_type: firstDayValue,
        op_pay_type: payValue,
        reason: reasonText,
        forward_to: empLeaveForwardToId,
      }),
    );
  };

  useEffect(() => {
    if (applyLeaveSuccessResponseHere == 0) {
      setShowErrorModal(true);
    } else if (applyLeaveSuccessResponseHere == 1) {
      setShowSuccessModal(true);
    }
  }, [applyLeaveSuccessResponseHere]);

  const closeModal = () => {
    dispatch(clearAllStateApplyLeave());
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Additional logic when screen gains focus
      // dispatch(clearAllStateApplyLeave());
      return () => {
        // Additional logic when screen loses focus
        // dispatch(clearAllStateApplyLeave());
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
        // minimumDate={new Date()}
      />
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisibleTwo}
        onConfirm={handleDateConfirmTwo}
        onCancel={hideDatePickerTwo}
      />
      <MainHeader
        text={'Apply Leave'}
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
          // style={styles.textInputCustomStyle}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressLeaveTypeModal}
        style={{
          flexDirection: 'row',
          marginTop: hp(1.5),
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
            icon={'fat fa-calendar-exclamation'}
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
          <Text style={styles.dropdown1BtnTxt}>
            {empLeaveType == null ? 'Leave Type' : empLeaveType}
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

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('4'),
          height: hp('4'),
          marginTop: hp('3'),
          marginBottom: hp('2'),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressFullDay}
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
              source={{uri: fullDay ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Full Day</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressHalfDay}
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
              source={{uri: halfDay ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Half Day</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressShortLeave}
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
              source={{uri: shortLeave ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Short Leave</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginHorizontal: hp(2.5),
          height: hp(0.05),
          backgroundColor: '#DBDBDB',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('4'),
          height: hp('4'),
          marginTop: hp('1.5'),
          marginBottom: hp('1.5'),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressWithPay}
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
              source={{uri: withPay ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>With Pay</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.33,
            flexDirection: 'row',
          }}></View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressWithoutPay}
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
              source={{uri: withoutPay ? 'radiogreen' : 'circelgrey'}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dropdown1RowTxtStyle}>Without Pay</Text>
          </View>
        </TouchableOpacity>
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
          marginTop: hp('1'),
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

      {leaveTypeModal && (
        <LeaveTypeModal
          onPressOpacity={onPressLeaveTypeModal}
          leaveTypesData={leaveTypeHere?.userData?.leave_types}
          renderItem={renderItemLeaveTypes}
        />
      )}

      {forwardToModal && (
        <LeaveForwardToModal
          topText={'Forward To'}
          onPressOpacity={onPressForwardToModal}
          leaveTypesData={leaveTypeHere?.userData?.forward_to}
          renderItem={renderItemForwardTo}
        />
      )}

      {showSuccessModal && (
        <MessageSuccessModal
          text={'Request Submit'}
          onPressOpacity={closeModal}
        />
      )}

      {showErrorModal && (
        <MessageSuccessModal
          textUpper={'Request Failed'}
          textLower={applyLeaveHere?.message}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}

      {showSuccessModal && (
        <MessageSuccessModal
          textUpper={'Request Completed'}
          textLower={applyLeaveHere?.message}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}
    </ScrollView>
  );
};

export default ApplyLeave;

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
