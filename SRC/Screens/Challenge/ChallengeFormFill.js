import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import I50TextInputModal from '../../Components/Modal/I50TextInputModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import TitleCategoriesListModal from '../../Components/Modal/TitleCategoriesListModal';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {InspireAddTrainingAction} from '../../features/Inspire50/InspireAddTrainingSlice';

const ChallengeFormFill = props => {
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const inspireAddTrainingTitleHere = useSelector(
    state => state.InspireAddTrainingStore?.userData?.trainings,
  );

  const inspireAddTrainingCategiriesHere = useSelector(
    state => state.InspireAddTrainingStore?.userData?.categories,
  );

  const inspireAddTrainingSchoolHere = useSelector(
    state => state.InspireAddTrainingStore?.userData?.schools,
  );

  const inspireAddTrainingCityHere = useSelector(
    state => state.InspireAddTrainingStore?.userData?.cities,
  );

  const inspireAddTrainingDurationHere = useSelector(
    state => state.InspireAddTrainingStore?.userData?.durations,
  );

  // console.log('inspireAddTrainingTitleHere', inspireAddTrainingTitleHere);

  useEffect(() => {
    dispatch(
      InspireAddTrainingAction({
        employee_id: profileHereEmpId,
      }),
    );
  }, []);

  const [traingTitle, setTrainingTitle] = useState('');
  const [traingTitleId, setTrainingTitleId] = useState(null);

  const [pdCategories, setPDCateories] = useState('');
  const [traingCategoryId, setTrainingCategoryId] = useState(null);

  const [trainingDate, setTrainingDate] = useState(null);
  const [forTrainingDate, setForTrainingDate] = useState(null);

  const [schoolName, setSchoolName] = useState('');
  const [traingSchoolId, setTrainingSchoolId] = useState(null);

  const [city, setCity] = useState('');
  const [traingCityId, setTrainingCityId] = useState(null);

  const [trainingDuration, setTrainingDuration] = useState('');

  const [trainingCount, setTrainingCount] = useState(0);
  const [atttValue, setAttValue] = useState(true);
  const [atttachValue, setAttachValue] = useState(false);

  const [trainingTitleModal, setTrainingTitleModal] = useState(false);
  const [pdCategoriesModal, setPDCategoriesModal] = useState(false);

  const [schoolNameModal, setSchoolNameModal] = useState(false);

  const [cityModal, setCityModal] = useState(false);

  const [trainingDurationModal, setTrainingDurationModal] = useState(false);

  // datePicker start
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const onPressShowDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const formattedFromDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const fromDateForTotalDays = day + '-' + month + '-' + year;
    setForTrainingDate(fromDateForTotalDays);
    setTrainingDate(formattedFromDate);
    hideDatePicker();
  };
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 90);

  console.log('trainingDate', trainingDate);
  console.log('forTrainingDate', forTrainingDate);

  // datepicker end

  const onPressMinus = () => {
    if (trainingCount > 0) {
      setTrainingCount(trainingCount - 1);
    } else {
      setTrainingCount(0);
    }
  };

  const onPressPlus = () => {
    if (trainingCount >= 0) {
      setTrainingCount(trainingCount + 1);
    } else {
      setTrainingCount(0);
    }
  };

  const onPressAttendance = () => {
    setAttValue(true);
    setAttachValue(false);
  };

  const onPressAttachment = () => {
    setAttValue(false);
    setAttachValue(true);
  };

  const onPressSubmitBtn = () => {
    console.log('onPressSubmitBtn');
  };

  const onPressVideoUpload = () => {
    console.log('onPressVideoUpload');
  };

  const onPressAddNew = () => {
    console.log('onPressAddNew');
  };

  const onPressTrainingTitleModal = () => {
    setTrainingTitleModal(!trainingTitleModal);
  };

  const onPressPDCategoryModal = () => {
    setPDCategoriesModal(!pdCategoriesModal);
  };

  const onPressSchoolNameModal = () => {
    setSchoolNameModal(!schoolNameModal);
  };

  const onPressCityModal = () => {
    setCityModal(!cityModal);
  };

  const onPressTrainingDurationModal = () => {
    setTrainingDurationModal(!trainingDurationModal);
  };

  const renderItemTrainingTitleList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressTrainingTitle({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.trainingTitleText}>
            {item?.training_title}
          </Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressTrainingTitle = ({item}) => {
    setTrainingTitle(item?.training_title);
    setTrainingTitleId(item?.training_id);
    setTrainingTitleModal(false);
  };

  console.log('traingTitleId', traingTitleId);

  const renderItemPDCategoryList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressPDCategory({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text style={styles.trainingTitleText}>{item?.category_title}</Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressPDCategory = ({item}) => {
    setPDCateories(item?.category_title);
    setTrainingCategoryId(item?.category_id);
    setPDCategoriesModal(false);
  };

  const renderItemSchoolNameList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressSchoolName({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.trainingTitleText}>
            {item?.school_title}
          </Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressSchoolName = ({item}) => {
    setSchoolName(item?.school_title);
    setTrainingSchoolId(item?.school_id);
    setSchoolNameModal(false);
  };

  const renderItemCityList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressCityName({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text style={styles.trainingTitleText}>{item?.city_title}</Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressCityName = ({item}) => {
    setCity(item?.city_title);
    setTrainingCityId(item?.city_id);
    setCityModal(false);
  };

  const renderItemTraingingDurationList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPressTrainingDuration({item})}
          style={{
            height: hp('5.5'),
            justifyContent: 'center',
            marginVertical: hp('0.1'),
          }}>
          <Text style={styles.trainingTitleText}>{item}</Text>
        </TouchableOpacity>

        <LineSeprator height={hp('0.05')} backgroundColor={'silver'} />
      </>
    );
  };

  const onPressTrainingDuration = ({item}) => {
    setTrainingDuration(item);
    setTrainingDurationModal(false);
  };

  const onPressAttendanceChoose = () => {
    console.log('onPressAttendanceChoose');
  };

  return (
    <>
      <MainHeader
        text={'I50 (Inspire 50) Form'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        <View style={{marginHorizontal: wp('6'), marginTop: hp('2.5')}}>
          <I50TextInputModal
            textValue={
              traingTitle == '' || traingTitle == null
                ? 'Training Title'
                : traingTitle
            }
            iconName={'angles-up-down'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressTrainingTitleModal}
          />

          <I50TextInputModal
            textValue={
              pdCategories == '' || pdCategories == null
                ? 'PD Categories'
                : pdCategories
            }
            iconName={'angles-up-down'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressPDCategoryModal}
          />

          <I50TextInputModal
            textValue={
              trainingDate == '' || trainingDate == null
                ? 'Select Training Date'
                : trainingDate
            }
            iconName={'calendar-days'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressShowDatePicker}
          />

          <I50TextInputModal
            textValue={
              schoolName == '' || schoolName == null
                ? 'School Name'
                : schoolName
            }
            iconName={'angles-up-down'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressSchoolNameModal}
          />

          <I50TextInputModal
            textValue={city == '' || city == null ? 'City' : city}
            iconName={'angles-up-down'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressCityModal}
          />

          <View style={styles.traineeMainView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressMinus}
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.plusMinustext}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.plusMinustext, {fontSize: hp('2')}]}>
                {trainingCount > 0 ? trainingCount : 'Number of Trainees'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressPlus}
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.plusMinustext}>+</Text>
            </TouchableOpacity>
          </View>

          <I50TextInputModal
            textValue={
              trainingDuration == '' || trainingDuration == null
                ? 'Training Duration'
                : `You Selected ${trainingDuration} ${
                    trainingDuration > 1 ? 'hours' : 'hour'
                  }`
            }
            iconName={'angles-up-down'}
            iconColor={'#363636'}
            iconSize={hp('2.5')}
            onPress={onPressTrainingDurationModal}
          />

          <View style={styles.attendenceAttachmentView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressAttendance}
              style={[
                styles.btnsStyle,
                {backgroundColor: atttValue ? 'white' : 'silver'},
              ]}>
              <Text style={styles.attenAttachText}>Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressAttachment}
              style={[
                styles.btnsStyle,
                {backgroundColor: atttachValue ? 'white' : 'silver'},
              ]}>
              <Text style={styles.attenAttachText}>Attachments</Text>
            </TouchableOpacity>
          </View>

          {atttValue && (
            <>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressAttendanceChoose}
                style={[
                  styles.atendUploadView,
                  {
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 12},
                    shadowOpacity: 0.58,
                    shadowRadius: 16,
                    elevation: 7,
                    margin: wp('1'),
                  },
                ]}>
                <View
                  style={{
                    flex: 0.25,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon="fat fa-image"
                    size={hp('5')}
                    style={{color: 'red'}}
                  />
                </View>
                <View style={{flex: 0.75}}>
                  <Text style={styles.attachmentText}>
                    Upload the Training Attendance List
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginRight: wp('3'),
                }}>
                <Text style={styles.attachmentText}>
                  For Example: Max file size: 5MB, .jpg, png and pdf
                </Text>
              </View>
            </>
          )}

          {atttachValue && (
            <>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressVideoUpload}
                style={[
                  styles.atendUploadView,
                  {
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 12},
                    shadowOpacity: 0.58,
                    shadowRadius: 16,
                    elevation: 7,
                    margin: wp('1'),
                    height: hp('7.5'),
                  },
                ]}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <FontAwesomeIcon
                    icon="fat fa-video"
                    size={hp('3.5')}
                    style={{color: '#000000'}}
                  />
                </View>
                <View style={{flex: 0.8}}>
                  <Text style={styles.attachmentText}>
                    Upload Your 60-Second Video (Optional)
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: hp('2'),
                  height: hp('7.5'),
                }}>
                <View
                  style={{
                    flex: 0.75,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('2.5'),
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 12},
                    shadowOpacity: 0.58,
                    shadowRadius: 16,
                    elevation: 7,
                  }}>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <FontAwesomeIcon
                      icon="fat fa-image"
                      size={hp('3.5')}
                      style={{color: '#000000'}}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                    }}>
                    <Text style={styles.attachmentText}>
                      Minimum of 3 and a Maximum of 5
                    </Text>
                  </View>
                </View>
                <View style={{flex: 0.03}}></View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressAddNew}
                  style={{
                    flex: 0.22,
                    backgroundColor: '#1C37A4',
                    borderRadius: wp('1.25'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: fontFamily.ceraMedium,
                      fontWeight: '500',
                      fontSize: hp('1.55'),
                    }}>
                    Add New
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp('-1.25'),
                }}>
                <Text style={[styles.attachmentText, {fontSize: hp('1.55')}]}>
                  Teachers must upload 3 to 5 images of training from various
                  angles, covering all participants and an optional 60-second
                  video
                </Text>
              </View>
            </>
          )}

          {trainingTitleModal && (
            <TitleCategoriesListModal
              onPressOpacity={onPressTrainingTitleModal}
              text={'Select Training Title'}
              leaveTypesData={inspireAddTrainingTitleHere}
              renderItem={renderItemTrainingTitleList}
            />
          )}

          {pdCategoriesModal && (
            <TitleCategoriesListModal
              onPressOpacity={onPressPDCategoryModal}
              text={'Select PD Categories'}
              leaveTypesData={inspireAddTrainingCategiriesHere}
              renderItem={renderItemPDCategoryList}
            />
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            maximumDate={maxDate}
          />

          {schoolNameModal && (
            <TitleCategoriesListModal
              onPressOpacity={onPressSchoolNameModal}
              text={'Select School Name'}
              leaveTypesData={inspireAddTrainingSchoolHere}
              renderItem={renderItemSchoolNameList}
            />
          )}

          {cityModal && (
            <TitleCategoriesListModal
              onPressOpacity={onPressCityModal}
              text={'Select City'}
              leaveTypesData={inspireAddTrainingCityHere}
              renderItem={renderItemCityList}
            />
          )}

          {trainingDurationModal && (
            <TitleCategoriesListModal
              onPressOpacity={onPressCityModal}
              text={'Select Training Duration'}
              leaveTypesData={inspireAddTrainingDurationHere}
              renderItem={renderItemTraingingDurationList}
            />
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressSubmitBtn}
            style={styles.submitBtn}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ChallengeFormFill;

const styles = EStyleSheet.create({
  traineeMainView: {
    flexDirection: 'row',
    marginVertical: hp('1'),
    height: hp('7'),
    width: wp('85'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('50'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 7,
  },
  plusMinustext: {
    color: '#363636',
    fontSize: hp('2.5'),
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '400',
  },
  attendenceAttachmentView: {
    flexDirection: 'row',
    marginVertical: hp('1'),
    height: hp('8'),
    width: wp('85'),
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2.5'),
  },
  btnsStyle: {
    height: hp('6'),
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1.5'),
    marginHorizontal: wp('2'),
  },
  attenAttachText: {
    color: '#363636',
    fontSize: hp('2'),
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '400',
  },
  atendUploadView: {
    flexDirection: 'row',
    marginTop: hp('2'),
    marginVertical: hp('0.5'),
    height: hp('12'),
    width: wp('85'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2'),
  },
  attachmentText: {
    paddingLeft: wp('2'),
    color: '#000000',
    fontSize: hp('1.65'),
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
  },
  submitBtn: {
    marginVertical: hp('4'),
    height: hp('7'),
    width: wp('85'),
    backgroundColor: '#1C37A4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 7,
  },

  trainingTitleText: {
    color: '#343434',
    fontSize: '0.65rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
