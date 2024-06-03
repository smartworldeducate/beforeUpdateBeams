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
  textColr,
} from '../features/MessagesSlice/FavouriteMessageSlice/FavouriteMessageSlice';
import MainHeader from '../Components/Headers/MainHeader';
import Loader from '../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeFromFavourite} from '../features/MessagesSlice/MessagesSlice';
import {addToFavouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/AddToFavouriteMessageSlice';
import ViewMessageDetailModal from '../Components/Modal/ViewMessageDetailModal';
import {messageReadAction} from '../features/MessagesSlice/MessageLikeSlice';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {messageStatusLikeAction} from '../features/MessagesSlice/MessageStatusLike';

const FavouriteMessages = props => {
  const [valuePageOffset, setValuePageOffset] = useState(1);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const favouriteMessagesHere = useSelector(
    state => state.favouriteMessageStore,
  );

  const favouriteAllMessagesHere = useSelector(
    state => state.favouriteMessageStore.userDataViewAll,
  );

  const favMessagesDataLengthHere = useSelector(
    state => state.favouriteMessageStore?.dataLength,
  );

  const messageDetailHere = useSelector(state => state.messageDetailStore);

  const [modalVisible, setModalVisible] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [messageSubject, setMessageSubject] = useState(null);
  const [empPhoto, setEmpPhoto] = useState(null);
  const [empName, setEmpName] = useState(null);
  const [msgDate, setMsgDate] = useState(null);
  const [msgLike, setMsgLike] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);
        dispatch(clearViewAllFavouriteMessagesState());
        dispatch(
          favouriteMessagesAction({
            employeeId: parsedLoginData,
            ofset: valuePageOffset,
            limit: 12,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const colorArray = ['#D5F5E3', '#D6EAF8', '#EBDEF0', '#F6DDCC', '#FCF3CF'];

  const renderItem = useCallback(({item, index}) => {
    const firstChar =
      item?.FROM_NAME == null
        ? item?.EMP_NAME?.split(' ')[0].charAt(0)
        : item?.FROM_NAME?.split(' ')[0].charAt(0);
    return (
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: hp('8'),
            flexDirection: 'row',
            borderRadius: wp('1'),
            marginBottom: hp('0.15'),

            backgroundColor:
              item?.IS_READ === 'Y' ? colors.appBackGroundColor : '#e6e6e6',
          }}>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: hp('5'),
                width: wp('10'),
                borderRadius: wp(50),
                borderWidth: item?.IS_READ === 'Y' ? wp('0.05') : wp('0.25'),
                borderColor: item?.IS_READ === 'Y' ? 'silver' : 'white',
                marginHorizontal: wp('0.25'),
                marginVertical: hp('0.25'),
                backgroundColor: colorArray[index % colorArray?.length],
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: fontFamily.ceraMedium,
                  fontSize: hp('2.75'),
                  textAlign: 'center',
                }}>
                {firstChar}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>
            //   navigation.navigate('ViewMessageDetail', {messagedata: item})
            // }

            onPress={() => {
              if (item?.IS_READ != 'Y') {
                dispatch(
                  messageReadAction({
                    employee_id: JSON.parse(profileHereEmpId),
                    messageId: item?.MSG_ID,
                    read_status: 'Y',
                  }),
                );
                dispatch(textColr(item?.MSG_ID));
              }
              setMessageId(item?.MSG_ID);
              setMessageSubject(item?.MSG_SUBJECT);
              setEmpPhoto(item?.EMP_PHOTO);
              setEmpName(item?.EMP_NAME);
              setMsgDate(item?.ENTRY_DATE);
              onPressMessage(item?.MSG_ID);
            }}
            style={{
              flex: 0.6,
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
              <Icon type="solid" name={'star'} size={hp(2.5)} color="#f4b543" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setMessageId(null);
    setEmpName(null);
    setMsgDate(null);
    setEmpPhoto(null);
    setMessageSubject(null);
  };

  const onPressMessage = item => {
    setModalVisible(true);
    dispatch(
      messageDetailAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item,
      }),
    );
  };

  useEffect(() => {
    if (messageDetailHere?.success == 1) {
      setMsgLike(messageDetailHere?.userData?.ACK_STATUS);
    }
  }, [messageDetailHere]);

  const onPressThumbUpIcon = () => {
    dispatch(
      messageStatusLikeAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: messageId,
        ack_status: 'Y',
      }),
    );
    setMsgLike('Y');
  };

  const onPressInElse = () => {
    console.log('onPressInElse');
  };

  const keyExtractor = useCallback((item, index) => index.toString());

  const onPressStar = ({item}) => {
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
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
        employeeId: JSON.parse(profileHereEmpId),
        ofset: valuePageOffset + 1,
        limit: 12,
      }),
    );
  };

  console.log('valuePageOffset', valuePageOffset);

  const renderFooter = useCallback(() => {
    console.log('renderFooter');
    return (
      <>
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
      </>
    );
  }, []);

  const dataEnd = () => {
    console.log('dataEnd');
  };

  const dataEndForFooter = () => {
    console.log('dataEndForFooter');
  };

  useFocusEffect(
    React.useCallback(() => {
      setValuePageOffset(1);

      setModalVisible(false);
      setMessageId(null);
      setEmpName(null);
      setMsgDate(null);
      setEmpPhoto(null);
      setMessageSubject(null);

      return () => {
        console.log('Page is unfocused');
        // dispatch(clearViewAllMessagesState());
      };
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
        // paddingBottom: hp('19'),
      }}>
      <>
        {/* {favouriteMessagesHere?.isLoading && <Loader></Loader>} */}
        <View>
          <MainHeader
            text={'Favourite'}
            iconName={'arrow-left'}
            onpressBtn={() => navigation.navigate('HomeScreen')}
          />
        </View>

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
                fontSize: hp('1.75'),
                color: 'black',
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              You have not marked any messages as favorites.
            </Text>
          }
          showsVerticalScrollIndicator={true}
          onEndReached={
            favMessagesDataLengthHere >= 12 ? loadMoreData : dataEnd
          }
          ListFooterComponent={
            favMessagesDataLengthHere >= 12 ? renderFooter : dataEndForFooter
          }
        />

        {modalVisible && (
          <ViewMessageDetailModal
            activeOpacityLikeIcon={msgLike != 'Y' ? 0.8 : 1}
            closeModal={closeModal}
            headTitleText={'Message'}
            msgSubject={messageSubject}
            empPhoto={empPhoto}
            empName={empName}
            msgDate={msgDate}
            htmlSource={messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING}
            onPressLikeIcon={
              msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse
            }
            inconType={msgLike == 'Y' ? 'solid' : 'light'}
          />
        )}
      </>
    </View>
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
