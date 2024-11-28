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

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {
  InspireTrainingsAction,
  removeFromTraining,
} from '../../features/Inspire50/InspireTrainingsSlice';

import Icon from 'react-native-fontawesome-pro';
import AttendanceCardTextInput from '../../Components/Headers/AttendanceCardTextInput';

const AddAdditionalStudent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const [stdName, setStdName] = useState('');
  const [stdID, setStdID] = useState('');
  const [autoWithdrawalValue, setAutoWithdrawalValue] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);
  const [isTransfered, setIsTransfered] = useState(false);
  const [isAutoWithdrawal, setIsAutoWithdrawal] = useState(false);

  console.log('stdName', stdName);
  console.log('stdID', stdName);
  console.log('autoWithdrawalValue', autoWithdrawalValue);

  const onChangeStdName = val => {
    setStdName(val);
  };
  const onPressRegisteredRightImg = () => {
    setIsRegistered(!isRegistered);
    setIsTransfered(false);
    setIsAutoWithdrawal(false);

    setStdID('');
    setAutoWithdrawalValue('');
  };

  const onChangeStdID = val => {
    setStdID(val);
  };
  const onPressTransferredRightImg = () => {
    setIsTransfered(!isTransfered);
    setIsRegistered(false);
    setIsAutoWithdrawal(false);

    setStdName('');
    setAutoWithdrawalValue('');
  };

  const onChangeAutowithdrawalValue = val => {
    setAutoWithdrawalValue(val);
  };
  const onPressAutoWithdrawal = () => {
    setIsAutoWithdrawal(!isAutoWithdrawal);
    setIsRegistered(false);
    setIsTransfered(false);

    setStdName('');
    setStdID('');
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    try {
    } catch (error) {}
    setRefreshing(false);
  };

  return (
    <>
      <MainHeader
        text={`Add Additional Student`}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

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
        style={{
          flex: 1,
          backgroundColor: '#F5F8FC',
          paddingHorizontal: wp('5'),
        }}>
        <View style={styles.cardViewStyle}>
          <AttendanceCardTextInput
            leftText={'Not Registered'}
            rightImg={isRegistered ? 'attencheck' : 'circelgrey'}
            isChecked={isRegistered}
            onPressRightImg={onPressRegisteredRightImg}
            placeholder={'Enter Student Name*'}
            placeholderColor={'#363636'}
            value={stdName}
            onChangeText={onChangeStdName}
          />
        </View>

        <View style={styles.cardViewStyle}>
          <AttendanceCardTextInput
            leftText={'Transferred'}
            rightImg={isTransfered ? 'attencheck' : 'circelgrey'}
            isChecked={isTransfered}
            onPressRightImg={onPressTransferredRightImg}
            placeholder={'Student ID*'}
            placeholderColor={'#363636'}
            value={stdID}
            onChangeText={onChangeStdID}
          />
        </View>

        <View style={styles.cardViewStyle}>
          <AttendanceCardTextInput
            leftText={'Auto-withdrawal'}
            rightImg={isAutoWithdrawal ? 'attencheck' : 'circelgrey'}
            isChecked={isAutoWithdrawal}
            onPressRightImg={onPressAutoWithdrawal}
            placeholder={'Auto-withdrawal'}
            placeholderColor={'#363636'}
            value={autoWithdrawalValue}
            onChangeText={onChangeAutowithdrawalValue}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AddAdditionalStudent;

const styles = EStyleSheet.create({
  cardViewStyle: {
    marginTop: hp('2'),
    backgroundColor: 'white',
    paddingHorizontal: wp('3'),
    paddingTop: hp('2'),
    paddingBottom: hp('1'),
    borderRadius: wp('5'),
  },
});
