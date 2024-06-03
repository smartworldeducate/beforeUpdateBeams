import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PieChart} from 'react-native-gifted-charts';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import Appraisal from '../Components/Appraisal/Appraisal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppraisalAction} from '../features/AppraisalYearsSlice/AppraisalYearsSlice';
import {useSelector, useDispatch} from 'react-redux';
import Objectives from '../Components/Appraisal/Objectives';
import {ObjectiveYearsAction} from '../features/AppraisalYearsSlice/ObjectivesYearsSlice';
import Loader from '../Components/Loader/Loader';
import DevelopmentArea from '../Components/Appraisal/DevelopmentArea';

const Approcial = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const appraisalYearsHere = useSelector(state => state.appraisalYearsStore);
  const objectiveYearsHere = useSelector(state => state.objectiveYearsStore);

  console.log('appraisalYearsHere>', appraisalYearsHere?.userData);
  console.log(
    'objectiveYearsHere>',
    objectiveYearsHere?.userData?.apprasal_years,
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAppraisal();
  }, [dispatch]);

  const getAppraisal = () => {
    AsyncStorage.getItem('loginData')
      .then(loginData => {
        const parsedLoginData = JSON.parse(loginData);
        dispatch(
          AppraisalAction({
            employeeId: parsedLoginData,
          }),
        );
        dispatch(
          ObjectiveYearsAction({
            employee_id: parsedLoginData,
          }),
        );
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
  };

  const onRefresh = () => {
    console.log('onRefresh');
    setRefreshing(true);
    getAppraisal();
    setRefreshing(false);
  };

  const [appraisal, setAppraisal] = useState(true);
  const [objective, setObjective] = useState(false);
  const [development, setDevelopment] = useState(false);

  const onPressAppraisal = () => {
    setAppraisal(true);
    setObjective(false);
    setDevelopment(false);
  };

  const onPressObjective = () => {
    setAppraisal(false);
    setObjective(true);
    setDevelopment(false);
  };

  const onPressDevelopment = () => {
    setAppraisal(false);
    setObjective(false);
    setDevelopment(true);
  };

  const renderItem = ({item, index}) => {
    const totalPercentage = 100;
    const gettingPercentage = item?.VALUE;
    const convertGettingPercentage = parseInt(gettingPercentage, 10);
    const lostPercentage = totalPercentage - gettingPercentage;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          marginBottom: hp('1.75'),
          height: hp('14'),
          marginHorizontal: wp('2'),
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          borderRadius: wp('4'),
        }}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
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
                {value: convertGettingPercentage, color: '#D4E9FF'},
                {value: lostPercentage, color: '#E7E7E7'},
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
                      {item?.LABEL}
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
                height: hp('9.5'),
                paddingTop: hp('4'),
                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  flex: 0.55,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.1,
                    backgroundColor: '#D4E9FF',
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
                      {`${item?.VALUE}%`}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{
                        fontSize: hp('1.25'),
                        fontFamily: fontFamily.ceraMedium,
                        color: '#979797',
                        fontWeight: '500',
                      }}>
                      {item?.RATING_DESC}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.1,
                    backgroundColor: '#E7E7E7',
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
                      {item?.SAL_INCR}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{
                        fontSize: hp('1.25'),
                        fontFamily: fontFamily.ceraMedium,
                        color: '#979797',
                        fontWeight: '500',
                      }}>
                      INCREASE
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                height: hp('4.5'),
                alignItems: 'flex-end',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 0.5,
                  height: hp('4.5'),
                }}></View>

              {item?.RATING_DESC == 'Star' && (
                <View
                  style={{
                    flex: 0.5,
                    height: hp('4.5'),
                    alignItems: 'flex-end',
                    marginBottom: hp('2'),
                  }}>
                  <Image
                    source={{uri: 'developmentstar'}}
                    style={{
                      height: hp('7'),
                      width: wp('14'),
                      borderRadius: wp('6'),
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      setAppraisal(true);
      setObjective(false);
      setDevelopment(false);

      return () => {
        console.log('Page1 is unfocused');
      };
    }, []),
  );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === 'android'
              ? colors.appBackGroundColor
              : colors.appBackGroundColor,
        }}>
        <View>
          <MainHeader
            text={'Appraisal'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>
        {appraisalYearsHere.isLoading ||
          (objectiveYearsHere.isLoading && <Loader />)}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.appBackGroundColor,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1C37A5', '#4D69DC']}
              progressBackgroundColor={'#f7f5f5'}
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
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('5'),
                    marginHorizontal: wp('2'),
                  }}>
                  <TouchableOpacity
                    onPress={onPressAppraisal}
                    activeOpacity={0.5}
                    style={{
                      flex: 0.46,
                      backgroundColor: appraisal
                        ? colors.whiteColor
                        : '#E7E7E7',
                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.upperText}>Appraisal</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0.05,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                  <TouchableOpacity
                    onPress={onPressObjective}
                    activeOpacity={0.5}
                    style={{
                      flex: 0.46,
                      backgroundColor: objective
                        ? colors.whiteColor
                        : '#E7E7E7',
                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.upperText}>Objective</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0.05,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                  <TouchableOpacity
                    onPress={onPressDevelopment}
                    activeOpacity={0.5}
                    style={{
                      flex: 0.46,
                      backgroundColor: development
                        ? colors.whiteColor
                        : '#E7E7E7',
                      borderRadius: wp('2'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.upperText}>Development</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {appraisal && (
                <>
                  <Appraisal
                    dataList={appraisalYearsHere?.userData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}
              {objective && <Objectives />}

              {development && <DevelopmentArea />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Approcial;

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
