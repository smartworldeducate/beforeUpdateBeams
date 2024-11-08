import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  ImageBackground,
  Modal,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import React, {useEffect, useState, useCallback} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {
  InspireTrainingsAction,
  removeFromTraining,
} from '../../features/Inspire50/InspireTrainingsSlice';

import Icon from 'react-native-fontawesome-pro';

const MarkAttendance = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const [refreshing, setRefreshing] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [trainingDate, setTrainingDate] = useState(null);
  const [forTrainingDate, setForTrainingDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setTrainingDate(date);
    const formattedFromDate = moment(date).format('DD MMM YYYY');
    setForTrainingDate(formattedFromDate);
  }, []);

  const onPressShowDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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

  useFocusEffect(
    useCallback(() => {
      dispatch(
        InspireTrainingsAction({
          employee_id: profileHereEmpId,
        }),
      );
    }, [dispatch]),
  );

  const handleConfirm = date => {
    const formattedFromDate = moment(date).format('DD MMM YYYY');
    const fromDateForTotalDays = moment(date).format('DD-MM-YYYY');

    setForTrainingDate(formattedFromDate);
    setTrainingDate(fromDateForTotalDays);
    hideDatePicker();
  };
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 90);

  const onPressSave = () => {};

  const userArray = [
    {
      userId: '164783',
      userImage: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
      userName: 'Alice Johnson',
      userTodayStatus: 'T',
    },
    {
      userId: '297651',
      userImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      userName: 'Bob Smith',
      userTodayStatus: 'AO',
    },
    {
      userId: '300883',
      userImage: 'https://cdn-icons-png.flaticon.com/512/4042/4042171.png',
      userName: 'Charlie Brown',
      userTodayStatus: 'PO',
    },
    {
      userId: '401229',
      userImage: 'https://cdn-icons-png.flaticon.com/512/2042/2042895.png',
      userName: 'Diana Prince',
      userTodayStatus: 'L',
    },
    {
      userId: '500021',
      userImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      userName: 'Diana Prince',
      userTodayStatus: 'E',
    },
    {
      userId: '612543',
      userImage: 'https://cdn-icons-png.flaticon.com/512/2042/2042895.png',
      userName: 'Diana Prince',
      userTodayStatus: 'A',
    },
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        backgroundColor: '#6FA4FF1A',
        marginBottom: hp('2.5'),
        borderRadius: wp('4'),
        paddingVertical: hp('0.75'),
      }}>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item?.userImage}}
          style={{height: 42, width: 42, borderRadius: wp('50')}}
          resizeMode={'contain'}
        />
      </View>

      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          paddingVertical: hp('1.5'),
          flexDirection: 'column',
        }}>
        <View style={{}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: '#201F24',
              fontFamily: fontFamily.ceraMedium,
              fontWeight: '500',
              fontSize: 18,
            }}>
            {item?.userName}
          </Text>
        </View>
        <View style={{}}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: '#66656A',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: 15,
            }}>
            {`Id: ${item?.userId}`}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: hp('1.5'),
        }}>
        <LinearGradient
          useAngle={true}
          angle={180}
          angleCenter={{x: 0.5, y: 0.5}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#85D4FE', '#52A5FF']}
          locations={[0, 1]}
          style={styles.linearGradiantFlatlist}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: '#FFFFFF',
              fontFamily: fontFamily.ceraMedium,
              fontWeight: '500',
              fontSize: 15,
            }}>
            {item?.userTodayStatus}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <MainHeader
        text={`Mark Attendance`}
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
                <Text style={styles.linearGradiantText}>{'16'}</Text>
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
                <Text style={styles.linearGradiantText}>{'0'}</Text>
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
                <Text style={styles.linearGradiantText}>{'06'}</Text>
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
                  {'19'}
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
                  {'05'}
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
                  {'01'}
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
              <Text style={styles.boxText}>{`PP`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`PO`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`L`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`T`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`A`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`E`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('3'),
              marginBottom: hp('1'),
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressShowDatePicker}
              style={{
                flex: 0.465,
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingVertical: hp('2'),
                borderRadius: wp('3'),
              }}>
              <View
                style={{
                  flex: 0.2,
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
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#000000',
                    fontFamily: fontFamily.ceraLight,
                    fontWeight: '300',
                    fontSize: 18,
                  }}>
                  {forTrainingDate}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name={'angles-up-down'}
                  color={'#575757'}
                  size={hp('2')}
                />
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.07}}></View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressSave}
              style={{
                flex: 0.465,
                flexDirection: 'row',
                backgroundColor: '#E9FEDF',
                flexDirection: 'row',
                paddingVertical: hp('2'),
                borderRadius: wp('3'),
              }}>
              <View
                style={{
                  flex: 0.2,
                }}></View>

              <View
                style={{
                  flex: 0.2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={`fat fa-floppy-disk`}
                  size={hp('2.75')}
                  style={{color: '#000000'}}
                />
              </View>
              <View style={{flex: 0.6}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#000000',
                    fontFamily: fontFamily.ceraLight,
                    fontWeight: '300',
                    fontSize: 18,
                  }}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={userArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: hp('2')}}
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date(2024, 9, 1)}
          // minimumDate={new Date()}
          // maximumDate={maxDate}
          maximumDate={new Date()}
        />
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('AddAdditionalStudent')}
        style={{
          height: hp('8'),
          width: hp('8'),
          borderRadius: wp('50'),
          backgroundColor: '#1C37A4',
          marginBottom: hp('2'),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: hp('5'),
          right: wp('8'),
        }}>
        <Text
          style={{
            fontSize: hp('5'),
            fontWeight: '500',
            fontFamily: fontFamily.ceraLight,
            color: 'white',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default MarkAttendance;

const styles = EStyleSheet.create({
  linearGradiantStyle: {
    flex: 0.153,
    justifyContent: 'center',
    height: hp('7'),
    borderRadius: wp('2'),
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  linearGradiantText: {
    fontSize: 26,
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
    fontSize: 15,
    color: '#66656A',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
  },
  linearGradiantFlatlist: {
    flex: 0.153,
    justifyContent: 'center',
    height: hp('4.25'),
    width: wp('12'),
    borderRadius: wp('2'),
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
