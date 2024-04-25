import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import Icon from 'react-native-fontawesome-pro';
import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import YearSelectionModal from '../Components/Modal/YearSelectionModal';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import {AttendanceCalanderAction} from '../features/AttendanceCalanderSlice/AttendanceCalanderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader/Loader';
import colors from '../Styles/colors';

const Attendance = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const leaveHistoryHere = useSelector(state => state.salaryYearsStore);

  const totalYears = leaveHistoryHere?.userData?.total_years;

  const [yearSelectionModal, setyearSelectionModal] = useState(false);

  const lastElement = totalYears[totalYears.length - 1];
  console.log('lastElement', lastElement);

  const [selectedYear, setSelectedYear] = useState(lastElement);

  const attendanceCalanderHere = useSelector(
    state => state.AttendanceCalanderStore,
  );

  const onPressSelectYearModal = () => {
    console.log('onPressSelectYearModal');
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
  console.log('currentMonth', currentMonth);

  const [initialMonth, setInitialMonth] = useState(currentMonth);
  console.log('initialMonth', initialMonth);

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
      };
    }, []),
  );

  const renderItemYears = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressYear({item, index})}
          style={{
            height: hp('4.25'),
            width: wp('20'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp('8'),
          }}>
          <View>
            <Text
              style={{
                fontSize: hp('2.75'),
                fontFamily: fontFamily.ceraMedium,
                color: 'grey',
                fontWeight: '500',
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
        <LineSeprator height={hp('0.1')} backgroundColor={'grey'} />
      </>
    );
  };

  const renderItem = ({item, index}) => {
    console.log('item', item);
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

              // (item?.id == currentMonth && 'white') ||
              // (item?.id > currentMonth && 'grey') ||
              // (item?.id < currentMonth && '#1C37A4'),
            }}>
            {item.month}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const onPressMonth = item => {
    console.log('item', item?.item?.id);
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
    console.log('onPressYear');

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

  const renderItemAttendance = ({item, index}) => {
    const today = item?.att_date;

    const [year, month, day] = today.split('-');

    return (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: index == 0 && '#E5F7FF',
          backgroundColor:
            (item?.fin_year_day == 'Sun' ? '#FEF7DC' : null) ||
            (item?.fin_year_day == 'Sat' ? '#FEF7DC' : null),
          borderBottomWidth: wp('0.1'),
          borderBottomColor: 'black',
        }}>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'column', backgroundColor: '#cfcfcf'}}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: hp('2'),
                fontFamily: fontFamily.ceraBold,
              }}>
              {day}
            </Text>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: hp('1.75'),
                fontFamily: fontFamily.ceraLight,
              }}>
              {item?.fin_year_day}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              color: item?.is_late == 'Y' ? 'red' : 'black',
              textAlign: 'center',
              fontSize: item?.holiday_desc == null ? hp('1.75') : hp('1.5'),
              fontFamily: fontFamily.ceraMedium,
            }}>
            {item?.holiday_desc != null
              ? item?.holiday_desc
              : item?.emp_in_time != null
              ? item?.emp_in_time
              : '--:--:--'}
          </Text>
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          {item?.holiday_desc == null ? (
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: hp('1.75'),
                fontFamily: fontFamily.ceraMedium,
              }}>
              {item?.emp_out_time != null ? item?.emp_out_time : '--:--:--'}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: hp('1.75'),
              fontFamily: fontFamily.ceraMedium,
            }}>
            {item?.total_working_hours}
          </Text>
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

  return (
    <>
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
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
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
          Late Minutes: {attendanceCalanderHere?.userData?.late_minutes}
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
            // backgroundColor: "green",
            flex: 0.3,
          }}>
          <Text style={styles.lateminut}>Time in</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "grey",
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
          style={{marginHorizontal: wp('5'), marginVertical: hp('1')}}
          ListEmptyComponent={
            <Text
              style={{
                color: 'black',
                fontSize: hp('2'),
                fontFamily: fontFamily.ceraBold,
              }}></Text>
          }
        />

        {yearSelectionModal && (
          <YearSelectionModal
            onPressOpacity={onPressSelectYearModal}
            yaersListData={leaveHistoryHere?.userData?.total_years}
            renderItem={renderItemYears}
          />
        )}
      </ScrollView>
    </>
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
