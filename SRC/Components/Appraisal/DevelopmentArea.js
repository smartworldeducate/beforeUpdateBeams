import React, {useRef, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ObjectivesAction} from '../../features/ObjectivesSlice/ObjectivesSlice';
import Loader from '../Loader/Loader';
import colors from '../../Styles/colors';
import {developmentAreaAction} from '../../features/AppraisalYearsSlice/DevelopmentAreaSlice';

const DevelopmentArea = ({}) => {
  const dispatch = useDispatch();

  const objectiveYearsHere = useSelector(state => state.objectiveYearsStore);

  const developmentAreaHere = useSelector(state => state.developmentAreaStore);

  const developmentAreaQuestionHere = useSelector(
    state => state.developmentAreaStore?.questionData,
  );

  const lastYearIndex =
    objectiveYearsHere?.userData?.apprasal_years?.length - 1;

  const lastYear =
    objectiveYearsHere?.userData?.apprasal_years &&
    objectiveYearsHere?.userData?.apprasal_years[lastYearIndex];

  console.log('lastYear', lastYear);

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(loginData => {
        const parsedLoginData = JSON.parse(loginData);

        if (lastYear) {
          dispatch(
            developmentAreaAction({
              employee_id: parsedLoginData,
              fin_year_id: parseInt(lastYear?.FIN_YEAR_ID),
            }),
          );
        }
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
  }, [dispatch]);

  const type1Data = developmentAreaHere?.userData?.filter(
    item => item?.DEV_AREA_TYPE === '1',
  );
  const type2Data = developmentAreaHere?.userData?.filter(
    item => item?.DEV_AREA_TYPE === '2',
  );

  const renderItemQuestion = ({item, index}) => {
    return (
      <View style={{}}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            height: hp('5'),
            paddingHorizontal: wp('2'),
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={styles.questionText}>
            {item?.QUESTION}
          </Text>
        </View>
        <View style={{paddingVertical: hp('0.5')}}>
          <Text style={styles.answerText}>{item?.CARR_LEVEL}</Text>
        </View>
      </View>
    );
  };

  const renderItemSoftSkills = ({item, index}) => {
    return (
      <View style={{marginHorizontal: wp('3')}}>
        <View style={{}}>
          <Text style={styles.descText}>{item?.DEV_AREA_DESC}</Text>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: '#DBDBDB',
            marginVertical: hp(1),
            width: wp('90'),
          }}></View>
      </View>
    );
  };

  const renderItemTechnicalSkills = ({item, index}) => {
    return (
      <View style={{marginHorizontal: wp('3')}}>
        <View style={{}}>
          <Text style={styles.descText}>{item?.DEV_AREA_DESC}</Text>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: '#DBDBDB',
            marginVertical: hp(1),
            width: wp('90'),
          }}></View>
      </View>
    );
  };

  return (
    <>
      {developmentAreaHere.isLoading && <Loader />}
      <View
        style={{
          marginTop: hp('3'),
          marginBottom: hp('1'),
        }}>
        <FlatList
          data={developmentAreaQuestionHere}
          renderItem={renderItemQuestion}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View
        style={{
          backgroundColor: '#E7E7E7',
          height: hp('5'),
          paddingHorizontal: wp('2'),
          justifyContent: 'center',
        }}>
        <Text style={styles.questionText}>{'DEVELOPMENT AREAS'}</Text>
      </View>

      <View
        style={{
          marginVertical: hp('1.5'),
          paddingHorizontal: wp('2'),
          justifyContent: 'center',
        }}>
        <Text style={styles.softSkillText}>{'Soft Skills'}</Text>
      </View>

      <FlatList
        data={type1Data}
        renderItem={renderItemSoftSkills}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            There are no Soft skills Objectives.
          </Text>
        }
      />

      <View
        style={{
          marginVertical: hp('1.5'),
          paddingHorizontal: wp('2'),
          justifyContent: 'center',
        }}>
        <Text style={styles.softSkillText}>{'Technical Skills'}</Text>
      </View>

      <FlatList
        data={type2Data}
        renderItem={renderItemTechnicalSkills}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            There are no technical Objectives.
          </Text>
        }
      />
    </>
  );
};

const styles = EStyleSheet.create({
  questionText: {
    color: '#343434',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.58rem',
  },
  answerText: {
    color: '#343434',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    fontSize: '0.6rem',
  },
  softSkillText: {
    color: 'black',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '300',
    fontSize: '0.58rem',
  },
  descriptionText: {
    color: '#343434',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.55rem',
  },
  descText: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    fontSize: '0.6rem',
    letterSpacing: 0.5,
  },
  dateText: {
    color: '#969696',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.5rem',
    letterSpacing: 0.35,
    marginTop: hp('0.5'),
  },
  noDataText: {
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraLight,
    color: colors.drakGrey,
    fontWeight: '300',
    letterSpacing: 1,
    textAlign: 'left',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('0.5'),
  },
});

export default DevelopmentArea;
