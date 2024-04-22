import React, {useEffect, useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import colors from '../Styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  addToFavourite,
  clearViewAllMessagesState,
  increaseOffset,
  messagesAction,
  pushObject,
  removeForArchiveFromAllMessages,
  removeFromFavourite,
  textColr,
  updateTextColor,
} from '../features/MessagesSlice/MessagesSlice';

import {messageReadAction} from '../features/MessagesSlice/MessageLikeSlice';
import {favouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/FavouriteMessageSlice';
import {addToFavouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/AddToFavouriteMessageSlice';
import ViewMessageDetailModal from '../Components/Modal/ViewMessageDetailModal';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {messageStatusLikeAction} from '../features/MessagesSlice/MessageStatusLike';
import {addToArchiveMessagesAction} from '../features/MessagesSlice/ArchiveMessageSlice/AddToArchiveMessageSlice';

const TestScreen = () => {
  const [valuePageOffset, setValuePageOffset] = useState(1);
  console.log('valuePageOffset', valuePageOffset);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  const messagesAllStateHere = useSelector(state => state.messagesStore);
  const messagesHere = useSelector(
    state => state.messagesStore?.userDataViewAll,
  );

  const isMessagesDataEmptyOnLoad = useSelector(
    state => state.messagesStore?.isEmptyData,
  );

  const messagesDataLengthHere = useSelector(
    state => state.messagesStore?.dataLength,
  );

  console.log('messagesDataLengthHere', messagesDataLengthHere);

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
        dispatch(clearViewAllMessagesState());

        dispatch(
          messagesAction({
            employeeId: loginData,
            ofset: valuePageOffset,
            limit: 25,
          }),
        );
      } catch (error) {
        console.error('Error retrieving values from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onRowOpen = rowKey => {
    console.log('Opened row with key:', rowKey);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <View
        // activeOpacity={0.5}
        onPress={() => console.log('Item touched')}
        style={styles.itemContainer}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
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
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (item?.IS_READ_STATUS != 'Y') {
              dispatch(
                messageReadAction({
                  employee_id: profileHereEmpId,
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
            flex: 0.65,
            paddingLeft: wp('2.5'),
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            letterSpacing={'tail'}
            style={[
              styles.messageCardEmpName,
              {color: item?.IS_READ_STATUS === 'Y' ? '#66656A' : '#201F24'},
            ]}>
            {`${item?.EMP_NAME} ${item?.NUMR}`}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[
              styles.msgSubject,
              {color: item?.IS_READ_STATUS === 'Y' ? '#66656A' : '#201F24'},
            ]}>
            {item?.MSG_SUBJECT}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 0.2}}>
          <Text
            numberOfLines={1}
            letterSpacing={'tail'}
            style={[
              styles.messageCardDate,
              {
                fontFamily:
                  item?.IS_READ_STATUS === 'Y'
                    ? fontFamily.ceraMedium
                    : fontFamily.ceraBold,

                fontWeight: item?.IS_READ_STATUS === 'Y' ? '500' : 'bold',
              },
            ]}>
            {item?.ENTRY_DATE}
          </Text>
        </View>
      </View>
    );
  }, []);

  const renderHiddenItem = ({item, index}, rowMap, rowKey) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        onPress={() => {
          if (item?.IS_FAVROIT != 'Y') {
            dispatch(addToFavourite(item?.MSG_ID));
            onPressStar({item});
            // this.closeRow(rowMap, rowKey);
          } else {
            dispatch(removeFromFavourite(item?.MSG_ID));
            onPressStarRemove({item});
            this.closeRow(rowMap, rowKey);
          }
        }}
        style={[styles.hiddenButton, styles.closeButton]}>
        <Icon
          type={item?.IS_FAVROIT != 'Y' ? 'regular' : 'solid'}
          name={'star'}
          size={hp(2.5)}
          color={item?.IS_FAVROIT != 'Y' ? '#86868a' : '#1C37A4'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressArchive({item})}
        style={[styles.hiddenButton, styles.deleteButton]}>
        <Icon
          type={'solid'}
          name={'box-archive'}
          size={hp(2.5)}
          color={'#1C37A4'}
        />
      </TouchableOpacity>
    </View>
  );

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onPressStar = ({item}) => {
    console.log('onPressStar', item);
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: profileHereEmpId,
        messageId: item?.MSG_ID,
        star_status: 'Y',
      }),
    );
  };

  const onPressStarRemove = ({item}) => {
    console.log('onPressStarRemove', item);
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: profileHereEmpId,
        messageId: item?.MSG_ID,
        star_status: 'N',
      }),
    );
  };

  const onPressArchive = ({item}) => {
    console.log('onPressArchive', item);
    // dispatch(
    //   addToArchiveMessagesAction({
    //     employee_id: profileHereEmpId,
    //     messageId: item?.MSG_ID,
    //     archive_status: 'Y',
    //   }),
    // );

    dispatch(removeForArchiveFromAllMessages(item?.MSG_ID));
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={messagesHere}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        // leftOpenValue={75}
        rightOpenValue={-125}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowOpen}
        disableRightSwipe
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee', // Light Gray
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: hp('8'),
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    margin: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark Gray
    margin: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // White
    borderBottomColor: '#E0E0E0', // Lighter Gray
    borderBottomWidth: 1,
    height: 80,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  itemText: {
    color: '#333', // Dark Gray
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 80,
    borderRadius: 20,
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 60,
  },
  closeButton: {
    borderRadius: hp('1'),
  },
  deleteButton: {
    borderRadius: hp('1'),
    marginLeft: wp('2'),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: hp('1.55'),
  },
  messageCardDate: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: hp('1.25'),
  },
});

export default TestScreen;
