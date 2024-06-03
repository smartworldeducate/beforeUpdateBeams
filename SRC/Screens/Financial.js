import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FinancialAction} from '../features/FinancialSlice/FinancialSlice';
import SalarySlip from '../Components/Financial/SalarySlip';
import FinancialHistory from '../Components/Financial/FinancialHistory';
import {clearSalaryHistoryList} from '../features/SalaryYearsSlice/SalaryHistoryWithYearsSlice';
import {SalaryYearsAction} from '../features/SalaryYearsSlice/SalaryYearsSlice';
import CertificateModal from '../Components/Modal/CertificateModal';
// import {LastMonthSalaryAction} from '../features/FinancialSlice/LastMonthSalarySlice';

const Financial = props => {
  const dispatch = useDispatch();
  const financialHere = useSelector(state => state.financialStore);
  // console.log('financialHere', financialHere?.userData);
  const salaryHistoryHere = useSelector(state => state.salaryYearsStore);

  const lastMonthIndex = salaryHistoryHere?.userData?.total_years_count - 1;

  const [salarySlip, setSalarySlip] = useState(true);
  const [salaryHistory, setSalaryHistory] = useState(false);

  const [PFCertificateModal, setPFCertificateModal] = useState(false);

  const [taxCertificateModal, setTaxCertificateModal] = useState(false);

  const onPressPFCertificateModal = () => {
    setPFCertificateModal(!PFCertificateModal);
  };

  const onPressTaxCertificateModal = () => {
    setTaxCertificateModal(!taxCertificateModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          FinancialAction({
            employee_id: parsedLoginData,
          }),
        );

        dispatch(
          SalaryYearsAction({
            employee_id: parsedLoginData,
          }),
        );

        // dispatch(
        //   LastMonthSalaryAction({
        //     employee_id: parsedLoginData,
        //   }),
        // );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onPressSalary = () => {
    setSalarySlip(true);
    setSalaryHistory(false);
    // dispatch(clearSalaryHistoryList());
  };
  const onPressHistory = () => {
    setSalarySlip(false);
    setSalaryHistory(true);
  };

  // const lastMonthSalary =
  //   financialHere?.userData[financialHere?.userData?.length - 1];
  // const lastMonthSalary = financialHere?.userData;

  const lastMonthSalary = financialHere?.userData[0];
  console.log('lastMonthSalary', lastMonthSalary);

  const empGrossSalary = lastMonthSalary?.GROSSSAL;
  const empBasicSalary = lastMonthSalary?.BASIC_SAL;
  const empHouseRent = lastMonthSalary?.HOUSE_RENT;
  const empAllowances = lastMonthSalary?.ALLOWANCES;
  const empUtilities = lastMonthSalary?.UTILITIES;

  // console.log('empGrossSalary', empGrossSalary);
  // console.log('empBasicSalary', empBasicSalary);
  // console.log('empHouseRent', empHouseRent);
  // console.log('empAllowances', empAllowances);
  // console.log('empUtilities', empUtilities);

  const percentageBasicSalary = (empBasicSalary / empGrossSalary) * 100;
  const percentageHouseRent = (empHouseRent / empGrossSalary) * 100;
  const percentageAllowances = (empAllowances / empGrossSalary) * 100;
  const percentageUtilities = (empUtilities / empGrossSalary) * 100;

  useFocusEffect(
    React.useCallback(() => {
      setSalarySlip(true);
      setSalaryHistory(false);

      return () => {
        console.log('Page1 is unfocused');
      };
    }, []),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedLoginDataId = JSON.parse(loginData);

      if (parsedLoginDataId) {
        dispatch(
          FinancialAction({
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
    setRefreshing(false);
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
            text={'Financials'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.appBackGroundColor,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2A72B6', '#203B88']}
              progressBackgroundColor={'#fcfcfc'}
              tintColor={'#1C37A4'}
            />
          }>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              <View
                style={{
                  backgroundColor: '#E7E7E7',
                  height: hp('7'),
                  borderRadius: wp('2'),
                  justifyContent: 'center',
                  marginBottom: hp('1'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('5'),
                    marginHorizontal: wp('2'),
                  }}>
                  <TouchableOpacity
                    onPress={onPressSalary}
                    activeOpacity={0.5}
                    style={{
                      flex: 0.46,
                      backgroundColor: salarySlip
                        ? colors.whiteColor
                        : '#E7E7E7',
                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.upperText}>Salary Slip</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0.08,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                  <TouchableOpacity
                    onPress={onPressHistory}
                    activeOpacity={0.5}
                    style={{
                      flex: 0.46,
                      backgroundColor: salaryHistory
                        ? colors.whiteColor
                        : '#E7E7E7',
                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.upperText}>History</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {salarySlip && (
                <SalarySlip
                  monthYear={lastMonthSalary?.HEADING?.replace('-', ' ')}
                  finalAllowances={percentageAllowances}
                  finalUtility={percentageUtilities}
                  finalHrent={percentageHouseRent}
                  finalBasic={percentageBasicSalary}
                  grossSalary={Number(
                    lastMonthSalary?.GROSS_SAL,
                  )?.toLocaleString()}
                  basicSalary={Number(
                    lastMonthSalary?.BASIC_SAL,
                  )?.toLocaleString()}
                  houseRent={Number(
                    lastMonthSalary?.HOUSE_RENT,
                  )?.toLocaleString()}
                  allowances={Number(
                    lastMonthSalary?.ALLOWANCES,
                  )?.toLocaleString()}
                  utilities={Number(
                    lastMonthSalary?.UTILITIES,
                  )?.toLocaleString()}
                  PFOwn={Number(lastMonthSalary?.PF_OWN)?.toLocaleString()}
                  EOBIOwn={Number(lastMonthSalary?.EOBI_OWN)?.toLocaleString()}
                  incomeTax={Number(
                    lastMonthSalary?.INCOME_TAX,
                  )?.toLocaleString()}
                  absentDeduction={Number(
                    lastMonthSalary?.ABSENT_DED,
                  )?.toLocaleString()}
                  absentDays={`(${lastMonthSalary?.ABSENTS})`}
                  otherDeduction={Number(
                    lastMonthSalary?.OTH_DED,
                  )?.toLocaleString()}
                  totalDeduction={Number(
                    lastMonthSalary?.TOTAL_DED,
                  )?.toLocaleString()}
                  netSalary={Number(lastMonthSalary?.NET_SAL)?.toLocaleString()}
                />
              )}

              {salarySlip && (
                <>
                  <TouchableOpacity
                    onPress={onPressPFCertificateModal}
                    activeOpacity={0.5}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#E7E7E7',
                      height: hp('4.5'),
                      marginBottom: hp('1'),
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: hp('1.55'),
                          fontFamily: fontFamily.ceraMedium,
                          color: 'black',
                          paddingLeft: wp('2'),
                          textDecorationLine: 'underline',
                          textDecorationColor: 'black',
                        }}>
                        PF Certificate Download
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: hp('1.55'),
                          fontFamily: fontFamily.ceraMedium,
                          color: 'black',
                          paddingRight: wp('2'),
                        }}>{`Provident Fund: ${Number(
                        200000,
                      )?.toLocaleString()}`}</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onPressTaxCertificateModal}
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: '#E7E7E7',
                      height: hp('4.5'),
                      marginBottom: hp('1'),

                      flex: 0.5,
                      justifyContent: 'center',
                      marginBottom: hp('1'),
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('1.55'),
                        fontFamily: fontFamily.ceraMedium,
                        color: 'black',
                        paddingLeft: wp('2'),

                        textDecorationLine: 'underline',
                        textDecorationColor: 'black',
                      }}>
                      Tax Certificate Download
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {PFCertificateModal && (
                <CertificateModal
                  upperText={'PF Certificate'}
                  PrintText={'Print'}
                  onPressOpacity={onPressPFCertificateModal}
                />
              )}

              {taxCertificateModal && (
                <CertificateModal
                  upperText={'Tax Certificate'}
                  PrintText={'Print'}
                  onPressOpacity={onPressTaxCertificateModal}
                />
              )}

              {salaryHistory && (
                // <FinancialHistory lastYearProp={lastMonthIndex} />
                <FinancialHistory />
              )}
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Financial;
const styles = EStyleSheet.create({
  upperText: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: hp('1.8'),
  },
  upperSalaryText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.6rem',
  },
});
