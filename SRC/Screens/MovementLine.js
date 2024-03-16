import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../Components/Headers/MainHeader';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';

import EmpCardPart from '../Components/EmpCardPart/EmpCardPart';

const MovementLine = props => {
  const profileHere = useSelector(state => state.profileStore);
  console.log('profileHere', profileHere);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: hp('1.75'),
          marginHorizontal: wp('5'),
          paddingTop: hp('0.2'),
          height: hp('17'),
        }}>
        <View
          style={{
            flex: 0.08,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>🔵</Text>
          </View>
          <View
            style={{
              flex: 0.1,
            }}></View>
          <View
            style={{
              backgroundColor: '#1C37A4',
              flex: 0.8,
              width: wp('1'),
              borderRadius: wp('1'),
            }}>
            <Text style={{color: 'black'}}></Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.03,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <View
          style={{
            flex: 0.89,
            flexDirection: 'column',
            paddingHorizontal: wp('3'),
            backgroundColor: 'white',
            borderRadius: wp('3'),
            paddingVertical: hp('0.5'),
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1'),
            }}>
            <View
              style={{
                flex: 0.35,
                justifyContent: 'center',
              }}>
              <Text style={styles.cardText}>{item?.SINCE}</Text>
            </View>
            <View
              style={{
                flex: 0.65,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.cardText,
                  {
                    backgroundColor: item?.BACKGROUND_COLOR,
                    paddingVertical: hp('0.75'),
                    paddingHorizontal: wp('4'),
                    borderRadius: wp('5'),
                    color: item?.COLOR,
                  },
                ]}>
                {item?.MOMENT_TYPE}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: hp('1.25'),
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                styles.textDesc,
                {fontSize: hp('1.5'), fontFamily: fontFamily.ceraBold},
              ]}>
              {item?.DESIGNATION}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                styles.textDesc,
                {fontSize: hp('1.4'), fontFamily: fontFamily.ceraMedium},
              ]}>
              {item?.BR_NAME}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.textDesc]}>
              {`${item?.SINCE} | ${item?.DURATION} Year`}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.textDesc}>
              {`${item?.SALARY} Rs`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View>
        <MainHeader
          text={'Movement Log'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View style={{marginVertical: hp('3')}}>
          <View style={{marginHorizontal: wp('5')}}>
            <EmpCardPart
              firstText={'STATUS'}
              statusValue={
                profileHere?.userData?.emp_result?.EMP_STATUS_DESCRIPTION
              }
              secondText={'SERVICE'}
              serviceLengthValue={
                profileHere?.userData?.emp_result?.SERVICE_LENGTH
              }
              thirdText={'AGE'}
              ageValue={profileHere?.userData?.emp_result?.TOTAL_AGE}
            />
          </View>

          <View
            style={{
              marginTop: hp('2'),
              marginBottom: hp('1'),
              paddingTop: hp('0.5'),
            }}>
            <FlatList
              data={profileHere?.userData?.movement_log_result}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MovementLine;

const styles = EStyleSheet.create({
  cardText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.57rem',
    fontWeight: '700',
  },

  textDesc: {
    color: '#353535',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    fontSize: '0.58rem',
    // textAlign: 'justify',
    letterSpacing: 0.5,
  },
});
