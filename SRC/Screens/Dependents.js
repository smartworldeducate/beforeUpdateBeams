import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../Components/Loader/Loader';
import moment from 'moment';

const DeviceInfo = props => {
  const dispatch = useDispatch();

  const profileHere = useSelector(state => state.profileStore);

  const colorArray = ['#D5F5E3', '#D6EAF8', '#EBDEF0', '#F6DDCC', '#FCF3CF'];

  const colorArray1 = ['#83fcb9', '#90d0fc', '#d97cfc', '#fcb17e', '#f7dd74'];

  const renderItem = ({item, index}) => {
    return (
      <>
        <>
          <View
            style={{
              position: 'absolute',
              marginTop: hp('2'),
              left: wp('35'),
              zIndex: 1,

              borderRadius: wp('50'),
              borderWidth: wp('0.5'),
              borderColor: colorArray1[index % colorArray1?.length],

              height: hp('12.5'),
              width: wp('25'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colorArray[index % colorArray?.length],
            }}>
            <Text
              style={{
                fontSize: hp('3.5'),
                fontFamily: fontFamily.ceraBold,
                color: '#1C37A4',
              }}>
              {item?.NAME != null
                ? item?.NAME.split(' ')
                    .slice(0, 2)
                    .map(name => name[0])
                    .join('')
                : ''}
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              marginTop: hp('9'),
              left: wp('55'),
              height: hp('3.5'),
              width: wp('7'),
              borderRadius: wp('50'),

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: item?.GENDER == 'Male' ? item?.DEP_PHOTO : 'femaleicon',
              }}
              style={{
                height: hp('4'),
                width: wp('8'),
                borderRadius: wp('50'),
                // backgroundColor: 'white',
                borderWidth: wp('0.25'),
                borderColor: colorArray1[index % colorArray1?.length],
              }}
              resizeMode={'contain'}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginHorizontal: wp('4'),
              marginTop: hp('9'),
            }}>
            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFFFFF', '#d9f3fa']}
              locations={[0, 1]}
              style={{
                marginVertical: hp('1'),
                marginHorizontal: wp('1'),
                borderRadius: wp('4'),
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 4,
              }}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('5'),
                  flexDirection: 'column',
                  paddingHorizontal: wp('3'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp('5'),
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        ,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Name
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.NAME != null ? item?.NAME : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Birth Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.BIRTH_DATE != null
                        ? moment(item?.BIRTH_DATE, 'DD-MMM-YY').format(
                            'DD, MMM YYYY',
                          )
                        : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Gender
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.GENDER != null ? item?.GENDER : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Relationship
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.RELATION_DESC != null
                        ? item?.RELATION_DESC.trim()
                        : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Start Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.START_DATE != null
                        ? moment(item?.START_DATE, 'DD-MMM-YY').format(
                            'DD, MMM YYYY',
                          )
                        : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      End Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.END_DATE != null ? item?.END_DATE : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Marital Status
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.MARITAL_STATUS != null ? item?.MARITAL_STATUS : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: hp('1'),
                  }}>
                  <View style={{flex: 0.35}}>
                    <Text
                      style={[
                        styles.stdStdIdText,
                        {fontFamily: fontFamily.ceraMedium},
                      ]}>
                      Premium
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.75,

                      alignItems: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                      {item?.INSTALLMENT != null ? item?.INSTALLMENT : ''}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </>
      </>

      // <LinearGradient
      //   useAngle={true}
      //   angle={180}
      //   angleCenter={{x: 0.5, y: 0.5}}
      //   start={{x: 0, y: 0}}
      //   end={{x: 1, y: 0}}
      //   colors={['#FFFFFF', '#d9f3fa']}
      //   locations={[0, 1]}
      //   style={{
      //     marginVertical: hp('1'),
      //     marginHorizontal: wp('1'),
      //     paddingBottom: hp('0.5'),
      //     borderRadius: wp('4'),
      //     shadowColor: 'rgba(0,0,0,0.5)',
      //     shadowOpacity: 0.5,
      //     shadowRadius: 4,
      //     elevation: 4,
      //   }}>
      //   <View style={{flexDirection: 'row'}}>
      //     <View style={{flex: 0.25}}></View>

      //     <View
      //       style={{
      //         flex: 0.5,
      //         flexDirection: 'row',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         paddingTop: hp('1'),
      //       }}>
      //       <View
      //         style={{
      //           borderRadius: wp('50'),
      //           borderWidth: wp('0.5'),
      //           borderColor: 'grey',
      //         }}>
      //         <Image
      //           source={{
      //             uri: item?.GENDER == 'Male' ? item?.DEP_PHOTO : 'femaleicon',
      //           }}
      //           style={{
      //             height: hp('12'),
      //             width: wp('24'),
      //             borderRadius: wp('50'),
      //           }}
      //           resizeMode={'contain'}
      //         />
      //       </View>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.25,
      //       }}></View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           ,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Name
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.NAME != null ? item?.NAME : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Birth Date
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,
      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.BIRTH_DATE != null ? item?.BIRTH_DATE : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Gender
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,
      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.GENDER != null ? item?.GENDER : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Relationship
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.RELATION_DESC != null ? item?.RELATION_DESC.trim() : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Start Date
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.START_DATE != null ? item?.START_DATE : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         End Date
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.END_DATE != null ? item?.END_DATE : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Marital Status
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.MARITAL_STATUS != null ? item?.MARITAL_STATUS : ''}
      //       </Text>
      //     </View>
      //   </View>

      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       paddingHorizontal: wp('5'),
      //     }}>
      //     <View style={{flex: 0.35}}>
      //       <Text
      //         style={[
      //           styles.stdStdIdText,
      //           {fontFamily: fontFamily.ceraMedium},
      //         ]}>
      //         Premium
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         flex: 0.75,

      //         alignItems: 'flex-end',
      //       }}>
      //       <Text
      //         numberOfLines={1}
      //         ellipsizeMode={'tail'}
      //         style={[styles.stdStdIdText, {textAlign: 'right'}]}>
      //         {item?.INSTALLMENT != null ? item?.INSTALLMENT : ''}
      //       </Text>
      //     </View>
      //   </View>
      // </LinearGradient>
    );
  };

  return (
    <>
      <View>
        <MainHeader
          text={`Health Insurance Dependents`}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View
          style={{
            marginVertical: hp('1'),
            marginHorizontal: wp('2'),
            paddingHorizontal: wp('1'),
          }}>
          <FlatList
            data={profileHere?.userData?.dependents}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'black',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                There are currently no dependents added.
              </Text>
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default DeviceInfo;

const styles = EStyleSheet.create({
  stdNameText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.69rem',
  },

  stdStdIdText: {
    color: '#363636',
    paddingVertical: hp('0.5'),
    fontSize: '0.55rem',
  },

  empName: {
    fontSize: '0.73rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
    paddingVertical: hp('0.35'),
  },

  empDesignation: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#979797',
    fontWeight: '500',
  },
});
