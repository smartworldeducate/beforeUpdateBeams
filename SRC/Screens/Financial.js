import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
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

const Financial = props => {
  const dispatch = useDispatch();
  const financialHere = useSelector(state => state.financialStore);
  const salaryHistoryHere = useSelector(state => state.salaryYearsStore);

  console.log('salaryHistoryHere>', salaryHistoryHere?.userData);

  const lastMonthIndex = salaryHistoryHere?.userData?.total_years_count - 1;
  console.log('lastMonthIndex>', lastMonthIndex);

  const [salarySlip, setSalarySlip] = useState(true);
  const [salaryHistory, setSalaryHistory] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(loginData => {
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
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
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
  //   financialHere?.userData[financialHere?.userData.length - 1];
  const lastMonthSalary = financialHere?.userData;

  const empGrossSalary = lastMonthSalary?.GROSSSAL;
  const empBasicSalary = lastMonthSalary?.BASIC_SAL;
  const empHouseRent = lastMonthSalary?.HOUSE_RENT;
  const empAllowances = lastMonthSalary?.ALLOWANCES;
  const empUtilities = lastMonthSalary?.UTILITIES;

  const percentageBasicSalary = (empBasicSalary / empGrossSalary) * 100;
  const percentageHouseRent = (empHouseRent / empGrossSalary) * 100;
  const percentageAllowances = (empAllowances / empGrossSalary) * 100;
  const percentageUtilities = (empUtilities / empGrossSalary) * 100;

  const amount = 1000;

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
          }}>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              <View
                style={{
                  backgroundColor: '#E7E7E7',
                  height: hp('7'),
                  borderRadius: wp('2'),
                  justifyContent: 'center',
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
                  finalAllowances={percentageAllowances}
                  finalUtility={percentageUtilities}
                  finalHrent={percentageHouseRent}
                  finalBasic={percentageBasicSalary}
                  grossSalary={Number(
                    lastMonthSalary?.GROSS_SAL,
                  )?.toLocaleString()}
                  basicSalary={lastMonthSalary?.BASIC_SAL}
                  houseRent={lastMonthSalary?.HOUSE_RENT}
                  allowances={lastMonthSalary?.ALLOWANCES}
                  utilities={lastMonthSalary?.UTILITIES}
                  PFOwn={lastMonthSalary?.PF_OWN}
                  EOBIOwn={lastMonthSalary?.EOBI_OWN}
                  incomeTax={lastMonthSalary?.INCOME_TAX}
                  absentDeduction={lastMonthSalary?.ABSENT_DED}
                  absentDays={`(${lastMonthSalary?.ABSENTS})`}
                  otherDeduction={lastMonthSalary?.OTH_DED}
                  totalDeduction={lastMonthSalary?.TOTAL_DED}
                  netSalary={lastMonthSalary?.NET_SAL}
                />
              )}
              {salaryHistory && (
                <FinancialHistory lastYearProp={lastMonthIndex} />
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
