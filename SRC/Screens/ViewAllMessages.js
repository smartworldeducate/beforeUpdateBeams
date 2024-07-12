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
  Alert,
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  addToFavouriteSearchData,
  clearViewAllSearchMessagesState,
  removeFromFavouriteSearchData,
  searchMessageAction,
  textColrSearchData,
} from '../features/MessagesSlice/MessageSearchSlice';

const ViewAllMessages = props => {
  const {height} = Dimensions.get('window');

  const [valuePageOffset, setValuePageOffset] = useState(1);
  console.log('valuePageOffset', valuePageOffset);

  const [searchValuePageOffset, setSearchValuePageOffset] = useState(1);
  console.log('searchValuePageOffset', searchValuePageOffset);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  // console.log('profileHereEmpId', typeof profileHereEmpId);

  const messagesAllStateHere = useSelector(state => state.messagesStore);
  const messagesHere = useSelector(
    state => state.messagesStore?.userDataViewAll,
  );

  // console.log('messagesHere', messagesHere);

  const isMessagesDataEmptyOnLoad = useSelector(
    state => state.messagesStore?.isEmptyData,
  );

  const messagesDataLengthHere = useSelector(
    state => state.messagesStore?.dataLength,
  );

  // console.log('messagesDataLengthHere', messagesDataLengthHere);

  // console.log('isMessagesDataEmptyOnLoad', isMessagesDataEmptyOnLoad);

  const messageDetailHere = useSelector(state => state.messageDetailStore);
  // console.log('messageDetailHere', messageDetailHere);

  const searchMessagelHere = useSelector(
    state => state.searchMessagesStore?.userDataViewAll,
  );
  // console.log('searchMessagelHere', searchMessagelHere);

  const searchMessagesDataLengthHere = useSelector(
    state => state.searchMessagesStore?.dataLength,
  );

  console.log('searchMessagesDataLengthHere', searchMessagesDataLengthHere);

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
        dispatch(clearViewAllMessagesState());
        dispatch(clearViewAllSearchMessagesState());

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

  const colorArray = ['#D5F5E3', '#D6EAF8', '#EBDEF0', '#F6DDCC', '#FCF3CF'];

  const renderItem = useCallback(({item, index}) => {
    const firstChar =
      item?.FROM_NAME == null
        ? item?.EMP_NAME?.split(' ')[0].charAt(0)
        : item?.FROM_NAME?.split(' ')[0].charAt(0);
    return (
      <View
        onPress={() => console.log('Item touched')}
        style={[
          styless.itemContainer,
          {
            backgroundColor:
              item?.IS_READ_STATUS === 'Y'
                ? colors.appBackGroundColor
                : '#e6e6e6',
          },
        ]}>
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
              borderColor: item?.IS_READ_STATUS === 'Y' ? 'silver' : 'white',
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
            ellipsizeMode={'tail'}
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
            {item?.IS_FAVROIT != 'Y' ? (
              <FontAwesomeIcon
                icon="fat fa-star"
                size={hp(2.5)}
                style={{color: '#86868a'}}
              />
            ) : (
              <Icon
                type={'solid'}
                name={'star'}
                size={hp(2.5)}
                color={'#f4b543'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderHiddenItem = ({item, index}, rowMap, rowKey) => (
    <View style={styless.hiddenContainer}>
      <TouchableOpacity
        onPress={() => onPressArchive({item})}
        style={{
          paddingRight: wp('6'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          icon="fat fa-box-check"
          size={hp(3.25)}
          style={{color: 'white'}}
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

  const onPressStar = ({item}) => {
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item?.MSG_ID,
        star_status: 'Y',
      }),
    );
  };

  const onPressStarRemove = ({item}) => {
    dispatch(
      addToFavouriteMessagesAction({
        employee_id: JSON.parse(profileHereEmpId),
        messageId: item?.MSG_ID,
        star_status: 'N',
      }),
    );
  };

  const onPressArchive = ({item}) => {
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
  const [isCross, setIsCross] = useState(false);

  const onChangeSearchText = val => {
    setSearchText(val);
    setIsCross(false);
  };

  console.log('isCross', isCross);

  const loadMoreData = () => {
    setValuePageOffset(valuePageOffset + 1);
    dispatch(
      messagesAction({
        employeeId: JSON.parse(profileHereEmpId),
        ofset: valuePageOffset + 1,
        limit: 25,
      }),
    );
  };

  const loadMoreSearchData = () => {
    setSearchValuePageOffset(searchValuePageOffset + 1);

    dispatch(
      searchMessageAction({
        employeeId: JSON.parse(profileHereEmpId),
        searchTerm: searchText,
        ofset: searchValuePageOffset + 1,
        limit: 25,
      }),
    );
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
              marginBottom: hp('20'),
            }}>
            <View style={{}}>
              <ActivityIndicator size={'small'} color={'#1C37A4'} />
            </View>
          </View>
        </View>
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

  const onPressSearchIcon = () => {
    if (
      searchText?.length == 0 ||
      searchText?.length == null ||
      searchText?.length == undefined
    ) {
      Alert.alert('Enter value');
    } else {
      setIsCross(true);

      dispatch(
        searchMessageAction({
          employeeId: JSON.parse(profileHereEmpId),
          searchTerm: searchText,
          ofset: searchValuePageOffset,
          limit: 25,
        }),
      );
      setValuePageOffset(1);
      dispatch(clearViewAllMessagesState());
    }
  };

  const onPressCrossIcon = () => {
    dispatch(clearViewAllSearchMessagesState());
    setSearchText(null);
    setIsCross(false);
    dispatch(
      messagesAction({
        employeeId: JSON.parse(profileHereEmpId),
        ofset: valuePageOffset,
        limit: 25,
      }),
    );
    setSearchValuePageOffset(1);
  };

  useFocusEffect(
    React.useCallback(() => {
      setSearchText(null);
      setValuePageOffset(1);

      setModalVisible(false);
      setMessageId(null);
      setEmpName(null);
      setMsgDate(null);
      setEmpPhoto(null);
      setMessageSubject(null);

      setIsCross(false);
      setSearchText(null);

      return () => {
        console.log('Page is unfocused');
        // dispatch(clearViewAllMessagesState());
      };
    }, []),
  );

  const onRowOpen = rowKey => {
    console.log('Opened row with key:', rowKey);
  };

  const dataEnd = () => {
    console.log('dataEnd');
  };

  const dataEndForFooter = () => {
    console.log('dataEndForFooter');
  };

  const renderItemSearchMessages = useCallback(({item, index}) => {
    const firstChar =
      item?.FROM_NAME == null
        ? item?.EMP_NAME?.split(' ')[0].charAt(0)
        : item?.FROM_NAME?.split(' ')[0].charAt(0);
    return (
      <View
        onPress={() => console.log('Item touched')}
        style={[
          styless.itemContainer,
          {
            backgroundColor:
              item?.IS_READ_STATUS === 'Y'
                ? colors.appBackGroundColor
                : '#e6e6e6',
          },
        ]}>
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
              borderColor: item?.IS_READ_STATUS === 'Y' ? 'silver' : 'white',
              marginHorizontal: wp('0.25'),
              marginVertical: hp('0.25'),
              backgroundColor: colorArray[index % colorArray?.length],
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: fontFamily.ceraMedium,
                fontSize: hp('3'),
              }}>
              {firstChar}
            </Text>
          </View>
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
              dispatch(textColrSearchData(item?.MSG_ID));
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
                dispatch(addToFavouriteSearchData(item?.MSG_ID));
                onPressStar({item});
              } else {
                dispatch(removeFromFavouriteSearchData(item?.MSG_ID));
                onPressStarRemove({item});
                // closeRow(rowMap, rowKey);
              }
            }}
            style={[styless.hiddenButton, styless.closeButton]}>
            {item?.IS_FAVROIT != 'Y' ? (
              <FontAwesomeIcon
                icon="fat fa-star"
                size={hp(2.5)}
                style={{color: '#86868a'}}
              />
            ) : (
              <Icon
                type={'solid'}
                name={'star'}
                size={hp(2.5)}
                color={'#f4b543'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderHiddenSearchItem = ({item, index}, rowMap, rowKey) => (
    <View style={styless.hiddenContainer}>
      <TouchableOpacity
        onPress={() => onPressArchive({item})}
        style={{
          paddingRight: wp('6'),
          paddingBottom: hp('3'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          icon="fat fa-box-check"
          size={hp(3.25)}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    </View>
  );

  const onRowOpenSearchData = rowKey => {
    console.log('Opened row with key:', rowKey);
  };

  // const initialHtmlContent = `
  //  <p style='color:black;'>'<p>&nbsp;</p>\n<!-- [if !mso]><!-->\n<p></p>\n<!--<![endif]-->\n<p></p>\n<!-- [if (gte mso 9)|(IE)]>\n    <xml>\n    <o:OfficeDocumentSettings>\n    <o:AllowPNG/>\n    <o:PixelsPerInch>96</o:PixelsPerInch>\n    </o:OfficeDocumentSettings>\n    </xml>\n    <![endif]-->\n<p></p>\n<!-- [if (gte mso 9)|(IE)]>\n    <style type=\"text/css\">\n      body {width: 700px;margin: 0 auto;}\n      table {border-collapse: collapse;}\n      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n      img {-ms-interpolation-mode: bicubic;}\n    </style>\n    <![endif]--><!--user entered Head Start-->\n<p></p>\n<!--End Head user entered--><div class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;\">\n<div class=\"webkit\">\n<table class=\"wrapper\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\">\n<tbody>\n<tr>\n<td valign=\"top\" bgcolor=\"#ffffff\" width=\"100%\">\n<table class=\"outer\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td width=\"100%\">\n<table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td><!-- [if mso]>\n                          <div>\n                          <table><tr><td width=\"700\">\n                          <![endif]-->\n<table style=\"width: 100%; max-width: 700px;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 0px 0px 0px 0px; color: #000000; text-align: left;\" align=\"left\" bgcolor=\"#ffffff\" width=\"100%\">\n<table class=\"module preheader preheader-hide\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" data-type=\"preheader\">\n<tbody>\n<tr>\n<td>&nbsp;</td>\n</tr>\n</tbody>\n</table>\n<table class=\"wrapper\" style=\"table-layout: fixed;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" data-type=\"image\">\n<tbody>\n<tr>\n<td style=\"font-size: 6px; line-height: 10px; padding: 0px 0px 0px 0px;\" align=\"center\" valign=\"top\"><img class=\"max-width\" style=\"display: block; color: #000000; text-decoration: none; font-family: Helvetica, arial, sans-serif; font-size: 16px; max-width: 100% !important; width: 100%; height: auto !important;\" src=\"https://d375w6nzl58bw0.cloudfront.net/uploads/5401e79685cd4c5403e3090dd8404061e175bacc936d96162efc0ec0a2c61509.jpg\" alt=\"\" width=\"700\" border=\"0\" /></td>\n</tr>\n</tbody>\n</table>\n<table class=\"module\" style=\"table-layout: fixed;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" data-type=\"text\">\n<tbody>\n<tr>\n<td style=\"padding: 18px 0px 5px 0px; line-height: 22px; text-align: inherit; background-color: #ffffff;\" valign=\"top\" bgcolor=\"#ffffff\" height=\"100%\">\n<h2><span style=\"font-family: verdana,geneva,sans-serif;\">Beaconhouse brings you Homebridge</span></h2>\n<p><span style=\"font-family: verdana,geneva,sans-serif;\">Furthering its legacy as a pioneer in education, Beaconhouse Group is proud to announce yet another groundbreaking programme, Homebridge Online A Level Programme for <strong>PKR 16,000/-</strong> per month only.</span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<table class=\"module\" style=\"table-layout: fixed;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" data-type=\"text\">\n<tbody>\n<tr>\n<td style=\"padding: 0px 0px 18px 0px; line-height: 22px; text-align: inherit;\" valign=\"top\" bgcolor=\"\" height=\"100%\">\n<div>\n<h2><strong><span style=\"font-family: verdana,geneva,sans-serif;\">Pakistan&rsquo;s First Cambridge Certified Online A Level Programme with On-Campus Activities</span> </strong></h2>\n<div><span style=\"font-family: verdana,geneva,sans-serif;\">Homebridge welcomes students from both the O Level and Matriculation streams and offers an extensive induction workshop for Matriculation students where teachers schedule weekly review classes to align and support learning outcomes.</span></div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n<table class=\"module\" style=\"table-layo'</p>
  // `;

  const initialHtmlContent = messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING;

  // const preprocessHtml = html => {
  //   if (!html) return '';
  //   return html
  //     .replace(/<center>/g, '<div style="text-align: center;">')
  //     .replace(/<\/center>/g, '</div>');
  // };

  // const processedHtmlContent = preprocessHtml(initialHtmlContent);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
        // paddingBottom: hp('19'),
      }}>
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
                    value={searchText !== null ? searchText : ''}
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
                {!isCross ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: wp('2'),
                      borderBottomRightRadius: wp('2'),
                    }}
                    onPress={onPressSearchIcon}>
                    <FontAwesomeIcon
                      icon={'fat fa-magnifying-glass'}
                      size={hp(3)}
                      style={{color: '#292D32'}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: wp('2'),
                      borderBottomRightRadius: wp('2'),
                    }}
                    onPress={onPressCrossIcon}>
                    <FontAwesomeIcon
                      icon="fat fa-xmark-large"
                      size={hp(2.2)}
                      style={{color: '#292D32'}}
                    />
                  </TouchableOpacity>
                )}
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

      {/* <View style={{marginTop: hp('2')}}></View> */}

      <View
        style={{
          paddingHorizontal: wp('5'),
          backgroundColor: colors.appBackGroundColor,
          marginBottom: hp('11.85'),
        }}>
        {!isCross ? (
          <SwipeListView
            data={messagesHere}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            // leftOpenValue={75}
            rightOpenValue={-70}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowOpen}
            disableRightSwipe
            // enableEmptySections={true}
            onEndReached={messagesDataLengthHere >= 25 ? loadMoreData : dataEnd}
            // onEndReachedThreshold={0.5}
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
                You have no messages at this time.
              </Text>
            }
            style={{paddingTop: hp('1.5')}}
          />
        ) : (
          <SwipeListView
            data={searchMessagelHere}
            renderItem={renderItemSearchMessages}
            renderHiddenItem={renderHiddenSearchItem}
            rightOpenValue={-70}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowOpenSearchData}
            disableRightSwipe
            onEndReached={
              searchMessagesDataLengthHere >= 25 ? loadMoreSearchData : dataEnd
            }
            ListFooterComponent={
              searchMessagesDataLengthHere >= 25
                ? renderFooter
                : dataEndForFooter
            }
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'black',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                You have no messages at this time.
              </Text>
            }
          />
        )}
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
          htmlSource={initialHtmlContent}
          // htmlSource={messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING}
          // renderers={renderers}
          // renderersProps={renderersProps}
          // defaultTextProps={defaultTextProps}
          onPressLikeIcon={msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse}
          inconType={msgLike == 'Y' ? 'solid' : 'light'}
        />
      )}
      {/* </ScrollView> */}
    </View>
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
    // backgroundColor: colors.appBackGroundColor,
    height: hp('8'),
    flexDirection: 'row',
    borderRadius: wp('1'),
    marginBottom: hp('0.15'),
  },
  itemText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#1C37A4',
    borderRadius: wp('1.5'),
    height: hp('7.9'),
    paddingTop: hp('2'),
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('8'),
    height: hp('4'),
    paddingBottom: hp('0'),
  },
});
