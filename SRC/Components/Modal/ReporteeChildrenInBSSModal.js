import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../../Styles/fontFamily';
import ChildsInBss from '../ChildsInBss/ChildsInBss';
import Icon from 'react-native-fontawesome-pro';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Styles/colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const ReporteeChildrenInBSSModal = ({
  modalVisible,
  onRequestClose,
  reporteeChildrenData,
}) => {
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
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
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
                height: hp('7'),
                marginHorizontal: wp('2'),
              }}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name={'arrow-left'}
                  size={hp(2.5)}
                  color="#fff"
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textstyle}>
                  {'Children in Beaconhouse'}
                </Text>
              </View>
              <View style={{flex: 0.15}}></View>
            </View>
          </LinearGradient>
          <View
            style={{
              marginVertical: hp('3'),
              marginHorizontal: wp('3'),
              paddingHorizontal: wp('1'),
            }}>
            <FlatList
              data={reporteeChildrenData}
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
    </Modal>
  );
};

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp('7'),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
    marginBottom: hp('0'),
  },
  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  stdNameText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  stdStdIdText: {
    color: 'black',
    color: '#2D8E00',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    paddingVertical: hp('0.5'),
    fontSize: '0.55rem',
    borderRadius: wp('5'),
  },
});

export default ReporteeChildrenInBSSModal;
