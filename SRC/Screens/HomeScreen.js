import React, {useEffect, useState, useRef, useCallback} from 'react';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import LottieView from 'lottie-react-native';

import Icon from 'react-native-fontawesome-pro';
import Swiper from 'react-native-swiper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fat} from '@fortawesome/pro-thin-svg-icons';
import {fal} from '@fortawesome/pro-light-svg-icons';
import {far} from '@fortawesome/pro-regular-svg-icons';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {fad} from '@fortawesome/pro-duotone-svg-icons';

library.add(fat, fal, far, fas, fad);

import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../Styles/colors';
import HeaderTop from '../Components/Headers/HeaderTop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calinder from '../Components/Calinder';
import fontSize from '../Styles/fontSize';
import fontFamily from '../Styles/fontFamily';
import {PieChart} from 'react-native-gifted-charts';
import {profileAction} from '../features/profileSlice/profileSlice';
import Loader from '../Components/Loader/Loader';
import {messagesAction} from '../features/MessagesSlice/MessagesSlice';
import {LeaveBalanceAction} from '../features/LeaveBalanceSlice/LeaveBalanceSlice';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import {FinYearAction} from '../features/FinYearSlice/FinYearSlice';
import {WorkFromHomeAction} from '../features/WorkFromHomeSlice/WorkFromHomeGet';
import {
  messagesActionHomePage,
  textColr,
} from '../features/MessagesSlice/MessageSliceHomePage';
import {SalaryYearsAction} from '../features/SalaryYearsSlice/SalaryYearsSlice';
import {messageReadAction} from '../features/MessagesSlice/MessageLikeSlice';
import ViewMessageDetailModal from '../Components/Modal/ViewMessageDetailModal';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {messageStatusLikeAction} from '../features/MessagesSlice/MessageStatusLike';
import ReporteeProfileModal from '../Components/Modal/ReporteeProfileModal';

const HomeScreen = props => {
  const width = Dimensions.get('window').width;

  const dispatch = useDispatch();

  const profileHere = useSelector(state => state.profileStore);

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  const slicedData = profileHere?.userData?.reporting_result?.data?.slice(0, 6);

  const messagesHere = useSelector(state => state.MessageSliceHomePageStore);

  const leaveBalanceHere = useSelector(state => state.leaveBalanceStore);

  const messageDetailHere = useSelector(state => state.messageDetailStore);

  const profileHereEmpBirthday = useSelector(
    state => state.profileStore?.empBirthday,
  );

  // const leaveHistoryHere = useSelector(state => state.salaryYearsStore);

  // const getIndex = leaveHistoryHere?.userData?.total_years_count - 1;
  // console.log('getIndex', getIndex);

  // const lastYear =
  //   leaveHistoryHere?.userData?.total_years &&
  //   leaveHistoryHere?.userData?.total_years[getIndex];

  // console.log('lastYear', lastYear);
  // console.log('lastYearType', typeof lastYear);

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [messageSubject, setMessageSubject] = useState(null);
  const [empPhoto, setEmpPhoto] = useState(null);
  const [empName, setEmpName] = useState(null);
  const [msgDate, setMsgDate] = useState(null);
  const [msgLike, setMsgLike] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginDataId = JSON.parse(loginData);

        if (parsedLoginDataId) {
          console.log('parsedLoginDataId', parsedLoginDataId);
          dispatch(
            profileAction({
              employee_id: parsedLoginDataId,
            }),
          );

          dispatch(
            messagesActionHomePage({
              employeeId: parsedLoginDataId,
              ofset: 1,
              limit: 5,
            }),
          );

          dispatch(
            LeaveBalanceAction({
              employee_id: parsedLoginDataId,
            }),
          );

          dispatch(
            SalaryYearsAction({
              employee_id: parsedLoginDataId,
            }),
          );
        }
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    }
    fetchData();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedLoginDataId = JSON.parse(loginData);

      if (parsedLoginDataId) {
        dispatch(
          profileAction({
            employee_id: parsedLoginDataId,
          }),
        );

        dispatch(
          messagesActionHomePage({
            employeeId: parsedLoginDataId,
            ofset: 1,
            limit: 10,
          }),
        );

        dispatch(
          LeaveBalanceAction({
            employee_id: parsedLoginDataId,
          }),
        );
      }
    } catch (error) {
      console.error('Error retrieving values from AsyncStorage:', error);
    }
    setRefreshing(false);
  };

  const annual = leaveBalanceHere?.userData?.anual_percentage;
  const casual = leaveBalanceHere?.userData?.casual_percentage;
  const sick = leaveBalanceHere?.userData?.sick_percentage;
  const maternity = leaveBalanceHere?.userData?.materenity_percentage;
  const hajj = leaveBalanceHere?.userData?.hajj_percentage;
  const without = leaveBalanceHere?.userData?.withoutpay_percentage;
  const pending = leaveBalanceHere?.userData?.pandding_balance_percentage;
  const long = leaveBalanceHere?.userData?.long_percentage;

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (item?.IS_READ_STATUS != 'Y') {
            dispatch(
              messageReadAction({
                employee_id: JSON.parse(profileHereEmpId),
                messageId: item?.MSG_ID,
                read_status: 'Y',
              }),
            );
            dispatch(textColr(item?.MSG_ID));
          }
          setMessageId(item?.MSG_ID);
          setMessageSubject(item?.MSG_SUBJECT);
          setEmpPhoto(item?.EMP_PHOTO);
          setEmpName(item?.EMP_NAME);
          setMsgDate(item?.ENTRY_DATE);
          onPressMessage(item?.MSG_ID);
        }}
        style={{
          height: hp('16.5'),
          width: wp('70'),
          marginRight: wp('3'),
          marginLeft: wp('2'),
          borderRadius: wp('1.5'),
          flexDirection: 'column',
          paddingHorizontal: wp('2'),

          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          marginVertical: hp('1'),
        }}>
        <View
          style={{
            height: hp('3'),
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <FontAwesomeIcon
            icon={
              item?.IS_READ_STATUS === 'Y'
                ? 'far fa-check-double'
                : 'fat fa-check-double'
            }
            size={hp(2.25)}
            style={{color: item?.IS_READ_STATUS === 'Y' ? '#1C37A4' : 'grey'}}
          />
        </View>

        <View
          style={{
            height: hp('10.5'),
            marginTop: hp('-1'),
          }}>
          <Text
            numberOfLines={4}
            ellipsizeMode={'tail'}
            style={{
              color: '#343434',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: hp('1.8'),
              letterSpacing: 0.5,
              lineHeight: hp('2.5'),
              paddingHorizontal: wp('1.25'),
            }}>
            {/* {item?.MSG_SUBJECT} */}
            {item?.MSG_SUB_DESC}
            {/* {` ${item?.LONG_DESC}`} */}
          </Text>
        </View>

        <View
          style={{
            height: hp('3'),
            justifyContent: 'flex-start',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: 'black',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: hp('1.7'),
              letterSpacing: 0.5,
              lineHeight: hp('2.5'),
              paddingHorizontal: wp('1'),
              paddingTop: hp('0.25'),
            }}>
            <Text style={styles.messageCardDate}>
              <Text
                style={{
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                  fontSize: hp('1.5'),
                }}>
                {item?.FROM_NAME == null || undefined
                  ? 'Coorporate Office:'
                  : item?.FROM_NAME}
              </Text>{' '}
              {item?.ENTRY_DATE}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    setMessageId(null);
    setEmpName(null);
    setMsgDate(null);
    setEmpPhoto(null);
    setMessageSubject(null);
  };

  const onPressMessage = item => {
    setModalVisible(true);
    dispatch(
      messageDetailAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item,
      }),
    );
  };

  useEffect(() => {
    if (messageDetailHere?.success == 1) {
      setMsgLike(messageDetailHere?.userData?.ACK_STATUS);
    }
  }, [messageDetailHere]);

  const onPressThumbUpIcon = () => {
    dispatch(
      messageStatusLikeAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: messageId,
        ack_status: 'Y',
      }),
    );
    setMsgLike('Y');
  };

  const onPressInElse = () => {
    console.log('onPressInElse');
  };

  const renderItemReportees = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={
          index === 5
            ? onPressPlusReportee
            : () =>
                onPressReporteeItem({
                  item: item?.EMPLOYEE_ID,
                  itemBranchId: item?.BRANCH_ID,
                  itemDeptId: item?.DEPARTMENT_ID,
                })
        }
        style={{
          justifyContent: 'center',
          // backgroundColor: 'green',
          marginRight: wp('1'),
          // alignItems: 'center',
        }}>
        <View
          style={{
            height: hp('6'),
            width: wp('12'),
            borderRadius: wp('10'),
            borderWidth: wp('0.15'),
            borderColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp('0.5'),
          }}>
          <Image
            source={{
              uri: item?.EMP_PHOTO,
            }}
            style={{
              height: hp('6'),
              width: wp('12'),
              borderRadius: wp('10'),
              marginHorizontal: wp('1'),
            }}
            resizeMode={'cover'}
          />
        </View>

        {index === 5 && (
          <View
            style={{
              position: 'absolute',
              left: '5.10%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: wp('10'),
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('6'),
              width: wp('12'),
            }}>
            <Icon type="regular" name="plus" size={hp('2')} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const [reporteeModal, setReporteeModal] = useState(false);
  const [idHere, setIdHere] = useState(null);
  const [branchIdHere, setBranchIdHere] = useState(null);
  const [deptIdHere, setDeptIdHere] = useState(null);

  const onPressReporteeItem = item => {
    setReporteeModal(!reporteeModal);
    setIdHere(item?.item);
    setBranchIdHere(item?.itemBranchId);
    setDeptIdHere(item?.itemDeptId);
  };

  const onPressPlusReportee = () => {
    navigation.navigate('ReporteeDrawer');
  };

  const onPressReportee = item => {
    setReporteeModal(!reporteeModal);
    setIdHere(item?.item);
    setBranchIdHere(item?.itemBranchId);
    setDeptIdHere(item?.itemDeptId);
  };
  const onRequestClose = () => {
    setReporteeModal(false);
    setIdHere(null);
    setBranchIdHere(null);
    setDeptIdHere(null);
  };

  const renderItemLeaves = ({item, index}) => {
    return (
      <>
        {item?.LEAVE_TYPE == 'Casual Leave' && (
          <View style={styles.leaveBalRightView}>
            <View style={styles.LBNestedLeftView}>
              <FontAwesomeIcon
                icon="fat fa-masks-theater"
                size={hp(3.75)}
                style={{color: '#BB8FCE'}}
              />
            </View>
            <View style={styles.LBNestedRightView}>
              <Text style={styles.countText}>
                {item?.BALANCE == null ||
                item?.BALANCE == '' ||
                item?.BALANCE == undefined
                  ? 0
                  : item?.BALANCE}
              </Text>
              <Text style={styles.titleText}>Casual Leaves</Text>
            </View>
          </View>
        )}

        {item?.LEAVE_TYPE == 'Sick Leave' && (
          <View style={styles.leaveBalRightView}>
            <View style={styles.LBNestedLeftView}>
              <FontAwesomeIcon
                icon="fat fa-temperature-half"
                size={hp(3.75)}
                style={{color: '#DC7633'}}
              />
            </View>
            <View style={styles.LBNestedRightView}>
              <Text style={styles.countText}>
                {item?.BALANCE == null ||
                item?.BALANCE == '' ||
                item?.BALANCE == undefined
                  ? 0
                  : item?.BALANCE}
              </Text>
              <Text style={styles.titleText}>Sick Leaves</Text>
            </View>
          </View>
        )}

        {item?.LEAVE_TYPE == 'Annual Leave' && (
          <View style={styles.leaveBalRightView}>
            <View style={styles.LBNestedLeftView}>
              <FontAwesomeIcon
                icon="fat fa-island-tropical"
                size={hp(3.75)}
                style={{color: '#58D68D'}}
              />
            </View>
            <View style={styles.LBNestedRightView}>
              <Text style={styles.countText}>
                {item?.BALANCE == null ||
                item?.BALANCE == '' ||
                item?.BALANCE == undefined
                  ? 0
                  : item?.BALANCE}
              </Text>
              <Text style={styles.titleText}>Annual Leavess</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setMessageId(null);
      setEmpName(null);
      setMsgDate(null);
      setEmpPhoto(null);
      setMessageSubject(null);

      return () => {
        console.log('Home page is unfocused');
        // dispatch(clearViewAllMessagesState());
      };
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Close the app when the back button is pressed
        BackHandler.exitApp();
        return true; // Return true to prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [playAnimation, setPlayAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayAnimation(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  console.log('playAnimation', playAnimation);

  const onPressCrossBirthday = () => {
    console.log('onPressCrossBirthday');
    setPlayAnimation(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android'
            ? colors.appBackGroundColor
            : colors.appBackGroundColor,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={{height: hp('5')}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'light-content'}
        />
      </LinearGradient>

      <>
        <View>
          <HeaderTop
            onPressUserImg={() => navigation.navigate('Profile')}
            userImg={profileHere?.userData?.emp_result?.EMP_PHOTO}
            welcomeText={'Welcome'}
            userName={profileHere?.userData?.emp_result?.EMP_NAME}
            onPressIcon={() => navigation.openDrawer()}
            iconName={'arrowleft'}
          />
        </View>

        <>
          {profileHere.isLoading ? (
            <Loader></Loader>
          ) : (
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#2A72B6', '#203B88']}
                  progressBackgroundColor={'#fcfcfc'}
                  tintColor={'#1C37A4'}
                />
              }>
              <View style={styles.botContainer}>
                <View
                  style={{
                    flex: 0.33,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: 'servicelength'}}
                    style={{height: hp('3.5'), width: wp('7')}}
                    resizeMode={'contain'}
                  />

                  <Text style={[styles.serviceSection]}>
                    {profileHere?.userData?.emp_result?.SERVICE_LENGTH}
                  </Text>

                  <Text style={[styles.bootContText2]}>Service Length</Text>
                </View>
                <View style={styles.monial}>
                  <Image
                    source={{uri: 'empstatus'}}
                    style={{height: hp('3.5'), width: wp('7')}}
                    resizeMode={'contain'}
                  />

                  <Text style={[styles.serviceSection]}>
                    {profileHere?.userData?.emp_result?.EMP_STATUS_DESCRIPTION}
                  </Text>
                  <Text style={[styles.bootContText2]}>Status</Text>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.33,
                  }}>
                  <Image
                    source={{uri: 'empcalendar'}}
                    style={{height: hp('3.5'), width: wp('7')}}
                    resizeMode={'contain'}
                  />

                  <Text style={styles.serviceSection}>
                    {profileHere?.empTimeIn == null ||
                    profileHere?.empTimeIn == undefined ||
                    profileHere?.empTimeIn == ''
                      ? '--:--:--'
                      : profileHere?.empTimeIn}
                  </Text>
                  <Text style={[styles.bootContText2]}>Attendance</Text>
                </View>
              </View>

              <View
                style={{marginHorizontal: wp('5.5'), marginTop: hp('1.75')}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: hp('1'),
                    height: hp('4'),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.messageText}>Messages</Text>
                  </View>
                  <View style={{flex: 0.45}}></View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ViewAllMessages')}
                    style={{
                      flex: 0.25,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={[styles.messageText, {fontSize: hp('1.65')}]}>
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{marginHorizontal: wp('-2'), marginTop: hp('-1')}}>
                  <FlatList
                    data={messagesHere?.userData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>

              <View style={{marginHorizontal: wp('5.5'), marginTop: hp('1')}}>
                <Text style={styles.messageText}>Leaves</Text>
              </View>

              {leaveBalanceHere?.success == 1 && (
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    marginHorizontal: wp('5.5'),
                    marginTop: hp('1'),
                    borderRadius: wp('2'),

                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                    marginBottom: hp('1'),
                  }}>
                  <View style={styles.LBMainView}>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => navigation.navigate('LeaveBalance')}
                      style={styles.LBLeftView}>
                      <PieChart
                        data={[
                          {
                            value: annual ? annual : 0,
                            color: '#B141CE',
                          },
                          {
                            value: casual ? casual : 0,
                            color: '#41CE68',
                          },
                          {
                            value: sick ? sick : 0,
                            color: '#CE5141',
                          },
                          {
                            value: maternity ? maternity : 0,
                            color: '#41CE68',
                          },
                          {
                            value: long ? long : 0,
                            color: '#4167C4',
                          },
                          {
                            value: hajj ? hajj : 0,
                            color: '#41CEB4',
                          },
                          {
                            value: without ? without : 0,
                            color: '#7051CE',
                          },
                          {
                            value: pending ? pending : 0,
                            color: '#edebeb',
                          },
                        ]}
                        donut
                        // showGradient
                        sectionAutoFocus
                        radius={57}
                        innerRadius={52}
                        centerLabelComponent={() => {
                          return (
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text style={styles.LBCountText}>
                                {leaveBalanceHere?.userData?.total_count}
                              </Text>
                              <Text style={styles.LBText}>LEAVE BALANCE</Text>
                            </View>
                          );
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 0.45,
                      }}>
                      <FlatList
                        data={leaveBalanceHere?.userData?.result}
                        renderItem={renderItemLeaves}
                        keyExtractor={(item, index) => index.toString()}
                      />
                      {/* <Text style={{color: 'black'}}>kkk</Text> */}
                    </View>
                  </View>

                  <View style={styles.LBBtnMainView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('ApplyLeave')}
                      style={styles.LBBtnView}>
                      <Text style={[styles.btnText, {color: '#1C37A4'}]}>
                        Apply Leave
                      </Text>
                    </TouchableOpacity>
                    <View style={{flex: 0.1}}></View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('AttendanceTab')}
                      style={[styles.LBBtnView, {backgroundColor: '#1C37A4'}]}>
                      <Text style={[styles.btnText, {color: '#FFFFFF'}]}>
                        View Calendar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {profileHere?.userData?.reporting_result?.reportee_length > 0 && (
                <>
                  <View
                    style={{marginHorizontal: wp('5.5'), marginTop: hp('1')}}>
                    <Text style={styles.messageText}>Reportees</Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: wp('5.5'),
                      marginTop: hp('1'),
                      height: hp('10'),

                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'flex-start',

                      backgroundColor: '#FFFFFF',
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                      elevation: 4,
                      marginVertical: hp('1'),
                    }}>
                    <FlatList
                      data={slicedData}
                      renderItem={renderItemReportees}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={{paddingHorizontal: wp('1'), marginLeft: wp('2')}}
                    />
                  </View>
                </>
              )}

              {profileHere?.userData?.wfh_result == 1 && (
                <>
                  <View
                    style={{
                      marginHorizontal: wp('5.5'),
                      marginTop: hp('1'),
                      marginBottom: hp('1'),
                    }}>
                    <Text style={styles.messageText}>W.F.H</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('WFHScreen')}
                    style={{
                      backgroundColor: '#1C37A4',
                      marginHorizontal: wp('5.5'),
                      marginVertical: hp('2'),
                      borderRadius: wp('10'),
                      height: hp('5'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        styles.btnText,
                        {color: '#FFFFFF', fontSize: hp('1.85')},
                      ]}>
                      Work From Home
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {profileHereEmpBirthday == 0 ? (
                <>
                  {playAnimation ? (
                    <View style={styles.animationContainer}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 0.8}}></View>
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={onPressCrossBirthday}
                            style={{
                              height: hp('5'),
                              width: wp('10'),
                              backgroundColor: '#1C37A4',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: wp('50'),
                            }}>
                            <FontAwesomeIcon
                              icon="fa fa-xmark"
                              size={hp(2.75)}
                              style={{color: 'white'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{}}>
                        <LottieView
                          style={styles.animation}
                          source={
                            profileHere?.userData?.emp_result?.EMP_GENDER ==
                            'Male'
                              ? require('../assets/birthdaymale.json')
                              : require('../assets/birthdayfemale.json')
                          }
                          autoPlay
                          loop={false}
                        />
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </ScrollView>
          )}
        </>

        {modalVisible && (
          <ViewMessageDetailModal
            activeOpacityLikeIcon={msgLike != 'Y' ? 0.8 : 1}
            closeModal={closeModal}
            headTitleText={'Message'}
            msgSubject={messageSubject}
            empPhoto={empPhoto}
            empName={empName}
            msgDate={msgDate}
            htmlSource={messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING}
            onPressLikeIcon={
              msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse
            }
            inconType={msgLike == 'Y' ? 'solid' : 'light'}
          />
        )}

        {reporteeModal ? (
          <ReporteeProfileModal
            onPressBackIcon={onRequestClose}
            modalVisible={reporteeModal}
            onRequestClose={onRequestClose}
            reporteeId={idHere}
            my_branch_id={branchIdHere}
            my_DEPARTMENT_ID={deptIdHere}
          />
        ) : (
          <></>
        )}
      </>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  scanView: {
    height: hp('6'),
    alignItems: 'center',
    width: wp(12),
    borderWidth: hp(0.5),
    borderColor: 'gray',
    borderRadius: hp(50),
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  tgdsuccess: {
    color: '#186A3B',
    alignContent: 'center',
    paddingLeft: hp(2),
    fontSize: hp(3),
  },
  tgDataView: {
    width: wp(8),
    height: hp(4),
    backgroundColor: 'red',
    borderRadius: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(-2),
    marginRight: hp(-2),
  },
  modalstateView: {
    width: wp(80),
    height: hp(20),
    backgroundColor: '#cdcdcd',
    marginHorizontal: hp(2.3),
    borderRadius: hp(2),
  },
  modalText: {color: '#363636', paddingLeft: hp(2)},
  textInputView: {
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
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('6'),
    color: colors.loginIconColor,
  },
  textView: {
    marginTop: hp(2),
  },

  textstyle: {
    color: '#fff',
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  headerRow: {
    justifyContent: 'space-between',
  },
  botContainer: {
    height: hp(10),
    marginTop: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp('7'),
  },
  zetext: {
    color: '#fff',
    fontSize: fontSize.small,
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },
  bootContText: {
    fontSize: '0.5rem',
    fontWeight: '900',
    fontFamily: fontFamily.ceraLight,
    paddingHorizontal: hp(3),
    color: '#979797',
  },
  bootContText2: {
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
    color: '#979797',
    textTransform: 'uppercase',
    paddingTop: hp(0.2),
    letterSpacing: 0.35,
  },
  serviceSection: {
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
    color: '#353535',
    paddingTop: hp(0.3),
  },

  zetext1: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },

  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
  },
  iconStyle: {
    fontSize: '1.5625rem',
    fontWeight: 300,
  },

  tost: {
    backgroundColor: '#F1948A',
    width: wp(90),
    marginHorizontal: hp(2.5),
    borderRadius: 5,
  },
  monial: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: hp(2),
  },
  wfh: {
    marginHorizontal: hp(2.5),
    borderRadius: hp(2),
    height: hp(12),
    backgroundColor: '#FFFFFF',
    marginBottom: hp(5),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },

  messageText: {
    fontSize: hp('2.1'),
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#646464',
    letterSpacing: 0.1,
  },
  messageCardEmpName: {
    color: '#6A6A6A',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
  LBMainView: {
    flexDirection: 'row',
  },
  LBLeftView: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
    marginBottom: hp('0'),
  },
  leaveBalRightView: {
    flexDirection: 'row',
    marginTop: hp('1'),
  },
  LBCountText: {
    fontSize: '1.15rem',
    color: '#646464',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
  },
  LBText: {
    fontSize: '0.45rem',
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  LBNestedLeftView: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LBNestedRightView: {
    flex: 0.75,
    justifyContent: 'center',
  },
  countText: {
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    color: '#353535',
    fontSize: '0.78rem',
    letterSpacing: 0.2,
  },
  titleText: {
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#747474',
    fontSize: '0.45rem',
    letterSpacing: 0.25,
  },
  LBBtnMainView: {
    marginHorizontal: wp('5'),
    flexDirection: 'row',
    marginVertical: hp('1.5'),
  },
  LBBtnView: {
    flex: 0.45,
    height: hp('4.25'),
    borderRadius: wp('10'),
    borderColor: '#1C37A4',
    borderWidth: wp('0.1'),

    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  animationContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 5,
    // bottom: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: wp('15'),
  },
  animation: {
    width: wp('70'),
    height: hp('35'),
    marginTop: hp('-2'),
  },
});

export default HomeScreen;
