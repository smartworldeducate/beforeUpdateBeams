import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';
import EmpCardPart from '../EmpCardPart/EmpCardPart';
import {useDispatch, useSelector} from 'react-redux';
import {reporteeProfileAction} from '../../features/ReporteeSectionSlice/ReporteeProfileSlice';
import Loader from '../Loader/Loader';
import ProfileCard from '../ProfileCard/ProfileCard';
import ReporteeMovementLogModal from './ReporteeMovementLogModal';
import ReporteeChildrenInBSSModal from './ReporteeChildrenInBSSModal';

const ReporteeProfileModal = ({
  onPressBackIcon,
  modalVisible,
  onRequestClose,
  reporteeId,
  my_branch_id,
  my_DEPARTMENT_ID,
}) => {
  const dispatch = useDispatch();
  const reporteeProfileHere = useSelector(state => state.reporteeProfileStore);
  console.log('reporteeProfileHere', reporteeProfileHere);

  useEffect(() => {
    dispatch(
      reporteeProfileAction({
        employee_id: reporteeId,
        branch_id: my_branch_id,
        dept_id: my_DEPARTMENT_ID,
      }),
    );
  }, [dispatch, reporteeId]);

  const [reporteeMovementModal, setReporteeMovementModal] = useState(false);
  const [reporteeChilBSSModal, setReporteeChildBSSModal] = useState(false);

  const onPressReporteeMovement = () => {
    // console.log('onPressReporteeMovement');
    setReporteeMovementModal(true);
  };

  const onRequestCloseReporteeMovement = () => {
    setReporteeMovementModal(false);
  };

  const onPressReporteeChildInBSS = () => {
    // console.log('onPressReporteeChileInBSS');
    setReporteeChildBSSModal(true);
  };
  const onRequestCloseReporteeChildBSS = () => {
    setReporteeChildBSSModal(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      {reporteeProfileHere?.isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: '#1C37A4',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('2'),
                marginHorizontal: wp('2'),
                height: hp('5'),
              }}>
              <TouchableOpacity
                onPress={onPressBackIcon}
                style={styles.topLeftRightView}>
                <Icon
                  type="light"
                  name={'arrow-left'}
                  size={hp(3)}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={{flex: 0.7}}></View>
            </View>

            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                marginTop: hp('6.85'),
                left: wp('37.5'),
              }}>
              <Image
                source={{
                  uri: reporteeProfileHere?.userData?.emp_result?.EMP_PHOTO,
                }}
                style={{
                  height: hp('12.5'),
                  width: wp('25'),
                  borderRadius: wp('50'),
                  borderWidth: wp('0.5'),
                  borderColor: '#cfdbfa',

                  shadowColor: '#1C37A4',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: wp('10'),
                  shadowRadius: wp('10'),
                  elevation: 10,
                }}
                resizeMode={'contain'}
              />
            </View>

            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                marginTop: hp('15'),
                left: wp('60'),
                height: hp('1.5'),
                width: wp('3'),
                borderRadius: wp('50'),
                backgroundColor:
                  reporteeProfileHere?.userData?.profile_result
                    ?.CONFIRMATION_DATE == null ||
                  reporteeProfileHere?.userData?.profile_result
                    ?.CONFIRMATION_DATE == ''
                    ? 'orange'
                    : '#10B727',
              }}>
              <Text></Text>
            </View>

            <View
              style={{
                height: hp('22'),
                marginHorizontal: wp('4'),
                marginTop: hp('10'),
              }}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'white',

                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('5'),
                  flexDirection: 'column',
                  paddingHorizontal: wp('3'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.1}}></View>
                  <View
                    style={{
                      flex: 0.8,
                      flexDirection: 'column',
                      marginHorizontal: wp('2'),
                    }}>
                    <View style={{}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={styles.empName}>
                        {reporteeProfileHere?.userData?.emp_result?.EMP_NAME}
                      </Text>
                    </View>

                    <View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={styles.empDesignation}>
                        {reporteeProfileHere?.userData?.emp_result?.DESIGNATION}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.1,
                    }}></View>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: '#DBDBDB',
                    marginTop: hp(3),
                    marginBottom: hp(2),
                    width: wp('92'),
                  }}></View>

                <EmpCardPart
                  firstText={'STATUS'}
                  statusValue={
                    reporteeProfileHere?.userData?.emp_result
                      ?.EMP_STATUS_DESCRIPTION
                  }
                  secondText={'SERVICE'}
                  serviceLengthValue={
                    reporteeProfileHere?.userData?.emp_result?.SERVICE_LENGTH
                  }
                  thirdText={'AGE'}
                  ageValue={
                    reporteeProfileHere?.userData?.emp_result?.TOTAL_AGE
                  }
                />

                <View
                  style={{
                    width: '40%',
                    height: '40%',
                    position: 'absolute',
                    top: -hp(6),
                    borderBottomLeftRadius: hp(15) / 1.5,
                    borderBottomRightRadius: hp(15) / 1.5,
                    backgroundColor: '#1C37A4',
                  }}
                />
              </View>
            </View>

            {/* <View
              style={{
                height: hp('22'),
                backgroundColor: 'white',
                marginHorizontal: wp('4'),
                marginTop: hp('3'),
                borderRadius: wp('5'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('5'),
                }}>
                <View style={{flex: 0.15}}></View>
                <View
                  style={{
                    flex: 0.7,
                    flexDirection: 'column',
                    marginHorizontal: wp('2'),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.75}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={styles.empName}>
                        {reporteeProfileHere?.userData?.emp_result?.EMP_NAME}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.25,
                        backgroundColor: '#D4FFCC',
                        borderRadius: wp('3'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.empId}>
                        {reporteeProfileHere?.userData?.emp_result?.EMPLOYEE_ID}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={styles.empDesignation}>
                      {reporteeProfileHere?.userData?.emp_result?.DESIGNATION}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.15,
                  }}></View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#DBDBDB',
                  marginTop: hp(3),
                  marginBottom: hp(2),
                }}></View>

              <View style={{marginHorizontal: wp('3')}}>
                <EmpCardPart
                  firstText={'STATUS'}
                  statusValue={
                    reporteeProfileHere?.userData?.emp_result
                      ?.EMP_STATUS_DESCRIPTION
                  }
                  secondText={'SERVICE'}
                  serviceLengthValue={
                    reporteeProfileHere?.userData?.emp_result?.SERVICE_LENGTH
                  }
                  thirdText={'AGE'}
                  ageValue={
                    reporteeProfileHere?.userData?.emp_result?.TOTAL_AGE
                  }
                />
              </View>
            </View> */}

            <View style={{marginHorizontal: wp('4'), marginTop: hp('2')}}>
              <ProfileCard
                empId={reporteeProfileHere?.userData?.emp_result?.EMPLOYEE_ID}
                empFatherName={
                  reporteeProfileHere?.userData?.profile_result?.FATHER_NAME
                }
                empGender={
                  reporteeProfileHere?.userData?.emp_result?.EMP_GENDER
                }
                empReligion={
                  reporteeProfileHere?.userData?.profile_result?.RELIGION_NAME
                }
                empDOB={
                  reporteeProfileHere?.userData?.profile_result?.BIRTH_DATE
                }
                empCNIC={
                  reporteeProfileHere?.userData?.profile_result?.NIC_NUMBER
                }
                empCadre={reporteeProfileHere?.userData?.profile_result?.CADRE}
                empDesignation={
                  reporteeProfileHere?.userData?.profile_result?.DESIGNATION
                }
                empDepartment={reporteeProfileHere?.userData?.profile_result?.DEPARTMENT.replace(
                  /\s+$/,
                  '',
                )}
                empBranch={reporteeProfileHere?.userData?.emp_result?.BR_NAME}
                empStatus={
                  reporteeProfileHere?.userData?.emp_result
                    ?.EMP_STATUS_DESCRIPTION
                }
                empReportingTo={
                  reporteeProfileHere?.userData?.profile_result?.REPORTING_TO
                }
                empHireDate={
                  reporteeProfileHere?.userData?.emp_result?.HIRE_DATE
                }
                empRegularDate={
                  reporteeProfileHere?.userData?.profile_result?.REGULAR_DATE
                }
                empConfirmationDate={
                  reporteeProfileHere?.userData?.profile_result
                    ?.CONFIRMATION_DATE
                }
                empServiceLength={
                  reporteeProfileHere?.userData?.profile_result?.SERVICE_LENGTH
                }
                empBasicSalary={
                  reporteeProfileHere?.userData?.profile_result?.BASIC_SAL
                }
                empGrossSalary={
                  reporteeProfileHere?.userData?.profile_result?.GROSS_SAL
                }
                empAllowance={
                  reporteeProfileHere?.userData?.profile_result?.ALLOWANCES
                }
                empTakeHomeSalary={
                  reporteeProfileHere?.userData?.profile_result?.TAKE_HOME
                }
                empCostToSchool={
                  reporteeProfileHere?.userData?.profile_result?.CTS
                }
                empAccounTitle={
                  reporteeProfileHere?.userData?.profile_result?.AC_TITLE
                }
                empEOBI={
                  reporteeProfileHere?.userData?.profile_result?.EOBI_NUMBER
                }
                empMobilePrimary={
                  reporteeProfileHere?.userData?.profile_result?.MOB_PHONE
                }
                empMobileSecondary={
                  reporteeProfileHere?.userData?.profile_result?.PHONE_NO
                }
                empEmail={reporteeProfileHere?.userData?.profile_result?.E_MAIL}
                empAddress={
                  reporteeProfileHere?.userData?.profile_result?.ADRESS
                }
                onPressMovementLog={onPressReporteeMovement}
                onPressChildInBSS={onPressReporteeChildInBSS}
              />
            </View>
          </ScrollView>
        </>
      )}

      <>
        {reporteeMovementModal && (
          <>
            <ReporteeMovementLogModal
              modalVisible={reporteeMovementModal}
              onRequestClose={onRequestCloseReporteeMovement}
              statusValue={
                reporteeProfileHere?.userData?.profile_result?.EMP_STATUS
              }
              serviceLengthValue={
                reporteeProfileHere?.userData?.emp_result?.SERVICE_LENGTH
              }
              ageValue={reporteeProfileHere?.userData?.emp_result?.TOTAL_AGE}
              movementLogData={
                reporteeProfileHere?.userData?.movement_log_result
              }
            />
          </>
        )}

        {reporteeChilBSSModal && (
          <>
            <ReporteeChildrenInBSSModal
              modalVisible={reporteeChilBSSModal}
              onRequestClose={onRequestCloseReporteeChildBSS}
              reporteeChildrenData={
                reporteeProfileHere?.userData?.bsschildResult_result
              }
            />
          </>
        )}
      </>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  topLeftRightView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menustyle: {
    width: '1rem',
    height: '1rem',
  },
  empName: {
    fontSize: '0.73rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
    paddingVertical: hp('0.35'),
  },
  empId: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraBold,
    color: '#2D8E00',
    fontWeight: '700',
    textAlign: 'center',
  },
  empDesignation: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#979797',
    fontWeight: '500',
  },
});

export default ReporteeProfileModal;
