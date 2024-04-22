import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import colors from '../Styles/colors';
import {
  clearViewAllFavouriteMessagesState,
  favouriteMessagesAction,
  removeFromFavouriteSlice,
} from '../features/MessagesSlice/FavouriteMessageSlice/FavouriteMessageSlice';
import MainHeader from '../Components/Headers/MainHeader';
import Loader from '../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeFromFavourite} from '../features/MessagesSlice/MessagesSlice';
import {addToFavouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/AddToFavouriteMessageSlice';

const FavouriteMessages = props => {
  const [valuePageOffset, setValuePageOffset] = useState(1);
  console.log('valuePageOffset', valuePageOffset);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const favouriteMessagesHere = useSelector(
    state => state.favouriteMessageStore,
  );

  const favouriteAllMessagesHere = useSelector(
    state => state.favouriteMessageStore.userData,
  );

  const favMessagesDataLengthHere = useSelector(
    state => state.favouriteMessageStore?.dataLength,
  );

  console.log('favMessagesDataLengthHere', favMessagesDataLengthHere);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        // const parsedLoginData = JSON.parse(loginData);
        dispatch(clearViewAllFavouriteMessagesState());
        dispatch(
          favouriteMessagesAction({
            employeeId: loginData,
            ofset: valuePageOffset,
            limit: 50,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View style={{}}>
          <View
            activeOpacity={0.8}
            style={{
              height: hp('8'),
              flexDirection: 'row',
              // backgroundColor: 'red',
              marginBottom: hp('1'),
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() =>
              //   navigation.navigate('ViewMessageDetail', {messagedata: item})
              // }

              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'orange',
              }}>
              <Image
                source={{uri: item?.EMP_PHOTO}}
                style={{
                  height: hp('5.75'),
                  width: wp('11.5'),
                  borderRadius: wp(50),
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ViewMessageDetail', {messagedata: item})
              }
              style={{
                flex: 0.6,
                // paddingVertical: hp('0.35'),
                paddingLeft: wp('2.5'),
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {item?.EMP_NAME}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={styles.msgSubject}>
                {item?.MSG_SUBJECT}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{}}>
                <Text
                  numberOfLines={1}
                  letterSpacing={'tail'}
                  style={styles.messageCardDate}>
                  {item?.ENTRY_DATE}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onPressStar({item})}
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: wp('15'),
                  height: hp('4.5'),
                }}>
                <Icon
                  type="solid"
                  name={'star'}
                  size={hp(2.5)}
                  color="#1C37A4"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    },
    [favouriteMessagesHere],
  );

  const keyExtractor = useCallback((item, index) => index.toString());

  const onPressStar = ({item}) => {
    console.log('onPressStar', item);

    dispatch(
      addToFavouriteMessagesAction({
        employee_id: profileHereEmpId,
        messageId: item?.MSG_ID,
        star_status: 'N',
      }),
    );
    dispatch(removeFromFavouriteSlice(item?.MSG_ID));
  };

  const loadMoreData = () => {
    setValuePageOffset(valuePageOffset + 1);
    dispatch(
      favouriteMessagesAction({
        employeeId: profileHereEmpId,
        ofset: valuePageOffset,
        limit: 15,
      }),
    );
  };

  console.log('valuePageOffset', valuePageOffset);

  const renderFooter = useCallback(() => {
    console.log('renderFooter');
    return (
      <>
        {/* {messagesAllStateHere?.isLoading && ( */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: hp('1'),
          }}>
          <View
            style={{
              width: wp(15),
              height: hp(7.5),
              backgroundColor: '#e4e8ed',
              borderRadius: hp(50),
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: hp(15),
              marginBottom: hp('6'),
            }}>
            <View style={{}}>
              <ActivityIndicator size={'small'} color={'#1C37A4'} />
            </View>
          </View>
        </View>
        {/* )} */}
      </>
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setValuePageOffset(1);

      return () => {
        console.log('Page is unfocused');
        // dispatch(clearViewAllMessagesState());
      };
    }, []),
  );

  return (
    <>
      {/* {favouriteMessagesHere?.isLoading && <Loader></Loader>} */}
      <View>
        <MainHeader
          text={'Favourite'}
          iconName={'arrow-left'}
          onpressBtn={() => navigation.navigate('HomeScreen')}
        />
      </View>

      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      <FlatList
        data={favouriteAllMessagesHere}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={{
          paddingTop: hp('3'),
          marginHorizontal: wp('5'),
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: hp('2'),
              color: 'black',
              fontFamily: fontFamily.ceraMedium,
              textAlign: 'center',
            }}>
            You have no favourite message.
          </Text>
        }
        showsVerticalScrollIndicator={true}
        // onEndReached={favMessagesDataLengthHere >= 15 ? loadMoreData : null}
        // ListFooterComponent={
        //   favMessagesDataLengthHere >= 15 ? renderFooter : null
        // }
        // enableEmptySections={true}
        // onEndReached={loadMoreData}
        // onEndReachedThreshold={0.5}
        // ListFooterComponent={renderFooter}
      />
      {/* </ScrollView> */}
    </>
  );
};

export default FavouriteMessages;

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp('20'),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
  },
  headerText: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    letterSpacing: 0.35,
  },

  plaseholderStyle: {
    color: 'silver',
    fontSize: '0.65rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
  },

  textInputCustomStyle: {
    height: hp('6'),
    letterSpacing: -0.05,
    color: '#292D32',
    fontSize: '0.7rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    paddingLeft: wp('2'),
  },
  searchicon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e8ed',
  },

  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.66rem',
  },
  msgSubject: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '300',
    fontSize: '0.57rem',
    letterSpacing: 0.15,
  },
  messageCardDate: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});
