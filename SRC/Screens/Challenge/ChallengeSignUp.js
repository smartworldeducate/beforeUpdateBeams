import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import Ficon from 'react-native-fontawesome-pro';

import React, {useEffect, useState, useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect, useNavigation} from '@react-navigation/native';

import EStyleSheet from 'react-native-extended-stylesheet';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-fontawesome-pro';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../Components/Headers/MainHeader';
import fontFamily from '../../Styles/fontFamily';
import {
  changesSignupStatus,
  InspireSignupHTMLAction,
} from '../../features/Inspire50/InspireSignUpHTMLSlice';
import {InspireSignupContinueAction} from '../../features/Inspire50/InspireSignupContinueSlice';
import Loader from '../../Components/Loader/Loader';

const ChallengeSignUp = props => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const inspireSignupHTMLHere = useSelector(state => state.InspireSignupStore);

  useFocusEffect(
    useCallback(() => {
      dispatch(InspireSignupHTMLAction({employee_id: profileHereEmpId}));
    }, [dispatch]),
  );

  const onPressSignup = () => {
    dispatch(
      InspireSignupContinueAction({
        employee_id: profileHereEmpId,
      }),
    );
    // dispatch(changesSignupStatus());
    navigation.navigate('ChallengeFormList');
  };

  return (
    <>
      <MainHeader
        text={'I50 (Inspire 50)'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      {inspireSignupHTMLHere?.isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
            <View style={{marginHorizontal: wp('6'), marginTop: hp('4')}}>
              <View style={{marginBottom: hp('2.5'), flex: 1}}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html:
                      inspireSignupHTMLHere?.userData?.description || '<p></p>',
                  }}
                  tagsStyles={tagsStyles}
                  // ignoredDomTags={["wb'<", 'customTag', 'center']}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressSignup}
            style={{
              height: hp('6'),
              backgroundColor: '#1C37A4',
              borderRadius: wp('50'),
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp('2'),
              marginHorizontal: wp('6'),
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
              {inspireSignupHTMLHere?.userData?.signup_status == 1
                ? 'Register'
                : 'SIGN UP'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default ChallengeSignUp;

const styles = EStyleSheet.create({});

const tagsStyles = {
  body: {
    fontSize: hp('1.65'),
    color: '#343434',
    letterSpacing: 0.65,
    fontFamily: fontFamily.ceraLight,
    whiteSpace: 'normal',

    padding: 0,
    margin: 0,
  },
};
