import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ViewPager from '@react-native-community/viewpager';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import GraphChart from '../Components/LineChart';
import ApComp from '../Components/AppraisalGraphList';
const Approcial = props => {
  const [appraisal, setAppraisal] = useState(true);
  const [objective, setObjective] = useState(false);
  const [clinder, setClinder] = useState(null);
  const [defalut, setDefalut] = useState(true);

  const clinderHandler = item => {
    setClinder(item);
    setDefalut(false);
    console.log('my item  time out', item);
  };

  const onPressAppraisal = () => {
    setAppraisal(true);
    setObjective(false);
  };

  const onPressObjective = () => {
    setAppraisal(false);
    setObjective(true);
  };

  const years = [
    {id: 1, month: '2020'},
    {id: 2, month: '2021'},
    {id: 3, month: '2022'},
    {id: 4, month: '2023'},
    {id: 5, month: '2024'},
  ];
  const data = [
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
    {
      text: 'BEAMS Design Inner Pages, Student and Employee Dashboards',
      number: '30/12/23',
    },
  ];

  const calenderItem = ({item, index}) => {
    // console.log('index', index);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => clinderHandler(item.id)}
        // key={i}
        style={{}}>
        <View
          style={{
            height: hp(4),
            paddingHorizontal: hp(3),
            borderRadius: hp(20),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: index == 2 ? '#4D69DC' : ' ',
            marginHorizontal: hp(0.5),
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: index == 2 ? '#FFF' : 'gray',
                fontSize: hp(1.5),
              }}>
              {item.month}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemGradient = ({item, index}) => {
    // console.log('index', index);
    return (
      <View>
        {clinder == item.id && (
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#1C37A5', '#4D69DC']}
              style={{
                height: hp(3.7),
                paddingHorizontal: hp(3),
                borderRadius: hp(20),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4D69DC',
                marginHorizontal: hp(2),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: hp(1.5),
                    paddingHorizontal: hp(0.5),
                  }}>
                  {item.month}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {clinder !== item.id && (
          <TouchableOpacity onPress={() => clinderHandler(item.id)}>
            <View
              style={{
                height: hp(3.7),
                paddingHorizontal: hp(2.7),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: hp(1.5),
                  }}>
                  {item.month}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View>
          <MainHeader
            text={'Appraisal'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            marginHorizontal: hp(1),
            justifyContent: 'center',
            marginVertical: hp('2'),
            backgroundColor: '#E7E7E7',
            marginHorizontal: wp('5'),
            borderRadius: wp('3'),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressAppraisal}
            style={{
              flex: 0.49,
              height: hp('5'),
              borderRadius: hp(1),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: appraisal == true ? '#fff' : '#E7E7E7',
              marginHorizontal: wp('2'),
              marginVertical: hp('0.75'),
            }}>
            <Text style={styles.headertext}>Appraisal</Text>
          </TouchableOpacity>
          <View style={{flex: 0.02}}></View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressObjective}
            style={{
              flex: 0.49,
              height: hp('5'),
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: objective == true ? '#fff' : '#E7E7E7',
              marginHorizontal: wp('2'),
              marginVertical: hp('0.75'),
            }}>
            <Text style={styles.headertext}>Objective</Text>
          </TouchableOpacity>
        </View>

        {appraisal && (
          <>
            <ApComp />
          </>
        )}
        {objective && (
          <>
            {defalut == true && (
              <View
                style={{
                  height: hp(7),
                  marginTop: hp(2),
                  marginHorizontal: hp(2.5),
                }}>
                <FlatList
                  data={years}
                  renderItem={calenderItem}
                  horizontal={true}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            {defalut !== true && (
              <View
                style={{
                  height: hp(7),
                  marginTop: hp(2),
                  marginHorizontal: hp(2.5),
                }}>
                <FlatList
                  data={years}
                  renderItem={renderItemGradient}
                  horizontal={true}
                  // inverted={true}
                  keyExtractor={item => item.id}
                />
              </View>
            )}

            <View style={{marginHorizontal: hp(2.5)}}>
              <View
                style={{
                  height: hp(4.5),
                  backgroundColor: '#E7E7E7',
                  justifyContent: 'center',
                  paddingLeft: hp(1),
                }}>
                <Text style={styles.duction}>Description</Text>
              </View>
              <ScrollView>
                {data.map((item, i) => {
                  return (
                    <View key={i}>
                      <View
                        style={{
                          paddingVertical: hp(1),
                          marginHorizontal: hp(1),
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            paddingVertical: hp(1),
                          }}>
                          <Text style={styles.textobj}>{item.text}</Text>
                        </View>
                        <View
                          style={{justifyContent: 'center', marginTop: hp(-1)}}>
                          <Text style={styles.objnum}>{item.number}</Text>
                        </View>
                      </View>
                      <View
                        style={{height: 1, backgroundColor: '#DBDBDB'}}></View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Approcial;

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
});
