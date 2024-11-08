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

const AddAdditionalStudent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    try {
      //   dispatch(
      //     InspireTrainingsAction({
      //       employee_id: profileHereEmpId,
      //     }),
      //   );
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
        style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        <View style={{marginHorizontal: wp('5'), marginTop: hp('1.5')}}></View>
      </ScrollView>
    </>
  );
};

export default AddAdditionalStudent;

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
    fontSize: 26,
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
    height: hp('4.25'),
    width: wp('12'),
    borderRadius: wp('2'),
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
