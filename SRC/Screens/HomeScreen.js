import React, {useEffect, useState, useRef, useCallback} from 'react';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import {Toast} from 'galio-framework';
import {BottomSheet} from '@rneui/themed';

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
const HomeScreen = props => {
  const dispatch = useDispatch();

  const profileHere = useSelector(state => state.profileStore);
  // console.log('profileHere', profileHere?.userData);

  const messagesHere = useSelector(state => state.messagesStore);
  // console.log('messagesHere', messagesHere);

  const slicedMessages = messagesHere?.userData?.slice(0, 5);
  // console.log('slicedMessages', slicedMessages);

  const leaveBalanceHere = useSelector(state => state.leaveBalanceStore);
  // console.log('leaveBalanceHereData', leaveBalanceHere?.userData);
  // console.log('leaveBalanceHere', leaveBalanceHere?.success);

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedLoginData = JSON.parse(loginData);

      // Check if parsedLoginData exists
      if (parsedLoginData) {
        const branchId = await AsyncStorage.getItem('branchId');
        const parsedBranchId = JSON.parse(branchId);

        const deptId = await AsyncStorage.getItem('deptId');
        const parsedDeptId = JSON.parse(deptId);

        // Dispatch actions to update Redux store
        dispatch(
          profileAction({
            employee_id: parsedLoginData,
            branch_id: parsedBranchId,
            dept_id: parsedDeptId,
          }),
        );

        dispatch(
          messagesAction({
            employeeId: parsedLoginData,
            ofset: 1,
          }),
        );

        dispatch(
          LeaveBalanceAction({
            employee_id: parsedLoginData,
          }),
        );
      }
    } catch (error) {
      console.error('Error retrieving values from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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
        onPress={() =>
          navigation.navigate('ViewMessageDetail', {messagedata: item})
        }
        style={{
          height: hp('14'),
          width: wp('74'),

          marginRight: wp('3'),
          marginLeft: wp('2'),
          borderRadius: wp('3'),
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
            height: hp('7'),

            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.17,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.EMP_PHOTO}}
              style={{height: hp('4.5'), width: wp('9'), borderRadius: wp(50)}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.83,
              paddingHorizontal: wp('1'),
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              letterSpacing={'tail'}
              style={styles.messageCardEmpName}>
              {item?.EMP_NAME}
            </Text>
            <Text style={styles.messageCardDate}>{item?.HIRE_DATE}</Text>
          </View>
        </View>
        <View
          style={{
            height: hp('10'),
            marginVertical: hp('0.5'),
            paddingHorizontal: wp('2'),
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              color: '#343434',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: hp('1.75'),
              letterSpacing: 0.5,
              lineHeight: hp('2.5'),
            }}>
            {item?.MSG_SUBJECT}
          </Text>
        </View>
      </TouchableOpacity>
    );
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

      {profileHere.isLoading ||
      messagesHere.isLoading ||
      leaveBalanceHere?.isLoading ? (
        <Loader></Loader>
      ) : (
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
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.botContainer}>
              <View
                style={{
                  flex: 0.33,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ficon
                  type="light"
                  name="bars-progress"
                  size={hp(3.5)}
                  color="#4D69DC"
                />

                <Text style={[styles.serviceSection]}>
                  {profileHere?.userData?.emp_result?.SERVICE_LENGTH}
                </Text>

                <Text style={[styles.bootContText2]}>Service Length</Text>
              </View>
              <View style={styles.monial}>
                <Ficon
                  type="light"
                  name="chart-area"
                  size={hp(3.5)}
                  color="#4D69DC"
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
                <Ficon
                  type="light"
                  containerStyle={styles.iconStyle}
                  name="calendar-days"
                  size={hp(3.5)}
                  color="#4D69DC"
                />

                <Text style={styles.serviceSection}>08:59:05</Text>
                <Text style={[styles.bootContText2]}>Attendance</Text>
              </View>
            </View>

            <View style={{marginHorizontal: wp('5.5'), marginTop: hp('1.75')}}>
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
                  data={slicedMessages}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>

            {/* <Card /> */}

            {/* <Calinder /> */}
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
                }}>
                <View style={styles.LBMainView}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => navigation.navigate('LeaveBalance')}
                    style={styles.LBLeftView}>
                    <PieChart
                      data={[
                        {
                          value: annual,
                          color: '#5bcfb5',
                        },
                        {
                          value: casual,
                          color: '#7151ce',
                        },
                        {
                          value: sick,
                          color: '#b245ce',
                        },
                        {
                          value: maternity,
                          color: '#4161ca',
                        },
                        {
                          value: long,
                          color: '#e3e3e3',
                        },
                        {
                          value: hajj,
                          color: '#5fce6a',
                        },
                        {
                          value: without,
                          color: 'red',
                        },
                        {
                          value: pending,
                          color: 'grey',
                        },
                      ]}
                      donut
                      // showGradient
                      sectionAutoFocus
                      radius={60}
                      innerRadius={55}
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
                    <View style={styles.leaveBalRightView}>
                      <View style={styles.LBNestedLeftView}>
                        <Icon
                          type="light"
                          name="masks-theater"
                          size={hp(4)}
                          color="#BB8FCE"
                        />
                      </View>
                      <View style={styles.LBNestedRightView}>
                        <Text style={styles.countText}>15</Text>
                        <Text style={styles.titleText}>CASUAL LEAVES</Text>
                      </View>
                    </View>

                    <View style={styles.leaveBalRightView}>
                      <View style={styles.LBNestedLeftView}>
                        <Icon
                          type="light"
                          name="temperature-half"
                          size={hp(4)}
                          color="#DC7633"
                        />
                      </View>
                      <View style={styles.LBNestedRightView}>
                        <Text style={styles.countText}>15</Text>
                        <Text style={styles.titleText}>SICK LEAVES</Text>
                      </View>
                    </View>

                    <View style={styles.leaveBalRightView}>
                      <View style={styles.LBNestedLeftView}>
                        <Icon
                          type="light"
                          name="island-tropical"
                          size={hp(3)}
                          color="#58D68D"
                        />
                      </View>
                      <View style={styles.LBNestedRightView}>
                        <Text style={styles.countText}>15</Text>
                        <Text style={styles.titleText}>ANNUAL LEAVES</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <LineSeprator
                  height={hp('0.15')}
                  backgroundColor={'#D9D9D9'}
                  marginHorizontal={wp('4')}
                  marginVertical={hp('1.25')}
                />

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
                    style={[styles.LBBtnView, {backgroundColor: '#1C37A4'}]}>
                    <Text style={[styles.btnText, {color: '#FFFFFF'}]}>
                      View Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </>
      )}
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

  ztitle: {
    color: '#fff',
    fontSize: hp(1.5),
    fontWeight: '600',
    marginTop: hp(1),
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
  clText1: {
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    paddingBottom: hp(0.5),
    color: '#646464',
    marginHorizontal: hp(2),
    fontStyle: 'normal',
  },
  clbtnText: {
    color: '#fff',
    marginHorizontal: hp(3),
    marginVertical: hp(1),
  },
  clbtnStyle: {
    fontSize: '0.7rem',
    color: '#1C37A4',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  leaveSectionText: {
    fontSize: '0.7rem',
    color: '#353535',
    marginTop: hp(1),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  viewClinderText: {
    color: '#fff',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: '0.6rem',
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
  inwfh: {
    height: hp(10),
    marginHorizontal: hp(2),
    // flexDirection: 'row',
    marginVertical: hp(3.7),
    justifyContent: 'space-between',
  },
  rfh: {
    borderRadius: hp(50),
    // width: wp(38),
    height: hp(4.5),
    borderWidth: 1,
    borderColor: '#1C37A4',
    backgroundColor: '#1C37A4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mrf: {
    // width: wp(38),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(6),
    borderRadius: hp(50),
    borderWidth: 1,
    borderColor: '#1C37A4',
    backgroundColor: '#fff',
    marginTop: hp(3),
    marginHorizontal: hp(2),
  },
  actiindicator: {
    width: wp(30),
    height: hp(15),
    backgroundColor: '#EAFAF1',
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hp(15),
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
    marginBottom: hp('1'),
  },
  leaveBalRightView: {
    flexDirection: 'row',
    marginTop: hp('2'),
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
    marginHorizontal: wp('3'),
    flexDirection: 'row',
    marginVertical: hp('1.25'),
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
});

export default HomeScreen;
