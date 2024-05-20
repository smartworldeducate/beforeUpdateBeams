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

const Objectives = ({}) => {
  const dispatch = useDispatch();

  const yourRef = useRef(null);
  const objectiveYearsHere = useSelector(state => state.objectiveYearsStore);

  const objectivesHere = useSelector(state => state.objectivesStore);
  console.log('objectivesHere', objectivesHere?.userData);

  const userBranchId = useSelector(
    state => state.profileStore?.userData?.profile_result?.BRANCH_ID,
  );
  // console.log('userBranchId', userBranchId);

  const lastYearIndex =
    objectiveYearsHere?.userData?.apprasal_years?.length - 1;
  // console.log('lastYearIndex', lastYearIndex);

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
            ObjectivesAction({
              employee_id: parsedLoginData,
              fin_year_id: parseInt(lastYear?.FIN_YEAR_ID),
              branch_id: userBranchId,
            }),
          );
        }
      })
      .catch(error => {
        console.error('Error retrieving loginData from AsyncStorage:', error);
      });
  }, [dispatch]);

  // const renderItemYears = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.7}
  //       onPress={() => onPressYear({item, index})}
  //       style={{}}>
  //       <View
  //         style={{
  //           marginHorizontal: wp('1'),
  //           paddingHorizontal: wp('4'),
  //           paddingVertical: hp('1'),
  //           borderRadius: wp('8'),
  //           backgroundColor: '#1C37A4',
  //         }}>
  //         <Text
  //           style={{
  //             fontSize: hp('1.35'),
  //             fontFamily: fontFamily.ceraMedium,
  //             color: 'white',
  //             fontWeight: '500',
  //           }}>
  //           {item.YEAR}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const onPressYear = ({item, index}) => {
    console.log('itemAndIndex', item);
    AsyncStorage.getItem('loginData').then(loginData => {
      const parsedLoginData = JSON.parse(loginData);
      console.log('parsedLoginData', parsedLoginData);
      dispatch(
        ObjectivesAction({
          employee_id: parsedLoginData,
          fin_year_id: item?.FIN_YEAR_ID,
          branch_id: userBranchId,
        }),
      );
    });
  };

  const type1Data = objectivesHere?.userData?.filter(
    item => item?.TARGET === '1',
  );
  const type2Data = objectivesHere?.userData?.filter(
    item => item?.TARGET === '2',
  );

  const renderItemObjectives = ({item, index}) => {
    console.log('item', item);
    return (
      <View style={{marginHorizontal: wp('3')}}>
        <View style={{}}>
          <Text style={styles.descText}>{item?.OBJECTIVE_DESC}</Text>
          <Text style={styles.dateText}>{item?.EXPC_CMPL_DATE}</Text>
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
      {objectivesHere.isLoading && <Loader />}

      {/* <View style={{marginVertical: hp('2')}}>
        <FlatList
          data={objectiveYearsHere?.userData?.apprasal_years}
          renderItem={renderItemYears}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
          onLayout={() => yourRef.current.scrollToEnd()}
        />
      </View> */}

      <View style={{marginTop: hp('3'), marginBottom: hp('1')}}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            height: hp('5'),
            justifyContent: 'center',
            paddingHorizontal: wp('3'),
            marginBottom: hp('1'),
          }}>
          <Text style={styles.descriptionText}>
            Administrative Line Manager Objectives
          </Text>
        </View>
        <FlatList
          data={type1Data}
          renderItem={renderItemObjectives}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.noDataText}>
              There are no Administrative Line Manager Objectives.
            </Text>
          }
        />
      </View>

      <View style={{marginBottom: hp('1')}}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            height: hp('5'),
            justifyContent: 'center',
            paddingHorizontal: wp('3'),
            marginBottom: hp('1'),
          }}>
          <Text style={styles.descriptionText}>
            Functional Line Manager Objectives
          </Text>
        </View>
        <FlatList
          data={type2Data}
          renderItem={renderItemObjectives}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.noDataText}>
              There are no Functional Line Manager Objectives.
            </Text>
          }
        />
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
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
    textAlign: 'center',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('0.5'),
  },
});

export default Objectives;
