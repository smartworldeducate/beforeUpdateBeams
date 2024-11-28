import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState, useCallback} from 'react';

import MonthPicker from 'react-native-month-year-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EStyleSheet from 'react-native-extended-stylesheet';

import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Loader from '../../Components/Loader/Loader';

const MarkAttendacePopScreen = ({route, ...props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    try {
    } catch (error) {}
    setRefreshing(false);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>kkkk</Text>
      </View>
    </>
  );
};

export default MarkAttendacePopScreen;

const styles = EStyleSheet.create({});
