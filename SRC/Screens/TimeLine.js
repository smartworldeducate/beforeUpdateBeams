import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Check from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import fontSize from '../Styles/fontSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import EmpCardPart from '../Components/EmpCardPart/EmpCardPart';
import {TimelineAction} from '../features/TimeLineSlice/TimeLineSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHTML from 'react-native-render-html';
import Loader from '../Components/Loader/Loader';

const TimeLine = props => {
  const dispatch = useDispatch();
  const profileHere = useSelector(state => state.profileStore);
  const timeLineHere = useSelector(state => state.timeLineStore);
  console.log('timeLineHere>', timeLineHere?.userData);

  const {width} = useWindowDimensions();

  useEffect(() => {
    // console.log('TimeLine');
    AsyncStorage.getItem('loginData')
      .then(loginData => {
        console.log('loginData', loginData);
        const parsedLoginData = JSON.parse(loginData);
        console.log('parsedLoginData', parsedLoginData);

        console.log('insideUseEffect');
        dispatch(TimelineAction({employee_id: parsedLoginData}));
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
  }, [dispatch]);
  const circleColor = 'red';
  const renderItem = ({item, index}) => {
    // console.log('item', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: hp('1.75'),
          marginHorizontal: wp('5'),
          paddingTop: hp('0.2'),
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
              // backgroundColor: '#1C37A4',
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              // width: wp('5'),
              // height: hp('1'),
              // borderRadius: wp('5'),
            }}>
            <Icon type="solid" name="circle" size={hp(2.25)} color="#1C37A4" />
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
              <Text style={styles.cardText}>{item?.TIMELINE_DATE}</Text>
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
                    fontSize: hp('1.4'),
                  },
                ]}>
                {item?.TIMELINE_TYPE}
              </Text>
            </View>
          </View>
          <View
            style={
              {
                // marginVertical: hp('1.25'),
                // backgroundColor: 'red',
              }
            }>
            {/* <Text style={styles.textDesc}>
              Hired as a{' '}
              <Text style={{color: item?.COLOR}}>{item?.DESIGNATION}</Text> in{' '}
              <Text style={{color: item?.COLOR}}>{item?.DEPT_NAME}</Text>
            </Text> */}

            <RenderHTML
              contentWidth={width}
              source={{html: item?.MESSAGE}}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View>
        <MainHeader
          text={'Timeline'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {timeLineHere?.isLoading && <Loader></Loader>}

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
              data={timeLineHere?.userData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = EStyleSheet.create({
  cardText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.59rem',
    fontWeight: '700',
  },

  textDesc: {
    color: '#353535',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    fontSize: '0.58rem',
    textAlign: 'justify',
  },
});
const tagsStyles = {
  p: {
    fontSize: hp('1.6'),
    color: '#353535',
    letterSpacing: 0.75,
  },
};

export default TimeLine;
