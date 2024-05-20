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
import moment from 'moment';
import Icon from 'react-native-fontawesome-pro';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Loader from '../Components/Loader/Loader';
import LineSeprator from '../Components/LineSeprator/LineSeprator';

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
            : [colors.appBackGroundColor, colors.appBackGroundColor]
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
            activeOpacity={1}
            onPress={() => toggleCollapse(item)}
            style={{
              backgroundColor: 'white',
              borderRadius: wp('3'),
              borderBottomLeftRadius:
                expandedHeader === item ? wp('0') : wp('3'),
              borderBottomRightRadius:
                expandedHeader === item ? wp('0') : wp('3'),

              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 1,
              marginVertical: hp('1'),
              marginHorizontal: wp('3'),
              flexDirection: 'row',
            }}>
            <View style={{padding: hp('2'), flex: 0.85}}>
              <Text style={styles.monthHeaderText}>
                {item} {` `}
                {myYear}
              </Text>
            </View>

            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="arrow-right"
                size={hp(2.5)}
                color="#979797"
              />
            </View>
          </TouchableOpacity>
          {expandedHeader === item && (
            <CollapseBody style={{marginTop: hp('-2.25')}}>
              {matchedItems.length > 0 ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    borderBottomLeftRadius: wp('3'),
                    borderBottomRightRadius: wp('3'),
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 1,
                    marginVertical: hp('1'),
                    marginHorizontal: wp('3'),
                  }}>
                  {matchedItems.map((matchedItem, index) => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: wp('3'),
                          paddingVertical: hp('1.25'),
                        }}>
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
                              paddingBottom:
                                index == matchedItems.length - 1
                                  ? hp('0.5')
                                  : hp('0'),
                            }}>
                            {matchedItem?.from_date}
                          </Text>
                        </View>
                      </View>

                      {index !== matchedItems.length - 1 && (
                        <LineSeprator
                          height={hp('0.15')}
                          backgroundColor={'#DBDBDB'}
                        />
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: 'white',
                    borderBottomLeftRadius: wp('3'),
                    borderBottomRightRadius: wp('3'),
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 1,
                    marginVertical: hp('1'),
                    marginHorizontal: wp('3'),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      paddingLeft: wp('3'),
                      fontSize: hp('1.75'),
                      fontFamily: fontFamily.ceraLight,
                      textAlign: 'center',
                      paddingBottom: hp('1.5'),
                    }}>
                    No leave record found for this month.
                  </Text>
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

              <View style={{marginBottom: hp('2'), marginHorizontal: wp('-3')}}>
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
    fontSize: hp('2.25'),
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
