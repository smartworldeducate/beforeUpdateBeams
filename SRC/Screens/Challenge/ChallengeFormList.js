import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import React, {useEffect, useState, useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EStyleSheet from 'react-native-extended-stylesheet';

import DocumentPicker from 'react-native-document-picker';

import Icon from 'react-native-fontawesome-pro';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import ChallengeListOpen from '../../Components/Modal/ChallengeListOpen';
import {InspireTrainingsAction} from '../../features/Inspire50/InspireTrainingsSlice';
import Loader from '../../Components/Loader/Loader';

const ChallengeFormList = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const inspireTrainingsHere = useSelector(
    state => state.InspireTrainingsStore,
  );

  console.log('inspireTrainingsHere', inspireTrainingsHere);

  // useEffect(() => {
  //   dispatch(
  //     InspireTrainingsAction({
  //       employee_id: profileHereEmpId,
  //     }),
  //   );
  // }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        InspireTrainingsAction({
          employee_id: profileHereEmpId,
        }),
      );
    }, [dispatch]),
  );

  const [openListModal, setOpenListModal] = useState(false);

  const onPressClose = () => {
    setOpenListModal(false);
  };

  const renderItem = ({item, index}) => {
    const filesLength = item?.training_files?.length - 1;
    console.log('item', item?.training_files);
    const firstImage =
      item?.training_files && item?.training_files[0]?.file_path;
    console.log('firstImage', firstImage);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressItem({item})}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: hp('2'),
            height: hp('16'),
            justifyContent: 'center',
            borderTopLeftRadius: wp('4'),
            borderBottomLeftRadius: wp('4'),
          }}>
          <View
            style={{
              flex: 0.7,
              paddingHorizontal: wp('2.5'),
              borderTopLeftRadius: wp('4'),
              borderBottomLeftRadius: wp('4'),
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: '#09101D',
                fontSize: hp('1.95'),
                fontWeight: '700',
                fontFamily: fontFamily.ceraBold,
              }}>
              {item?.training_title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                color: '#1C37A4',
                fontSize: hp('1.5'),
                fontWeight: '500',
                fontFamily: fontFamily.ceraMedium,
              }}>
              {item?.category_title}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: '#363636',
                fontSize: hp('1.6'),
                fontWeight: '500',
                fontFamily: fontFamily.ceraMedium,
                // paddingVertical: hp('0.35'),
              }}>
              {moment(item?.training_date, 'DD-MMM-YY').format('DD MMM, YYYY')}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: '#363636',
                fontSize: hp('1.6'),
                fontWeight: '500',
                fontFamily: fontFamily.ceraMedium,
              }}>
              {item?.school_name}
            </Text>

            <View style={{flexDirection: 'row', paddingVertical: hp('0.25')}}>
              <View>
                <FontAwesomeIcon
                  icon="fas fa-location-dot"
                  size={hp(2)}
                  style={{color: '#1C37A4'}}
                />
              </View>

              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: '#363636',
                    fontSize: hp('1.6'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {`${item?.city_name ? item?.city_name : ''}`}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{position: 'relative'}}>
              {filesLength > 1 && (
                <Text
                  style={{
                    position: 'absolute',
                    top: hp('1'),
                    left: wp('2'),
                    fontSize: hp('1.75'),
                    fontWeight: '500',
                    fontFamily: fontFamily.ceraLight,
                    color: 'white',
                    zIndex: 1,
                    backgroundColor: 'grey',
                    paddingHorizontal: wp('1.5'),
                    paddingVertical: wp('0.5'),
                    borderRadius: wp('1'),
                  }}>
                  {`+${filesLength}`}
                </Text>
              )}

              <Image
                source={{
                  uri: firstImage
                    ? firstImage
                    : 'https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_640.jpg',
                }}
                style={{
                  height: hp('16'),
                  width: wp('26'),
                  borderTopRightRadius: wp('4'),
                  borderBottomRightRadius: wp('4'),
                }}
                resizeMode={'cover'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const [header, setHeader] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [firstText, setFirstText] = useState(null);
  const [secondText, setSecondText] = useState(null);

  const [date, setDate] = useState(null);
  const [dayTime, setDayTime] = useState(null);

  const [campus, setCampus] = useState(null);
  const [city, setCity] = useState(null);

  const onPressItem = item => {
    setOpenListModal(true);
    setHeader('I50 (Inspire 50)');
    setImagesArray(item?.item?.training_files);
    setFirstText(item?.item?.category_title);
    setSecondText(item?.item?.training_title);
    setDate(item?.item?.training_date);
    setDayTime(item?.item?.training_duration);
    setCampus(item?.item?.school_name);
    setCity(item?.item?.city_name);
  };

  return (
    <>
      <MainHeader
        text={'I50 (Inspire 50)'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
        rightIcon={'person-from-portal'}
        onPressRightIcon={() => navigation.navigate('HomeScreen')}
      />

      {inspireTrainingsHere?.isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
            <View style={{marginHorizontal: wp('6'), marginTop: hp('2.5')}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <LinearGradient
                  useAngle={true}
                  angle={180}
                  angleCenter={{x: 0.5, y: 0.5}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#C07CD5', '#6D3FBD']}
                  locations={[0, 1]}
                  style={{
                    flex: 0.23,
                    justifyContent: 'center',
                    height: hp('8.75'),
                    borderRadius: wp('2'),
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOpacity: 0.5,
                    shadowRadius: 16,
                    elevation: 4,
                  }}>
                  <View
                    style={{
                      height: hp('10'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('3.25'),
                        color: '#FFFFFF',
                        fontFamily: fontFamily.ceraMedium,
                        fontWeight: '500',
                      }}>
                      {
                        inspireTrainingsHere?.userData?.training_hours
                          ?.total_hours
                      }
                    </Text>
                  </View>
                </LinearGradient>

                <LinearGradient
                  useAngle={true}
                  angle={180}
                  angleCenter={{x: 0.5, y: 0.5}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#7AE6E4', '#29D09F']}
                  locations={[0, 1]}
                  style={{
                    flex: 0.23,
                    justifyContent: 'center',
                    height: hp('8.75'),
                    borderRadius: wp('2'),
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOpacity: 0.5,
                    shadowRadius: 16,
                    elevation: 4,
                  }}>
                  <View
                    style={{
                      height: hp('10'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('3.25'),
                        color: '#FFFFFF',
                        fontFamily: fontFamily.ceraMedium,
                        fontWeight: '500',
                      }}>
                      {
                        inspireTrainingsHere?.userData?.training_hours
                          ?.teachers_impacted
                      }
                    </Text>
                  </View>
                </LinearGradient>

                <LinearGradient
                  useAngle={true}
                  angle={180}
                  angleCenter={{x: 0.5, y: 0.5}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FFA9AA', '#FF5255']}
                  locations={[0, 1]}
                  style={{
                    flex: 0.23,
                    justifyContent: 'center',
                    height: hp('8.75'),
                    borderRadius: wp('2'),
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOpacity: 0.5,
                    shadowRadius: 16,
                    elevation: 4,
                  }}>
                  <View
                    style={{
                      height: hp('10'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('3.25'),
                        color: '#FFFFFF',
                        fontFamily: fontFamily.ceraMedium,
                        fontWeight: '500',
                      }}>
                      {
                        inspireTrainingsHere?.userData?.training_hours
                          ?.students_impacted
                      }
                    </Text>
                  </View>
                </LinearGradient>

                <LinearGradient
                  useAngle={true}
                  angle={180}
                  angleCenter={{x: 0.5, y: 0.5}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FFC8A5', '#FE7E47']}
                  locations={[0, 1]}
                  style={{
                    flex: 0.23,
                    justifyContent: 'center',
                    height: hp('8.75'),
                    borderRadius: wp('2'),
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOpacity: 0.5,
                    shadowRadius: 16,
                    elevation: 4,
                  }}>
                  <View
                    style={{
                      height: hp('10'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{
                        fontSize: hp('3.25'),
                        color: '#FFFFFF',
                        fontFamily: fontFamily.ceraMedium,
                        fontWeight: '500',
                      }}>
                      {
                        inspireTrainingsHere?.userData?.training_hours
                          ?.remaining_hours
                      }
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('1.25'),
                }}>
                <View style={styles.boxTextView}>
                  <Text style={styles.boxText}>{`Total\nHours`}</Text>
                </View>
                <View style={styles.boxTextView}>
                  <Text style={styles.boxText}>{`Teacher\nImpacted`}</Text>
                </View>
                <View style={styles.boxTextView}>
                  <Text style={styles.boxText}>{`Student\nImpacted`}</Text>
                </View>
                <View style={styles.boxTextView}>
                  <Text style={styles.boxText}>{`Hours\nLeft`}</Text>
                </View>
              </View>

              <View style={{marginTop: hp('2')}}>
                <FlatList
                  data={inspireTrainingsHere?.userData?.trainings}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ChallengeFormFill')}
            style={{
              height: hp('8'),
              width: hp('8'),
              borderRadius: wp('50'),
              backgroundColor: '#1C37A4',
              marginBottom: hp('2'),
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: hp('5'),
              right: wp('8'),
            }}>
            <Text
              style={{
                fontSize: hp('5'),
                fontWeight: '500',
                fontFamily: fontFamily.ceraLight,
                color: 'white',
              }}>
              +
            </Text>
          </TouchableOpacity>

          <ChallengeListOpen
            modalVisible={openListModal}
            onpressBtn={onPressClose}
            textHeader={header}
            imagesListData={imagesArray}
            text1={firstText}
            text2={secondText}
            date={moment(date, 'DD-MMM-YY').format('DD MMM, YYYY')}
            dayTime={dayTime}
            campus={campus}
            city={city}
          />
        </>
      )}
    </>
  );
};

export default ChallengeFormList;

const styles = EStyleSheet.create({
  boxTextView: {
    flex: 0.23,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: hp('1.75'),
    color: '#66656A',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
  },
});
