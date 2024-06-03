import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector, useDispatch} from 'react-redux';
import colors from '../Styles/colors';
import {PieChart} from 'react-native-gifted-charts';
import LeaveBalanceComponent from '../Components/LeaveBalanceComponent/LeaveBalanceComponent';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import {LeaveBalanceAction} from '../features/LeaveBalanceSlice/LeaveBalanceSlice';
import Loader from '../Components/Loader/Loader';

const LeaveBalance = props => {
  const dispatch = useDispatch();
  const leaveBalanceHere = useSelector(state => state.leaveBalanceStore);
  console.log('leaveBalanceHereData', leaveBalanceHere?.userData);
  console.log('leaveBalanceHere', leaveBalanceHere?.success);

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
      <>
        <LeaveBalanceComponent
          iconName={item?.ICONNAME}
          iconColor={item?.CLOR}
          upperText={item?.Leave_Name}
          LowerText={
            item?.PENDING > 0
              ? `${item?.PENDING} Pending Leaves`
              : 'No Leaves Applied'
          }
          availLeaves={
            item?.BALANCE == null ||
            item?.BALANCE == '' ||
            item?.BALANCE == undefined
              ? 0
              : item?.BALANCE
          }
          centerSlash={
            item?.ENTL == null || item?.ENTL == undefined || item?.ENTL == ''
              ? '/'
              : `/`
          }
          totalLeaves={
            item?.ENTL == null || item?.ENTL == undefined || item?.ENTL == ''
              ? '0'
              : item?.ENTL
          }
        />
        <LineSeprator
          height={hp('0.1')}
          backgroundColor={'silver'}
          marginHorizontal={wp('1')}
          maginVertical={hp('1')}
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
            text={'Leave Balance'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>

        {leaveBalanceHere?.isLoading && <Loader></Loader>}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.appBackGroundColor,
          }}>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              {leaveBalanceHere?.success == 1 && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    height: hp('27.5'),
                    backgroundColor: 'white',
                    borderRadius: wp('3'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp('1'),

                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                  }}>
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
                    //   showGradient
                    sectionAutoFocus
                    radius={75}
                    innerRadius={65}
                    centerLabelComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: hp('4'),
                              color: '#646464',
                              fontFamily: fontFamily.ceraBold,
                              fontWeight: '700',
                            }}>
                            {leaveBalanceHere?.userData?.total_count}
                          </Text>
                          <Text
                            style={{
                              fontSize: hp('1.85'),
                              color: '#979797',
                              fontFamily: fontFamily.ceraMedium,
                              fontWeight: '500',
                            }}>
                            BALANCE
                          </Text>
                        </View>
                      );
                    }}
                  />
                </TouchableOpacity>
              )}

              <View
                style={{
                  marginTop: hp('4'),
                  marginBottom: hp('2'),
                  marginHorizontal: wp('1'),
                }}>
                <FlatList
                  data={leaveBalanceHere?.userData?.result}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default LeaveBalance;

const styles = EStyleSheet.create({
  smalltext: {
    fontWeight: '500',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '500',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#353535',
    fontStyle: 'normal',
    alignItems: 'center',
  },
  iconSty: {
    fontSize: hp(2.5),
    color: '#A6ACAF',
    fontWeight: 100,
  },
  headertext: {
    fontSize: '0.75rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#363636',
    fontWeight: '500',
  },
  duction: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  circularText: {
    fontSize: '0.75rem',
    color: '#646464',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  circularText1: {
    fontSize: '0.5rem',
    color: '#979797',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    marginHorizontal: hp(0.9),
    textTransform: 'uppercase',
  },
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  duction: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  testname: {
    color: '#343434',
    fontSize: '0.8rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  textobj: {
    color: '#505255',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: hp(1.8),
  },
  objnum: {
    color: '#969696',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  zetext: {
    color: '#363636',
    fontWeight: '700',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraBlack,
  },
  zetext1: {
    color: '#363636',
    fontWeight: '500',
    // marginTop: hp(1),
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraBlack,
  },
  smalltext: {
    fontWeight: '700',
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraBold,
    color: '#353535',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '300',
    fontSize: '0.45rem',
    fontFamily: fontFamily.ceraLight,
    color: '#979797',
    fontStyle: 'normal',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  dtext: {
    color: '#353535',
    fontSize: '0.65rem',
    fontWeight: '700',
    fontStyle: 'normal',
    paddingVertical: hp(0.5),
    fontFamily: fontFamily.ceraBold,
  },
  desig: {
    color: '#343434',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  timestyle: {
    color: '#363636',
    fontSize: '1rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    color: '#646464',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '1.2rem',
  },
  gaugeText1: {
    color: '#979797',
    fontSize: 24,
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
  },
});
