import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Linking,
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
          marginVertical: hp('0.75'),
          marginHorizontal: wp('2'),

          backgroundColor: 'white',
          borderRadius: wp('3'),
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          paddingVertical: hp('1'),
        }}>
        <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
          <CollapseHeader>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: wp('1.5'),
                  }}>
                  <Image
                    source={{uri: item?.CHILD_IMAGE}}
                    style={{
                      height: hp('8'),
                      width: wp('16'),
                      borderRadius: wp('3'),
                    }}
                    resizeMode={'contain'}
                  />
                </View>

                <View style={{flex: 0.8}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginTop: hp('0.25'),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: wp('1'),
                      }}>
                      <View style={{flex: 0.7}}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={styles.stdNameText}>
                          {item?.STD_NAME}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          backgroundColor: '#D4FFCC',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                          marginRight: wp('2'),
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={styles.stdStdIdText}>
                          {item?.BR_STD_ID}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginBottom: hp('0.5'),
                    }}>
                    <ChildsInBss
                      leftText={'DOB:'}
                      rightText={item?.DATE_OF_BIRTH}
                    />
                    <ChildsInBss
                      leftText={'Class Section:'}
                      rightText={item?.CLASS_SECTION}
                    />
                  </View>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp('1'),
                }}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: wp('1.5'),
                  }}></View>
                <View style={{flex: 0.8}}>
                  <ChildsInBss leftText={'School'} rightText={item?.BR_NAME} />
                  <ChildsInBss
                    leftText={'Fee Due:'}
                    rightText={item?.FEE_DUE}
                  />
                  <ChildsInBss
                    leftText={'Due Date:'}
                    rightText={item?.DUE_DATE}
                  />
                  <ChildsInBss
                    leftText={'Invoice'}
                    rightText={item?.INVOICE_NUM}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: hp('0.5'),
                      height: hp('3.5'),
                    }}>
                    <View style={{flex: 0.65}}></View>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item?.INVOICE_NUM)}
                      style={{
                        flex: 0.3,
                        backgroundColor: '#1C37A4',
                        borderRadius: wp('5'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp('1.25'),
                          fontWeight: '300',
                          fontFamily: fontFamily.ceraMedium,
                        }}>
                        PAY NOW
                      </Text>
                    </TouchableOpacity>
                    <View style={{flex: 0.05}}></View>
                  </View>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    );
  };

  return (
    <>
      <View>
        <MainHeader
          text={`Child's in BSS`}
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
            marginVertical: hp('3'),
            marginHorizontal: wp('3'),
            paddingHorizontal: wp('1'),
          }}>
          <FlatList
            data={profileHere?.userData?.bsschildResult_result}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text style={styles.noDataText}>
                Not a single your Children in Beaconhouse.
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
    fontSize: '0.67rem',
  },
  stdStdIdText: {
    color: 'black',
    // backgroundColor: '#D4FFCC',
    color: '#2D8E00',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    // paddingHorizontal: wp('1'),
    paddingVertical: hp('0.5'),
    fontSize: '0.55rem',
    borderRadius: wp('5'),
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
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    color: colors.drakGrey,
    fontWeight: '300',
    letterSpacing: 0.25,
    textAlign: 'center',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('0.5'),
  },
});
