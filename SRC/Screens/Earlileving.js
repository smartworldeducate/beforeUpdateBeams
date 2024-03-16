import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import colors from '../Styles/colors';
import {Div, ThemeProvider, Radio} from 'react-native-magnus';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Ficon from 'react-native-fontawesome-pro';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ViewInput from '../Components/ViewInput';
import Button from '../Components/Button/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import ViewInputTwo from '../Components/ViewInputTwo';
import Icon from 'react-native-fontawesome-pro';
import {reporteeHandleFun} from '../features/reportee/createSlice';
import {getLineMangerHandller} from '../features/lineManager/createSlice';
import {useDispatch, useSelector} from 'react-redux';

const EarliLeaving = props => {
  const dispatch = useDispatch();
  const [fullDay, setFullDay] = useState(false);
  const [halfDay, setHalfDay] = useState(false);
  const [shortLeave, setShortLeave] = useState(false);
  const [withPay, setWithPay] = useState(false);
  const [withOutPay, setWithOutPay] = useState(false);
  const [stime, setStime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleTwo, setDatePickerVisibilityTwo] = useState(false);
  const [isDatePickerVisibleThree, setDatePickerVisibilityThree] =
    useState(false);
  const [myDate, setMyDate] = useState('');
  const [dateTwo, setDateTwo] = useState('');
  const [dateThree, setDateThree] = useState('');
  const [selectValue, setSelectValue] = useState(0);
  const [selectLeave, setSelectLeave] = useState('');
  const [reporteeData, setReporteeData] = useState([]);
  const [empLength, setEmpLength] = useState('');
  const [mangerData, setMangerData] = useState([]);
  const reportee = ['Muhammad Qasim Ali Khan', 'Asad Numan Shahid'];
  const userData = useSelector(state => state.reportee);

  const lineMangerHandler = async () => {
    try {
      const lineMdata = await dispatch(getLineMangerHandller());
      console.log('line manager data', lineMdata?.payload?.data);
      if (lineMdata && lineMdata.payload && lineMdata.payload.data) {
        console.log(
          'line manager data inside dispatch',
          lineMdata?.payload?.data,
        );
        setMangerData(lineMdata?.payload?.data);
      }
      return lineMdata;
    } catch (error) {
      console.error('Error in reporteeHandler:', error);
      throw error;
    }
  };
  const reporteeHandler = async val => {
    try {
      // console.log('selected value', val);
      const reportee = await dispatch(reporteeHandleFun(val));
      if (reportee && reportee.payload && reportee.payload.data) {
        console.log('reprtee dada inside dispatch', reportee.payload?.data);
        setReporteeData(reportee.payload?.data);
        setEmpLength(reportee.payload?.data?.length);
      }
      return reportee;
    } catch (error) {
      console.error('Error in reporteeHandler:', error);
      throw error;
    }
  };

  useEffect(() => {
    setReporteeData(userData);
    const rd = reporteeHandler({
      reportingToId: selectValue ? selectValue : '18776',
    });
    setReporteeData(rd.payload?.data);
    const lmd = lineMangerHandler();
    console.log('linemanger data', lmd.payload?.data);
    // setMangerData(lmd);
  }, [selectValue]);
  //one
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const dt = day + '-' + month + '-' + year;

    setMyDate(dt);
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
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const dt = day + '-' + month + '-' + year;

    setDateTwo(dt);
    hideDatePickerTwo();
  };

  //third date time picker
  const showDatePickerThree = () => {
    setDatePickerVisibilityThree(true);
  };

  const hideDatePickerThree = () => {
    setDatePickerVisibilityThree(false);
  };

  const handleDateConfirmThree = date => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const dt = day + '-' + month + '-' + year;

    setDateThree(dt);
    hideDatePickerThree();
  };

  //timepicker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleSconfirm = time => {
    const x = time.toLocaleTimeString();
    setStime(x);
    hideTimePicker();
  };

  const fulDayHandle = () => {
    setFullDay(!fullDay);
  };
  const halfDayHandle = () => {
    setHalfDay(!halfDay);
  };
  const shortLeaveHandle = () => {
    setShortLeave(!shortLeave);
  };
  const withPayHandle = () => {
    setWithPay(!withPay);
  };
  const withOutPayHandle = () => {
    setWithOutPay(!withOutPay);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleSconfirm}
        onCancel={hideTimePicker}
      />
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
        isVisible={isDatePickerVisibleThree}
        onConfirm={handleDateConfirmThree}
        onCancel={hideDatePickerThree}
        mode="date"
      />
      <MainHeader
        text={'Early Leaving'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <>
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
            dateText={myDate}
            dateFun={showDatePicker}
            iconName={'arrow-right'}
            rIcon={'angles-up-down'}
            placeholder={'Tue, Jun 27, 2023'}
            placeholderColor={colors.loginTextColor}
            iconColor={colors.loginIconColor}
          />
        </View>

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
            dateText={dateTwo}
            dateFun={showDatePickerTwo}
            iconName={'arrow-right'}
            placeholder={'Tue, Jun 27, 2023'}
            placeholderColor={colors.loginTextColor}
            iconColor={colors.loginIconColor}
            // style={styles.textInputCustomStyle}
          />
        </View>
        <View
          style={{
            marginTop: hp(2),
            marginHorizontal: wp('5'),
            backgroundColor: '#FFF2CC',
            borderRadius: wp(10),
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowRadius: wp('15'),
            elevation: 10,
          }}>
          <ViewInput
            dateText={dateThree}
            dateFun={showDatePickerThree}
            iconName={'calendar-days'}
            placeholder={'8 Days'}
            placeholderColor={colors.loginTextColor}
            iconColor={colors.loginIconColor}
          />
        </View>
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
            dateText={stime}
            dateFun={showTimePicker}
            iconName={'clock-three'}
            placeholder={'Departure'}
            placeholderColor={colors.loginTextColor}
            iconColor={colors.loginIconColor}
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
            marginTop: hp('2'),
          }}>
          <TextInput
            placeholder={'Reason'}
            placeholderTextColor="#363636"
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
            <Ficon type="light" name={'user-tie'} color={'#000'} size={25} />
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
              Muhammad Qasim Ali Khan
            </Text>
          </View>
          <View
            activeOpacity={0.8}
            style={{
              flex: 0.14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ficon
              type="light"
              name="angles-up-down"
              color="#cdcdcd"
              size={16}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            marginTop: hp(15),
            marginHorizontal: hp(2.75),
            height: hp(6.5),
            justifyContent: 'center',
            backgroundColor: '#1C37A4',
            borderRadius: hp(50),
            alignItems: 'center',
          }}>
          <Text style={styles.submittext}>SUBMIT REQUEST</Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
};

export default EarliLeaving;

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
    // fontSize: '0.7rem',
    // height: hp('6'),
    // letterSpacing: -0.05,
    // paddingLeft: wp('3'),
    // color: '#363636',
    // fontWait: '500',
    // fontFamily: fontFamily.ceraMedium,
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
    color: 'gray',
    fontSize: '0.7rem',
    fontWaight: 500,
    marginLeft: hp(1.5),
    fontFamily: fontFamily.ceraMedium,
  },
});
