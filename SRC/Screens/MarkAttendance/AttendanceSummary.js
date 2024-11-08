import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import React, {useEffect, useState, useCallback} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AttendanceSummary = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    try {
      //   dispatch(
      //     InspireTrainingsAction({
      //       employee_id: profileHereEmpId,
      //     }),
      //   );
    } catch (error) {}
    setRefreshing(false);
  };

  const attendanceSummaryList = [
    {
      date: '01, Fri',
      PP: 15,
      PO: 2,
      L: 1,
      T: 1,
      A: 5,
      E: 1,
    },
    {
      date: '02, Sat',
      PP: 18,
      PO: 1,
      L: 0,
      T: 2,
      A: 4,
      E: 2,
    },
    {
      date: '03, Sun',
      PP: 16,
      PO: 3,
      L: 1,
      T: 1,
      A: 3,
      E: 1,
    },
    {
      date: '04, Mon',
      PP: 20,
      PO: 0,
      L: 0,
      T: 1,
      A: 2,
      E: 3,
    },
    {
      date: '05, Tue',
      PP: 17,
      PO: 2,
      L: 1,
      T: 0,
      A: 5,
      E: 1,
    },
    {
      date: '06, Wed',
      PP: 14,
      PO: 3,
      L: 2,
      T: 1,
      A: 4,
      E: 1,
    },
    {
      date: '07, Thu',
      PP: 19,
      PO: 1,
      L: 0,
      T: 1,
      A: 3,
      E: 2,
    },
    {
      date: '08, Fri',
      PP: 15,
      PO: 3,
      L: 1,
      T: 0,
      A: 6,
      E: 0,
    },
    {
      date: '09, Sat',
      PP: 18,
      PO: 2,
      L: 1,
      T: 1,
      A: 2,
      E: 3,
    },
    {
      date: '10, Sun',
      PP: 16,
      PO: 4,
      L: 0,
      T: 1,
      A: 4,
      E: 1,
    },
    {
      date: '11, Mon',
      PP: 14,
      PO: 2,
      L: 2,
      T: 1,
      A: 5,
      E: 2,
    },
    {
      date: '12, Tue',
      PP: 19,
      PO: 1,
      L: 1,
      T: 0,
      A: 3,
      E: 1,
    },
    {
      date: '13, Wed',
      PP: 20,
      PO: 0,
      L: 0,
      T: 1,
      A: 2,
      E: 2,
    },
    {
      date: '14, Thu',
      PP: 17,
      PO: 3,
      L: 1,
      T: 0,
      A: 4,
      E: 1,
    },
    {
      date: '15, Fri',
      PP: 16,
      PO: 2,
      L: 0,
      T: 1,
      A: 5,
      E: 0,
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.19,
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.listHeadText, {color: '#606162'}]}>
            {item?.date}
          </Text>
        </View>

        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.PP}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.PO}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.L}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.T}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.A}
          </Text>
        </View>
        <View style={{flex: 0.135}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.listHeadText}>
            {item?.E}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <MainHeader
        text={`Attendance Summary`}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

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
                <Text style={styles.linearGradiantText}>{'P0'}</Text>
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
              <Text style={styles.boxText}>{`Physical\nOnline`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Leave`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Tardy`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`Absent`}</Text>
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
            <View
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
                  {'September 2024'}
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
            </View>
            <View style={{flex: 0.05}}></View>
            <TouchableOpacity
              activeOpacity={0.5}
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
                {'L'}
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
                {'E'}
              </Text>
            </View>
          </View>

          <FlatList
            data={attendanceSummaryList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: hp('2')}}
          />
        </View>
      </ScrollView>
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
    fontSize: 24,
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
