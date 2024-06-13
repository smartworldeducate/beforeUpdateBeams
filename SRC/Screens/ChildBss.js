import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Linking,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Image} from 'react-native';
import colors from '../Styles/colors';
import BssChild from '../Components/BssChild';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Clipboard from '@react-native-community/clipboard';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ProfileCardBody from '../Components/ProfileCard/ProfileCardBody';
import ChildsInBss from '../Components/ChildsInBss/ChildsInBss';
import Loader from '../Components/Loader/Loader';

const ChildBss = props => {
  const profileHere = useSelector(state => state.profileStore);
  console.log('profileHereBSS>', profileHere?.userData?.bsschildResult_result);

  const [expanded, setExpended] = useState(false);
  const onPress = ({item}) => {
    // console.log('itemExp', item);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: wp('3'),
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          marginVertical: hp('1'),
          marginHorizontal: wp('1'),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.25}}></View>

          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: hp('1'),
            }}>
            <View
              style={{
                borderRadius: wp('50'),
                borderWidth: wp('1'),
                borderColor:
                  item?.FEE_DUE == null || item?.FEE_DUE == 0
                    ? '#D4FFCC'
                    : '#FFC700',
              }}>
              <Image
                source={{uri: item?.CHILD_IMAGE}}
                style={{
                  height: hp('12'),
                  width: wp('24'),
                  borderRadius: wp('50'),
                }}
                resizeMode={'contain'}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
            }}>
            {item?.FEE_DUE == null || item?.FEE_DUE == 0 ? (
              <View
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#D4FFCC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('2'),
                  paddingVertical: hp('0.5'),
                  marginTop: hp('2'),
                  marginRight: wp('2'),
                }}>
                <Text
                  style={[
                    styles.stdStdIdText,
                    {
                      textAlign: 'right',
                      fontFamily: fontFamily.ceraMedium,
                      color: '#2D8E00',
                    },
                  ]}>
                  PAID
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: hp('0.15'),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.stdNameText}>
            {item?.STD_NAME}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp('5'),
          }}>
          <View style={{flex: 0.35}}>
            <Text
              style={[
                styles.stdStdIdText,
                ,
                {fontFamily: fontFamily.ceraMedium},
              ]}>
              ID
            </Text>
          </View>
          <View
            style={{
              flex: 0.75,

              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.stdStdIdText, {textAlign: 'right'}]}>
              {item?.BR_STD_ID}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp('5'),
          }}>
          <View style={{flex: 0.35}}>
            <Text
              style={[
                styles.stdStdIdText,
                {fontFamily: fontFamily.ceraMedium},
              ]}>
              School
            </Text>
          </View>
          <View
            style={{
              flex: 0.75,
              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.stdStdIdText, {textAlign: 'right'}]}>
              {item?.BR_NAME}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp('5'),
          }}>
          <View style={{flex: 0.35}}>
            <Text
              style={[
                styles.stdStdIdText,
                {fontFamily: fontFamily.ceraMedium},
              ]}>
              Class
            </Text>
          </View>
          <View
            style={{
              flex: 0.75,
              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.stdStdIdText, {textAlign: 'right'}]}>
              {item?.CLASS_SECTION}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp('5'),
          }}>
          <View style={{flex: 0.35}}>
            <Text
              style={[
                styles.stdStdIdText,
                {fontFamily: fontFamily.ceraMedium},
              ]}>
              DOB
            </Text>
          </View>
          <View
            style={{
              flex: 0.75,

              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.stdStdIdText, {textAlign: 'right'}]}>
              {item?.DATE_OF_BIRTH}
            </Text>
          </View>
        </View>

        {item?.FEE_DUE == null || item?.FEE_DUE == 0 ? (
          <></>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp('5'),
              }}>
              <View style={{flex: 0.35}}>
                <Text
                  style={[
                    styles.stdStdIdText,
                    {fontFamily: fontFamily.ceraMedium},
                  ]}>
                  Fee Due
                </Text>
              </View>
              <View
                style={{
                  flex: 0.75,

                  alignItems: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                  {item?.FEE_DUE == null || item?.FEE_DUE == ''
                    ? ''
                    : Number(item?.FEE_DUE).toLocaleString()}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp('5'),
              }}>
              <View style={{flex: 0.35}}>
                <Text
                  style={[
                    styles.stdStdIdText,
                    {fontFamily: fontFamily.ceraMedium},
                  ]}>
                  Fee Period
                </Text>
              </View>
              <View
                style={{
                  flex: 0.75,

                  alignItems: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                  {item?.FEE_PERIOD}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp('5'),
              }}>
              <View style={{flex: 0.35}}>
                <Text
                  style={[
                    styles.stdStdIdText,
                    {fontFamily: fontFamily.ceraMedium},
                  ]}>
                  Due Date
                </Text>
              </View>
              <View
                style={{
                  flex: 0.75,
                  alignItems: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                  {item?.DUE_DATE == null || item?.FEE_DUE == ''
                    ? ''
                    : item?.DUE_DATE}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp('5'),
              }}>
              <View style={{flex: 0.35}}>
                <Text
                  style={[
                    styles.stdStdIdText,
                    {fontFamily: fontFamily.ceraMedium},
                  ]}>
                  Invoice Number
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  copyToClipboard({itemInvoiceNumber: item?.INVOICE_NUM})
                }
                style={{
                  flex: 0.75,

                  alignItems: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.stdStdIdText, {textAlign: 'right'}]}>
                  {item?.INVOICE_NUM == null || item?.INVOICE_NUM == ''
                    ? ''
                    : item?.INVOICE_NUM}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp('5'),
                marginTop: hp('1'),
                marginBottom: hp('1.5'),
              }}>
              <View style={{flex: 0.65}}></View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => Linking.openURL(item?.PAYMENT_URL)}
                style={{
                  flexDirection: 'row',
                  flex: 0.35,
                  backgroundColor: '#FFC700',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('5'),
                  paddingVertical: hp('0.5'),
                }}>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      styles.stdStdIdText,
                      {textAlign: 'right', fontFamily: fontFamily.ceraMedium},
                    ]}>
                    Pay now
                  </Text>
                </View>

                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon="fat fa-solid fa-arrow-right"
                    size={hp(1.75)}
                    style={{color: '#8E7700'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  const copyToClipboard = ({itemInvoiceNumber}) => {
    // console.log('copyToClipboard', itemInvoiceNumber);
    Clipboard.setString('');
    Clipboard.setString(itemInvoiceNumber);
    ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
    // Clipboard.setString('Welcome to My Simple Page');
  };

  return (
    <>
      <View>
        <MainHeader
          text={`Children in Beaconhouse`}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {profileHere?.isLoading && <Loader></Loader>}

      {/* <BssChild/> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f8fc',
        }}>
        <View
          style={{
            marginVertical: hp('1'),
            marginHorizontal: wp('2'),
            paddingHorizontal: wp('1'),
          }}>
          <FlatList
            data={profileHere?.userData?.bsschildResult_result}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: hp('1.75'),
                  color: 'black',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                There are currently no children enrolled in Beaconhouse.
              </Text>
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ChildBss;

const styles = EStyleSheet.create({
  stdNameText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.69rem',
  },

  stdStdIdText: {
    color: 'grey',
    paddingVertical: hp('0.5'),
    fontSize: '0.55rem',
  },
  stdDetails: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    fontSize: '0.6rem',
  },
  stdValueDetails: {
    color: '#353535',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.6rem',
  },
  noDataText: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: colors.drakGrey,
    fontWeight: '300',
    letterSpacing: 0.25,
    textAlign: 'center',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('0.5'),
  },
});
