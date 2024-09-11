import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import {UtilityAction} from '../features/UtilitySlice/UtilitySlice';
import Ficon from 'react-native-fontawesome-pro';
import {UtilityMiscLogAction} from '../features/UtilitySlice/UtilityMiscLog';
import Loader from '../Components/Loader/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Utility = props => {
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const utilityLoadingHere = useSelector(state => state.utilityStore);

  const utilityHere = useSelector(state => state.utilityStore?.userData);
  console.log('utilityHere>>>', utilityHere);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    try {
      dispatch(UtilityAction());
    } catch (error) {
      console.error('Error during useEffect run:', error);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      dispatch(UtilityAction());
    } catch (error) {
      console.error('Error in catch refresh control:', error);
    }
    setRefreshing(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(
            UtilityMiscLogAction({
              employee_id: JSON.parse(profileHereEmpId),
              utility_id: item?.utility_id,
            }),
          );
          Linking.openURL(item?.utility_url);
        }}
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('1'),
          marginVertical: hp('1'),
          justifyContent: 'center',
          borderRadius: wp('2'),

          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
        }}>
        <View style={{flex: 0.85, marginHorizontal: wp('1')}}>
          <View style={{paddingTop: hp('2'), paddingHorizontal: wp('2')}}>
            <Text style={styles.textTitleStyle}>{item?.utility_title}</Text>
          </View>

          <View
            style={{
              paddingTop: hp('0.5'),
              paddingBottom: hp('1.5'),
              paddingHorizontal: wp('2'),
            }}>
            <Text style={styles.textDescStyle}>{item?.utility_desc}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon
            icon="fat fa-arrow-down-right"
            size={hp('2.85')}
            style={{color: '#1C37A4'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MainHeader
        text={'Miscellaneous'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      {utilityLoadingHere?.isLoading && <Loader></Loader>}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backfaceVisibility: colors.appBackGroundColor,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2A72B6', '#203B88']}
            progressBackgroundColor={'#fcfcfc'}
            tintColor={'#1C37A4'}
          />
        }>
        <View
          style={{
            marginHorizontal: wp('5.5'),
            marginTop: utilityHere?.length > 0 ? hp('4') : hp('1'),
            marginBottom: hp('1'),
          }}>
          {utilityHere && utilityHere?.length > 0 ? (
            <FlatList
              data={utilityHere}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{}}>
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'black',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                There are no miscellaneous items to show.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  textTitleStyle: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.66rem',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  textDescStyle: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontSize: '0.63rem',
    fontWeight: '300',
    letterSpacing: 0.25,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemId: {
    fontSize: 18,
    marginRight: 10,
    color: 'black',
  },
  itemName: {
    fontSize: 18,
    color: 'grey',
  },
});
export default Utility;
