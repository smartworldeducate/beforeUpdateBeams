import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import MainHeader from '../Components/Headers/MainHeader';
import CmpHistory from '../Components/CmpHistory';
import colors from '../Styles/colors';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SalaryHistoryWithYearsAction} from '../features/SalaryYearsSlice/SalaryHistoryWithYearsSlice';
import {SalaryYearsAction} from '../features/SalaryYearsSlice/SalaryYearsSlice';
import {LeaveHistoryAction} from '../features/LeaveBalanceSlice/LeaveHistorySlice';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Loader from '../Components/Loader/Loader';

const LeaveHistory = props => {
  const dispatch = useDispatch();
  // console.log('lastyear', route.params.lastYearParam);
  const navigation = useNavigation();

  const yourRef = useRef(null);
  const leaveHistoryHere = useSelector(state => state.salaryYearsStore);

  const leaveHistoryYearsHere = useSelector(state => state.leaveHistoryStore);

  const myFinalArray = leaveHistoryYearsHere?.userData?.data;

  // console.log('>>>>', leaveHistoryYearsHere?.userData?.data);

  // const uniqueMonths = Array.from(
  //   new Map(myFinalArray.map(month => [month.month_name, month])),
  // ).map(([key, value]) => value);

  // console.log('uniqueMonths', uniqueMonths);

  const [getIndex, setGetIndex] = useState(
    leaveHistoryHere?.userData?.total_years?.length - 1,
  );

  console.log('getIndex', getIndex);

  console.log('leaveHistoryHere', leaveHistoryHere);

  // const getIndex = leaveHistoryHere?.userData?.total_years_count - 1;
  // console.log('getIndex', getIndex);

  const lastYear =
    leaveHistoryHere?.userData?.total_years &&
    leaveHistoryHere?.userData?.total_years[getIndex];

  console.log('lastYear', lastYear);
  console.log('lastYearType', typeof lastYear);

  const [expandedHeader, setExpandedHeader] = useState(null);

  const toggleCollapse = month => {
    if (expandedHeader === month) {
      // If the same header is clicked again, collapse it
      setExpandedHeader(null);
    } else {
      // Expand the clicked header
      setExpandedHeader(month);
    }
  };

  const [myYear, setMyYear] = useState(lastYear);

  useEffect(() => {
    setMyYear(lastYear);
  }, [myYear]);

  console.log('myYear', myYear);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          LeaveHistoryAction({
            employee_id: parsedLoginData,
            year: myYear,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          index == getIndex
            ? ['#1C37A5', '#4D69DC']
            : ['grey', colors.appBackGroundColor]
        }
        style={{
          borderRadius: wp('8'),
          height: hp('4.25'),
          width: wp('20'),
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: wp('0.5'),
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
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
                fontSize: hp('1.75'),
                fontFamily: fontFamily.ceraMedium,
                color: index == getIndex ? 'white' : '#1C37A4',
                fontWeight: '500',
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const onPressYear = ({item, index}) => {
    console.log('onPressYearIndex', index);
    console.log('item', item);

    setGetIndex(index);
    setMyYear(item);

    setExpandedHeader(null);

    AsyncStorage.getItem('loginData').then(loginData => {
      const parsedLoginData = JSON.parse(loginData);
      dispatch(
        LeaveHistoryAction({
          employee_id: parsedLoginData,
          year: item,
        }),
      );
    });
  };

  const renderItemHistory = ({item, index}) => {
    // const matchedItems = myFinalArray.filter(
    //   month => month.month_name === item,
    // );

    const matchedItems = myFinalArray.filter(
      entry => entry.month_name === item,
    );

    return (
      <>
        <View style={{}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => toggleCollapse(item)}
            style={styles.touchableStyle}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthHeaderText}>
                {item} {` `}
                {myYear}
              </Text>
            </View>
          </TouchableOpacity>
          {expandedHeader === item && (
            <CollapseBody>
              {matchedItems.length > 0 ? (
                <View style={{marginHorizontal: wp('5')}}>
                  {matchedItems.map((matchedItem, index) => (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.7}}>
                        <Text
                          key={index}
                          style={{
                            color: 'black',
                            fontFamily: fontFamily.ceraMedium,
                            fontSize: hp('1.9'),
                          }}>
                          {matchedItem?.leave_type_desc}
                          <Text
                            style={{
                              fontFamily: fontFamily.ceraLight,
                              fontSize: hp('1.75'),
                            }}>
                            {' '}
                            {`(${matchedItem?.status.trim()})`}
                          </Text>
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontFamily: fontFamily.ceraLight,
                            fontSize: hp('1.85'),
                            color: 'black',
                          }}>
                          {matchedItem?.from_date}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{marginHorizontal: wp('5')}}>
                  <Text style={{color: 'black'}}>There is no data</Text>
                </View>
              )}
            </CollapseBody>
          )}
        </View>
      </>
    );
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
      }}>
      <>
        <View>
          <MainHeader
            text={'Leave History'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>

        {leaveHistoryYearsHere?.isLoading && <Loader></Loader>}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.appBackGroundColor,
          }}>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              <View style={{marginVertical: hp('2')}}>
                <FlatList
                  data={leaveHistoryHere?.userData?.total_years}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  ref={yourRef}
                  onContentSizeChange={() => yourRef.current.scrollToEnd()}
                  onLayout={() => yourRef.current.scrollToEnd()}
                />
              </View>

              <View
                style={{marginVertical: hp('2'), marginHorizontal: wp('-3')}}>
                {/* <FlatList
                  data={myData}
                  renderItem={renderItemHistory}
                  keyExtractor={(item, index) => index.toString()}
                /> */}
                {myFinalArray !== undefined && (
                  <FlatList
                    data={months}
                    renderItem={renderItemHistory}
                    keyExtractor={(item, index) => index.toString()}
                    // inverted={true}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default LeaveHistory;

const styles = EStyleSheet.create({
  touchableStyle: {
    backgroundColor: 'white',
    borderRadius: wp('3'),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
    marginVertical: hp('1'),
    marginHorizontal: wp('3'),
  },
  monthHeader: {
    padding: hp('2'),
  },
  monthHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  monthContent: {
    paddingVertical: 10,
  },
  noData: {
    paddingVertical: 10,
    // alignItems: 'center',
  },
});
