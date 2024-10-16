import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';

import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import YearSelectionModal from '../Components/Modal/YearSelectionModal';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import {AttendanceCalanderAction} from '../features/AttendanceCalanderSlice/AttendanceCalanderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader/Loader';
import colors from '../Styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Attendance = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const leaveHistoryHere = useSelector(state => state.salaryYearsStore);

  const totalYears = leaveHistoryHere?.userData?.total_years;

  const [yearSelectionModal, setyearSelectionModal] = useState(false);

  // const lastElement = totalYears[totalYears?.length - 1];

  const lastElement = totalYears ? totalYears[totalYears?.length - 1] : null;

  const [selectedYear, setSelectedYear] = useState(lastElement);

  const attendanceCalanderHere = useSelector(
    state => state.AttendanceCalanderStore,
  );

  const onPressSelectYearModal = () => {
    // console.log('onPressSelectYearModal');
    setyearSelectionModal(!yearSelectionModal);
  };

  const years = [
    {id: '01', month: 'January'},
    {id: '02', month: 'Fabruary'},
    {id: '03', month: 'March'},
    {id: '04', month: 'April'},
    {id: '05', month: 'May'},
    {id: '06', month: 'June'},
    {id: '07', month: 'July'},
    {id: '08', month: 'August'},
    {id: '09', month: 'September'},
    {id: '10', month: 'October'},
    {id: '11', month: 'November'},
    {id: '12', month: 'December'},
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  // console.log('currentMonth', currentMonth);

  const selectedMonth = currentMonth - 1;
  // console.log('selectedMonth', selectedMonth);

  const [initialMonth, setInitialMonth] = useState(currentMonth);
  // console.log('initialMonth', initialMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          AttendanceCalanderAction({
            employee_id: parsedLoginData,
            month_year: `${
              initialMonth != null ? initialMonth : currentMonth
            }/${selectedYear != null ? selectedYear : lastElement}`,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedYear(null);
      setInitialMonth(null);
      return () => {
        console.log('Attendance Page is unfocused');
        dispatch(
          AttendanceCalanderAction({
            employee_id: profileHereEmpId,
            month_year: `${
              initialMonth != null ? initialMonth : currentMonth
            }/${selectedYear != null ? selectedYear : lastElement}`,
          }),
        );
      };
    }, []),
  );

  const renderItemYears = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onPressYear({item, index})}
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: wp('0.15'),
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingVertical: hp('1.25'),
        }}>
        <Text
          style={{
            fontSize: hp('2.5'),
            fontFamily: fontFamily.ceraMedium,
            color: 'black',
            fontWeight: '500',
            paddingLeft: wp('2'),
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          initialMonth != null
            ? initialMonth == item?.id
              ? ['#1C37A5', '#4D69DC']
              : [colors.appBackGroundColor, colors.appBackGroundColor]
            : currentMonth == item?.id
            ? ['#1C37A5', '#4D69DC']
            : [colors.appBackGroundColor, colors.appBackGroundColor]
        }
        style={{
          borderRadius: wp('8'),
          height: hp('4'),
          width: wp('20'),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: wp('2'),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressMonth({item})}
          style={{}}>
          <Text
            style={{
              color: 'gray',
              fontSize: hp(1.5),
              color:
                initialMonth != null
                  ? initialMonth == item?.id
                    ? 'white'
                    : '#1C37A4'
                  : currentMonth == item?.id
                  ? 'white'
                  : '#1C37A4',
            }}>
            {item.month}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const onPressMonth = item => {
    // console.log('item', item?.item?.id);
    setInitialMonth(item?.item?.id);

    dispatch(
      AttendanceCalanderAction({
        employee_id: profileHereEmpId,
        month_year: `${item?.item?.id}/${
          selectedYear != null ? selectedYear : lastElement
        }`,
      }),
    );
  };

  const onPressYear = ({item}) => {
    setSelectedYear(item);
    // console.log('onPressYear');

    dispatch(
      AttendanceCalanderAction({
        employee_id: profileHereEmpId,
        month_year: `${
          initialMonth != null ? initialMonth : currentMonth
        }/${item}`,
      }),
    );
    setyearSelectionModal(!yearSelectionModal);
  };

  const currentDate1 = new Date();

  const formattedDate = currentDate1.toISOString().split('T')[0];
  console.log('formattedDate', formattedDate);

  const renderItemAttendance = ({item, index}) => {
    const today = item?.att_date;

    const [year, month, day] = today.split('-');

    const leaveStatus = item?.status == '' ? null : item?.status;

    const showApplyText =
      !item.holiday_desc && !item.emp_in_time && !item.emp_out_time;

    const showLeaveType = item.leavetype_desc && item.leavetype_desc !== '';

    const displayedText =
      item?.holiday_desc == null
        ? item?.emp_in_time != null && item?.emp_out_time != null
          ? item?.total_working_hours
          : ''
        : '';

    const currentDate = new Date();

    return (
      <View
        style={{
          flexDirection: 'row',

          backgroundColor: item?.holiday_desc != null ? '#FEF7DC' : null,
          borderBottomWidth: wp('0.08'),
          borderBottomColor: 'black',
          paddingVertical: hp('1'),
        }}>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: '#cfcfcf',
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: hp('2.25'),
                fontFamily: fontFamily.ceraBold,
                letterSpacing: 1,
              }}>
              {day}
            </Text>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: hp('1.6'),
                marginTop: hp('-0.7'),
                fontFamily: fontFamily.ceraLight,
              }}>
              {item?.fin_year_day}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={
              item?.late_minutes > 15 && item?.late_ded_run == 'N' ? 0.4 : 1
            }

            // for Temp commented before Live aab
            // onPress={
            //   item?.late_minutes > 15 && item?.late_ded_run == 'N'
            //     ? () =>
            //         navigation.navigate('LateArivel', {
            //           attenValue: item?.att_date,
            //           lateArrivalTime: item?.emp_in_time,
            //         })
            //     : null
            // }
          >
            {item?.rec_status !== 'Toil' && (
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{
                  textAlign: 'center',
                  fontSize: item?.holiday_desc == null ? hp('1.75') : hp('1.5'),
                  fontFamily: fontFamily.ceraMedium,

                  paddingVertical: hp('0.5'),
                  paddingHorizontal: wp('2'),

                  color:
                    item?.late_exempt == 'Y'
                      ? 'black'
                      : item?.is_late == 'Y'
                      ? 'red'
                      : 'black',

                  backgroundColor:
                    item?.late_exempt == 'Y'
                      ? null
                      : item?.is_late == 'Y'
                      ? '#ffe6e6'
                      : null,
                  borderRadius:
                    item?.late_exempt == 'Y'
                      ? null
                      : item?.is_late == 'Y'
                      ? wp('5')
                      : null,
                  borderWidth:
                    item?.late_exempt == 'Y'
                      ? null
                      : item?.is_late == 'Y'
                      ? wp('0.15')
                      : null,
                  borderColor:
                    item?.late_exempt == 'Y'
                      ? null
                      : item?.is_late == 'Y'
                      ? 'red'
                      : null,

                  paddingTop: item?.emp_in_time == null ? hp('1.35') : null,
                  marginTop: item?.emp_in_time !== null ? hp('1.35') : null,
                }}>
                {item?.holiday_desc != null
                  ? item?.holiday_desc
                  : item?.emp_in_time != null
                  ? item?.emp_in_time
                  : '--:--:--'}
              </Text>
            )}

            {item?.rec_status == 'Toil' && (
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{
                  textAlign: 'center',
                  fontSize: hp('1.65'),
                  fontFamily: fontFamily.ceraMedium,

                  paddingVertical: hp('0.5'),
                  paddingHorizontal: wp('2'),

                  color: 'black',

                  marginTop: hp('1.35'),
                }}>
                {`${item?.status}: \n ${item?.working_date}`}
              </Text>
            )}

            {item?.late_exempt == 'Y' && (
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  color: '#1C37A4',
                  fontSize: hp('1'),
                  fontFamily: fontFamily.ceraMedium,
                  textAlign: 'center',
                }}>
                {item?.late_exempt == 'Y' ? item?.status : ''}
              </Text>
            )}

            {item?.hd_pending == 'Y' && (
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  color: '#1C37A4',
                  fontSize: hp('1'),
                  fontFamily: fontFamily.ceraMedium,
                  textAlign: 'center',
                }}>
                {item?.hd_pending == 'Y' ? item?.link : ''}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{}}>
            {item?.hd_pending == 'N' && (
              <Text
                style={{
                  color: '#1C37A4',
                  fontSize: hp('1'),
                  fontFamily: fontFamily.ceraMedium,
                  textAlign: 'center',
                }}>
                {item?.late_minutes > 15 && item?.late_ded_run == 'N'
                  ? item?.link
                  : ''}
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {formattedDate == item?.att_date && item?.emp_out_time == null ? (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: hp('1.75'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                }}>
                {'--:--:--'}
              </Text>
            </View>
          ) : (
            <>
              {item?.rec_status !== 'Toil' && (
                <>
                  <TouchableOpacity
                    style={{paddingTop: hp('1.25')}}
                    activeOpacity={
                      item?.early_minutes > 15 && item?.late_ded_run == 'N'
                        ? 0.4
                        : 1
                    }

                    // for Temp commented before Live aab

                    // onPress={
                    //   item?.early_minutes > 15 && item?.late_ded_run == 'N'
                    //     ? () =>
                    //         navigation.navigate('EarlyLeaving', {
                    //           attenValue: item?.att_date,
                    //           earlyLeavingTime: item?.emp_out_time,
                    //         })
                    //     : null
                    // }
                  >
                    {item?.holiday_desc == null ? (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: hp('1.75'),
                          fontFamily: fontFamily.ceraMedium,

                          paddingVertical: hp('0.5'),
                          paddingHorizontal: wp('2'),
                          color: item?.is_early == 'Y' ? 'red' : 'black',
                          backgroundColor:
                            item?.is_early == 'Y' ? '#ffe6e6' : null,
                          borderRadius: item?.is_early == 'Y' ? wp('5') : null,
                          borderWidth:
                            item?.is_early == 'Y' ? wp('0.15') : null,
                          borderColor: item?.is_early == 'Y' ? 'red' : null,
                        }}>
                        {item?.emp_out_time != null
                          ? item?.emp_out_time
                          : '--:--:--'}
                      </Text>
                    ) : (
                      <Text></Text>
                    )}
                    {item?.early_exempt == 'Y' && (
                      <Text
                        style={{
                          color: '#1C37A4',
                          fontSize: hp('1'),
                          fontFamily: fontFamily.ceraMedium,
                        }}>
                        {item?.early_exempt == 'Y' ? item?.status : ''}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {/* <View style={{}}>
                    {item?.early_minutes > 15 && item?.late_ded_run == 'N' && (
                      <Text
                        style={{
                          color: '#1C37A4',
                          fontSize: hp('1'),
                          fontFamily: fontFamily.ceraMedium,
                          textAlign: 'center',
                        }}>
                        {item?.late_minutes > 15 && item?.late_ded_run == 'N'
                          ? 'Raise Early Leaving'
                          : ''}
                      </Text>
                    )}
                  </View> */}
                </>
              )}

              {item?.rec_status == 'Toil' && (
                <>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={{
                      textAlign: 'center',
                      fontSize: hp('1.65'),
                      fontFamily: fontFamily.ceraMedium,

                      paddingVertical: hp('0.5'),
                      paddingHorizontal: wp('2'),

                      color: 'black',
                    }}>
                    {`${item?.link}: \n ${item?.fin_year_date}`}
                  </Text>
                </>
              )}

              {item?.is_early_applied == 'Y' ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#1C37A4',
                    fontSize: hp('1'),
                    fontFamily: fontFamily.ceraMedium,
                    textAlign: 'center',
                  }}>
                  {item?.is_early_applied == 'Y' ? item?.link : ''}
                </Text>
              ) : (
                <View style={{}}>
                  {item?.early_minutes > 15 && item?.late_ded_run == 'N' && (
                    <Text
                      style={{
                        color: '#1C37A4',
                        fontSize: hp('1'),
                        fontFamily: fontFamily.ceraMedium,
                        textAlign: 'center',
                      }}>
                      {item?.late_minutes > 15 && item?.late_ded_run == 'N'
                        ? item?.link
                        : ''}
                    </Text>
                  )}
                </View>
              )}
            </>
          )}
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          {item?.hd_pending == 'Y' ? (
            <></>
          ) : (
            <>
              {item?.late_ded_run == 'N' && !showLeaveType && showApplyText && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  // for Temp commented before Live aab

                  // onPress={() =>
                  //   navigation.navigate('AttendanceDrawer', {
                  //     screen: 'ApplicationTypeTab',
                  //   })
                  // }

                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      backgroundColor: '#1C37A4',
                      color: 'white',
                      fontSize: hp('1.5'),
                      textAlign: 'center',
                      borderRadius: wp('50'),
                      paddingVertical: wp('1.35'),
                      paddingHorizontal: wp('5'),
                    }}>
                    APPLY
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <>
            <View style={{flexDirection: 'row'}}>
              {item?.leavetype_desc == 'Annual Leave' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-island-tropical`}
                    size={hp(2.25)}
                    style={{color: '#41CE68'}}
                  />
                </View>
              )}

              {item?.leavetype_desc == 'Casual Leave' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-masks-theater`}
                    size={hp(2.25)}
                    style={{color: '#B141CE'}}
                  />
                </View>
              )}

              {item?.leavetype_desc == 'Sick Leave' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-temperature-half`}
                    size={hp(2.25)}
                    style={{color: '#CE5141'}}
                  />
                </View>
              )}

              {item?.leavetype_desc == 'Long Leave' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-calendar-range`}
                    size={hp(2.25)}
                    style={{color: '#4167C4'}}
                  />
                </View>
              )}

              {item?.leavetype_desc == 'Haj Leave' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-kaaba`}
                    size={hp(2.25)}
                    style={{color: '#41CEB4'}}
                  />
                </View>
              )}

              {item?.leavetype_desc == 'Without Pay' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: wp('0.25'),
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-money-bill-wave`}
                    size={hp(2.25)}
                    style={{color: '#7051CE'}}
                  />
                </View>
              )}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems:
                    item?.leavetype_desc == 'Annual Leave'
                      ? 'flex-start'
                      : 'center',
                }}>
                {item?.rec_status !== 'Toil' && (
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      // fontSize: displayedText ? hp('1.75') : hp('1.65'),
                      fontSize:
                        item?.status === 'Application Not Raised'
                          ? hp('1.1')
                          : displayedText
                          ? hp('1.75')
                          : hp('1.5'),
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    {item?.holiday_desc == null
                      ? item?.emp_in_time != null && item?.emp_out_time != null
                        ? item?.total_working_hours
                        : item?.status == ''
                        ? item?.leavetype_desc
                        : item?.status
                      : ''}
                  </Text>
                )}

                {item?.rec_status == 'Toil' && (
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      fontSize: hp('1.75'),
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    {item?.link}
                  </Text>
                )}
              </View>
            </View>
          </>
        </View>
      </View>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedLoginData = JSON.parse(loginData);

      dispatch(
        AttendanceCalanderAction({
          employee_id: parsedLoginData,
          month_year: `${initialMonth != null ? initialMonth : currentMonth}/${
            selectedYear != null ? selectedYear : lastElement
          }`,
        }),
      );
    } catch (error) {
      console.error('Error retrieving values from AsyncStorage:', error);
    }

    setRefreshing(false);
  };

  const yourRef = useRef(null);

  return (
    <View style={{backgroundColor: colors.appBackGroundColor}}>
      <View>
        <MainHeader
          text={'Attendance'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
          yearText={selectedYear != null ? selectedYear : lastElement}
          onPressRightText={onPressSelectYearModal}
        />
      </View>

      <View
        style={{height: hp(7), marginTop: hp(2), marginHorizontal: hp(2.5)}}>
        <FlatList
          data={years}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={yourRef}
          onContentSizeChange={() =>
            yourRef.current.scrollToIndex({
              animated: true,
              index: selectedMonth,
            })
          }
          onLayout={() =>
            yourRef.current.scrollToIndex({
              animated: true,
              index: selectedMonth,
            })
          }
        />
      </View>

      <View
        style={{
          marginVertical: hp('1'),
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginHorizontal: wp('5'),
        }}>
        <Text style={styles.lateminut}>
          <Text>
            Late Minutes: {attendanceCalanderHere?.userData?.late_minutes}
          </Text>
          {attendanceCalanderHere?.userData?.late_percentage == null ||
          undefined ? (
            <></>
          ) : (
            <Text
              style={{
                fontStyle: 'italic',
              }}>{` (${attendanceCalanderHere?.userData?.late_percentage}%)`}</Text>
          )}
        </Text>
      </View>
      <View
        style={{
          height: hp(4.5),
          flexDirection: 'row',
          backgroundColor: '#cdcdcd',
          marginHorizontal: hp(2.5),
        }}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.1}}>
          <Text style={styles.lateminut}>Date</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.3,
          }}>
          <Text style={styles.lateminut}>Time in</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.3,
          }}>
          <Text style={styles.lateminut}>Time out</Text>
        </View>
        <View
          style={{justifyContent: 'center', flex: 0.3, alignItems: 'center'}}>
          <Text style={styles.lateminut}>Working Hr’s</Text>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2A72B6', '#203B88']}
            progressBackgroundColor={'#fcfcfc'}
            tintColor={'#1C37A4'}
          />
        }>
        {attendanceCalanderHere?.isLoading && <Loader></Loader>}

        <FlatList
          data={attendanceCalanderHere?.userData?.attendance}
          renderItem={renderItemAttendance}
          keyExtractor={(item, index) => index.toString()}
          style={{
            marginHorizontal: wp('5'),
            marginVertical: hp('1'),
            marginBottom: hp('32'),
          }}
          ListEmptyComponent={
            <Text
              style={{
                fontSize: hp('1.75'),
                color: 'black',
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              Attendance data updation could take one day.
            </Text>
          }
        />

        {yearSelectionModal && (
          <YearSelectionModal
            onPressOpacity={onPressSelectYearModal}
            yaersListData={leaveHistoryHere?.userData?.total_years}
            renderItem={renderItemYears}
            inverted={true}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Attendance;

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
    color: '#363636',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  lateminut: {
    color: 'gray',
    fontSize: '0.7rem',
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
  testname1: {
    color: '#343434',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '100',
  },
  btncloor: {
    color: '#FF0000',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  timein: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  apply: {
    color: '#FFF',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
});
