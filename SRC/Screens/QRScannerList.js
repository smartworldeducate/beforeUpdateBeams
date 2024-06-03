import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {QRScannerListAction} from '../features/QRScannerListSlice/QRScannerListSlice';
import {useFocusEffect} from '@react-navigation/native';

const QRScannerList = props => {
  const dispatch = useDispatch();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  const QRScannerListHere = useSelector(state => state.QRScannerListStore);
  //   console.log('QRScannerListHere', QRScannerListHere?.userData);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);

        dispatch(
          QRScannerListAction({
            employee_id: parsedLoginData,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: hp('1'),
          borderRadius: wp('2'),
          marginHorizontal: wp('1'),

          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          paddingVertical: hp('1.5'),
        }}>
        <View
          style={{
            flex: 0.24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('0.25'),
          }}>
          <Image
            source={{uri: item?.QR_CODE}}
            style={{
              height: hp('8'),
              width: wp('16'),

              borderColor: 'black',
              borderWidth: wp('0.3'),
            }}
            resizeMode={'cover'}
          />
        </View>
        <View
          style={{
            flex: 0.61,
            flexDirection: 'column',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: hp('2'),
                fontFamily: fontFamily.ceraBold,
                color: '#363636',
              }}>
              {item?.TAG_TITLE}
            </Text>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontSize: hp('1.5'),
                fontFamily: fontFamily.ceraLight,
                color: '#363636',
              }}>
              {`${item?.TAG_START_DATE_TIME}  |  ${item?.TAG_END_DATE_TIME}`}
            </Text>
          </View>

          <View style={{marginTop: hp('1')}}>
            {item?.SCAN_TIME_IN != null && item?.SCAN_TIME_OUT != null ? (
              <Text
                style={{
                  fontSize: hp('1.5'),
                  fontFamily: fontFamily.ceraMedium,
                  color: '#363636',
                }}>
                {`IN: `}
                <Text style={{fontFamily: fontFamily.ceraLight}}>
                  {item?.SCAN_TIME_IN}
                </Text>
                <Text style={{}}>{`  |  OUT: `}</Text>
                <Text style={{fontFamily: fontFamily.ceraLight}}>
                  {item?.SCAN_TIME_OUT}
                </Text>
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon
            icon="fat fa-check-double"
            size={hp(3)}
            style={{color: '#41CE68'}}
          />
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      QRScannerListAction({
        employee_id: JSON.parse(profileHereEmpId),
      }),
    );
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('outside return');
      dispatch(
        QRScannerListAction({
          employee_id: JSON.parse(profileHereEmpId),
        }),
      );

      return () => {
        console.log('QR Scanner list Page is unfocused');
        dispatch(
          QRScannerListAction({
            employee_id: JSON.parse(profileHereEmpId),
          }),
        );
      };
    }, []),
  );

  return (
    <>
      <View>
        <MainHeader
          text={'QR Scanner List'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {QRScannerListHere?.isLoading && <Loader></Loader>}

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2A72B6', '#203B88']}
            progressBackgroundColor={'#fcfcfc'}
            tintColor={'#1C37A4'}
          />
        }>
        <View style={{marginVertical: hp('3'), marginHorizontal: wp('4')}}>
          <View
            style={{
              marginVertical: hp('2'),
            }}>
            <FlatList
              data={QRScannerListHere?.userData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <Text
                  style={{
                    fontSize: hp('1.75'),
                    color: 'black',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}>
                  No QR codes have been scanned yet.
                </Text>
              }
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = EStyleSheet.create({});

export default QRScannerList;
