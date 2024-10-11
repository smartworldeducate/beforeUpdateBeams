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

import React, {useEffect, useState} from 'react';
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
import {InspireSignupHTMLAction} from '../../features/Inspire50/InspireSignUpHTMLSlice';

const ChallengeSignUp = props => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const inspireSignupHTMLHere = useSelector(state => state.InspireSignupStore);
  console.log('inspireSignupHTMLHere', inspireSignupHTMLHere);

  useEffect(() => {
    dispatch(
      InspireSignupHTMLAction({
        employeeId: profileHereEmpId,
      }),
    );
  }, []);

  const data = [
    {id: 1, stepTitle: 'Conduct 10 hours of training.'},

    {
      id: 2,
      stepTitle:
        'The training can be completed at a single school or spread across multiple schools, all being non-BSS entities.',
    },

    {
      id: 3,
      stepTitle:
        'Trainings may vary in duration, adding up to the desired total, i.e., 10 hours.',
    },

    {
      id: 4,
      stepTitle:
        ' Training Tracker Dashboard will reflect your training count. Keep adding evidence to the PD Entry on your C50 challenge card.',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.1,

            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: hp('2.25'),
              color: '#2C3A4B',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '500',
              lineHeight: hp('2.65'),
            }}>
            {item?.id}
          </Text>
        </View>
        <View style={{flex: 0.9}}>
          <Text
            style={{
              fontSize: hp('1.95'),
              color: '#2C3A4B',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '400',
              lineHeight: hp('2.65'),
              letterSpacing: 0.35,
            }}>
            {item?.stepTitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <MainHeader
        text={'I50 (Inspire 50)'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <ScrollView style={{flex: 1, backgroundColor: '#F5F8FC'}}>
        <View style={{marginHorizontal: wp('6'), marginTop: hp('4')}}>
          <View style={{marginBottom: hp('2.5')}}>
            <Text
              style={{
                fontSize: hp('2.5'),
                color: '#2C3A4B',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
              }}>
              Goal
            </Text>
            <Text
              style={{
                paddingTop: hp('1'),
                fontSize: hp('1.95'),
                color: '#394452',
                fontFamily: fontFamily.ceraLight,
                fontWeight: '400',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>{`CSR Project - 50th Anniversary Challenge Education for All - Beyond Beaconhouse`}</Text>
          </View>

          {/* <View style={{marginBottom: hp('2.5')}}>
            <Text
              style={{
                fontSize: hp('2.5'),
                color: '#2C3A4B',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
              }}>
              Intent
            </Text>
            <Text
              style={{
                paddingTop: hp('1'),
                fontSize: hp('1.95'),
                color: '#394452',
                fontFamily: fontFamily.ceraLight,
                fontWeight: '400',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>{`A national-level teacher training programme for non-Beaconhouse schools to impact student learning positively`}</Text>
          </View>

          <View style={{marginBottom: hp('2.5')}}>
            <Text
              style={{
                fontSize: hp('2.5'),
                color: '#2C3A4B',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
              }}>
              Steps
            </Text>

            <View style={{marginTop: hp('1')}}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          <View style={{marginBottom: hp('2.5')}}>
            <Text
              style={{
                fontSize: hp('2.5'),
                color: '#2C3A4B',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
              }}>
              Important
            </Text>
            <Text
              style={{
                paddingTop: hp('1'),
                fontSize: hp('1.95'),
                color: '#394452',
                fontFamily: fontFamily.ceraLight,
                fontWeight: '400',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>{`Larger the teacher audience, bigger the student impact!`}</Text>
          </View>

          <View style={{marginBottom: hp('2.5')}}>
            <Text
              style={{
                fontSize: hp('2.5'),
                color: '#2C3A4B',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
              }}>
              Challenge Completion Deadline
            </Text>
            <Text
              style={{
                paddingTop: hp('1'),
                fontSize: hp('2.35'),
                color: '#686868',
                fontFamily: fontFamily.ceraMedium,
                fontWeight: '600',
                lineHeight: hp('2.5'),
                letterSpacing: 0.35,
              }}>{`15 Sep, 2024`}</Text>
          </View>

              */}

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ChallengeFormList')}
            style={{
              height: hp('6'),
              backgroundColor: '#1C37A4',
              borderRadius: wp('50'),
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp('1.5'),
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
              SIGN UP
            </Text>
          </TouchableOpacity>

          {/* <RenderHtml
            contentWidth={width}
            source={{
              html:
                messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING || '<p></p>',
            }}
            tagsStyles={tagsStyles}
            ignoredDomTags={["wb'<", 'customTag', 'center']}
          /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default ChallengeSignUp;

const styles = EStyleSheet.create({});
