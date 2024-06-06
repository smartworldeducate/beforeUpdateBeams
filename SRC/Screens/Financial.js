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
import {FinancialYearsForPFAction} from '../features/FinanicialYearsForPFAndTaxSlice/FinanicialYearsForPFSlice';
import TaxCertificateModal from '../Components/Modal/TaxCertificateModal';
import {FinancialYearsForTaxAction} from '../features/FinanicialYearsForPFAndTaxSlice/FinanicialYearsForTaxSlice';
import {LastMonthSalaryAction} from '../features/FinancialSlice/LastMonthSalarySlice';
// import {LastMonthSalaryAction} from '../features/FinancialSlice/LastMonthSalarySlice';

const Financial = props => {
  const dispatch = useDispatch();

  const financialLastMonthSalaryHere = useSelector(
    state => state.LastMonthSalaryStore,
  );
  console.log('financialLastMonthSalaryHere', financialLastMonthSalaryHere);

  const financialHere = useSelector(state => state.financialStore);

  const financialYearsForPFHere = useSelector(
    state => state.FinancialYearsPFStore?.userData?.pf_financial_year,
  );

  const financialYearsForTaxHere = useSelector(
    state => state.FinancialYearsTaxStore?.userData?.pf_tax_year,
  );

  const salaryHistoryHere = useSelector(state => state.salaryYearsStore);

  const lastMonthIndex = salaryHistoryHere?.userData?.total_years_count - 1;

  const [salarySlip, setSalarySlip] = useState(true);
  const [salaryHistory, setSalaryHistory] = useState(false);

  const [PFCertificateModal, setPFCertificateModal] = useState(false);
  const [taxCertificateModal, setTaxCertificateModal] = useState(false);

  const [yearValueHere, setYearValueHere] = useState(null);
  const [taxYearValueHere, setTaxYearValueHere] = useState(null);
  const [isYearSelected, setIsYearSelected] = useState(false);
  const [isTaxYearSelected, setIsTaxYearSelected] = useState(false);

  const onPressPFCertificateModal = () => {
    setPFCertificateModal(!PFCertificateModal);
    setYearValueHere(null);
    setIsYearSelected(false);
  };

  const onPressTaxCertificateModal = () => {
    setTaxCertificateModal(!taxCertificateModal);
    setTaxYearValueHere(null);
    setIsTaxYearSelected(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          LastMonthSalaryAction({
            employee_id: parsedLoginData,
          }),
        );

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

        dispatch(
          FinancialYearsForPFAction({
            employee_id: parsedLoginData,
          }),
        );

        dispatch(
          FinancialYearsForTaxAction({
            employee_id: parsedLoginData,
          }),
        );
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

  const percentageBasicSalary = (empBasicSalary / empGrossSalary) * 100;
  const percentageHouseRent = (empHouseRent / empGrossSalary) * 100;
  const percentageAllowances = (empAllowances / empGrossSalary) * 100;
  const percentageUtilities = (empUtilities / empGrossSalary) * 100;

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

  const onPressYearDropdown = () => {
    setIsYearSelected(!isYearSelected);
  };

  const onPressTaxYearDropdown = () => {
    setIsTaxYearSelected(!isTaxYearSelected);
  };

  const itemLength = financialYearsForPFHere?.length - 1;
  const itemLengthTax = financialYearsForTaxHere?.length - 1;

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onPressFinancialYear(item)}>
        <View style={{}}>
          <Text
            style={{
              color: 'black',
              fontSize: hp('1.6'),
              fontFamily: fontFamily.ceraMedium,
              letterSpacing: 0.65,
              marginVertical: hp('1'),
              marginHorizontal: wp('3'),
            }}>
            {item?.INC_YEAR_DESC}
          </Text>
        </View>
        {itemLength !== index && (
          <View style={{height: hp('0.07'), backgroundColor: 'silver'}}></View>
        )}
      </TouchableOpacity>
    );
  };

  const onPressFinancialYear = item => {
    // console.log('onPressFinancialYear', item?.INC_YEAR_DESC);
    setYearValueHere(item?.INC_YEAR_DESC);
    setIsYearSelected(false);
  };

  const renderItemTaxYears = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onPressTaxFinancialTaxYear(item)}>
        <View style={{}}>
          <Text
            style={{
              color: 'black',
              fontSize: hp('1.6'),
              fontFamily: fontFamily.ceraMedium,
              letterSpacing: 0.65,
              marginVertical: hp('1'),
              marginHorizontal: wp('3'),
            }}>
            {item?.INC_YEAR_DESC}
          </Text>
        </View>
        {itemLengthTax !== index && (
          <View style={{height: hp('0.07'), backgroundColor: 'silver'}}></View>
        )}
      </TouchableOpacity>
    );
  };

  const onPressTaxFinancialTaxYear = item => {
    console.log('onPressTaxFinancialTaxYear', item?.INC_YEAR_DESC);
    setTaxYearValueHere(item?.INC_YEAR_DESC);
    setIsTaxYearSelected(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setSalarySlip(true);
      setSalaryHistory(false);

      setYearValueHere(null);
      setIsYearSelected(false);

      return () => {
        console.log('Page1 is unfocused');
      };
    }, []),
  );

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
                  monthYear={financialLastMonthSalaryHere?.userData?.HEADING?.replace(
                    '-',
                    ' ',
                  )}
                  finalAllowances={percentageAllowances}
                  finalUtility={percentageUtilities}
                  finalHrent={percentageHouseRent}
                  finalBasic={percentageBasicSalary}
                  grossSalary={Number(
                    financialLastMonthSalaryHere?.userData?.GROSS_SAL,
                  )?.toLocaleString()}
                  basicSalary={Number(
                    financialLastMonthSalaryHere?.userData?.BASIC_SAL,
                  )?.toLocaleString()}
                  houseRent={Number(
                    financialLastMonthSalaryHere?.userData?.HOUSE_RENT,
                  )?.toLocaleString()}
                  allowances={Number(
                    financialLastMonthSalaryHere?.userData?.ALLOWANCES,
                  )?.toLocaleString()}
                  utilities={Number(
                    financialLastMonthSalaryHere?.userData?.UTILITIES,
                  )?.toLocaleString()}
                  PFOwn={Number(
                    financialLastMonthSalaryHere?.userData?.PF_OWN,
                  )?.toLocaleString()}
                  EOBIOwn={Number(
                    financialLastMonthSalaryHere?.userData?.EOBI_OWN,
                  )?.toLocaleString()}
                  incomeTax={Number(
                    financialLastMonthSalaryHere?.userData?.INCOME_TAX,
                  )?.toLocaleString()}
                  absentDeduction={Number(
                    financialLastMonthSalaryHere?.userData?.ABSENT_DED,
                  )?.toLocaleString()}
                  absentDays={`(${financialLastMonthSalaryHere?.userData?.ABSENTS})`}
                  otherDeduction={Number(
                    financialLastMonthSalaryHere?.userData?.OTH_DED,
                  )?.toLocaleString()}
                  totalDeduction={Number(
                    financialLastMonthSalaryHere?.userData?.TOTAL_DED,
                  )?.toLocaleString()}
                  netSalary={Number(
                    financialLastMonthSalaryHere?.userData?.NET_SAL,
                  )?.toLocaleString()}
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
                        financialLastMonthSalaryHere?.userData?.EMPLOYEE_PF,
                      ).toLocaleString()}`}</Text>
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
                  yearValue={
                    yearValueHere == null || yearValueHere == undefined
                      ? 'Select financial year'
                      : yearValueHere
                  }
                  onPressYearDropdown={onPressYearDropdown}
                  isYearSelected={isYearSelected}
                  data={financialYearsForPFHere}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}

              {taxCertificateModal && (
                <TaxCertificateModal
                  upperText={'Tax Certificate'}
                  PrintText={'Print'}
                  onPressOpacity={onPressTaxCertificateModal}
                  yearValue={
                    taxYearValueHere == null || taxYearValueHere == undefined
                      ? 'Select financial year'
                      : taxYearValueHere
                  }
                  onPressYearDropdown={onPressTaxYearDropdown}
                  isYearSelected={isTaxYearSelected}
                  data={financialYearsForTaxHere}
                  renderItem={renderItemTaxYears}
                  keyExtractor={(item, index) => index.toString()}
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
