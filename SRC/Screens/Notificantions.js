import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';

import {useSelector, useDispatch} from 'react-redux';
import colors from '../Styles/colors';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import Loader from '../Components/Loader/Loader';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  NotificationsMessagesAction,
  textColr,
} from '../features/NotificationsMessagesSlice/NotificationsMessagesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {messageReadAction} from '../features/MessagesSlice/MessageLikeSlice';
import ViewMessageDetailModal from '../Components/Modal/ViewMessageDetailModal';
import ViewNotificationMessageModal from '../Components/Modal/ViewNotificationMessageModal';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {useFocusEffect} from '@react-navigation/native';
import ViewNotificationFullMessageModal from '../Components/Modal/ViewNotificationFullMessageModal';

const Notificantions = props => {
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const notificationsMessagesListHere = useSelector(
    state => state.NotificationsMessagesStore.userDataViewAll,
  );

  const messagesDataLengthHere = useSelector(
    state => state.NotificationsMessagesStore?.dataLength,
  );

  const messageDetailHere = useSelector(state => state.messageDetailStore);

  // console.log('messageDetailHere', messageDetailHere);

  const [valuePageOffset, setValuePageOffset] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFullView, setModalVisibleFullView] = useState(false);

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

        dispatch(
          NotificationsMessagesAction({
            employeeId: parsedLoginData,
            ofset: 1,
            limit: 25,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const delay = 4500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const renderItem = useCallback(({item, index}) => {
    const firstChar =
      item?.FROM_NAME == null
        ? item?.EMP_NAME?.split(' ')[0].charAt(0)
        : item?.FROM_NAME?.split(' ')[0].charAt(0);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            if (item?.IS_READ_STATUS != 'Y') {
              dispatch(
                messageReadAction({
                  employee_id: JSON.parse(profileHereEmpId),
                  messageId: item?.MSG_ID,
                  read_status: 'Y',
                }),
              );
              dispatch(textColr(item?.MSG_ID));
            }
            if (item?.IS_READ_STATUS == 'Y') {
              console.log('alreadyRead');
            }

            setMessageId(item?.MSG_ID);
            setMessageSubject(item?.MSG_SUBJECT);
            setEmpPhoto(item?.EMP_PHOTO);
            setEmpName(item?.EMP_NAME);
            setMsgDate(item?.ENTRY_DATE);

            onPressMessage({
              itemMsgId: item?.MSG_ID,
              isOnlyNotification: item?.IS_ONLY_NOTIFICATION,
              itemMsgDetails: item?.MESSAGE_DETAIL,
            });
          }}
          style={{marginVertical: hp('0.75')}}>
          <View style={{backgroundColor: colors.appBackGroundColor}}>
            <View style={{flexDirection: 'row', paddingTop: hp('1')}}>
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
                    borderWidth:
                      item?.IS_READ_STATUS === 'Y' ? wp('0.05') : wp('0.25'),
                    borderColor:
                      item?.IS_READ_STATUS === 'Y' ? 'silver' : 'white',
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
              <View
                style={{
                  flex: 0.85,
                  flexDirection: 'column',
                  paddingLeft: wp('1.5'),
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontFamily:
                        item?.IS_READ_STATUS == 'Y'
                          ? fontFamily.ceraMedium
                          : fontFamily.ceraBold,

                      color:
                        item?.IS_READ_STATUS == 'Y' ? '#666666' : '#000000',
                      fontSize: hp('2'),
                    }}>
                    {item?.EMP_NAME}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.ceraMedium,

                      color:
                        item?.IS_READ_STATUS == 'Y' ? '#666666' : '#000000',
                      fontSize: hp('1.35'),
                    }}>
                    {item?.ENTRY_DATE}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{marginVertical: hp('0.15'), marginHorizontal: wp('2')}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: fontFamily.ceraMedium,

                  color: item?.IS_READ_STATUS == 'Y' ? '#666666' : '#000000',
                  fontSize: hp('1.65'),
                }}>
                {item?.MSG_SUBJECT}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <LineSeprator
          height={1}
          backgroundColor={'#DBDBDB'}
          marginVertical={hp('0.5')}
        />
      </>
    );
  }, []);

  const colorArray = ['#D5F5E3', '#D6EAF8', '#EBDEF0', '#F6DDCC', '#FCF3CF'];

  const onPress = () => {
    console.log('onPress');
  };

  const loadMoreData = () => {
    setValuePageOffset(valuePageOffset + 1);
    dispatch(
      NotificationsMessagesAction({
        employeeId: JSON.parse(profileHereEmpId),
        ofset: valuePageOffset + 1,
        limit: 25,
      }),
    );
  };

  const dataEnd = () => {
    console.log('dataEnd');
  };

  const dataEndForFooter = () => {
    console.log('dataEndForFooter');
  };

  const renderFooter = useCallback(() => {
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
              marginTop: hp('1'),
              marginBottom: hp('15'),
            }}>
            <View style={{}}>
              <ActivityIndicator size={'small'} color={'#1C37A4'} />
            </View>
          </View>
        </View>
      </>
    );
  }, []);

  const [detailHtml, setDetialHtml] = useState('');

  const onPressMessage = item => {
    // console.log('onPressMessage', item);
    if (item?.isOnlyNotification == 'Y') {
      setModalVisible(true);
      setDetialHtml(item?.itemMsgDetails);
    } else {
      setModalVisibleFullView(true);
      dispatch(
        messageDetailAction({
          employee_id: JSON.parse(profileHereEmpId),
          messageId: JSON.parse(item?.itemMsgId),
        }),
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setDetialHtml('');
  };

  const closeFullModal = () => {
    setModalVisibleFullView(false);

    setMessageId(null);
    setEmpName(null);
    setMsgDate(null);
    setEmpPhoto(null);
    setMessageSubject(null);
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

  useFocusEffect(
    React.useCallback(() => {
      // setValuePageOffset(1);

      setModalVisible(false);
      setModalVisibleFullView(false);
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
      }}>
      <View>
        <MainHeader
          text={'Notifications'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {messageDetailHere?.isLoading && <Loader></Loader>}

      {isLoading && <Loader></Loader>}

      <View>
        <View style={{marginVertical: hp('0')}}>
          <View style={{marginHorizontal: wp('5')}}>
            <SwipeListView
              data={notificationsMessagesListHere}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={
                messagesDataLengthHere >= 25 ? loadMoreData : dataEnd
              }
              ListFooterComponent={
                messagesDataLengthHere >= 25 ? renderFooter : dataEndForFooter
              }
              ListEmptyComponent={
                <Text
                  style={{
                    fontSize: hp('1.75'),
                    color: 'black',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}>
                  Right now there are no Notifications.
                </Text>
              }
              style={{paddingTop: hp('1.5')}}
            />
          </View>
        </View>
      </View>

      {modalVisible && (
        <ViewNotificationMessageModal
          closeModal={closeModal}
          headTitleText={`Notification Detail`}
          htmlSource={detailHtml}
        />
      )}

      {modalVisibleFullView && (
        <ViewNotificationFullMessageModal
          activeOpacityLikeIcon={msgLike != 'Y' ? 0.8 : 1}
          closeModal={closeFullModal}
          headTitleText={'Message'}
          msgSubject={messageSubject}
          empPhoto={empPhoto}
          empName={empName}
          msgDate={msgDate}
          htmlSource={messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING}
          // onPressLikeIcon={msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse}
          // inconType={msgLike == 'Y' ? 'solid' : 'light'}
        />
      )}
    </View>
  );
};

export default Notificantions;

const styles = EStyleSheet.create({
  messageCardEmpName: {
    color: '#201F24',
    fontSize: '0.66rem',
  },
  msgSubject: {
    color: '#86868a',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '300',
    fontSize: '0.62rem',
    letterSpacing: 0.15,
  },
  messageCardDate: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});

const styless = EStyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('8'),
    flexDirection: 'row',
    borderRadius: wp('1'),
    marginBottom: hp('0.15'),
  },
});
