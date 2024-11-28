import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import MonthPicker from 'react-native-month-year-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  AttendanceSummaryAction,
  clearAllStateAttendanceSummary,
} from '../../features/TeacherAttendance/AttendanceSummary';
import Loader from '../../Components/Loader/Loader';

const formatDateToMonthYear = date => {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month
  const year = date.getFullYear();
  return `${month}/${year}`;
};

const AttendanceSummary = ({route, ...props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const authKeyParam = route?.params?.authKeyParamForSummary;

  const branchId = route?.params?.classDataParam?.branch_id;
  const classId = route?.params?.classDataParam?.class_id;
  const sectionId = route?.params?.classDataParam?.section_id;

  const AttendanceSummaryHere = useSelector(
    state => state.AttendanceSummaryStore?.userData?.summary,
  );

  console.log('AttendanceSummaryHere', AttendanceSummaryHere);

  const attendanceSummaryLoading = useSelector(
    state => state.AttendanceSummaryStore?.isLoading,
  );

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedMonthYear, setFormattedMonthYear] = useState(
    formatDateToMonthYear(new Date()),
  );

  useEffect(() => {
    console.log('inUseEffect');
    const fetchData = async () => {
      try {
        const authKey = await AsyncStorage.getItem('authKey');
        console.log('authKey', authKey);

        dispatch(
          AttendanceSummaryAction({
            values: {
              branch_id: route?.params?.classDataParam?.branch_id,
              class_id: route?.params?.classDataParam?.class_id,
              section_id: route?.params?.classDataParam?.section_id,
              att_month: formattedMonthYear,
            },
            authKeyParam,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onPressMonthYear = () => {
    setShowPicker(true);
  };

  const onValueChange = (event, newDate) => {
    if (event === 'dismissedAction') {
      setShowPicker(false);
      return;
    }
    setShowPicker(false);
    if (newDate) {
      const onlyMonthYear = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        1,
      );

      setSelectedDate(onlyMonthYear);
      const formattedDate = formatDateToMonthYear(onlyMonthYear);
      setFormattedMonthYear(formattedDate);

      dispatch(
        AttendanceSummaryAction({
          values: {
            branch_id: route?.params?.classDataParam?.branch_id,
            class_id: route?.params?.classDataParam?.class_id,
            section_id: route?.params?.classDataParam?.section_id,
            att_month: formattedDate,
          },
          authKeyParam,
        }),
      );
    }
  };

  const formatMonthYear = date => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    try {
    } catch (error) {}
    setRefreshing(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',

          marginBottom: hp('-0.5'),
        }}>
        <View
          style={{
            flex: 0.19,
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.listHeadText, {color: '#606162'}]}>
            {item?.att_date}
          </Text>
        </View>

        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.presents}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.online_presents}
          </Text>
        </View>

        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.tardiness}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.absents}
          </Text>
        </View>

        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.leave}
          </Text>
        </View>

        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.exempted}
          </Text>
        </View>
      </View>
    );
  };

  const onPressLeftArrow = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
    setFormattedMonthYear(formatDateToMonthYear(newDate));

    dispatch(
      AttendanceSummaryAction({
        values: {
          branch_id: branchId,
          class_id: classId,
          section_id: sectionId,
          att_month: formattedMonthYear,
        },
        authKeyParam,
      }),
    );
  };

  const onPressRightArrow = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
    setFormattedMonthYear(formatDateToMonthYear(newDate));

    dispatch(
      AttendanceSummaryAction({
        values: {
          branch_id: branchId,
          class_id: classId,
          section_id: sectionId,
          att_month: formattedMonthYear,
        },
        authKeyParam,
      }),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // Clear previous attendance summary data when screen is focused
      dispatch(clearAllStateAttendanceSummary());

      // Dispatch the action with the required parameters
      dispatch(
        AttendanceSummaryAction({
          values: {
            branch_id: branchId,
            class_id: classId,
            section_id: sectionId,
            att_month: formattedMonthYear,
          },
          authKeyParam,
        }),
      );

      // Cleanup function runs when the screen loses focus
      return () => {
        dispatch(clearAllStateAttendanceSummary());
      };
    }, [branchId, classId, sectionId, formattedMonthYear, dispatch]),
  );

  return (
    <>
      <MainHeader
        text={`Attendance Summary`}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      {attendanceSummaryLoading && <Loader></Loader>}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2A72B6', '#203B88']}
            progressBackgroundColor={'#fcfcfc'}
            tintColor={'#1C37A4'}
          />
        }
        style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        <View style={{marginHorizontal: wp('5'), marginTop: hp('1.5')}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('1'),
            }}>
            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#85D4FE', '#52A5FF']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'PP'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFC8A5', '#FE7E47']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'PO'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#7AE6E4', '#29D09F']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'T'}
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFA9AA', '#FF5255']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'A'}
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#C07CD5', '#6D3FBD']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'L'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#8EFF47', '#188D00']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'E'}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('1.25'),
            }}>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Physical\nPresent`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Present\nOnline`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Tardy`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Absent`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Leave`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Exempted`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 57,
              marginTop: hp('3'),
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressLeftArrow}
              style={{
                flex: 0.175,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <FontAwesomeIcon
                icon={`fat fa-arrow-left`}
                size={hp('2.5')}
                style={{color: '#000000'}}
              />
            </TouchableOpacity>
            <View style={{flex: 0.05}}></View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressMonthYear}
              style={{
                flex: 0.55,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <FontAwesomeIcon
                  icon={`fat fa-calendar-days`}
                  size={hp('2.5')}
                  style={{color: '#000000'}}
                />
              </View>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.calanderText}>
                  {formatMonthYear(selectedDate)}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <FontAwesomeIcon
                  icon={`fat fa-angles-up-down`}
                  size={hp('2.5')}
                  style={{color: '#000000'}}
                />
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.05}}></View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressRightArrow}
              style={{
                flex: 0.175,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <FontAwesomeIcon
                icon={`fat fa-arrow-right`}
                size={hp('2.5')}
                style={{color: '#000000'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E7E7E7',
              marginTop: hp('3'),
              marginHorizontal: wp('0'),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 0.19,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'DATE'}
              </Text>
            </View>

            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'PP'}
              </Text>
            </View>
            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'PO'}
              </Text>
            </View>

            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'T'}
              </Text>
            </View>
            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'A'}
              </Text>
            </View>
            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'L'}
              </Text>
            </View>
            <View style={{flex: 0.135}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.listHeadText}>
                {'E'}
              </Text>
            </View>
          </View>

          <FlatList
            data={AttendanceSummaryHere}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: hp('2')}}
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
        </View>
      </ScrollView>

      {showPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={selectedDate}
          minimumDate={new Date(2000, 0)}
          maximumDate={new Date(2030, 11)}
          locale="en"
        />
      )}
    </>
  );
};

export default AttendanceSummary;

const styles = EStyleSheet.create({
  linearGradiantStyle: {
    flex: 0.153,
    justifyContent: 'center',
    height: 55,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  linearGradiantText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
  },
  boxTextView: {
    flex: 0.15,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 10,
    color: '#66656A',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
    lineHeight: 11,
  },
  listHeadText: {
    textAlign: 'center',
    color: '#929395',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '700',
    fontSize: 13,
    paddingVertical: hp('1.5'),
  },
  calanderText: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '100',
    fontSize: 16,
  },
});
