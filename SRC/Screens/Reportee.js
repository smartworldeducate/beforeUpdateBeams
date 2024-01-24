import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {reporteeHandleFun} from '../features/reportee/createSlice';
import {currentEmpDateDataHandler} from '../features/currntdataofemployee/createSlice';
import {useSelector, useDispatch} from 'react-redux';
import {getLineMangerHandller} from '../features/lineManager/createSlice';
const Reportee = props => {
  const dispatch = useDispatch();
  const [reporteeData, setReporteeData] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [empLength, setEmpLength] = useState('');
  const [mangerData, setMangerData] = useState([]);
  const lineMangerData = useSelector(state => state.getLineManger);
  const userData = useSelector(state => state.reportee);
  console.log('line manger data', mangerData);

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
        // console.log('reprtee dada inside dispatch', reportee.payload?.data);
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setDate('');
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    console.log(date);
    const dt =
      date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    setDate(dt);
    hideDatePicker();
    setDateView(false);
  };
  const mainData = [
    {
      id: 22,
      imag: 'artg',
      text: 'Zeeshan A.Hafeez',
      title: 'Senior Officer UX/UI Design',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      timeout: '--:--:--',
      number: '17-06-2023',
      month: 'SUN',
      backgroundColor: '#E5F7FF',
      color: '#363636',
      textInColor: '#10B727',
      isWorking: 'working',
      workingHours: 'Full Toil',
      textoutcolor: '#363636',
      day: 'sun',
    },
    {
      id: 21,
      imag: 'asd',
      text: 'Yashfa Arslan',
      title: 'Assistant Manager Software',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      iconup: 'arrow-up-right',
      timeout: '09:44:47',
      number: '08:44:47',
      month: 'MON',
      color: '#363636',
      textInColor: '#F64E60',
      workingHours: '09:00',
      day: 'mon',
      textoutcolor: '#10B727',
    },
    {
      id: 20,
      imag: 'imran',
      text: 'Maryam Ahmad',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      icondown: '',
      timeout: 'On Leave',
      number: 'On Leave',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 19,
      imag: 'salman',
      text: 'Muhammad Moeez',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      iconup: '',
      timeout: 'Call for update',
      number: '08:17:03',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
      borrds: '',
    },
    {
      id: 22,
      imag: 'artg',
      text: 'Zeeshan A.Hafeez',
      title: 'Senior Officer UX/UI Design',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      timeout: '--:--:--',
      number: '17-06-2023',
      month: 'SUN',
      backgroundColor: '#E5F7FF',
      color: '#363636',
      textInColor: '#10B727',
      isWorking: 'working',
      workingHours: 'Full Toil',
      textoutcolor: '#363636',
      day: 'sun',
    },
    {
      id: 21,
      imag: 'asd',
      text: 'Yashfa Arslan',
      title: 'Assistant Manager Software',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      iconup: 'arrow-up-right',
      timeout: '09:44:47',
      number: '08:44:47',
      month: 'MON',
      color: '#363636',
      textInColor: '#F64E60',
      workingHours: '09:00',
      day: 'mon',
      textoutcolor: '#10B727',
    },
    {
      id: 20,
      imag: 'imran',
      text: 'Maryam Ahmad',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      icondown: '',
      timeout: 'On Leave',
      number: 'On Leave',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 19,
      imag: 'salman',
      text: 'Muhammad Moeez',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      iconup: '',
      timeout: 'Call for update',
      number: '08:17:03',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
      borrds: '',
    },
    {
      id: 22,
      imag: 'artg',
      text: 'Zeeshan A.Hafeez',
      title: 'Senior Officer UX/UI Design',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      timeout: '--:--:--',
      number: '17-06-2023',
      month: 'SUN',
      backgroundColor: '#E5F7FF',
      color: '#363636',
      textInColor: '#10B727',
      isWorking: 'working',
      workingHours: 'Full Toil',
      textoutcolor: '#363636',
      day: 'sun',
    },
    {
      id: 21,
      imag: 'asd',
      text: 'Yashfa Arslan',
      title: 'Assistant Manager Software',
      timein: '08:44:47',
      icondown: 'arrow-down-right',
      iconup: 'arrow-up-right',
      timeout: '09:44:47',
      number: '08:44:47',
      month: 'MON',
      color: '#363636',
      textInColor: '#F64E60',
      workingHours: '09:00',
      day: 'mon',
      textoutcolor: '#10B727',
    },
    {
      id: 20,
      imag: 'imran',
      text: 'Maryam Ahmad',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      icondown: '',
      timeout: 'On Leave',
      number: 'On Leave',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 19,
      imag: 'salman',
      text: 'Muhammad Moeez',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      iconup: '',
      timeout: 'Call for update',
      number: '08:17:03',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
      borrds: '',
    },
    {
      id: 20,
      imag: 'imran',
      text: 'Maryam Ahmad',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      icondown: '',
      timeout: 'On Leave',
      number: 'On Leave',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 19,
      imag: 'salman',
      text: 'Muhammad Moeez',
      title: 'Deputy Manager Software',
      timein: '',
      icondown: '',
      iconup: '',
      timeout: 'Call for update',
      number: '08:17:03',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
      borrds: '',
    },
  ];
  return (
    <>
      <View>
        <MainHeader
          text={'Reportees'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: hp(2.5),
          marginTop: hp(1),
        }}>
        <View style={{width: wp(43), zIndex: 1}}>
          <SelectDropdown
            data={mangerData}
            onSelect={(selectedItem, index) => {
              setSelectValue(selectedItem?.EMPLOYEE_ID);
            }}
            defaultButtonText={'Muhammad Qasim Ali Khan'}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  {selectedItem ? (
                    <Image
                      source={selectedItem.image}
                      style={styles.dropdown3BtnImage}
                    />
                  ) : (
                    ''
                  )}
                  <Text style={[styles.dropdown3BtnTxt, {color: '#363636'}]}>
                    {selectedItem ? selectedItem.EMP_NAME : ' Qasim Ali Khan'}
                  </Text>
                </View>
              );
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Image source={item.image} style={styles.dropdownRowImage} />
                  <Text style={styles.dropdown1RowTxtStyle}>
                    {item.EMP_NAME}
                  </Text>
                </View>
              );
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            dropdownIconPosition={'left'}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showDatePicker}
          style={{
            width: wp(43),
          }}>
          <View
            style={{
              height: hp(6),
              flexDirection: 'row',
              borderColor: '#E4DFDF',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderRadius: hp(1.2),
              backgroundColor: '#FFFFFF',
              paddingLeft: hp(1.5),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'gray'}}>{date}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1.5),
              }}>
              <Icon
                type="light"
                name="angles-up-down"
                size={hp(2)}
                color="#cdcdcd"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: hp(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: hp(2.5),
          marginTop: hp(2),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.4)}}>
            <Icon
              type="light"
              name="circle-sterling"
              size={hp(3)}
              color="#8A2F9B"
            />
          </View>
          <View style={{marginLeft: hp(0.8)}}>
            <View>
              <Text style={styles.smalltext}>15</Text>
            </View>
            <View style={{marginTop: hp(-0.2)}}>
              <Text style={styles.smalltext1}>Total</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.4)}}>
            <Icon type="light" name="circle-check" size={hp(3)} color="green" />
          </View>
          <View style={{marginLeft: hp(0.5)}}>
            <View>
              <Text style={styles.smalltext}>06</Text>
            </View>
            <View style={{marginTop: hp(-0.2)}}>
              <Text style={styles.smalltext1}>present</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.4)}}>
            <Icon
              type="light"
              name="circle-xmark"
              size={hp(3)}
              color="#CD6155"
            />
          </View>
          <View style={{marginLeft: hp(0.5)}}>
            <View>
              <Text style={styles.smalltext}>09</Text>
            </View>
            <View style={{marginTop: hp(-0.2)}}>
              <Text style={styles.smalltext1}>Absent</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: hp(0.05),
          backgroundColor: '#cdcdcd',
          marginTop: hp(1),
        }}></View>

      <ScrollView>
        {reporteeData &&
          reporteeData.map((item, i) => {
            const {
              DESIGNATION,
              EMP_IN_TM,
              EMP_NAME,
              EMP_OUT_TM,
              EMP_PHOTO,
              ISEARLY,
              ISLATE,
              LATE_TM,
              LATE_OUT_TM,
              REC_STATUS,
              STATUS,
            } = item;
            return (
              <View
                style={{
                  height: hp(6.5),
                  flexDirection: 'row',
                  marginHorizontal: hp(2.5),
                  borderBottomColor: 'grey',
                  borderBottomWidth: wp('0.1'),
                }}
                key={i}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 0.5,
                    marginLeft: wp(1),
                  }}>
                  <View style={{}}>
                    <Image
                      style={{
                        width: wp(7),
                        height: hp(3.5),
                        borderRadius: hp(50),
                      }}
                      source={{uri: 'group'}}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{paddingLeft: hp(1)}}>
                    <View>
                      <Text style={styles.testname}>{EMP_NAME}</Text>
                    </View>
                    <View>
                      <Text style={styles.desig}>{DESIGNATION}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {EMP_IN_TM == null && EMP_OUT_TM == null ? (
                    <View
                      style={{
                        backgroundColor: '#1C37A4',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: hp(5),
                        height: hp(4),
                        width: wp(35),
                      }}>
                      <Text style={{color: '#fff'}}>Call for update</Text>
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 0.5,
                        }}>
                        {item.icondown && (
                          <View style={{justifyContent: 'center'}}>
                            <Icon
                              type="light"
                              name={item.icondown}
                              size={hp(2)}
                              color={item.textInColor}
                            />
                          </View>
                        )}
                        <View
                          style={{
                            justifyContent: 'center',
                            paddingLeft: hp(0.5),
                          }}>
                          <Text
                            style={[
                              styles.timestyle,
                              {color: item.textInColor},
                            ]}>
                            {EMP_IN_TM != '' ? EMP_IN_TM : 'NULL'}
                          </Text>
                        </View>
                      </View>
                      {EMP_OUT_TM && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.5,
                            // backgroundColor: 'pink',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Icon
                              type="light"
                              name="arrow-up-right"
                              size={hp(2)}
                              color={LATE_TM ? 'red' : 'green'}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              paddingLeft: hp(0.5),
                            }}>
                            <Text
                              style={[
                                styles.timestyle,
                                {color: LATE_TM ? 'red' : 'green'},
                              ]}>
                              {EMP_OUT_TM != '' ? EMP_OUT_TM : 'NULL'}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

export default Reportee;

const styles = EStyleSheet.create({
  smalltext: {
    fontWeight: '500',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '500',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#353535',
    fontStyle: 'normal',
    alignItems: 'center',
  },
  iconSty: {
    fontSize: hp(2.5),
    color: '#A6ACAF',
    fontWeight: 100,
  },
  headertext: {
    fontSize: '0.75rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#363636',
    fontWeight: '500',
  },
  duction: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  circularText: {
    fontSize: '0.75rem',
    color: '#646464',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  circularText1: {
    fontSize: '0.5rem',
    color: '#979797',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    marginHorizontal: hp(0.9),
    textTransform: 'uppercase',
  },
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  duction: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  testname: {
    color: '#343434',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  textobj: {
    color: '#505255',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: hp(1.8),
  },
  objnum: {
    color: '#969696',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  zetext: {
    color: '#363636',
    fontWeight: '700',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraBlack,
  },
  zetext1: {
    color: '#363636',
    fontWeight: '500',
    // marginTop: hp(1),
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraBlack,
  },
  smalltext: {
    fontWeight: '700',
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraBold,
    color: '#353535',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '300',
    fontSize: '0.45rem',
    fontFamily: fontFamily.ceraLight,
    color: '#979797',
    fontStyle: 'normal',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  dtext: {
    color: '#353535',
    fontSize: '0.65rem',
    fontWeight: '700',
    fontStyle: 'normal',
    paddingVertical: hp(0.5),
    fontFamily: fontFamily.ceraBold,
  },
  desig: {
    color: '#343434',
    fontSize: '0.45rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  timestyle: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: hp(5.9),
    backgroundColor: '#FFF',
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: '#cdcdcd',
    // elevation: 8,
  },
  dropdown1BtnTxtStyle: {
    color: '#363636',
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraMedium,
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    marginTop: hp(-5),
    borderRadius: hp(1.5),
  },
  dropdown3RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    width: wp(100),
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    color: '#363636',
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraMedium,
  },
  dropdown3RowChildStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
