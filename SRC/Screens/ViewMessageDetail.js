import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import {messageDetailAction} from '../features/MessagesSlice/MessageDetailSlice';
import colors from '../Styles/colors';
import Icon from 'react-native-fontawesome-pro';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import Loader from '../Components/Loader/Loader';

import {messageStatusLikeAction} from '../features/MessagesSlice/MessageStatusLike';
import MainHeader from '../Components/Headers/MainHeader';

const ViewMessageDetail = ({route}) => {
  // console.log('routeData', route?.params?.messagedata);

  const dispatch = useDispatch();
  // console.log('ViewMessageDetail');
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const [msgLike, setMsgLike] = useState(null);

  const userIdProfileHere = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );
  // console.log('userIdProfileHere', userIdProfileHere);

  const messageDetailHere = useSelector(state => state.messageDetailStore);
  // console.log('messageDetailHere', messageDetailHere?.ACK_STATUS);
  // const msgDescription = messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING;
  // console.log('msgDescription', msgDescription);

  // const messageReadHere = useSelector(state => state.messageLikeStore);
  // console.log('messageReadHere', messageReadHere);

  const messageStatusLikeHere = useSelector(
    state => state.messageStatusLikeStore,
  );
  // console.log('messageStatusLikeHere', messageStatusLikeHere);

  // const [thumbsUpIcon, setThumbsUpIcon] = useState(false);

  useEffect(() => {
    dispatch(
      messageDetailAction({
        employee_id: userIdProfileHere,
        messageId: route?.params?.messagedata?.MSG_ID,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (messageDetailHere?.success == 1) {
      setMsgLike(messageDetailHere?.userData?.ACK_STATUS);
    }
  }, [messageDetailHere]);

  // console.log('msgLike', msgLike);

  const onPressThumbUpIcon = () => {
    console.log('onPressThumbUpIcon');
    dispatch(
      messageStatusLikeAction({
        employee_id: userIdProfileHere,
        messageId: route?.params?.messagedata?.MSG_ID,
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
      setMsgLike(null);

      return () => {
        console.log('message detail page is render');
        // Add any cleanup logic here
      };
    }, []),
  );

  console.log('msgLike', msgLike);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackGroundColor,
        }}>
        <MainHeader
          text={'Message'}
          iconName={'arrow-left'}
          onpressBtn={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('6'),
              marginTop: hp('3'),
            }}>
            <View
              style={{
                flex: 0.85,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {route?.params?.messagedata?.MSG_SUBJECT}
              </Text>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="solid" name="star" size={hp('3')} color="#41CE68" />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('6'),
              marginTop: hp('5'),
            }}>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: route?.params?.messagedata?.EMP_PHOTO}}
                style={{
                  height: hp('6'),
                  width: wp('12'),
                  borderRadius: wp('50'),
                }}
                resizeMode={'contain'}
              />
            </View>

            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                marginLeft: wp('2'),
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {route?.params?.messagedata?.EMP_NAME}
              </Text>
              <Text style={styles.messageCardDate}>
                {route?.params?.messagedata?.ENTRY_DATE}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={msgLike != 'Y' ? 0.8 : 1}
              onPress={msgLike != 'Y' ? onPressThumbUpIcon : onPressInElse}
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type={msgLike == 'Y' ? 'solid' : 'light'}
                name="thumbs-up"
                color="#1C37A4"
                size={hp(3.5)}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal: wp('6')}}>
            {messageDetailHere.isLoading && <Loader></Loader>}

            <View style={{paddingBottom: hp('2')}}>
              <RenderHtml
                contentWidth={width}
                source={{
                  html:
                    messageDetailHere?.userData?.MSG_DETAIL_SUBSTRING ||
                    '<p></p>',
                }}
                tagsStyles={tagsStyles}
                ignoredDomTags={["wb'<", 'customTag', 'center']}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(12),
    justifyContent: 'center',
  },
  topText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.75rem',
    letterSpacing: 1,
  },
  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.69rem',
    letterSpacing: 0.25,
    lineHeight: hp('2.5'),
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});

const tagsStyles = {
  // html,
  body: {
    fontSize: hp('1.65'),
    color: '#343434',
    letterSpacing: 0.65,
    fontFamily: fontFamily.ceraLight,
    whiteSpace: 'normal',

    padding: 0,
    margin: 0,
  },
};

export default ViewMessageDetail;
