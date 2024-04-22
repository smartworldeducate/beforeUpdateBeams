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
  PanResponder,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwipeListView} from 'react-native-swipe-list-view';

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
import Loader from '../Components/Loader/Loader';

import {ListItem, Button} from '@rneui/themed';
import MainHeader from '../Components/Headers/MainHeader';
import {messageReadAction} from '../features/MessagesSlice/MessageLikeSlice';
import {favouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/FavouriteMessageSlice';
import {addToFavouriteMessagesAction} from '../features/MessagesSlice/FavouriteMessageSlice/AddToFavouriteMessageSlice';
import ViewMessageDetailModal from '../Components/Modal/ViewMessageDetailModal';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {messageStatusLikeAction} from '../features/MessagesSlice/MessageStatusLike';
import {addToArchiveMessagesAction} from '../features/MessagesSlice/ArchiveMessageSlice/AddToArchiveMessageSlice';

const ViewAllMessages = props => {
  const {height} = Dimensions.get('window');

  const [valuePageOffset, setValuePageOffset] = useState(1);
  console.log('valuePageOffset', valuePageOffset);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  console.log('profileHereEmpId', typeof profileHereEmpId);

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

  // console.log('isMessagesDataEmptyOnLoad', isMessagesDataEmptyOnLoad);

  const messageDetailHere = useSelector(state => state.messageDetailStore);
  // console.log('messageDetailHere', messageDetailHere);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [messageSubject, setMessageSubject] = useState(null);
  const [empPhoto, setEmpPhoto] = useState(null);
  const [empName, setEmpName] = useState(null);
  const [msgDate, setMsgDate] = useState(null);
  const [msgLike, setMsgLike] = useState(null);

  useEffect(() => {
    // console.log('run>>>');
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        const parsedLoginData = JSON.parse(loginData);
        // console.log('run useEffect');
        dispatch(clearViewAllMessagesState());

        dispatch(
          messagesAction({
            employeeId: parsedLoginData,
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

  // const renderItem = useCallback(
  //   ({item, index}) => {
  //     return (
  //       // <ListItem.Swipeable
  //       //   style={{
  //       //     height: hp('7.5'),
  //       //     justifyContent: 'center',
  //       //     alignItems: 'center',
  //       //   }}
  //       //   rightContent={
  //       //     <Button
  //       //       title="Delete"
  //       //       onPress={() => onPressPush(item.MSG_ID)}
  //       //       buttonStyle={{backgroundColor: 'red'}}
  //       //     />
  //       //   }>

  //       // <ListItem.Content
  //       //   style={{
  //       //     marginHorizontal: wp('-4'),
  //       //   }}>
  //       <View style={{}}>
  //         <View
  //           // activeOpacity={0.8}
  //           style={{
  //             height: hp('8'),
  //             flexDirection: 'row',
  //             // backgroundColor: 'red',
  //             marginBottom: hp('1'),
  //           }}>
  //           <View
  //             style={{
  //               flex: 0.15,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}>
  //             <Image
  //               source={{uri: item?.EMP_PHOTO}}
  //               style={{
  //                 height: hp('5.75'),
  //                 width: wp('11.5'),
  //                 borderRadius: wp(50),
  //               }}
  //               resizeMode="cover"
  //             />
  //           </View>
  //           <TouchableOpacity
  //             activeOpacity={0.5}
  //             onPress={() => {
  //               // navigation.navigate('ViewMessageDetail', {messagedata: item});

  //               if (item?.IS_READ_STATUS != 'Y') {
  //                 dispatch(
  //                   messageReadAction({
  //                     employee_id: profileHereEmpId,
  //                     messageId: item?.MSG_ID,
  //                     read_status: 'Y',
  //                   }),
  //                 );
  //                 dispatch(textColr(item?.MSG_ID));
  //               }
  //               setMessageId(item?.MSG_ID);
  //               setMessageSubject(item?.MSG_SUBJECT);
  //               setEmpPhoto(item?.EMP_PHOTO);
  //               setEmpName(item?.EMP_NAME);
  //               setMsgDate(item?.ENTRY_DATE);
  //               onPressMessage(item?.MSG_ID);
  //             }}
  //             style={{
  //               flex: 0.6,
  //               paddingLeft: wp('2.5'),
  //               justifyContent: 'center',
  //             }}>
  //             <Text
  //               numberOfLines={1}
  //               letterSpacing={'tail'}
  //               style={[
  //                 styles.messageCardEmpName,
  //                 {color: item?.IS_READ_STATUS === 'Y' ? '#66656A' : '#201F24'},
  //               ]}>
  //               {`${item?.EMP_NAME} ${item?.NUMR}`}
  //             </Text>
  //             <Text
  //               numberOfLines={2}
  //               ellipsizeMode={'tail'}
  //               style={[
  //                 styles.msgSubject,
  //                 {color: item?.IS_READ_STATUS === 'Y' ? '#66656A' : '#201F24'},
  //               ]}>
  //               {item?.MSG_SUBJECT}
  //             </Text>
  //           </TouchableOpacity>
  //           <View
  //             style={{
  //               flex: 0.25,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}>
  //             <View style={{}}>
  //               <Text
  //                 numberOfLines={1}
  //                 letterSpacing={'tail'}
  //                 style={[
  //                   styles.messageCardDate,
  //                   {
  //                     fontFamily:
  //                       item?.IS_READ_STATUS === 'Y'
  //                         ? fontFamily.ceraMedium
  //                         : fontFamily.ceraBold,

  //                     fontWeight: item?.IS_READ_STATUS === 'Y' ? '500' : 'bold',
  //                   },
  //                 ]}>
  //                 {item?.ENTRY_DATE}
  //               </Text>
  //             </View>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 if (item?.IS_FAVROIT != 'Y') {
  //                   dispatch(addToFavourite(item?.MSG_ID));
  //                   onPressStar({item});
  //                 } else {
  //                   // console.log('123');
  //                   dispatch(removeFromFavourite(item?.MSG_ID));
  //                   onPressStarRemove({item});
  //                 }
  //               }}
  //               style={{
  //                 alignItems: 'flex-end',
  //                 justifyContent: 'center',
  //                 width: wp('15'),
  //                 height: hp('4.5'),
  //               }}>
  //               <Icon
  //                 type={item?.IS_FAVROIT != 'Y' ? 'regular' : 'solid'}
  //                 name={'star'}
  //                 size={hp(2.5)}
  //                 color={item?.IS_FAVROIT != 'Y' ? '#86868a' : '#1C37A4'}
  //               />
  //             </TouchableOpacity>

  //             <TouchableOpacity
  //               onPress={() => onPressArchive({item})}
  //               style={{
  //                 alignItems: 'flex-end',
  //                 justifyContent: 'center',
  //                 width: wp('15'),
  //                 height: hp('2'),
  //               }}>
  //               <Text
  //                 style={{
  //                   fontSize: hp('1.5'),
  //                   color: 'black',
  //                   textDecorationStyle: 'solid',
  //                   textDecorationLine: 'underline',
  //                 }}>
  //                 Archive
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>

  //       // </ListItem.Content>
  //       // </ListItem.Swipeable>
  //     );
  //   },
  //   [messagesAllStateHere],
  // );

  const renderItem = useCallback(({item}) => {
    return (
      <View
        onPress={() => console.log('Item touched')}
        style={styless.itemContainer}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item?.EMP_PHOTO}}
            style={{
              height: hp('5.25'),
              width: wp('10.5'),
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
            {`${item?.EMP_NAME}`}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[
              styles.msgSubject,
              {
                color: item?.IS_READ_STATUS === 'Y' ? '#66656A' : '#201F24',
                fontFamily:
                  item?.IS_READ_STATUS === 'Y'
                    ? fontFamily.ceraMedium
                    : fontFamily.ceraBold,
                fontWeight: item?.IS_READ_STATUS === 'Y' ? '500' : 'bold',
              },
            ]}>
            {item?.MSG_SUBJECT}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 0.2}}>
          <View>
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

          <TouchableOpacity
            onPress={() => {
              if (item?.IS_FAVROIT != 'Y') {
                dispatch(addToFavourite(item?.MSG_ID));
                onPressStar({item});
              } else {
                dispatch(removeFromFavourite(item?.MSG_ID));
                onPressStarRemove({item});
                // closeRow(rowMap, rowKey);
              }
            }}
            style={[styless.hiddenButton, styless.closeButton]}>
            <Icon
              type={item?.IS_FAVROIT != 'Y' ? 'regular' : 'solid'}
              name={'star'}
              size={hp(2.5)}
              color={item?.IS_FAVROIT != 'Y' ? '#86868a' : '#1C37A4'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderHiddenItem = ({item, index}, rowMap, rowKey) => (
    <View style={styless.hiddenContainer}>
      {/* <TouchableOpacity
        onPress={() => {
          if (item?.IS_FAVROIT != 'Y') {
            dispatch(addToFavourite(item?.MSG_ID));
            onPressStar({item});
          } else {
            dispatch(removeFromFavourite(item?.MSG_ID));
            onPressStarRemove({item});
            closeRow(rowMap, rowKey);
          }
        }}
        style={[styless.hiddenButton, styless.closeButton]}>
        <Icon
          type={item?.IS_FAVROIT != 'Y' ? 'regular' : 'solid'}
          name={'star'}
          size={hp(2.5)}
          color={item?.IS_FAVROIT != 'Y' ? '#86868a' : '#1C37A4'}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => onPressArchive({item})}
        style={{paddingRight: wp('3'), paddingBottom: hp('3')}}>
        <Icon
          type={'light'}
          name={'box-check'}
          size={hp(3)}
          color={'#1C37A4'}
          // style={{paddingBottom: hp('3')}}
        />
      </TouchableOpacity>
    </View>
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const keyExtractor = useCallback((item, index) => index.toString());

  const onSwipeEnd = () => {
    // console.log('123');
  };

  // console.log('messageId', messageId);

  const onPressStar = ({item}) => {
    // console.log('onPressStar', item);
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item?.MSG_ID,
        star_status: 'Y',
      }),
    );
  };

  const onPressStarRemove = ({item}) => {
    // console.log('onPressStarRemove', item);
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item?.MSG_ID,
        star_status: 'N',
      }),
    );
  };

  const onPressArchive = ({item}) => {
    // console.log('onPressArchive', item);
    dispatch(
      addToArchiveMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item?.MSG_ID,
        archive_status: 'Y',
      }),
    );

    dispatch(removeForArchiveFromAllMessages(item?.MSG_ID));
  };

  const textInputRef = useRef(null);
  const [searchText, setSearchText] = useState(null);

  const onPressSearchIcon = () => {
    // console.log('onPressSearchIcon');
  };

  const onChangeSearchText = val => {
    setSearchText(val);
  };

  const onPressPush = id => {
    dispatch(pushObject(id));
  };

  const loadMoreData = () => {
    // console.log('loadMoreData');
    // alert('onEndReach');
    setValuePageOffset(valuePageOffset + 1);
    // if (!isMessagesDataEmptyOnLoad) {
    dispatch(increaseOffset());
    dispatch(
      messagesAction({
        employeeId: JSON.parse(profileHereEmpId),
        ofset: valuePageOffset + 1,
        limit: 25,
      }),
    );
    // }
  };

  const handleItemPress = item => {
    // Dispatch updateTextColor action with item details and new color
    dispatch(updateTextColor({id: item.MSG_ID, color: 'red'}));
  };

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
              marginBottom: hp('20'),
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

  const closeModal = () => {
    setModalVisible(false);
    setMessageId(null);
    setEmpName(null);
    setMsgDate(null);
    setEmpPhoto(null);
    setMessageSubject(null);
  };

  // useEffect(() => {
  //   dispatch(
  //     messageDetailAction({
  //       employee_id: profileHereEmpId,
  //       messageId: messageId,
  //     }),
  //   );
  // }, [dispatch]);

  const onPressMessage = item => {
    console.log('item', item);
    setModalVisible(true);

    dispatch(
      messageDetailAction({
        employee_id: profileHereEmpId,
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
    // console.log('onPressThumbUpIcon');
    dispatch(
      messageStatusLikeAction({
        employee_id: profileHereEmpId,
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
      setValuePageOffset(1);
      setModalVisible(false);

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

  const onRowOpen = rowKey => {
    console.log('Opened row with key:', rowKey);
  };

  return (
    <>
      {/* {messagesAllStateHere?.isLoading && <Loader></Loader>} */}
      <View>
        <>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1C37A5', '#4D69DC']}
            style={styles.mainHeader}>
            <StatusBar translucent backgroundColor="transparent" />
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('5.5'),
                  marginHorizontal: wp('2'),
                  height: hp('6'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('pressed');
                    // navigation.goBack();
                    navigation.navigate('HomeScreen');
                  }}
                  style={{
                    flex: 0.17,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Icon
                    type="light"
                    name="arrow-left"
                    size={hp(3)}
                    color="#FFF"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headerText}>Messages</Text>
                </View>
                <View style={{flex: 0.13}}></View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  borderColor: 'grey',
                  borderRadius: wp('3'),
                  borderWidth: wp('0.15'),
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  marginHorizontal: wp('6'),
                  marginTop: hp('0.5'),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 0.8,
                  }}>
                  <TextInput
                    ref={textInputRef}
                    value={searchText}
                    onChangeText={onChangeSearchText}
                    returnKeyType={'done'}
                    iconName={'user'}
                    placeholder={'Search Message'}
                    placeholderColor={'gray'}
                    iconColor={colors.loginIconColor}
                    placeholderTextColor="gray"
                    placeholderStyle={styles.plaseholderStyle}
                    underlineColorAndroid="transparent"
                    style={styles.textInputCustomStyle}
                    // autoFocus
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.searchicon,
                    {
                      borderTopRightRadius: wp('2'),
                      borderBottomRightRadius: wp('2'),
                    },
                  ]}
                  onPress={onPressSearchIcon}>
                  <Icon
                    type="light"
                    name="magnifying-glass"
                    size={hp(2.5)}
                    color="#292D32"
                  />
                </TouchableOpacity>
              </View>
            </>
          </LinearGradient>

          {/* <MainHeader
            text={'Message'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          /> */}
        </>
      </View>

      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      {/* <FlatList
        data={messagesHere}
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
            Right now there are no message.
          </Text>
        }
        showsVerticalScrollIndicator={true}
        // enableEmptySections={true}
        onEndReached={loadMoreData}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      /> */}

      <View
        style={{
          paddingHorizontal: wp('5'),
          backgroundColor: colors.appBackGroundColor,
        }}>
        <SwipeListView
          data={messagesHere}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          // leftOpenValue={75}
          rightOpenValue={-50}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowOpen}
          disableRightSwipe
          // enableEmptySections={true}
          onEndReached={loadMoreData}
          // onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>

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
          onPressLikeIcon={msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse}
          inconType={msgLike == 'Y' ? 'solid' : 'light'}
        />
      )}
      {/* </ScrollView> */}
    </>
  );
};

export default ViewAllMessages;

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
    // backgroundColor: '#e4e8ed',
  },

  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 20,
    paddingHorizontal: 15,
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
    color: '#333',
    margin: 10,
    textAlign: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appBackGroundColor,
    height: hp('8'),
    flexDirection: 'row',
  },
  itemText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 80,
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('8'),
    height: hp('4'),
    paddingBottom: hp('0'),
  },
});
