import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Check from 'react-native-vector-icons/AntDesign';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import EmpCardPart from '../Components/EmpCardPart/EmpCardPart';
import ProfileCard from '../Components/ProfileCard/ProfileCard';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const Profile = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileHere = useSelector(state => state.profileStore);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1C37A4',
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#1C37A4',
        }}>
        <StatusBar barStyle={'default'} backgroundColor={'#1C37A4'} />

        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('7'),
            marginHorizontal: wp('2'),
            height: hp('5'),
          }}>
          <TouchableOpacity
            style={styles.topLeftRightView}
            onPress={() => props.navigation.goBack()}>
            <Icon type="light" name={'arrow-left'} size={hp(3)} color="#fff" />
          </TouchableOpacity>
          <View style={{flex: 0.7}}></View>
          <TouchableOpacity style={styles.topLeftRightView}></TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            marginTop: hp('11.65'),
            left: wp('37.25'),
            zIndex: 1,

            borderRadius: wp('50'),
            borderWidth: wp('0.25'),
            borderColor: '#cfdbfa',
          }}>
          <Image
            source={{uri: profileHere?.userData?.emp_result?.EMP_PHOTO}}
            style={{
              height: hp('12.5'),
              width: wp('25'),
              borderRadius: wp('50'),
              borderWidth: wp('0.25'),
              borderColor: '#cfdbfa',
            }}
            resizeMode={'contain'}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            marginTop: hp('20.5'),
            left: wp('59'),
            height: hp('1.5'),
            width: wp('3'),
            borderRadius: wp('50'),
            backgroundColor:
              profileHere?.userData?.profile_result?.CONFIRMATION_DATE ==
                null ||
              profileHere?.userData?.profile_result?.CONFIRMATION_DATE == ''
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.empName}>
                    {profileHere?.userData?.emp_result?.EMP_NAME}
                  </Text>
                </View>

                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.empDesignation}>
                    {profileHere?.userData?.emp_result?.DESIGNATION}
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
                profileHere?.userData?.emp_result?.EMP_STATUS_DESCRIPTION
              }
              secondText={'SERVICE'}
              serviceLengthValue={
                profileHere?.userData?.emp_result?.SERVICE_LENGTH
              }
              thirdText={'AGE'}
              ageValue={profileHere?.userData?.emp_result?.TOTAL_AGE}
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

        <View
          style={{
            marginHorizontal: wp('4'),
            marginTop: hp('2'),
            marginBottom: hp('2'),
          }}>
          <ProfileCard
            empId={profileHere?.userData?.emp_result?.EMPLOYEE_ID}
            empFatherName={profileHere?.userData?.profile_result?.FATHER_NAME}
            empGender={profileHere?.userData?.emp_result?.EMP_GENDER}
            empReligion={profileHere?.userData?.profile_result?.RELIGION_NAME}
            empDOB={profileHere?.userData?.profile_result?.BIRTH_DATE}
            empCNIC={profileHere?.userData?.profile_result?.NIC_NUMBER}
            empCadre={profileHere?.userData?.profile_result?.CADRE}
            empDesignation={profileHere?.userData?.profile_result?.DESIGNATION}
            empDepartment={profileHere?.userData?.profile_result?.DEPARTMENT.replace(
              /\s+$/,
              '',
            )}
            empBranch={profileHere?.userData?.emp_result?.BR_NAME}
            empStatus={
              profileHere?.userData?.emp_result?.EMP_STATUS_DESCRIPTION
            }
            empReportingTo={profileHere?.userData?.profile_result?.REPORTING_TO}
            empHireDate={moment(
              profileHere?.userData?.emp_result?.HIRE_DATE,
              'DD-MMM-YY',
            ).format('DD MMM, YYYY')}
            empRegularDate={profileHere?.userData?.profile_result?.REGULAR_DATE}
            empConfirmationDate={
              profileHere?.userData?.profile_result?.CONFIRMATION_DATE
            }
            empServiceLength={
              profileHere?.userData?.profile_result?.SERVICE_LENGTH
            }
            empBasicSalary={Number(
              profileHere?.userData?.profile_result?.BASIC_SAL,
            ).toLocaleString()}
            empGrossSalary={Number(
              profileHere?.userData?.profile_result?.GROSS_SAL,
            ).toLocaleString()}
            empAllowance={Number(
              profileHere?.userData?.profile_result?.ALLOWANCES,
            ).toLocaleString()}
            empTakeHomeSalary={Number(
              profileHere?.userData?.profile_result?.TAKE_HOME,
            ).toLocaleString()}
            empCostToSchool={Number(
              profileHere?.userData?.profile_result?.CTS,
            ).toLocaleString()}
            empAccounTitle={profileHere?.userData?.profile_result?.AC_TITLE}
            empEOBI={profileHere?.userData?.profile_result?.EOBI_NUMBER}
            empMobilePrimary={profileHere?.userData?.profile_result?.MOB_PHONE}
            empMobileSecondary={profileHere?.userData?.profile_result?.PHONE_NO}
            empEmail={profileHere?.userData?.profile_result?.E_MAIL}
            empAddress={profileHere?.userData?.profile_result?.ADRESS}
            onPressMovementLog={() => props.navigation.navigate('MovementLine')}
            onPressChildInBSS={() => props.navigation.navigate('ChildBSS')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
  firstText: {
    fontSize: '0.62rem',
    fontFamily: fontFamily.ceraBold,
    color: '#353535',
    fontWeight: '700',
  },
  secondText: {
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#979797',
    fontWeight: '500',
  },
});
