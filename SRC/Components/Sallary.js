import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Menu from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-fontawesome-pro';
import {BottomSheet} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import fontFamily from '../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Fgraph from './Graph';
import Pdf from 'react-native-pdf';
import {reporteeHandleFun} from '../features/reportee/createSlice';
import {getLineMangerHandller} from '../features/lineManager/createSlice';
const SallaryComp = () => {
  const dispatch = useDispatch();
  // const lineMangerData = useSelector(state => state.getSalMonth);
  const userData = useSelector(state => state.reportee);

  const employeeSallary = useSelector(state => state.getEmpSalary);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectValue, setSelectValue] = useState(0);
  const [reporteeData, setReporteeData] = useState([]);
  const [mangerData, setMangerData] = useState([]);

  // console.log("text certificate data",mangerData)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hide, setHide] = useState(true);
  const [date, setDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [pf, setPf] = useState(false);
  const [txt, setTxt] = useState(false);
  const [slip, setSlip] = useState(false);
  // const [salMonth, setSalMonth] = useState([]);
  // const [dateEmp, setDateEmp] = useState('2023-01-01');
  // const [historyData, setHistoryData] = useState([]);
  const lineMangerHandler = async () => {
    try {
      const lineMdata = await dispatch(getLineMangerHandller());
      // console.log('line manager data', lineMdata?.payload?.data);
      if (lineMdata && lineMdata.payload && lineMdata.payload.data) {
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
        // setEmpLength(reportee.payload?.data?.length)
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
    // console.log("linemanger data",lmd.payload?.data)
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
    setHide(false);
  };
  const pfHandler = () => {
    setPf(true);
    setVisible(true);
    setTxt(false);
    setSlip(false);
  };
  const txtHandler = () => {
    setPf(false);
    setTxt(true);
    setVisible(true);
    setSlip(false);
  };
  const handleReset = () => {
    setVisible(false);
  };
  const slipHandler = () => {
    setPf(false);
    setTxt(false);
    setSlip(true);
    setVisible(true);
  };
  const [salary, setSalary] = useState(true);

  console.log('employeeSallary', employeeSallary);

  return (
    <View style={{flex: 1}}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      {salary == true && (
        <View style={{flex: 1}}>
          {pf && (
            <BottomSheet
              isVisible={visible}
              style={{
                // width: wp(100),
                marginTop: hp(8),
                backgroundColor: '#fff',
                flex: 1,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1C37A5', '#4D69DC']}
                style={styles.mainHeader}>
                <View
                  style={{
                    marginHorizontal: hp(2.5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginVertical: hp(1.5),
                      height: hp(5),
                    }}>
                    <Text style={{color: '#fff', paddingBottom: hp(0.1)}}>
                      PF CERTIFICATE
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                        )
                      }
                      style={{
                        justifyContent: 'center',
                        marginVertical: hp(1.5),
                        height: hp(5),
                        marginRight: hp(3),
                      }}>
                      <Icon
                        type="light"
                        name="download"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleReset}
                      style={{justifyContent: 'center', marginTop: hp(0.3)}}>
                      <Icon
                        type="light"
                        name="xmark"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
              {hide && (
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      marginHorizontal: hp(2.5),
                      marginTop: hp(2),
                    }}>
                    <View
                      style={{
                        height: hp(6.5),
                        flexDirection: 'row',
                        borderColor: '#E4DFDF',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderRadius: hp(1.2),
                        backgroundColor: '#FFFFFF',
                        paddingLeft: hp(1.5),
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {date && <Text style={{color: 'gray'}}>{date}</Text>}
                        {!date && (
                          <Text style={{color: 'gray'}}>
                            Select Financial year
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingRight: hp(1.5),
                        }}>
                        <Icon
                          type="light"
                          name="calendar-days"
                          size={hp(2)}
                          color="#cdcdcd"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: hp(2.5),
                    }}>
                    <View></View>
                    <TouchableOpacity
                      style={{
                        height: hp(4),
                        marginTop: hp(1),
                        width: wp(20),
                        borderRadius: hp(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#4D69DC',
                        elevation: 1,
                      }}>
                      <Text style={{color: '#FFF'}}>Print</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {date && (
                <View style={styles.container}>
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: 'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                    }}
                    onLoadComplete={(numberOfPages, filePath) => {
                      console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`Current page: ${page}`);
                    }}
                    onError={error => {
                      console.log(error);
                    }}
                    onPressLink={uri => {
                      console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                  />
                </View>
              )}
            </BottomSheet>
          )}
          {txt && (
            <BottomSheet
              isVisible={visible}
              style={{
                // width: wp(100),
                marginTop: hp(8),
                backgroundColor: '#fff',
                flex: 1,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1C37A5', '#4D69DC']}
                style={styles.mainHeader}>
                <View
                  style={{
                    marginHorizontal: hp(2.5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginVertical: hp(1.5),
                      height: hp(5),
                    }}>
                    <Text style={{color: '#fff', paddingBottom: hp(0.1)}}>
                      Tax CERTIFICATE
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                        )
                      }
                      style={{
                        justifyContent: 'center',
                        marginVertical: hp(1.5),
                        height: hp(5),
                        marginRight: hp(3),
                      }}>
                      <Icon
                        type="light"
                        name="download"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleReset}
                      style={{justifyContent: 'center', marginTop: hp(0.3)}}>
                      <Icon
                        type="light"
                        name="xmark"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
              {hide && (
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      marginHorizontal: hp(2.5),
                      marginTop: hp(2),
                      zIndex: 1,
                    }}>
                    <View
                      style={{
                        height: hp(6.5),

                        borderRadius: hp(1.2),
                        backgroundColor: '#FFFFFF',
                      }}>
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
                              <Text
                                style={[
                                  styles.dropdown3BtnTxt,
                                  {color: '#363636'},
                                ]}>
                                {selectedItem
                                  ? selectedItem.EMP_NAME
                                  : ' Qasim Ali Khan'}
                              </Text>
                            </View>
                          );
                        }}
                        renderCustomizedRowChild={(item, index) => {
                          return (
                            <View style={styles.dropdown3RowChildStyle}>
                              <Image
                                source={item.image}
                                style={styles.dropdownRowImage}
                              />
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
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: hp(2.5),
                    }}>
                    <View></View>
                    <TouchableOpacity
                      style={{
                        height: hp(4),
                        marginTop: hp(1),
                        width: wp(20),
                        borderRadius: hp(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#4D69DC',
                      }}>
                      <Text style={{color: '#FFF'}}>Print</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {value && (
                <View style={styles.container}>
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: 'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                    }}
                    onLoadComplete={(numberOfPages, filePath) => {
                      console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`Current page: ${page}`);
                    }}
                    onError={error => {
                      console.log(error);
                    }}
                    onPressLink={uri => {
                      console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                  />
                </View>
              )}
            </BottomSheet>
          )}
          {slip && (
            <BottomSheet
              isVisible={visible}
              style={{
                // width: wp(100),
                marginTop: hp(8),
                backgroundColor: '#fff',
                flex: 1,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1C37A5', '#4D69DC']}
                style={styles.mainHeader}>
                <View
                  style={{
                    marginHorizontal: hp(2.5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginVertical: hp(1.5),
                      height: hp(5),
                    }}>
                    <Text style={{color: '#fff', paddingBottom: hp(0.1)}}>
                      Tax CERTIFICATE
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                        )
                      }
                      style={{
                        justifyContent: 'center',
                        marginVertical: hp(1.5),
                        height: hp(5),
                        marginRight: hp(3),
                      }}>
                      <Icon
                        type="light"
                        name="download"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleReset}
                      style={{justifyContent: 'center', marginTop: hp(0.3)}}>
                      <Icon
                        type="light"
                        name="xmark"
                        size={hp(3)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.container}>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: 'https://beams.beaconhouse.edu.pk/core/mobile_app/pdf/student_certificate_pdf.php?id=',
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={error => {
                    console.log(error);
                  }}
                  onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={styles.pdf}
                />
              </View>
            </BottomSheet>
          )}
          <ScrollView>
            {employeeSallary &&
              employeeSallary?.user.map((item, i) => {
                console.log('item', item);
                return (
                  <View key={i}>
                    <View style={{flex: 1}}>
                      <Fgraph item={item} />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: hp(2.5),
                        marginTop: hp(2),
                      }}>
                      <View
                        style={{
                          height: hp(4.5),
                          backgroundColor: '#E7E7E7',
                          justifyContent: 'center',
                          paddingLeft: hp(1),
                        }}>
                        <Text style={styles.duction}>Deductions</Text>
                      </View>

                      <View>
                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>PF Own</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>{item?.PF_OWN}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>EOBI Own</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>
                              {item?.EOBI_COMP}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>Income Tax</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>
                              {item?.INCOME_TAX}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>
                              Absent Deduction (Absent days)
                            </Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>
                              {item?.ABSENT_DED}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>Other Deduction</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>{item?.OTH_DED}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>Total Deduction</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>
                              {item?.TOTAL_DED}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>Net Salary</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>{item?.NET_SAL}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>

                        <View
                          style={{
                            height: hp(5),
                            marginHorizontal: hp(1),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.testname}>Net Salary</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textnum}>{item?.NET_SAL}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#DBDBDB',
                          }}></View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          <View
            style={{
              height: hp(8),
              backgroundColor: '#1C37A4',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={pfHandler}
              style={{flex: 0.33, alignItems: 'center'}}>
              <Text style={styles.ftbotom}>PF CERTIFICATE</Text>
            </TouchableOpacity>
            <View
              style={{
                width: wp(0.4),
                height: hp(7),
                backgroundColor: '#FFF',
                borderRadius: hp(50),
              }}></View>
            <TouchableOpacity
              onPress={txtHandler}
              style={{
                flex: 0.33,
                paddingTop: hp(0.5),
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: hp(1),
              }}>
              <View style={{alignItems: 'center', marginHorizontal: hp(1.2)}}>
                <Text style={styles.ftbotom}>TAX CERTIFICATE</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: wp(0.4),
                height: hp(7),
                backgroundColor: '#FFF',
                borderRadius: hp(50),
              }}></View>

            <TouchableOpacity
              style={{flex: 0.33, alignItems: 'center'}}
              onPress={slipHandler}>
              <Text style={styles.ftbotom}>SALARY SLIP</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SallaryComp;

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
  testname: {
    color: '#343434',
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
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
  ftbotom: {
    color: '#FFF',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  mainHeader: {
    height: hp(8),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(0),
    borderBottomLeftRadius: hp(0),
  },
  container: {
    flex: 1,
    marginTop: hp(0),
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.5rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  renderdot: {
    height: hp(3.7),
    width: wp(2.5),
    borderRadius: 1,
    //   backgroundColor: color,
    marginRight: 10,
  },
  salaryMainView: {
    height: hp(7),
    marginHorizontal: hp(2.5),
    borderRadius: hp(1),
    backgroundColor: '#E7E7E7',
    marginTop: hp(2),
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
    marginTop: hp(0),
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
    marginLeft: hp(1.5),
  },
});
