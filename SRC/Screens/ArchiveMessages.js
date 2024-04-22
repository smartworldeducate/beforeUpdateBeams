import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import colors from '../Styles/colors';
import MainHeader from '../Components/Headers/MainHeader';
import {
  archiveMessagesAction,
  removeFromArchiveSlice,
} from '../features/MessagesSlice/ArchiveMessageSlice/ArchiveMessageSlice';
import Loader from '../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToArchiveMessagesAction} from '../features/MessagesSlice/ArchiveMessageSlice/AddToArchiveMessageSlice';

const ArchiveMessages = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const archiveMessagesHere = useSelector(state => state.archiveMessageStore);
  // console.log('archiveMessagesHere', archiveMessagesHere);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = await AsyncStorage.getItem('loginData');
        // const parsedLoginData = JSON.parse(loginData);

        dispatch(
          archiveMessagesAction({
            employeeId: loginData,
            ofset: 1,
            limit: 50,
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
              // backgroundColor: 'pink',
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
              onPress={() => onPressUnarchive({item})}
              style={{
                // backgroundColor: 'red',
                height: hp('3'),
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={[styles.messageCardDate, {paddingHorizontal: wp('3')}]}>
                {'Unarchive'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const onPressUnarchive = ({item}) => {
    // console.log('onPressUnarchive', item);

    dispatch(
      addToArchiveMessagesAction({
        employee_id: profileHereEmpId,
        messageId: item?.MSG_ID,
        archive_status: 'N',
      }),
    );
    dispatch(removeFromArchiveSlice(item?.MSG_ID));
  };

  return (
    <>
      {archiveMessagesHere?.isLoading && <Loader></Loader>}
      <View>
        <MainHeader
          text={'Archive'}
          iconName={'arrow-left'}
          onpressBtn={() => navigation.navigate('HomeScreen')}
        />
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <FlatList
          data={archiveMessagesHere?.userData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{
            paddingTop: hp('3'),
            paddingBottom: hp('2'),
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
              You have no archive message.
            </Text>
          }
          showsVerticalScrollIndicator={true}
          // enableEmptySections={true}
          // onEndReached={loadMoreData}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={renderFooter}
        />
      </ScrollView>

      {/* <View>
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
                  marginTop: hp('6'),
                  marginHorizontal: wp('2'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    flex: 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="light"
                    name="arrow-left"
                    size={hp(2.5)}
                    color="#FFF"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headerText}>Archive</Text>
                </View>
                <View style={{flex: 0.15}}></View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  borderColor: 'grey',
                  borderRadius: wp('2'),
                  borderWidth: wp('0.15'),
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  marginHorizontal: wp('5'),
                  marginTop: hp('2'),
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
        </>
      </View> */}
    </>
  );
};

export default ArchiveMessages;

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
    fontSize: '0.67rem',
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
