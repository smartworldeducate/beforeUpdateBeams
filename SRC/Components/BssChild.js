import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GraphList from './GraphList';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';
export default BssChild = ({item}) => {
  const childData = useSelector(state => state.childState);
  // console.log('chlidern data in bss copm', childData?.user);
  const [expanded, setExpended] = useState(false);
  const onPress = ({item}) => {
    // console.log('onPress item', item);
    // setExpended(!expanded);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginVertical: hp(0.5)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: hp(2),
            marginHorizontal: hp(2.5),
            elevation: 4,
          }}>
          <Collapse isExpanded={expanded} onToggle={() => onPress(item)}>
            <CollapseHeader
              style={{
                height: hp(10.7),
                marginHorizontal: hp(1),
              }}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: hp(-2),
                      marginVertical: hp(0.3),
                    }}>
                    <Image
                      style={{
                        width: wp(16),
                        height: hp(8),
                        marginTop: hp('0.5'),
                        // position: 'absolute',
                        // top: hp(0),
                        borderRadius: hp(1),
                      }}
                      source={{uri: 'group'}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{flex: 0.7, marginLeft: hp(-2.5)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{marginVertical: hp(1.5), marginLeft: hp(-1)}}>
                        <Text style={styles.childname}>{item?.STD_NAME}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: hp(2),
                        }}>
                        <Text style={[styles.number, {padding: hp(0.5)}]}>
                          {item?.BR_STD_ID}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp(-2),
                      }}>
                      <View style={{marginVertical: hp(1.5)}}>
                        <Text style={styles.testname}>DOB:</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: hp(2),
                        }}>
                        <Text style={[styles.textnum, {paddingRight: 5}]}>
                          {item?.DATE_OF_BIRTH}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp(-2.5),
                      }}>
                      <View style={{marginVertical: hp(1.5)}}>
                        <Text style={styles.testname}>Class Section:</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: hp(2),
                        }}>
                        <Text style={[styles.textnum, {paddingRight: 5}]}>
                          {item?.CLASS_SECTION.replace(/\s+$/, '')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody style={{marginHorizontal: hp(2.5)}}>
              <View
                style={{
                  height: hp(4),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.testname}>Fee Due</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.textnum}>{item?.FEE_DUE}</Text>
                </View>
              </View>
              {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}

              <View
                style={{
                  height: hp(4),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.testname}>Due Date</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.textnum}>{item?.DUE_DATE}</Text>
                </View>
              </View>
              {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}
              <View
                style={{
                  height: hp(4),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.testname}>Invoice</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.textnum}>{item?.INVOICE_NUM}</Text>
                </View>
              </View>
              {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}
              <View
                style={{
                  height: hp(5.5),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  {/* <Text style={styles.testname}>Invoice</Text> */}
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    width: wp(18),
                    height: hp(4),
                    borderRadius: hp(5),
                    backgroundColor: '#1C37A4',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.textnum, {color: '#fff'}]}>Pay</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}
            </CollapseBody>
          </Collapse>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginTop: hp('1')}}>
      <FlatList
        data={childData?.user}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
  ftbotom: {
    color: '#FFF',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  mainHeader: {
    height: hp(8),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(0),
    borderBottomLeftRadius: hp(0),
  },
  container: {
    flex: 1,
    marginTop: hp(0),
  },

  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.55rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  childname: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.65rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },

  salaryMainView: {
    height: hp(7),
    marginHorizontal: hp(2.5),
    borderRadius: hp(1),
    backgroundColor: '#E7E7E7',
    marginTop: hp(2),
  },
  testname: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
