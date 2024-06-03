import React from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pie from 'react-native-pie';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';
import LeftRightText from '../../Components/LeftRightText/LeftRightText';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';
import {PieChart} from 'react-native-gifted-charts';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../Loader/Loader';

const SalarySlip = ({
  monthYear,
  finalAllowances,
  finalUtility,
  finalHrent,
  finalBasic,
  grossSalary,
  basicSalary,
  houseRent,
  allowances,
  utilities,
  PFOwn,
  EOBIOwn,
  incomeTax,
  absentDeduction,
  otherDeduction,
  absentDays,
  totalDeduction,
  netSalary,
}) => {
  const financialHere = useSelector(state => state.financialStore);
  return (
    <View>
      {financialHere?.isLoading && <Loader></Loader>}
      {financialHere?.success == 1 && (
        <>
          <View
            style={{
              marginTop: hp('2'),
              marginBottom: hp('0.5'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: hp('1.55'),
                fontFamily: fontFamily.ceraLight,
              }}>
              <Text style={{fontFamily: fontFamily.ceraMedium}}>Note:</Text>
              {` The salary details are for ${monthYear}.`}
            </Text>
          </View>

          <View
            style={{
              marginTop: hp('0.5'),
              marginBottom: hp('1'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <PieChart
              data={[
                {value: finalAllowances, color: '#FEBB5B'},
                {value: finalUtility, color: '#76FFBD'},
                {value: finalHrent, color: '#D4E9FF'},
                {value: finalBasic, color: '#C1B7FD'},
              ]}
              donut
              //   showGradient
              sectionAutoFocus
              radius={65}
              innerRadius={50}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: hp('2.75'),
                        color: '#646464',
                        fontFamily: fontFamily.ceraBold,
                        fontWeight: '700',
                      }}>
                      {grossSalary}
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

          <View style={{marginHorizontal: wp('5')}}>
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
                    <Text style={styles.upperSalaryText}>{basicSalary}</Text>
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
                    <Text style={styles.upperSalaryText}>{houseRent}</Text>
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
                    <Text style={styles.upperSalaryText}>{allowances}</Text>
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
                    <Text style={styles.upperSalaryText}>{utilities}</Text>
                  </View>
                  <View style={{}}>
                    <Text style={styles.lowerSalaryText}>UTILITIES</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

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

          <LeftRightText leftText={'PF Own'} rightText={PFOwn} />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText leftText={'EOBI Own'} rightText={EOBIOwn} />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText leftText={'Income Tax'} rightText={incomeTax} />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText
            leftText={'Absent Deduction (Absent days)'}
            rightText={absentDeduction}
            rightInner={absentDays}
          />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText
            leftText={'Other Deduction'}
            rightText={otherDeduction}
          />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText
            leftText={'Total Deduction'}
            rightText={totalDeduction}
          />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
          <LeftRightText leftText={'Net Salary'} rightText={netSalary} />
          <LineSeprator
            height={hp('0.15')}
            backgroundColor={'#DBDBDB'}
            maginVertical={hp('1.5')}
          />
        </>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  salaryAmount: {
    color: '#646464',
    fontSize: '0.65rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
  },
  grossSalaryText: {
    color: '#646464',
    fontSize: '0.4rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
  },
  upperSalaryText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.63rem',
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

export default SalarySlip;
