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

const ViewMessageDetail = ({route}) => {
  console.log('routeData', route?.params?.messagedata);
  const dispatch = useDispatch();
  // console.log('ViewMessageDetail');
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const messageDetailHere = useSelector(state => state.messageDetailStore);
  console.log('messageDetailHere', messageDetailHere);
  const msgDescription = messageDetailHere?.userData;
  //   console.log('msgDescription', msgDescription);

  const [thumbsUpIcon, setThumbsUpIcon] = useState(false);

  useEffect(() => {
    dispatch(
      messageDetailAction({
        messageId: route?.params?.messagedata?.MSG_ID,
      }),
    );
  }, [dispatch]);

  const onPressThumbUpIcon = () => {
    setThumbsUpIcon(!thumbsUpIcon);
  };

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
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1C37A5', '#4D69DC']}
          style={styles.mainHeader}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('4'),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.topText}>Message</Text>
            </View>
            <View style={{flex: 0.5}}></View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={{
                  justifyContent: 'center',
                  marginTop: hp(0),
                  padding: hp('1.25'),
                }}>
                <Icon type="light" name="xmark" size={hp(3)} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={{marginHorizontal: wp('5')}}>
          <View
            style={{
              marginTop: hp('2.5'),
              flexDirection: 'row',
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
                  height: hp('5'),
                  width: wp('10'),
                  borderRadius: wp('50'),
                }}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{
                flex: 0.85,
              }}>
              <Text
                numberOfLines={1}
                letterSpacing={'tail'}
                style={styles.messageCardEmpName}>
                {route?.params?.messagedata?.EMP_NAME}
              </Text>
              <Text style={styles.messageCardDate}>
                {route?.params?.messagedata?.HIRE_DATE}
              </Text>
            </View>
          </View>

          {messageDetailHere.isLoading && <Loader></Loader>}

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View
              style={{
                marginHorizontal: wp('2'),
                marginTop: hp('3'),
              }}>
              <Text
                style={{
                  fontSize: hp('2'),
                  fontFamily: fontFamily.ceraMedium,
                  fontWeight: '500',
                  color: '#1C37A4',
                  paddingBottom: hp('1'),
                }}>
                {route?.params?.messagedata?.MSG_SUBJECT}
              </Text>

              <View
                style={{
                  marginTop: hp('0'),
                  marginHorizontal: wp('0.5'),
                  marginBottom: hp('25'),
                  // backgroundColor: 'red',
                }}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: msgDescription,
                  }}
                  tagsStyles={tagsStyles}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.75}}></View>
        <TouchableOpacity
          onPress={onPressThumbUpIcon}
          style={{
            flex: 0.25,
            paddingVertical: hp('1.25'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            type={thumbsUpIcon ? 'solid' : 'light'}
            name="thumbs-up"
            color="#1C37A4"
            size={hp(4)}
          />
        </TouchableOpacity>
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

const tagsStyles = {
  p: {
    fontSize: hp('1.65'),
    color: '#353535',
    letterSpacing: 0.65,
    color: '#343434',
    fontFamily: fontFamily.ceraLight,
  },
};

export default ViewMessageDetail;
