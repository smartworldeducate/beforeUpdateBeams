import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PieChart} from 'react-native-gifted-charts';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SalaryYearsAction} from '../../features/SalaryYearsSlice/SalaryYearsSlice';
import {SalaryHistoryWithYearsAction} from '../../features/SalaryYearsSlice/SalaryHistoryWithYearsSlice';
import Loader from '../Loader/Loader';
import Icon from 'react-native-fontawesome-pro';
import LineSeprator from '../LineSeprator/LineSeprator';
import LeftRightText from '../LeftRightText/LeftRightText';
import colors from '../../Styles/colors';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const FinancialHistory = ({}) => {
  const dispatch = useDispatch();
  const salaryHistoryHere = useSelector(state => state.salaryYearsStore);
  console.log('salaryHistoryHere', salaryHistoryHere);
  const salaryHistoryWithYearsHere = useSelector(
    state => state.salaryHistoryWithYearsStore,
  );

  // console.log('salaryHistoryWithYearsHere', salaryHistoryWithYearsHere);

  // const lastMonthIndex = salaryHistoryHere?.userData?.total_years?.length - 1;
  // console.log('lastMonthIndex', lastMonthIndex);

  const [getIndex, setGetIndex] = useState(
    salaryHistoryHere?.userData?.total_years?.length - 1,
  );

  console.log('getIndex', getIndex);

  const lastYear =
    salaryHistoryHere?.userData?.total_years &&
    salaryHistoryHere?.userData?.total_years[getIndex];

  const yourRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(loginData => {
        const parsedLoginData = JSON.parse(loginData);

        // dispatch(
        //   SalaryYearsAction({
        //     employee_id: parsedLoginData,
        //   }),
        // );
        if (lastYear) {
          dispatch(
            SalaryHistoryWithYearsAction({
              employeeId: parsedLoginData,
              year: lastYear,
            }),
          );
        }
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          index == getIndex ? ['#1C37A5', '#4D69DC'] : ['#F5F8FC', '#F5F8FC']
        }
        style={{
          borderRadius: wp('8'),
          height: hp('4'),
          width: wp('17'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressYear({item, index})}
          style={{}}>
          <View>
            <Text
              style={{
                fontSize: hp('1.75'),
                fontFamily: fontFamily.ceraMedium,
                color: index == getIndex ? 'white' : '#1C37A4',
                fontWeight: '500',
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const onPressYear = ({item, index}) => {
    console.log('onPressYearIndex', index);
    setGetIndex(index);
    AsyncStorage.getItem('loginData').then(loginData => {
      const parsedLoginData = JSON.parse(loginData);
      dispatch(
        SalaryHistoryWithYearsAction({
          employeeId: parsedLoginData,
          year: item,
        }),
      );
    });
  };

  const renderItemYearsSalary = ({item, index}) => {
    const dateString = item?.SAL_DATE;
    const [day, month, year] = dateString.split('-');

    const empGrossSalary = item?.GROSSSAL;
    const empBasicSalary = item?.BASIC_SAL;
    const empHouseRent = item?.HOUSE_RENT;
    const empAllowances = item?.ALLOWANCES;
    const empUtilities = item?.UTILITIES;

    const percentageBasicSalary = (empBasicSalary / empGrossSalary) * 100;
    const percentageHouseRent = (empHouseRent / empGrossSalary) * 100;
    const percentageAllowances = (empAllowances / empGrossSalary) * 100;
    const percentageUtilities = (empUtilities / empGrossSalary) * 100;

    return (
      <TouchableOpacity
        onPress={() => onPressMonthSalary(item)}
        activeOpacity={0.6}
        style={{
          marginBottom: hp('1.75'),
          height: hp('14'),
          marginHorizontal: wp('2'),
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          borderRadius: wp('3'),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: wp('2'),
              paddingTop: hp('1'),
            }}>
            <PieChart
              data={[
                {value: percentageAllowances, color: '#FEBB5B'},
                {value: percentageUtilities, color: '#76FFBD'},
                {value: percentageHouseRent, color: '#D4E9FF'},
                {value: percentageBasicSalary, color: '#C1B7FD'},
              ]}
              donut
              sectionAutoFocus
              radius={40}
              innerRadius={30}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: hp('1.75'),
                        color: '#646464',
                        fontFamily: fontFamily.ceraBold,
                        fontWeight: '700',
                      }}>
                      {month}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{flex: 0.05}}></View>
          <View
            style={{
              flex: 0.65,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: hp('10.5'),
                paddingTop: hp('2'),
              }}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.1,
                    backgroundColor: '#C1B7FD',
                    height: hp('4'),
                  }}></View>
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'column',
                    paddingLeft: wp('2'),
                    justifyContent: 'center',
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        fontFamily: fontFamily.ceraBold,
                        color: '#353535',
                        fontWeight: '700',
                      }}>
                      {item?.GROSSSAL}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: hp('1.35'),
                        fontFamily: fontFamily.ceraMedium,
                        color: '#979797',
                        fontWeight: '500',
                      }}>
                      GROSS SALARY
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.1,
                    backgroundColor: '#FEBB5B',
                    height: hp('4'),
                  }}></View>
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'column',
                    paddingLeft: wp('2'),
                    justifyContent: 'center',
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        fontFamily: fontFamily.ceraBold,
                        color: '#353535',
                        fontWeight: '700',
                      }}>
                      {item?.NET_SAL}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: hp('1.35'),
                        fontFamily: fontFamily.ceraMedium,
                        color: '#979797',
                        fontWeight: '500',
                      }}>
                      NET SALARY
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: hp('3.5'),
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                paddingRight: wp('3'),
                marginBottom: hp('0.5'),
              }}>
              <FontAwesomeIcon
                icon="fat fa-arrow-down-right"
                size={hp(3.25)}
                style={{color: '#1C37A4'}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [monthData, setMonthData] = useState();
  const onPressMonthSalary = item => {
    setMonthData(item);
    setModalVisible(true);
  };

  const onRequestClose = () => {
    setModalVisible(false);
    setMonthData();
  };

  console.log('monthData', monthData);

  const lastMonthSalary = monthData;

  const empGrossSalary = lastMonthSalary?.GROSSSAL;
  const empBasicSalary = lastMonthSalary?.BASIC_SAL;
  const empHouseRent = lastMonthSalary?.HOUSE_RENT;
  const empAllowances = lastMonthSalary?.ALLOWANCES;
  const empUtilities = lastMonthSalary?.UTILITIES;

  const percentageBasicSalary = (empBasicSalary / empGrossSalary) * 100;
  const percentageHouseRent = (empHouseRent / empGrossSalary) * 100;
  const percentageAllowances = (empAllowances / empGrossSalary) * 100;
  const percentageUtilities = (empUtilities / empGrossSalary) * 100;

  return (
    <>
      <View style={{marginVertical: hp('2')}}>
        <FlatList
          data={salaryHistoryHere?.userData?.total_years}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex={
          //   salaryHistoryHere?.userData?.total_years_count - 1
          // }
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
          onLayout={() => yourRef.current.scrollToEnd()}
        />
      </View>
      {salaryHistoryWithYearsHere?.isLoading && <Loader></Loader>}
      <View style={{marginVertical: hp('2'), marginHorizontal: wp('-2')}}>
        <FlatList
          data={salaryHistoryWithYearsHere?.userData}
          renderItem={renderItemYearsSalary}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={onRequestClose}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1C37A5', '#4D69DC']}
            style={styles.mainHeader}>
            <View
              style={{
                flexDirection: 'row',
                height: hp('8'),
                marginHorizontal: wp('2'),
              }}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name={'arrow-left'}
                  size={hp(2.5)}
                  color="#fff"
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textstyle}>{monthData.HEADING}</Text>
              </View>
              <View style={{flex: 0.15}}></View>
            </View>
          </LinearGradient>

          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              paddingHorizontal: wp('5'),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('6'),
              }}>
              <PieChart
                data={[
                  {value: percentageAllowances, color: '#FEBB5B'},
                  {value: percentageUtilities, color: '#76FFBD'},
                  {value: percentageHouseRent, color: '#D4E9FF'},
                  {value: percentageBasicSalary, color: '#C1B7FD'},
                ]}
                donut
                //   showGradient
                sectionAutoFocus
                radius={65}
                innerRadius={50}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: hp('3'),
                          color: '#646464',
                          fontFamily: fontFamily.ceraBold,
                          fontWeight: '700',
                        }}>
                        {Number(monthData?.GROSSSAL)?.toLocaleString()}
                      </Text>
                      <Text
                        style={{
                          fontSize: hp('1.2'),
                          color: '#979797',
                          fontFamily: fontFamily.ceraMedium,
                          fontWeight: '500',
                        }}>
                        GROSS SALARY
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp('1'),
                }}>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.1, backgroundColor: '#C1B7FD'}}></View>
                  <View
                    style={{
                      flex: 0.9,
                      flexDirection: 'column',
                      paddingLeft: wp('2'),
                    }}>
                    <View style={{}}>
                      <Text style={styles.upperSalaryText}>
                        {monthData.BASIC_SAL}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.lowerSalaryText}>BASIC SALARY</Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 0.2}}></View>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.1, backgroundColor: '#D4E9FF'}}></View>
                  <View
                    style={{
                      flex: 0.9,
                      flexDirection: 'column',
                      paddingLeft: wp('2'),
                    }}>
                    <View style={{}}>
                      <Text style={styles.upperSalaryText}>
                        {monthData.HOUSE_RENT}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.lowerSalaryText}>HOUSE RENT</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.1, backgroundColor: '#FEBB5B'}}></View>
                  <View
                    style={{
                      flex: 0.9,
                      flexDirection: 'column',
                      paddingLeft: wp('2'),
                    }}>
                    <View style={{}}>
                      <Text style={styles.upperSalaryText}>
                        {monthData.ALLOWANCES}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.lowerSalaryText}>ALLOWANCES</Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 0.2}}></View>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.1, backgroundColor: '#76FFBD'}}></View>
                  <View
                    style={{
                      flex: 0.9,
                      flexDirection: 'column',
                      paddingLeft: wp('2'),
                    }}>
                    <View style={{}}>
                      <Text style={styles.upperSalaryText}>
                        {monthData.UTILITIES}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.lowerSalaryText}>UTILITIES</Text>
                    </View>
                  </View>
                </View>
              </View>
            </>

            <View
              style={{
                backgroundColor: '#E7E7E7',
                marginTop: hp('2'),
                marginBottom: hp('1.5'),
                justifyContent: 'center',
                padding: wp('2.5'),
              }}>
              <Text style={styles.deductionsText}>Deductions</Text>
            </View>

            <LeftRightText leftText={'PF Own'} rightText={monthData.PF_OWN} />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'EOBI Own'}
              rightText={monthData.EOBI_OWN}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'Income Tax'}
              rightText={monthData.INCOME_TAX}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'Absent Deduction (Absent days)'}
              rightText={monthData.ABSENT_DED}
              rightInner={`(${monthData.ABSENTS})`}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'Other Deduction'}
              rightText={monthData.OTH_DED}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'Total Deduction'}
              rightText={monthData.TOTAL_DED}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
            <LeftRightText
              leftText={'Net Salary'}
              rightText={monthData.NET_SAL}
            />
            <LineSeprator
              height={hp('0.15')}
              backgroundColor={'#DBDBDB'}
              maginVertical={hp('1.5')}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  gradiantStyle: {
    marginHorizontal: wp('1'),
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    borderRadius: wp('5'),
    // backgroundColor: '#1C37A4',
  },
  yearText: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    color: 'white',
    fontWeight: '500',
  },
  mainHeader: {
    height: hp('8'),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
    marginBottom: hp('0'),
  },
  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
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
  lowerSalaryText: {
    color: '#353535',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    fontSize: '0.5rem',
  },
  deductionsText: {
    color: '#343434',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.55rem',
  },
});

export default FinancialHistory;
