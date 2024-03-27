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
import {messagesAction} from '../features/MessagesSlice/MessagesSlice';

const ViewAllMessages = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  const messagesHere = useSelector(state => state.messagesStore);

  const [messagesData, setMessagesData] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);

  useEffect(() => {
    setMessagesData(messagesHere?.userData);
  }, [messagesHere]);

  console.log('messagesData', messagesData);

  const renderItem = ({item, index}) => {
    return (
      <View
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          marginBottom: hp('2'),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewMessageDetail', {messagedata: item})
          }
          style={{
            flex: 0.13,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item?.EMP_PHOTO}}
            style={{height: hp('5'), width: wp('10'), borderRadius: wp(50)}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewMessageDetail', {messagedata: item})
          }
          style={{
            flex: 0.6,
            paddingVertical: hp('0.35'),
            paddingLeft: wp('2.5'),
          }}>
          <Text
            numberOfLines={2}
            letterSpacing={'tail'}
            style={styles.messageCardEmpName}>
            {item?.EMP_NAME}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.msgSubject}>
            {item?.MSG_SUBJECT}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.27,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Text
              numberOfLines={1}
              letterSpacing={'tail'}
              style={styles.messageCardDate}>
              {item?.HIRE_DATE}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressStar({item})}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingTop: hp('1'),
              width: wp('10'),
            }}>
            <Icon type="light" name={'star'} size={hp(2.5)} color="#A09DA1" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onPressStar = ({item}) => {
    console.log('onPressStar', item);
  };

  const textInputRef = useRef(null);
  const [searchText, setSearchText] = useState(null);

  const onPressSearchIcon = () => {
    console.log('onPressSearchIcon');
  };

  const onChangeSearchText = val => {
    setSearchText(val);
  };

  const handleLoadMore = useCallback(() => {
    console.log('Offset:', pageOffset + 1);
    setPageOffset(prevOffset => prevOffset + 1);
    // Here you can fetch more data from your data source
  }, [pageOffset]);

  console.log('pageOffset', pageOffset);

  return (
    <>
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
                  <Text style={styles.headerText}>Messages</Text>
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
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View style={{marginTop: hp('3')}}>
          <View style={{marginHorizontal: wp('5')}}>
            <FlatList
              data={messagesData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              enableEmptySections={true}
              ListFooterComponent={() => <View style={{height: 50}} />} // Placeholder to prevent multiple calls
            />
          </View>
        </View>
      </ScrollView>
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