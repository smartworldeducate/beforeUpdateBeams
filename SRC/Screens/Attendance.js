import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import Icon from 'react-native-fontawesome-pro';
import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Attendance = props => {
  const navigation = useNavigation();

  const data = [
    {
      id: 22,
      text: '17-06-2023',
      number: '17-06-2023',
      month: 'SUN',
      backgroundColor: '#E5F7FF',
      color: '#363636',
      textInColor: '#363636',
      isWorking: 'working',
      workingHours: 'Full Toil',
      textoutcolor: '#363636',
      day: 'sun',
    },
    {
      id: 21,
      text: '08:40:33',
      number: '08:44:47',
      month: 'MON',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      day: 'mon',
      textoutcolor: '#363636',
    },
    {
      id: 20,
      text: '08:40:33',
      number: '08:17:03',
      month: 'TUE',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 19,
      text: '--:--:--',
      number: '--:--:--',
      month: 'WED',
      color: '#363636',
      textInColor: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 18,
      text: '--:--:--',
      number: '--:--:--',
      month: 'TUS',
      weknd: 'Weekend',
      backgroundColor: '#FEF7DC',
      color: '#363636',
      textInColor: '#363636',
      workingHours: 'Weekend',
      textoutcolor: '#363636',
    },
    {
      id: 17,
      text: '08:40:33',
      number: '08:17:03',
      month: 'FRI',
      backgroundColor: '#FEF7DC',
      color: '#363636',
      workingHours: '09:00',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 16,
      text: '08:40:33',
      number: '06:40:33',
      month: 'SAT',
      color: '#FF0000',
      textInColor: '#FF0000',
      textoutcolor: 'red',
      workingHours: '09:00',
      textoutcolor: 'red',
    },
    {
      id: 15,
      text: '08:40:33',
      number: '08:17:03',
      month: 'Sun',
      color: 'red',
      textInColor: '#FF0000',
      textoutcolor: 'red',
      radiusColor: 'rgba(255, 0, 0, 0.09)',
      workingHours: '09:00',
    },
    {
      id: 14,
      text: '08:40:33',
      number: '05:40:33',
      month: 'Mon',
      color: 'red',
      workingHours: '09:00',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 13,
      text: '08:40:33',
      number: 'Full Toil',
      month: 'Tue',
      color: '#363636',
      radiusColor: 'rgba(255, 0, 0, 0.09)',
      workingHours: '09:00',
      textInColor: 'red',
      textoutcolor: '#363636',
    },
    {
      id: 12,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Tus',
      color: 'red',
      workingHours: '09:00',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 11,
      text: '08:40:33',
      number: 'Full Toil',
      month: 'Oct',
      color: '#363636',
      workingHours: '09:00',
      textoutcolor: '#363636',
    },
    {
      id: 10,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Fri',
      color: 'red',
      workingHours: 'Annual',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 9,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Sat',
      color: '#363636',
      workingHours: 'Annual',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 8,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Sun',
      color: 'red',
      workingHours: 'Annual',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 7,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Mon',
      color: 'red',
      workingHours: 'Annual',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
    {
      id: 6,
      text: '--:--:--',
      number: '--:--:--',
      month: 'Tue',
      color: 'red',
      workingHours: 'Annual',
      textInColor: '#363636',
      textoutcolor: '#363636',
    },
  ];
  const years = [
    {id: 1, month: 'Jan'},
    {id: 2, month: 'Fab'},
    {id: 3, month: 'Mar'},
    {id: 4, month: 'Apr'},
    {id: 5, month: 'May'},
    {id: 6, month: 'Jun'},
    {id: 7, month: 'Jul'},
    {id: 8, month: 'Aug'},
    {id: 9, month: 'Sep'},
    {id: 10, month: 'Oct'},
    {id: 11, month: 'Nov'},
    {id: 12, month: 'Dec'},
  ];

  const [clinder, setClinder] = useState(null);
  const [defalut, setDefalut] = useState(true);

  const clinderHandler = item => {
    setClinder(item);
    setDefalut(false);
    console.log('my item  time out', item);
  };

  const renderItem = ({item, index}) => {
    console.log('index', index);
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
    console.log('index', index);
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
      <View>
        <MainHeader
          text={'Attendance'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
          yearText={'2023'}
        />
      </View>
      {defalut == true && (
        <View
          style={{height: hp(7), marginTop: hp(2), marginHorizontal: hp(2.5)}}>
          <FlatList
            data={years}
            renderItem={renderItem}
            horizontal={true}
            // inverted={true}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {defalut !== true && (
        <View
          style={{height: hp(7), marginTop: hp(2), marginHorizontal: hp(2.5)}}>
          <FlatList
            data={years}
            renderItem={renderItemGradient}
            horizontal={true}
            // inverted={true}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      <View
        style={{
          marginVertical: hp('1'),
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginHorizontal: wp('5'),
        }}>
        <Text style={styles.lateminut}>Late Minutes: 65</Text>
      </View>
      <View
        style={{
          height: hp(4.5),
          flexDirection: 'row',
          backgroundColor: '#cdcdcd',
          marginHorizontal: hp(2.5),
        }}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
          <Text style={styles.lateminut}>Date</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "green",
            flex: 0.266,
          }}>
          <Text style={styles.lateminut}>Time in</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "grey",
            flex: 0.266,
          }}>
          <Text style={styles.lateminut}>Time out</Text>
        </View>
        <View
          style={{justifyContent: 'center', flex: 0.267, alignItems: 'center'}}>
          <Text style={styles.lateminut}>Working Hr’s</Text>
        </View>
      </View>

      <ScrollView>
        {data.map((item, i) => {
          return (
            <View key={i}>
              {item.id == 11 ? (
                <>
                  <View
                    style={{
                      backgroundColor: '#FEF7DC',
                      marginTop: hp('1'),
                      height: hp('6'),
                      marginHorizontal: hp(2.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#363636'}}>
                      Weekend: 10 Saturday & 11 Sunday
                    </Text>
                  </View>

                  <View
                    style={{
                      height: hp('0.1'),
                      marginHorizontal: wp('5'),
                      marginTop: hp('1'),
                    }}></View>
                </>
              ) : (
                <View
                  style={{
                    height: hp(6.5),
                    flexDirection: 'row',
                    backgroundColor: item.backgroundColor,
                    marginHorizontal: hp(2.5),
                    borderBottomColor: 'grey',
                    borderBottomWidth: wp('0.1'),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: hp('4'),
                        width: wp('8'),
                        backgroundColor: '#EBEBEB',
                        borderRadius: hp(0.5),
                      }}>
                      <Text
                        style={[
                          styles.duction,
                          {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: hp('2'),
                            color: '#363636',
                          },
                        ]}>
                        {item.id}
                      </Text>
                      <Text
                        style={[
                          styles.duction,
                          {
                            textAlign: 'center',
                            marginTop: hp('-0.25'),
                            fontSize: hp(1.2),
                          },
                        ]}>
                        {item.month}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: "green",

                      flex: 0.266,
                    }}>
                    <Text
                      style={[
                        styles.duction,
                        {
                          color: item.textInColor,
                          backgroundColor: item.radiusColor,
                          paddingVertical: hp('0.75'),
                          paddingHorizontal: wp('2'),
                          borderRadius: wp('5'),
                          borderWidth: item.radiusColor ? wp('0.15') : null,
                          borderColor: 'red',
                          marginTop:
                            item.isWorking == 'working' ? hp('0') : hp('1.25'),
                        },
                      ]}>
                      {item?.text}
                    </Text>
                    <Text
                      style={[
                        styles.duction,
                        {
                          textAlign: 'center',
                          marginTop: hp('-0.8'),
                          fontSize: hp('1.5'),
                        },
                      ]}>
                      {item.isWorking}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: item.textoutcolor,
                      flex: 0.266,
                    }}>
                    <Text
                      style={[
                        styles.duction,
                        {
                          color: item.textoutcolor,
                        },
                      ]}>
                      {item.number}
                    </Text>
                  </View>

                  {/* {
  
                    item.text == "--:--:--" && item.number == "--:--:--" ? */}
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 0.267,
                      alignItems: 'center',
                      // backgroundColor:"red"
                    }}>
                    {(item.id == 19 && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          props.navigation.navigate('ApplicationType')
                        }
                        style={{
                          backgroundColor: '#1C37A4',
                          borderRadius: wp('5'),
                          paddingHorizontal: wp('5'),
                          paddingVertical: hp('0.75'),
                        }}>
                        <Text style={[styles.duction, {color: 'white'}]}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    )) ||
                      (item.id == 12 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flex: 0.35,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Icon
                              type="light"
                              name="masks-theater"
                              // size={hp(10)}
                              color="#BB8FCE"
                              iconStyle={{
                                height: 1.5,
                                width: 3,
                              }}
                            />
                          </View>
                          <View style={{flex: 0.65}}>
                            <Text style={[styles.duction, {textAlign: 'left'}]}>
                              {' '}
                              Casual
                            </Text>
                          </View>
                        </View>
                      )) ||
                      ((item.id == 10 ||
                        item.id == 9 ||
                        item.id == 8 ||
                        item.id == 7 ||
                        item.id == 6) && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flex: 0.35,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Icon
                              type="light"
                              name="island-tropical"
                              // size={hp(10)}
                              color="#58D68D"
                              iconStyle={{
                                height: 1.5,
                                width: 3,
                              }}
                            />
                          </View>
                          <View style={{flex: 0.65}}>
                            <Text style={[styles.duction, {textAlign: 'left'}]}>
                              {' '}
                              Annual
                            </Text>
                          </View>
                        </View>
                      )) || (
                        <Text style={styles.duction}>{item.workingHours}</Text>
                      )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      {/* </View> */}
    </>
  );
};

export default Attendance;

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
    color: '#363636',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  lateminut: {
    color: 'gray',
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  testname: {
    color: '#343434',
    fontSize: '0.55rem',
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
  testname1: {
    color: '#343434',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '100',
  },
  btncloor: {
    color: '#FF0000',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  timein: {
    color: '#979797',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  apply: {
    color: '#FFF',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
    fontWeight: '300',
  },
});
