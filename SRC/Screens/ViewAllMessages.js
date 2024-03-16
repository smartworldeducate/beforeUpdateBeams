import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../Components/Headers/MainHeader';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import MessageModal from '../Components/MessageModal/MessageModal';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import {useNavigation} from '@react-navigation/native';

const ViewAllMessages = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const messagesHere = useSelector(state => state.messagesStore);
  console.log('messageHereViewAll', messagesHere);

  const messageHere = useSelector(state => state.messageDetailStore);
  console.log('messageHere', messageHere?.userData[0]?.MSG_DETAIL_SUBSTRING);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ViewMessageDetail', {messagedata: item})
        }
        style={{
          height: hp('15'),
          width: wp('87'),

          marginRight: wp('3'),
          marginLeft: wp('2'),
          borderRadius: wp('3'),
          flexDirection: 'column',
          paddingHorizontal: wp('2'),

          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          marginVertical: hp('1'),
        }}>
        <View
          style={{
            height: hp('7'),

            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.17,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.EMP_PHOTO}}
              style={{height: hp('4.5'), width: wp('9'), borderRadius: wp(50)}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.83,
              paddingHorizontal: wp('1'),
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              letterSpacing={'tail'}
              style={styles.messageCardEmpName}>
              {item?.EMP_NAME}
            </Text>
            <Text style={styles.messageCardDate}>{item?.HIRE_DATE}</Text>
          </View>
        </View>
        <View
          style={{
            height: hp('10'),
            marginVertical: hp('0.5'),
            paddingHorizontal: wp('2'),
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              color: '#343434',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: hp('1.85'),
              letterSpacing: 0.15,
            }}>
            {item?.MSG_SUBJECT}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const onPressMessage = item => {
  //   console.log('onPressMessage');
  //   setMessageModal(true);
  //   setModalUserImg(item?.EMP_PHOTO);
  //   setModalUserName(item?.EMP_NAME);
  //   setModalMessageDate(item?.HIRE_DATE);
  //   setModalMessageTitle(item?.MSG_SUBJECT);

  //   dispatch(
  //     messageDetailAction({
  //       messageId: item?.MSG_ID,
  //     }),
  //   );
  // };

  // const onPressCloseModal = () => {
  //   console.log('onPressCloseModal');
  //   setMessageModal(false);
  //   setModalUserImg(null);
  //   setModalUserName(null);
  //   setModalMessageDate(null);
  //   setModalMessageTitle(null);
  // };

  // const onPressThumbUpIcon = () => {
  //   console.log('onPressThumbUpIcon');
  //   setThumbsUpIcon(!thumbsUpIcon);
  // };

  return (
    <>
      <View>
        <MainHeader
          text={'All Messages'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View style={{marginVertical: hp('3')}}>
          <View style={{marginHorizontal: wp('5')}}>
            <FlatList
              data={messagesHere?.userData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        {/* <MessageModal
          modalVisible={messageModal}
          onPressOpacity={onPressCloseModal}
          userImg={modalUserImg}
          empName={modalUserName}
          messageDate={modalMessageDate}
          title={modalMessageTitle}
          htmlDescription={messageHere?.userData[0]?.MSG_DETAIL_SUBSTRING}
          thumbsUpIcon={thumbsUpIcon ? 'solid' : 'light'}
          onPressThumbUpIcon={onPressThumbUpIcon}
        /> */}
      </ScrollView>
    </>
  );
};

export default ViewAllMessages;

const styles = EStyleSheet.create({
  messageCardEmpName: {
    color: '#6A6A6A',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});
