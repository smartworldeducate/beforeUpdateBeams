import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Modal,
  Alert,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback} from 'react';

import InspireSuccessModal from '../../Components/Modal/InspireSuccessModal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';

import Icon from 'react-native-fontawesome-pro';
import {
  changeAttendStatusSlice,
  clearAllStateTeacherAttendance,
  clearSelectedUsersList,
  selectAllUsers,
  selectUser,
  setSelectAllFalse,
  TeacherStudentsListAction,
  updateSelectedUsersStatus,
} from '../../features/TeacherAttendance/TeacherStudentsList';
import Loader from '../../Components/Loader/Loader';
import MarkAttendanceModal from '../../Components/Modal/MarkAttendanceModal';

import {
  clearAllStateTeacherAttendanceUpload,
  UploadStdAttendanceAction,
} from '../../features/TeacherAttendance/UploadAttendanceSlice';
import MessageSuccessModal from '../../Components/Modal/MessageSuccessModal';
import ViewInput from '../../Components/ViewInput';
import colors from '../../Styles/colors';

const MarkAttendance = ({route, ...props}) => {
  const authKeyParam = route?.params?.authKeyParam;

  const branchId = route?.params?.classDataParamForStudentsList?.branch_id;
  const classId = route?.params?.classDataParamForStudentsList?.class_id;
  const sectionId = route?.params?.classDataParamForStudentsList?.section_id;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const teacherstudents = useSelector(
    state => state.TeacherStudentsListStore?.isLoading,
  );

  const teacherstudentsListHere = useSelector(
    state => state.TeacherStudentsListStore?.userDataStudents,
  );

  console.log('teacherstudentsListHere', teacherstudentsListHere);

  const teacherstudentsListAcdYearIdHere =
    teacherstudentsListHere[0]?.acad_year_id ?? null;

  const selectedStudentsListHere = useSelector(
    state => state.TeacherStudentsListStore?.selectedUsersList,
  );

  console.log('selectedStudentsListHere', selectedStudentsListHere);

  const selectedAllStudentsHere = useSelector(
    state => state.TeacherStudentsListStore?.selectAll,
  );

  const isAllowAttenUploadHere = useSelector(
    state => state.TeacherStudentsListStore?.isAllowAttenUpload,
  );

  const uploadStdAttendanceHere = useSelector(
    state => state.UploadStdAttendanceStore,
  );

  const uploadStdAttendanceIsLoadingHere = useSelector(
    state => state.UploadStdAttendanceStore?.isLoading,
  );

  const uploadStdAttendanceResponseHere = useSelector(
    state => state.UploadStdAttendanceStore?.success,
  );

  const uploadStdAttendanceResponseMessageHere = useSelector(
    state => state.UploadStdAttendanceStore?.message,
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [trainingDate, setTrainingDate] = useState(null);
  const [forTrainingDate, setForTrainingDate] = useState('');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAbsent, setModalVisibleAbsent] = useState(false);

  const [modalVisibleLeave, setModalVisibleLeave] = useState(false);
  const [modalVisibleExempted, setModalVisibleExempted] = useState(false);

  const [timeInValue, setTimeInValue] = useState(null);
  const [timeInModal, setTimeInModal] = useState(false);
  const [remarksText, setRemarksText] = useState('');

  const [informSH, setInformSH] = useState(false);
  const [ticketPRO, setTicketPRO] = useState(false);
  const [none, setNone] = useState(true);
  const [absentRadioButtonValues, setAbsentRadioButtonValues] = useState(3);

  useEffect(() => {
    const date = new Date();
    const formattedFromDate = moment(date).format('DD MMM YYYY');
    const formattedTraingDateToPost = moment(date).format('DD/MM/YYYY');
    setForTrainingDate(formattedFromDate);
    setTrainingDate(formattedTraingDateToPost);

    const fetchData = async () => {
      try {
        const authKey = await AsyncStorage.getItem('authKey');
        console.log('authKey', authKey);
        dispatch(
          TeacherStudentsListAction({
            values: {
              branch_id:
                route?.params?.classDataParamForStudentsList?.branch_id,
              class_id: route?.params?.classDataParamForStudentsList?.class_id,
              section_id:
                route?.params?.classDataParamForStudentsList?.section_id,
              att_date: trainingDate,
            },
            authKeyParam,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      // Clear previous data when screen is focused
      dispatch(clearAllStateTeacherAttendance());
      // Dispatch the action with the required parameters
      dispatch(
        TeacherStudentsListAction({
          values: {
            branch_id: branchId,
            class_id: classId,
            section_id: sectionId,
            att_date: trainingDate,
          },
          authKeyParam,
        }),
      );
      // Cleanup function runs when the screen loses focus
      return () => {
        dispatch(clearAllStateTeacherAttendance());
      };
    }, [branchId, classId, sectionId, trainingDate, dispatch]),
  );

  const onPressMarkAttendance = () => {
    setAttendanceModal(true);
  };
  const onPressCloseMarkAttendance = () => {
    setAttendanceModal(false);
  };

  const onPressSaveBtnModal = (
    newStatus,
    timeInValue,
    remarks,
    absentRadioButtonValues,
  ) => {
    let additionalFields = {};

    console.log('val1', newStatus);
    console.log('val2', timeInValue);
    console.log('val3', remarks);
    console.log('val4', absentRadioButtonValues);

    if (newStatus === 'T') {
      additionalFields = {
        att_action: null,
        remarks: remarks,
        tardiness: timeInValue,
      };
    } else if (newStatus === 'A') {
      additionalFields = {
        att_action:
          absentRadioButtonValues !== '' && absentRadioButtonValues != undefined
            ? absentRadioButtonValues
            : '3',
        remarks: remarks,
      };
    } else if (newStatus === 'L') {
      additionalFields = {
        att_action: null,
        remarks: remarks == undefined ? '' : remarks,
      };
    } else if (newStatus === 'E') {
      additionalFields = {
        att_action: null,
        remarks: remarks == undefined ? '' : remarks,
      };
    } else {
      console.log('PP or PO Status', newStatus);
    }

    dispatch(
      updateSelectedUsersStatus({
        newStatus,
        additionalFields,
      }),
    );

    setAttendanceModal(false);
    dispatch(clearSelectedUsersList());
    dispatch(setSelectAllFalse());
  };

  const onPressSaveBtnModalTardyCase = (newStatus, timeInValue, remarks) => {
    let additionalFields = {};
    console.log('allValues', newStatus, timeInValue, remarks);

    if (newStatus === 'T') {
      additionalFields = {
        att_action: null,
        remarks: remarks,
        tardiness: timeInValue,
      };
    }
    dispatch(
      updateSelectedUsersStatus({
        newStatus,
        additionalFields,
      }),
    );
    setAttendanceModal(false);
    dispatch(clearSelectedUsersList());
    dispatch(setSelectAllFalse());
  };

  const [timeInValueTardyCase, setTimeInValueTardyCase] = useState('');
  const [remarksTardyCase, setRemarksTardyCase] = useState('');

  const [absentSelectedValueAbsentCase, setAbsentSelectedValueAbsentCase] =
    useState('');
  const [remarksAbsentCase, setRemarksAbsentCase] = useState('');

  const [remarksLeaveCase, setRemarksLeaveCase] = useState('');

  const [remarksExemptedCase, setRemarksExemptedCase] = useState('');

  const onPressTheSaveTardyBtn = (timeInValue, remarksText) => {
    console.log('onPressTheSaveTardyBtn', timeInValue, remarksText);
    setRemarksTardyCase(remarksText);
    setTimeInValueTardyCase(timeInValue);
    setModalVisible(false);
  };

  const onPressTheSaveAbsentBtn = (absentRadioButtonValues, remarksText) => {
    console.log(
      'onPressTheSaveAbsentBtn',
      absentRadioButtonValues,
      remarksText,
    );
    setAbsentSelectedValueAbsentCase(absentRadioButtonValues);
    setRemarksAbsentCase(remarksText);
    setModalVisibleAbsent(false);
  };

  const onPressTheSaveLeaveBtn = remarksText => {
    console.log('onPressTheSaveLeaveBtn', remarksText);
    setRemarksLeaveCase(remarksText);
    setModalVisibleLeave(false);
  };

  const onPressTheSaveExemptedBtn = remarksText => {
    console.log('remarksText', remarksText);
    setRemarksExemptedCase(remarksText);
    setModalVisibleExempted(false);
  };

  console.log('remarksTardyCase', remarksTardyCase);
  console.log('timeInValueTardyCase', timeInValueTardyCase);

  console.log('absentSelectedValueAbsentCase', absentSelectedValueAbsentCase);
  console.log('remarksAbsentCase', remarksAbsentCase);

  const handleButtonPress = (student_id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    // dispatch(changeAttendStatusSlice(student_id));
    if (nextStatus === 'T') {
      console.log('nextStatusInT', nextStatus);
      let additionalFields = {
        att_action: null,
        remarks: remarksTardyCase,
        tardiness: timeInValueTardyCase,
      };
      dispatch(changeAttendStatusSlice({student_id, additionalFields}));
      setModalVisible(true);
    } else if (nextStatus === 'A') {
      console.log('nextStatusInA', nextStatus);
      let additionalFields = {
        att_action: absentSelectedValueAbsentCase,
        remarks: remarksAbsentCase,
        tardiness: null,
      };

      dispatch(changeAttendStatusSlice({student_id, additionalFields}));
      setModalVisibleAbsent(true);
    } else if (nextStatus === 'L') {
      console.log('nextStatusInL', nextStatus);
      let additionalFields = {
        att_action: null,
        remarks: remarksAbsentCase,
        tardiness: null,
      };
      // dispatch(changeAttendStatusSlice(student_id));
      dispatch(changeAttendStatusSlice({student_id, additionalFields}));
      setModalVisibleLeave(true);
    } else if (nextStatus === 'E') {
      console.log('nextStatusInE', nextStatus);
      let additionalFields = {
        att_action: null,
        remarks: remarksExemptedCase,
        tardiness: null,
      };
      // dispatch(changeAttendStatusSlice(student_id));
      dispatch(changeAttendStatusSlice({student_id, additionalFields}));
      setModalVisibleExempted(true);
    } else {
      console.log('nextStatusInElse', nextStatus);
      let additionalFields = {};
      dispatch(changeAttendStatusSlice({student_id, additionalFields}));
      setModalVisible(false);
      setModalVisibleAbsent(false);
      setModalVisibleLeave(false);
      setModalVisibleExempted(false);
    }
  };

  const onPressSaveBtnModalAbsentCase = (
    newStatus,
    absentRadioButtonValues,
    remarks,
  ) => {
    let additionalFields = {};

    console.log('val1', newStatus);
    console.log('val4', absentRadioButtonValues);
    console.log('val3', remarks);

    if (newStatus === 'A') {
      additionalFields = {
        att_action:
          absentRadioButtonValues !== '' && absentRadioButtonValues != undefined
            ? absentRadioButtonValues
            : '3',
        remarks: remarks,
      };
    }

    console.log('additionalFieldsInAbsent', additionalFields);

    dispatch(
      updateSelectedUsersStatus({
        newStatus,
        additionalFields,
      }),
    );

    setAttendanceModal(false);
    dispatch(clearSelectedUsersList());
    dispatch(setSelectAllFalse());
  };

  const onPressSaveBtnModalLeaveCase = (newStatus, remarks) => {
    let additionalFields = {};

    console.log('val1', newStatus);
    console.log('val3', remarks);

    if (newStatus === 'L') {
      additionalFields = {
        att_action: null,
        remarks: remarks == undefined ? '' : remarks,
      };
    }

    console.log('additionalFieldsInLeave', additionalFields);

    dispatch(
      updateSelectedUsersStatus({
        newStatus,
        additionalFields,
      }),
    );

    setAttendanceModal(false);
    dispatch(clearSelectedUsersList());
    dispatch(setSelectAllFalse());
  };

  const onPressSaveBtnModalExemptedCase = (newStatus, remarks) => {
    let additionalFields = {};

    console.log('val1', newStatus);
    console.log('val3', remarks);

    if (newStatus === 'E') {
      additionalFields = {
        att_action: null,
        remarks: remarks == undefined ? '' : remarks,
      };
    }

    console.log('additionalFieldsInExempted', additionalFields);

    dispatch(
      updateSelectedUsersStatus({
        newStatus,
        additionalFields,
      }),
    );

    setAttendanceModal(false);
    dispatch(clearSelectedUsersList());
    dispatch(setSelectAllFalse());
  };

  const onPressShowDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedFromDate = moment(date).format('DD MMM YYYY');
    const fromDateForTotalDays = moment(date).format('DD-MM-YYYY');

    const formattedTraingDateToPostInHanleConfirm =
      moment(date).format('DD/MM/YYYY');

    setForTrainingDate(formattedFromDate);
    setTrainingDate(formattedTraingDateToPostInHanleConfirm);
    setDatePickerVisibility(false);

    dispatch(
      TeacherStudentsListAction({
        values: {
          branch_id: branchId,
          class_id: classId,
          section_id: sectionId,
          att_date: formattedTraingDateToPostInHanleConfirm,
        },
        authKeyParam,
      }),
    );
    dispatch(setSelectAllFalse());
  };

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 90);

  const onPressSave = () => {
    console.log('onPressSave', isAllowAttenUploadHere);
    if (isAllowAttenUploadHere) {
      dispatch(
        UploadStdAttendanceAction({
          values: {
            branch_id: branchId,
            class_id: classId,
            section_id: sectionId,
            acad_year_id: teacherstudentsListAcdYearIdHere,
            att_date: trainingDate,

            students: teacherstudentsListHere.map(item => ({
              student_id: item?.student_id,
              att_status: item?.att_status,
              br_std_id: item?.br_std_id,
              att_action: item?.att_action,
              remarks: item?.remarks,
              tardiness: item?.tardiness,
            })),
          },
          authKeyParam,
        }),
      );
    } else {
      Alert.alert('Failed', 'Please select all the students');
    }
  };

  const getNextStatus = currentStatus => {
    switch (currentStatus) {
      case null:
        return 'PP';
      case 'PP':
        return 'PO';
      case 'PO':
        return 'T';
      case 'T':
        return 'A';
      case 'A':
        return 'L';
      case 'L':
        return 'E';
      case 'E':
        return 'PP';
      default:
        return 'PP';
    }
  };

  const renderItem = ({item, index}) => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: selectedStudentsListHere.some(
            user => user.student_id === item.student_id,
          )
            ? '#6FA4FF1A'
            : '#FFFFFF',
          marginBottom: hp('1.5'),
          borderRadius: wp('4'),
          paddingVertical: hp('0.5'),
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            dispatch(selectUser(item?.student_id));
          }}
          style={{flex: 0.8, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.picture}}
              style={{height: 42, width: 42, borderRadius: wp('50')}}
              resizeMode={'contain'}
            />
          </View>

          {selectedStudentsListHere.some(
            user => user.student_id === item.student_id,
          ) && (
            <View
              style={{
                justifyContent: 'center',
                marginLeft: wp('-5'),
                paddingTop: hp('2'),
              }}>
              <FontAwesomeIcon
                icon={`fas fa-circle-check`}
                size={hp('2.5')}
                style={{color: '#50CD89'}}
              />
            </View>
          )}

          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
              paddingVertical: hp('1.5'),
              flexDirection: 'column',
            }}>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  color: '#201F24',
                  fontFamily: fontFamily.ceraMedium,
                  fontWeight: '500',
                  fontSize: 15,
                }}>
                {item?.std_name}
              </Text>
            </View>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  color: '#66656A',
                  fontFamily: fontFamily.ceraLight,
                  fontWeight: '300',
                  fontSize: 14,
                }}>
                {`Id: ${item?.student_id}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={selectedAllStudentsHere ? true : false}
          // onPress={() => {
          //   dispatch(changeAttendStatusSlice(item?.student_id));
          // }}

          onPress={() => handleButtonPress(item?.student_id, item?.att_status)}
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.5'),
          }}>
          <LinearGradient
            useAngle={true}
            angle={180}
            angleCenter={{x: 0.5, y: 0.5}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              item.att_status === null
                ? ['silver', 'grey']
                : item.att_status === 'PP'
                ? ['#78E2CD', '#1AB394']
                : item.att_status === 'PO'
                ? ['#66E08A', '#259245']
                : item.att_status === 'T'
                ? ['#F1B68F', '#FF6600']
                : item.att_status === 'A'
                ? ['#FF9EA8', '#ED5565']
                : item.att_status === 'L'
                ? ['#FFC88C', '#F8AC59']
                : item.att_status === 'E'
                ? ['#7DBEFF', '#0076EC']
                : ['#666', '#444']
            }
            locations={[0, 1]}
            style={styles.linearGradiantFlatlist}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '500',
                fontSize: 15,
              }}>
              {item?.att_status != null ? item?.att_status : 'PP'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onPressSelectAll = () => {
    const isAllSelected =
      selectedStudentsListHere.length === teacherstudentsListHere.length;
    dispatch(selectAllUsers({selectAll: !isAllSelected}));
  };

  useEffect(() => {
    if (uploadStdAttendanceResponseHere == 0) {
      setShowErrorModal(true);
    } else if (uploadStdAttendanceResponseHere == 1) {
      setShowSuccessModal(true);
    }
  }, [uploadStdAttendanceResponseHere]);

  const closeModal = () => {
    dispatch(clearAllStateTeacherAttendanceUpload());
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const onChangeRekarmsText = val => {
    setRemarksText(val);
  };

  const onPressTimeInModal = () => {
    setTimeInModal(true);
  };

  const handleTimeInConfirm = time => {
    const pakTime = new Date(time);
    setTimeInValue(
      pakTime.toLocaleTimeString('en-PK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    );
    hideTimeInModal();
  };

  const hideTimeInModal = () => {
    setTimeInModal(false);
  };

  const onPressCloseTardyBtn = () => {
    setModalVisible(false);
    setModalVisibleAbsent(false);
    setModalVisibleLeave(false);
    setModalVisibleExempted(false);

    setTimeInValue(null);
    setRemarksText('');

    setTimeInValueTardyCase('');
    setRemarksTardyCase('');
  };

  const onPressCloseAbsentBtn = () => {
    setModalVisible(false);
    setModalVisibleAbsent(false);
    setModalVisibleLeave(false);
    setModalVisibleExempted(false);

    setInformSH(false);
    setTicketPRO(false);
    setNone(true);
    setRemarksText('');

    setRemarksAbsentCase('');
    setAbsentSelectedValueAbsentCase('');
  };

  const onPressCloseLeaveBtn = () => {
    setModalVisible(false);
    setModalVisibleAbsent(false);
    setModalVisibleLeave(false);
    setModalVisibleExempted(false);

    setRemarksText('');
    setRemarksLeaveCase('');
  };

  const onPressCloseExemptedBtn = () => {
    setModalVisible(false);
    setModalVisibleAbsent(false);
    setModalVisibleLeave(false);
    setModalVisibleExempted(false);

    setRemarksText('');
    setRemarksExemptedCase('');
  };

  const onPressInformSH = () => {
    setInformSH(true);
    setTicketPRO(false);
    setNone(false);
    setAbsentRadioButtonValues('1');
  };

  const onPressTicketPRO = () => {
    setInformSH(false);
    setTicketPRO(true);
    setNone(false);
    setAbsentRadioButtonValues('2');
  };
  const onPressNone = () => {
    setInformSH(false);
    setTicketPRO(false);
    setNone(true);
    setAbsentRadioButtonValues('3');
  };

  const onChangeRekarmsTardyCase = val => {
    setRemarksTardyCase(val);
  };
  const onChangeRekarmsAbsent = val => {
    setRemarksAbsentCase(val);
  };
  const onChangeRekarmsLeave = val => {
    setRemarksLeaveCase(val);
  };
  const onChangeRekarmsExempted = val => {
    setRemarksExemptedCase(val);
  };

  return (
    <>
      <MainHeader
        text={`Mark Attendance`}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />
      <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        {teacherstudents && <Loader></Loader>}
        {uploadStdAttendanceIsLoadingHere && <Loader></Loader>}

        <View style={{marginHorizontal: wp('5'), marginTop: hp('1.5')}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('1'),
            }}>
            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#78E2CD', '#1AB394']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'16'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#66E08A', '#259245']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'0'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#F1B68F', '#FF6600']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'19'}
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF9EA8', '#ED5565']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'05'}
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFC88C', '#F8AC59']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.linearGradiantText}>{'06'}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{x: 0.5, y: 0.5}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#7DBEFF', '#0076EC']}
              locations={[0, 1]}
              style={styles.linearGradiantStyle}>
              <View
                style={{
                  height: hp('10'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.linearGradiantText}>
                  {'01'}
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
              <Text style={styles.boxText}>{`PP`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`PO`}</Text>
            </View>

            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`T`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`A`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`L`}</Text>
            </View>
            <View style={styles.boxTextView}>
              <Text style={styles.boxText}>{`E`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('3'),
              marginBottom: hp('1'),
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressShowDatePicker}
              style={{
                flex: 0.465,
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingVertical: hp('2'),
                borderRadius: wp('3'),
              }}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <FontAwesomeIcon
                  icon={`fat fa-calendar-days`}
                  size={hp('2.5')}
                  style={{color: '#000000'}}
                />
              </View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#000000',
                    fontFamily: fontFamily.ceraLight,
                    fontWeight: '300',
                    fontSize: 16,
                  }}>
                  {forTrainingDate}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name={'angles-up-down'}
                  color={'#575757'}
                  size={hp('2')}
                />
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.07}}></View>
            <TouchableOpacity
              disabled={!isAllowAttenUploadHere}
              activeOpacity={0.5}
              onPress={onPressSave}
              style={{
                flex: 0.465,
                flexDirection: 'row',

                backgroundColor: !isAllowAttenUploadHere
                  ? '#d6d6d6'
                  : '#d3fac0',

                flexDirection: 'row',
                paddingVertical: hp('2'),
                borderRadius: wp('3'),
              }}>
              <View
                style={{
                  flex: 0.2,
                }}></View>

              <View
                style={{
                  flex: 0.2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={`fat fa-floppy-disk`}
                  size={hp('2.75')}
                  style={{color: '#000000'}}
                />
              </View>
              <View style={{flex: 0.6}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#000000',
                    fontFamily: fontFamily.ceraLight,
                    fontWeight: '300',
                    fontSize: 16,
                  }}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {teacherstudentsListHere?.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressSelectAll}
              style={{
                flexDirection: 'row',
                backgroundColor: '#E7E7E7',
                marginTop: hp('3'),
                marginBottom: hp('0.5'),
              }}>
              <View
                style={{
                  flex: 0.85,
                  justifyContent: 'center',
                  paddingVertical: hp('1.5'),
                  paddingLeft: wp('3'),
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    color: '#2F2F2F',
                    fontFamily: fontFamily.ceraMedium,
                    fontWeight: '500',
                    fontSize: 13,
                  }}>
                  Select All
                </Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={
                    selectedAllStudentsHere
                      ? 'fas fa-square-check'
                      : 'fat fa-square'
                  }
                  size={hp('3.5')}
                  style={{
                    color: selectedAllStudentsHere ? '#1C37A4' : 'grey',
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          <FlatList
            data={teacherstudentsListHere}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: hp('2')}}
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'black',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                Right now there are no students.
              </Text>
            }
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          // minimumDate={new Date(2024, 9, 1)}
          // minimumDate={new Date()}
          // maximumDate={maxDate}
          maximumDate={new Date()}
        />
      </ScrollView>
      {selectedStudentsListHere.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressMarkAttendance}
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
          <FontAwesomeIcon
            icon={`fas fa-marker`}
            size={hp('2.75')}
            style={{color: 'white'}}
          />
        </TouchableOpacity>
      )}
      {attendanceModal && (
        <MarkAttendanceModal
          modalVisible={attendanceModal}
          onPressOpacity={onPressCloseMarkAttendance}
          textUpper={'textUpper'}
          textLower={'textLower'}
          btnText={'Close'}
          onPressSave={onPressSaveBtnModal}
          onPressSaveTardy={onPressSaveBtnModalTardyCase}
          onPressSaveAbsent={onPressSaveBtnModalAbsentCase}
          onPressSaveLeave={onPressSaveBtnModalLeaveCase}
          onPressSaveExempted={onPressSaveBtnModalExemptedCase}
        />
      )}

      {/* {showErrorModal && (
        <MessageSuccessModal
          textUpper={'Error!'}
          textLower={uploadStdAttendanceResponseMessageHere}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}

      {showSuccessModal && (
        <MessageSuccessModal
          textUpper={'Successfully Uploaded'}
          textLower={uploadStdAttendanceResponseMessageHere}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )} */}

      {showErrorModal && (
        <InspireSuccessModal
          textUpper={'Error!'}
          textLower={uploadStdAttendanceResponseMessageHere}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}

      {showSuccessModal && (
        <InspireSuccessModal
          textUpper={'Successfully Uploaded'}
          textLower={uploadStdAttendanceResponseMessageHere}
          btnText={'OK'}
          onPressOpacity={closeModal}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onPressCloseTardyBtn}>
        <DateTimePickerModal
          isVisible={timeInModal}
          mode="time"
          is24Hour={true}
          display={'clock'}
          onConfirm={handleTimeInConfirm}
          onCancel={hideTimeInModal}
        />

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={{flex: 0.45}}></View>

            <View
              style={{
                flex: 0.55,
                paddingHorizontal: wp('5'),
                backgroundColor: 'white',
                borderTopLeftRadius: wp('5'),
                borderTopRightRadius: wp('5'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('-5'),
                  height: hp('7'),
                  backgroundColor: '#FF6600',
                  borderTopLeftRadius: wp('5'),
                  borderTopRightRadius: wp('5'),
                }}>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    paddingLeft: wp('5'),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    Tardy
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onPressCloseTardyBtn}
                  style={{
                    flex: 0.2,
                    height: hp('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-xmark`}
                    size={hp('3.5')}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: wp(10),
                  shadowColor: '#000',
                  shadowOpacity: 1,
                  shadowRadius: wp('15'),
                  elevation: 10,
                  marginTop: hp('2.5'),
                }}>
                <ViewInput
                  dateText={timeInValue == null ? 'Start Time' : timeInValue}
                  dateFun={onPressTimeInModal}
                  iconName={'fat fa-clock-nine'}
                  placeholder={'Time in'}
                  placeholderColor={colors.loginTextColor}
                  style={styles.textInputCustomStyle}
                />
              </View>

              <View
                style={{
                  marginTop: hp('2.5'),
                  shadowColor: '#000',
                  shadowOpacity: 1,
                  shadowRadius: wp('15'),
                  elevation: 10,
                  borderRadius: wp('4'),
                }}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={6}
                  maxLength={200}
                  value={remarksTardyCase}
                  onChangeText={onChangeRekarmsTardyCase}
                  placeholder="Remarks"
                  placeholderTextColor={'black'}
                  returnKeyType={'done'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: hp('5'),
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressCloseTardyBtn}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#C9C9C9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
                <View style={{flex: 0.4}}></View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    onPressTheSaveTardyBtn(timeInValue, remarksTardyCase)
                  }
                  style={{
                    flex: 0.3,
                    backgroundColor: '#1C37A4',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAbsent}
        onRequestClose={onPressCloseAbsentBtn}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={{flex: 0.45}}></View>

            <View
              style={{
                flex: 0.55,
                paddingHorizontal: wp('5'),
                backgroundColor: 'white',
                borderTopLeftRadius: wp('5'),
                borderTopRightRadius: wp('5'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('-5'),
                  height: hp('7'),
                  backgroundColor: '#ED5565',
                  borderTopLeftRadius: wp('5'),
                  borderTopRightRadius: wp('5'),
                }}>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    paddingLeft: wp('5'),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    Absent
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onPressCloseAbsentBtn}
                  style={{
                    flex: 0.2,
                    height: hp('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-xmark`}
                    size={hp('3.5')}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginTop: hp('2.5')}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressInformSH}
                  style={{
                    flex: 0.35,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={`fas fa-circle-dot`}
                      size={hp('3')}
                      style={{color: informSH ? '#0EAA24' : 'silver'}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: fontFamily.ceraMedium,
                        color: 'black',
                      }}>
                      Inform SH
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressTicketPRO}
                  style={{
                    flex: 0.35,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={`fas fa-circle-dot`}
                      size={hp('3')}
                      style={{color: ticketPRO ? '#0EAA24' : 'silver'}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 0.7,

                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: fontFamily.ceraMedium,
                        color: 'black',
                      }}>
                      Ticket PRO
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressNone}
                  style={{
                    flex: 0.3,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={`fas fa-circle-dot`}
                      size={hp('3')}
                      style={{color: none ? '#0EAA24' : 'silver'}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: fontFamily.ceraMedium,
                        color: 'black',
                      }}>
                      None
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: hp('3')}}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={6}
                  maxLength={200}
                  value={remarksAbsentCase}
                  onChangeText={onChangeRekarmsAbsent}
                  placeholder="Remarks"
                  placeholderTextColor={'black'}
                  returnKeyType={'done'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: hp('4'),
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressCloseAbsentBtn}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#C9C9C9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
                <View style={{flex: 0.4}}></View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  // onPressTheSaveTardyBtn(timeInValue, remarksText)
                  onPress={() =>
                    onPressTheSaveAbsentBtn(
                      absentRadioButtonValues,
                      remarksAbsentCase,
                    )
                  }
                  style={{
                    flex: 0.3,
                    backgroundColor: '#1C37A4',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleLeave}
        onRequestClose={onPressCloseLeaveBtn}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={{flex: 0.55}}></View>

            <View
              style={{
                flex: 0.45,
                paddingHorizontal: wp('5'),
                backgroundColor: 'white',
                borderTopLeftRadius: wp('5'),
                borderTopRightRadius: wp('5'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('-5'),
                  height: hp('7'),
                  backgroundColor: '#F8AC59',
                  borderTopLeftRadius: wp('5'),
                  borderTopRightRadius: wp('5'),
                }}>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    paddingLeft: wp('5'),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    Leave
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onPressCloseLeaveBtn}
                  style={{
                    flex: 0.2,
                    height: hp('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-xmark`}
                    size={hp('3.5')}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginTop: hp('3')}}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={6}
                  maxLength={200}
                  value={remarksLeaveCase}
                  onChangeText={onChangeRekarmsLeave}
                  placeholder="Remarks"
                  placeholderTextColor={'black'}
                  returnKeyType={'done'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: hp('4'),
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressCloseLeaveBtn}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#C9C9C9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
                <View style={{flex: 0.4}}></View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onPressTheSaveLeaveBtn(remarksLeaveCase)}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#1C37A4',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleExempted}
        onRequestClose={onPressCloseExemptedBtn}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={{flex: 0.55}}></View>

            <View
              style={{
                flex: 0.45,
                paddingHorizontal: wp('5'),
                backgroundColor: 'white',
                borderTopLeftRadius: wp('5'),
                borderTopRightRadius: wp('5'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp('-5'),
                  height: hp('7'),
                  backgroundColor: '#0076EC',
                  borderTopLeftRadius: wp('5'),
                  borderTopRightRadius: wp('5'),
                }}>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    paddingLeft: wp('5'),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    Exempted
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onPressCloseExemptedBtn}
                  style={{
                    flex: 0.2,
                    height: hp('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={`fat fa-xmark`}
                    size={hp('3.5')}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginTop: hp('4')}}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={6}
                  maxLength={200}
                  value={remarksExemptedCase}
                  onChangeText={onChangeRekarmsExempted}
                  placeholder="Remarks"
                  placeholderTextColor={'black'}
                  returnKeyType={'done'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: hp('4'),
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressCloseExemptedBtn}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#C9C9C9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
                <View style={{flex: 0.4}}></View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onPressTheSaveExemptedBtn(remarksExemptedCase)}
                  style={{
                    flex: 0.3,
                    backgroundColor: '#1C37A4',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('3'),
                  }}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default MarkAttendance;

const styles = EStyleSheet.create({
  linearGradiantStyle: {
    flex: 0.153,
    justifyContent: 'center',
    height: hp('7'),
    borderRadius: wp('2'),
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  linearGradiantText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
  },
  boxTextView: {
    flex: 0.15,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 15,
    color: '#66656A',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
  },
  linearGradiantFlatlist: {
    flex: 0.153,
    justifyContent: 'center',
    height: hp('4.5'),
    width: wp('12.5'),
    borderRadius: wp('2'),
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    marginTop: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'grey',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('4'),
    textAlignVertical: 'top', // Ensures text starts at the top
    backgroundColor: '#fff',
    color: 'black',
    fontFamily: fontFamily.ceraMedium,
    paddingHorizontal: wp('2'),
  },
  textInputCustomStyle: {
    fontSize: '0.7rem',
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('2'),
    color: '#363636',
    fontWait: '500',
    fontFamily: fontFamily.ceraMedium,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.transparentBlack,
  },
});
