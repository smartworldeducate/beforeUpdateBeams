import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  ImageBackground,
  Modal,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import React, {useEffect, useState, useCallback} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {
  InspireTrainingsAction,
  removeFromTraining,
} from '../../features/Inspire50/InspireTrainingsSlice';
import Loader from '../../Components/Loader/Loader';
import InspireDeleteModal from '../../Components/Modal/InspireDeleteModal';
import {InspireRemoveTrainingAction} from '../../features/Inspire50/InspireRemoveTraining';

const ChallengeFormList = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const inspireTrainingsHere = useSelector(
    state => state.InspireTrainingsStore,
  );

  const inspireTrainingsArrayHere = useSelector(
    state => state.InspireTrainingsStore.trainingsArray,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    try {
      dispatch(
        InspireTrainingsAction({
          employee_id: profileHereEmpId,
        }),
      );
    } catch (error) {}
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(
        InspireTrainingsAction({
          employee_id: profileHereEmpId,
        }),
      );
    }, [dispatch]),
  );

  const renderItem = ({item, index}) => {
    const filesLength = item?.training_files?.length - 1;

    const firstImage =
      item?.training_files && item?.training_files[0]?.file_path;
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: hp('2'),
            height: hp('16'),
            justifyContent: 'center',
            borderTopLeftRadius: wp('4'),
            borderBottomLeftRadius: wp('4'),
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('ChallengeListOpenData', {
                sendingItemParam: item,
              })
            }
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
          </TouchableOpacity>

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
                  uri: firstImage && firstImage,
                }}
                style={{
                  height: hp('16'),
                  width: wp('26'),
                  borderTopRightRadius: wp('4'),
                  borderBottomRightRadius: wp('4'),
                }}
                resizeMode={'cover'}
              />

              <TouchableOpacity
                onPress={() =>
                  onPressDeleteIcon({
                    itemPD_ID: item.pd_id,
                    itemTitle: item?.training_title,
                  })
                }
                style={styles.deleteIconContainer}>
                <FontAwesomeIcon
                  icon="fas fa-trash-alt"
                  size={hp(2)}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  // console.log('list', inspireTrainingsHere?.userData?.user_city);

  const [deleteTrainingModal, setDeleteTrainingModal] = useState(false);
  const [itemTrainingPDID, setItemTrainingPDID] = useState('');
  const [itemTrainingTitle, setItemTrainingTitle] = useState('');

  const onPressDeleteIcon = item => {
    setItemTrainingPDID(item?.itemPD_ID);
    setItemTrainingTitle(item?.itemTitle);
    setDeleteTrainingModal(true);
  };

  const onPressCancel = () => {
    setItemTrainingPDID('');
    setItemTrainingTitle('');
    setDeleteTrainingModal(false);
  };

  const onPressDelete = () => {
    dispatch(removeFromTraining(itemTrainingPDID));
    dispatch(
      InspireRemoveTrainingAction({
        employee_id: profileHereEmpId,
        pd_id: itemTrainingPDID,
      }),
    );
    setDeleteTrainingModal(false);
    navigation.replace('ChallengeFormList');
  };

  const closeModalforSuccess = () => {
    setDeleteTrainingModal(false);
  };

  return (
    <>
      <MainHeader
        text={'I20 - Impact 20'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
        rightIcon={'person-from-portal'}
        onPressRightIcon={() => props.navigation.pop(2)}
      />

      {inspireTrainingsHere?.isLoading && <Loader></Loader>}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2A72B6', '#203B88']}
            progressBackgroundColor={'#fcfcfc'}
            tintColor={'#1C37A4'}
          />
        }
        style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        <View style={{marginHorizontal: wp('6'), marginTop: hp('1')}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  {inspireTrainingsHere?.userData?.training_hours
                    ?.conducted_hours == '' ||
                  inspireTrainingsHere?.userData?.training_hours
                    ?.conducted_hours == undefined
                    ? 0
                    : inspireTrainingsHere?.userData?.training_hours
                        ?.conducted_hours}
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
                  {inspireTrainingsHere?.userData?.training_hours
                    ?.teachers_impacted == '' ||
                  inspireTrainingsHere?.userData?.training_hours
                    ?.teachers_impacted == undefined
                    ? 0
                    : inspireTrainingsHere?.userData?.training_hours
                        ?.teachers_impacted}
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
                  {inspireTrainingsHere?.userData?.training_hours
                    ?.students_impacted == '' ||
                  inspireTrainingsHere?.userData?.training_hours
                    ?.students_impacted == undefined
                    ? 0
                    : inspireTrainingsHere?.userData?.training_hours
                        ?.students_impacted}
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
                  {inspireTrainingsHere?.userData?.training_hours
                    ?.remaining_hours == '' ||
                  inspireTrainingsHere?.userData?.training_hours
                    ?.remaining_hours == undefined
                    ? 0
                    : inspireTrainingsHere?.userData?.training_hours
                        ?.remaining_hours}
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
              <Text style={styles.boxText}>{`Hours\nConducted`}</Text>
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

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL(
                inspireTrainingsHere?.userData?.low_cost_schools_link,
              )
            }
            style={{
              height: hp('6'),
              backgroundColor: '#1C37A4',
              borderRadius: wp('50'),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp('1'),
              marginTop: hp('2'),
              marginHorizontal: wp('2'),
            }}>
            <Text
              style={{
                fontSize: hp('1.95'),
                color: '#FFFFFF',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '500',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>
              {'Find a Low-Cost School'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL(
                inspireTrainingsHere?.userData?.training_material_link,
              )
            }
            style={{
              height: hp('6'),
              backgroundColor: '#1C37A4',
              borderRadius: wp('50'),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp('1'),
              marginHorizontal: wp('2'),
            }}>
            <Text
              style={{
                fontSize: hp('1.95'),
                color: '#FFFFFF',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '500',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>
              {'Select the Training Material'}
            </Text>
          </TouchableOpacity>

          {inspireTrainingsHere &&
          inspireTrainingsHere?.userData?.trainings?.length > 0 ? (
            <View style={{marginTop: hp('1')}}>
              <FlatList
                data={inspireTrainingsArrayHere}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: hp('4'),
                marginHorizontal: wp('2'),
              }}>
              <Text
                style={{
                  fontSize: hp('2.21'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                  fontWeight: '500',
                  // fontStyle: 'italic',
                  textAlign: 'center',
                }}>
                Let's get started!
              </Text>
              <Text
                style={{
                  fontSize: hp('2.21'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                  fontWeight: '500',
                  // fontStyle: 'italic',
                  textAlign: 'center',
                }}>
                Your journey to I20 begins here.
              </Text>
              <Text
                style={{
                  fontSize: hp('2.21'),
                  fontFamily: fontFamily.ceraMedium,
                  color: 'black',
                  fontWeight: '500',
                  // fontStyle: 'italic',
                  textAlign: 'center',
                  letterSpacing: -0.5,
                }}>
                Every hour makes a difference. Start by clicking the + icon.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {deleteTrainingModal && (
        <InspireDeleteModal
          textUpper={'Are you sure!'}
          textLower={`Do you really want to delete ${itemTrainingTitle}`}
          btnText1={'CANCEL'}
          btnText2={'DELETE'}
          onPressBtn1={onPressCancel}
          onPressBtn2={onPressDelete}
          onPressOpacity={closeModalforSuccess}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('ChallengeFormFill', {
            cityDetailsparam: inspireTrainingsHere?.userData?.user_city,
          })
        }
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
  deleteIconContainer: {
    position: 'absolute',
    top: hp('1'),
    right: wp('2'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('1'),
    borderRadius: wp('1'),
  },
  deleteIcon: {
    color: 'white',
  },
});
