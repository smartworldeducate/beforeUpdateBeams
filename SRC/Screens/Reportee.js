import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import EmpCardPart from '../Components/EmpCardPart/EmpCardPart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AllRepoteesAction} from '../features/ReporteeSectionSlice/AllReportessSlice';
import colors from '../Styles/colors';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import TeamModal from '../Components/Modal/TeamModal';
import ReporteeProfileModal from '../Components/Modal/ReporteeProfileModal';
import Loader from '../Components/Loader/Loader';
import ReporteesCardPart from '../Components/EmpCardPart/ReporteesCardPart';

const options = {day: 'numeric', month: 'short', year: 'numeric'};

const Reportee = props => {
  const dispatch = useDispatch();
  const profileHere = useSelector(state => state.profileStore);
  const allReporteesHere = useSelector(state => state.allReporteesStore);
  console.log('profileHere', profileHere);
  console.log('allReporteesHere', allReporteesHere);

  const [modalVisible, setModalVisible] = useState(false);
  const [reporteeModal, setReporteeModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-PK', options),
  );
  const [filterTextName, setFilterTextName] = useState(
    profileHere?.userData?.emp_result?.EMP_NAME.split(' ')[0] + ' ' + 'Team',
  );

  const [selectReportee, setSelectReportee] = useState();

  // console.log('profileHere', profileHere?.userData?.reporting_result?.data);

  const [reportingToId, setReportingToId] = useState();
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        const branchId = await AsyncStorage.getItem('branchId');
        const parsedBranchId = JSON.parse(branchId);

        const deptId = await AsyncStorage.getItem('deptId');
        const parsedDeptId = JSON.parse(deptId);
        dispatch(
          AllRepoteesAction({
            reportingToId: parsedLoginData,
            branch_id: parsedBranchId,
            dept_id: parsedDeptId,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   AsyncStorage.getItem('loginData')
  //     .then(loginData => {
  //       const parsedLoginData = JSON.parse(loginData);
  //       setReportingToId(parsedLoginData);
  //       dispatch(
  //         AllRepoteesAction({
  //           reportingToId: parsedLoginData,
  //           month_date: moment(selectedDate, 'DD MMM YYYY').format(
  //             'DD/MM/YYYY',
  //           ),
  //         }),
  //       );
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving loginData from AsyncStorage:', error);
  //     });
  // }, [dispatch]);

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPressDateModal = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const selectedDateOnConfirm = date.toLocaleDateString('en-PK', options);

    dispatch(
      AllRepoteesAction({
        reportingToId: reportingToId,
        month_date: moment(selectedDateOnConfirm, 'DD MMM YYYY').format(
          'DD/MM/YYYY',
        ),
        reporteeId: selectReportee,
      }),
    );

    setSelectedDate(selectedDateOnConfirm);
    hideDatePicker();
  };
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 6);

  const [idHere, setIdHere] = useState(null);
  const [branchIdHere, setBranchIdHere] = useState(null);
  const [deptIdHere, setDeptIdHere] = useState(null);

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

  const onPressReporteeTeamMember = item => {
    setFilterTextName(item?.itemName);
    setSelectReportee(item?.itemId);
    dispatch(
      AllRepoteesAction({
        reportingToId: reportingToId,
        month_date: moment(selectedDate, 'DD MMM YYYY').format('DD/MM/YYYY'),
        reporteeId: item?.itemId,
      }),
    );
    setModalVisible(false);
  };

  const onPressMainReportee = () => {
    // console.log('onPressMainReportee');
    dispatch(
      AllRepoteesAction({
        reportingToId: reportingToId,
        month_date: moment(selectedDate, 'DD MMM YYYY').format('DD/MM/YYYY'),
      }),
    );
    setFilterTextName(
      profileHere?.userData?.emp_result?.EMP_NAME.split(' ')[0] + ' ' + 'Team',
    );
    setModalVisible(false);
  };

  console.log('selectReportee', selectReportee);

  const renderItem = ({item, index}) => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: 'salman'}}
              style={{
                height: hp('4.5'),
                width: wp('9'),
                borderRadius: wp('5'),
              }}
              resizeMode={'cover'}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              onPressReportee({
                item: item?.EMPLOYEE_ID,
                itemBranchId: item?.BRANCH_ID,
                itemDeptId: item?.DEPARTMENT_ID,
              })
            }
            activeOpacity={0.5}
            style={{
              flex: 0.45,
              flexDirection: 'column',
            }}>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeName}>
                {item?.EMP_NAME}
              </Text>
            </View>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeDesignation}>
                {item?.DESIGNATION}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 0.215,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="regular"
                name="arrow-down-right"
                size={hp('2')}
                color="#10B727"
              />
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.empInOutTime}>
                {item?.TIME_IN}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.215,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="regular"
                name="arrow-up-right"
                size={hp('2')}
                color="#10B727"
              />
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.empInOutTime}>
                {item?.TIME_OUT}
              </Text>
            </View>
          </View>
        </View>

        <LineSeprator
          height={hp('0.15')}
          backgroundColor={'#DBDBDB'}
          maginVertical={hp('1.25')}
        />
      </View>
    );
  };

  const renderItemTeam = ({item, index}) => {
    // console.log('item>>>', item);
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            onPressReporteeTeamMember({
              itemId: item.EMPLOYEE_ID,
              itemName: item?.EMP_NAME,
            })
          }
          activeOpacity={0.5}
          style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.EMP_PHOTO}}
              style={{
                height: hp('4.5'),
                width: wp('9'),
                borderRadius: wp('5'),
              }}
              resizeMode={'cover'}
            />
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.reporteeName}>
              {item?.EMP_NAME}
            </Text>
          </View>
        </TouchableOpacity>
        <LineSeprator
          height={hp('0.15')}
          backgroundColor={'#DBDBDB'}
          maginVertical={hp('1.25')}
          marginHorizontal={wp('-5')}
        />
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
      }}>
      <>
        <View>
          <MainHeader
            text={'Reportees'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>

        {allReporteesHere?.isLoading && <Loader></Loader>}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#f5f8fc',
          }}>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  onPress={onPressModal}
                  activeOpacity={0.5}
                  style={{
                    flex: 0.48,
                    flexDirection: 'row',
                    borderRadius: wp('3'),
                    borderWidth: wp('0.15'),
                  }}>
                  <View
                    style={{
                      flex: 0.75,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={styles.filterText}>
                      {filterTextName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'black'}}></Text>
                  </View>
                </TouchableOpacity>
                <View style={{flex: 0.04}}></View>
                <TouchableOpacity
                  onPress={onPressDateModal}
                  activeOpacity={0.5}
                  style={{
                    flex: 0.48,
                    flexDirection: 'row',
                    borderRadius: wp('3'),
                    borderWidth: wp('0.15'),
                  }}>
                  <View
                    style={{
                      flex: 0.75,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.filterText}>{selectedDate}</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'black'}}></Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginVertical: hp('2')}}>
                <ReporteesCardPart
                  firstText={'TOTAL'}
                  statusValue={allReporteesHere?.userData?.reportee_length}
                  secondText={'PRESENT'}
                  serviceLengthValue={allReporteesHere?.userData?.PRESENT_EMP}
                  thirdText={'ABSENT'}
                  ageValue={allReporteesHere?.userData?.ABSENT_EMP}
                />
              </View>

              <LineSeprator
                height={hp('0.15')}
                backgroundColor={'#DBDBDB'}
                marginHorizontal={wp('-5')}
              />

              <View style={{marginBottom: hp('2')}}></View>
              <FlatList
                data={allReporteesHere?.userData?.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          {/* {modalVisible ? (
            <TeamModal
              myData={profileHere?.userData?.reporting_result?.data}
              renderItem={renderItemTeam}
              keyExtractor={(item, index) => index.toString()}
              onPressOpacity={onPressModal}
              empName={profileHere?.userData?.emp_result?.EMP_NAME}
              onPressMainReportee={onPressMainReportee}
            />
          ) : (
            <></>
          )} */}

          {isDatePickerVisible ? (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={minDate}
              maximumDate={new Date()}
            />
          ) : (
            <></>
          )}

          {/* {reporteeModal ? (
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
          )} */}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Reportee;

const styles = EStyleSheet.create({
  filterText: {
    paddingHorizontal: wp('1'),
    color: 'black',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
  },
  reporteeName: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#343434',
  },
  reporteeDesignation: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#979797',
  },
  empInOutTime: {
    fontSize: '0.43rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#10B727',
  },
});
