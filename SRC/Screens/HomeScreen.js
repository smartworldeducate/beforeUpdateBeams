import React, {useEffect, useState, useRef, useCallback} from 'react';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
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
  Linking,
  ActivityIndicator,
  RefreshControl,
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
import Card from '../Components/Card';
import Calinder from '../Components/Calinder';
import fontSize from '../Styles/fontSize';
import fontFamily from '../Styles/fontFamily';
import {salaryHistoryHandler} from '../features/history/createSlice';
import {empSlaryHandler} from '../features/empSalary/createSlice';
import {utilityHandler} from '../features/utility/createSlice';
import {appraisalHandler} from '../features/appraisal/createSlice';
import {bssChildHandler} from '../features/childbss/createSlice';
import {getAllTags} from '../features/tags/tagSlice';
import {getAllCats} from '../features/category/allCatSlice';
import {salMonthHandleFun} from '../features/salmonth/createSlice';
import {getSingleTag} from '../features/tagsingle/singletagSlice';
import {getRatingHandler} from '../features/getallrating/createSlice';
import {handleScaneer} from '../features/scan/scanSlice';
import {wfhHandler} from '../features/wfh/createSlice';
import {timelineHandler} from '../features/timeline/createSlice';
import {profileHandler} from '../features/profile/createSlice';
import {mevementHandler} from '../features/movement/createSlice';
import {leaveBalanceHandler} from '../features/balanceleave/createSlice';
const HomeScreen = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [homeState, setHomeState] = useState(true);
  const [indexState, setIndexState] = useState(false);
  const [tagState, setTagState] = useState(false);
  const [profileState, setProfileState] = useState(false);
  const [localData, setLocalData] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [dateEmp, setDateEmp] = useState('2023-01-01');
  const [animodal, setAnimodal] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [isShow, setShow] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [sData, setSdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [wfh, setWfh] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    scan: false,
    ScanResult: false,
    result: '',
  });
  const {scan, ScanResult, result} = state;
  const userData = useSelector(state => state.userLogin);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setLocalData(parsedData);
        const empSalary = await dispatch(
          empSlaryHandler({
            employeeId: parsedData?.EMPLOYEE_ID,
            sal_date: dateEmp,
          }),
        );
        const hisData = await dispatch(
          salaryHistoryHandler({employeeId: parsedData?.EMPLOYEE_ID}),
        );
        const appData = await dispatch(
          appraisalHandler({employeeId: parsedData?.EMPLOYEE_ID}),
        );
        const bssData = await dispatch(
          bssChildHandler({employeeId: parsedData?.EMPLOYEE_ID}),
        );
        const tagData = await dispatch(getAllTags());
        const catData = await dispatch(getAllCats());
        const empsal = await dispatch(salMonthHandleFun());
        const getRatingData = await dispatch(getRatingHandler());
        const utilityData = await dispatch(utilityHandler());
        const wfhData = await dispatch(
          wfhHandler({employee_id: parsedData?.EMPLOYEE_ID}),
        );
        if (wfhData?.payload?.data != '' && wfhData?.payload?.data != null) {
          // console.log("wfhdata==", wfhData)
          const wfhObj = Object.assign({}, ...wfhData?.payload?.data);
          setWfh(wfhObj);
        } else {
          // console.log("wfhdata==", wfhData)
        }
        const timeLineData = await dispatch(
          timelineHandler({employee_id: parsedData?.EMPLOYEE_ID}),
        );
        const profileData = await dispatch(
          profileHandler({
            employee_id: parsedData?.EMPLOYEE_ID,
            branch_id: parsedData?.BRANCH_ID,
          }),
        );
        const movementData = await dispatch(
          mevementHandler({employee_id: parsedData?.EMPLOYEE_ID}),
        );
        const leaveBalanceData = await dispatch(
          leaveBalanceHandler({employee_id: parsedData?.EMPLOYEE_ID}),
        );
        // console.log("testdata",movementData)
        // console.log("home profile Data",profileData?.payload?.data)
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      setIndexState(false);
      setTagState(false);
      setProfileState(false);
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData('loginData');
    setData(userData);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getData('loginData');
    setData(userData);
    // getcatHandle();
  }, []);

  const scanner = useRef(null);
  const onSuccess = async e => {
    const check = e.data.substring(0, 4);
    setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      await dispatch(
        handleScaneer({
          tag_id: e.data,
          employeeId: localData?.EMPLOYEE_ID,
        }),
      );

      setState({
        result: e.data,
        scan: false,
        ScanResult: true,
      });
      const catData = await dispatch(
        getSingleTag({employee_id: localData?.EMPLOYEE_ID}),
      );
      await setTagData(catData?.payload?.data);
      setVisible(false);
      // console.log('scan data', e.data);
      setModalState(true);
    }
  };

  const activeQR = e => {
    setState({
      scan: true,
    });
  };

  const handleQrcode = () => {
    // setShow(true)
    setVisible(true);
    activeQR('active qr');
  };

  const handleReset = () => {
    setState({scan: false});
    setVisible(false);
  };
  const [leave, setLeave] = useState(false);
  const [clinder, setClinder] = useState(false);
  const handleLeave = () => {
    setLeave(true);
    setClinder(false);
  };
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
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
        <StatusBar translucent backgroundColor="transparent" />
      </LinearGradient>
      <View>
        <HeaderTop
          onPressIcon={() => navigation.openDrawer()}
          iconName={'arrowleft'}
        />
      </View>
      <Toast isShow={isShow} positionIndicator="top" style={styles.tost}>
        <Text style={{color: '#fff'}}>please enter valid Qrcode</Text>
      </Toast>

      {modalState && (
        <View>
          <Modal isVisible={modalState}>
            {tagData &&
              tagData?.map((item, i) => {
                return (
                  <View style={styles.modalstateView} key={i}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View></View>
                      <TouchableOpacity
                        onPress={() => setModalState(false)}
                        style={styles.tgDataView}>
                        <Text style={{color: '#fff'}}>X</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', marginTop: hp(2)}}>
                      <Text style={styles.tgdsuccess}>
                        Tag Scan successfully
                      </Text>
                    </View>
                    <View style={{marginLeft: hp(5), marginTop: hp(1)}}>
                      <Text style={styles.modalText}>
                        Tag ID : {item?.tag_id}
                      </Text>
                      <Text style={styles.modalText}>
                        Employee ID : {item?.employee_id}
                      </Text>
                      <Text style={styles.modalText}>
                        IN TIME : {item?.scan_time}
                      </Text>
                      <Text style={styles.modalText}>
                        OUT TIME : {item?.scan_time2}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </Modal>
        </View>
      )}

      {animation && (
        <View>
          <Modal isVisible={animodal}>
            <View style={styles.actiindicator}>
              <View style={{}}>
                <ActivityIndicator animating={animation} size={'large'} />
              </View>
            </View>
          </Modal>
        </View>
      )}
      <BottomSheet
        isVisible={visible}
        style={{
          width: wp(100),
          height: hp(100),
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <View
          style={{
            width: wp(100),
            position: 'relative',
            zIndex: 1,
            marginBottom: hp(20),
          }}>
          <TouchableOpacity
            onPress={handleReset}
            style={{
              width: wp(10),
              height: hp(5),
              // borderRadius: hp(50),
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 20,
              left: hp(45),
            }}>
            <Text style={{color: 'gray', fontSize: hp(2)}}>X</Text>
          </TouchableOpacity>
        </View>

        {scan && (
          <QRCodeScanner
            cameraStyl={{height: hp(120)}}
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            bottomContent={
              <View
                style={{
                  paddingTop: hp(8),
                  flexDirection: 'row',
                  marginTop: hp(8),
                }}></View>
            }
          />
        )}
      </BottomSheet>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.botContainer}>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
            }}>
            <Ficon
              type="light"
              name="bars-progress"
              size={hp(3.5)}
              color="#4D69DC"
            />

            <Text style={[styles.serviceSection]}>
              {localData?.SERVICE_LENGTH}
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

            <Text style={[styles.serviceSection]}>{localData?.EMP_STATUS}</Text>
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

          {/* <View style={{backgroundColor: 'grey', flex: 0.1}}></View> */}
        </View>

        <Card />

        <View style={{marginBottom: hp(1)}}>
          <Calinder />
        </View>

        {wfh?.count == '0' || wfh?.count == '1' ? (
          <View>
            <View style={{marginHorizontal: hp(2.2), marginTop: hp(2)}}>
              <Text style={styles.clText1}>W.F.H</Text>
            </View>
            <View style={styles.wfh}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  props.navigation.navigate('WorkFromHome', {
                    myKey1: localData,
                    myCount: wfh?.count,
                  })
                }
                style={styles.mrf}>
                <Text style={styles.clbtnStyle}>Mark Attendance</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {wfh?.count == '2' ? <></> : null}
      </ScrollView>

      {/* <View
        style={{
          backgroundColor: '#fff',
          position: 'relative',
          bottom: hp(0),
        }}>
        <View
          style={{
            height: hp(7),
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={homeHandler}
            style={{flex: 0.2, alignItems: 'center'}}>
            <Menu
              name="home"
              size={hp(3)}
              color={homeState ? '#1C37A4' : 'gray'}
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={indexHandler}
            style={{flex: 0.2, paddingTop: hp(0.5), alignItems: 'center'}}>
            <Ficon
              type="light"
              name="book-bookmark"
              size={hp(3)}
              color={indexState ? '#1C37A4' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleQrcode}
            style={{
              flex: 0.2,
              alignItems: 'center',
            }}>
            <View style={styles.scanView}>
              <Ficon style={{}} name="qrcode" size={hp(4)} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{flex: 0.2, alignItems: 'center'}}
            onPress={tagHandler}>
            <Ficon
              type="light"
              name="user-tag"
              size={hp(3.5)}
              color={tagState ? '#1C37A4' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('Profile')}
            style={{flex: 0.2, alignItems: 'center', paddingTop: hp(0)}}>
            <Ficon
              type="light"
              name="user-tie"
              size={hp(3)}
              color={profileState ? '#1C37A4' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View> */}
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
    // paddingHorizontal: hp(2),
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
    marginHorizontal: hp(2),
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
});

export default HomeScreen;
