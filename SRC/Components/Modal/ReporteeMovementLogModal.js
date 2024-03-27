import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../../Styles/fontFamily';
import EmpCardPart from '../EmpCardPart/EmpCardPart';
import Icon from 'react-native-fontawesome-pro';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Styles/colors';

const ReporteeMovementLogModal = ({
  modalVisible,
  onRequestClose,
  movementLogData,
  statusValue,
  serviceLengthValue,
  ageValue,
}) => {
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: hp('1.75'),
          marginHorizontal: wp('5'),
          paddingTop: hp('0.2'),
          height: hp('17'),
        }}>
        <View
          style={{
            flex: 0.08,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="solid" name="circle" size={hp(2.25)} color="#1C37A4" />
            {/* <Text style={{color: 'black'}}>🔵</Text> */}
          </View>
          <View
            style={{
              flex: 0.1,
            }}></View>
          <View
            style={{
              backgroundColor: '#1C37A4',
              flex: 0.8,
              width: wp('1'),
              borderRadius: wp('1'),
            }}>
            <Text style={{color: 'black'}}></Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.03,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <View
          style={{
            flex: 0.89,
            flexDirection: 'column',
            paddingHorizontal: wp('3'),
            backgroundColor: 'white',
            borderRadius: wp('3'),
            paddingVertical: hp('0.5'),
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1'),
            }}>
            <View
              style={{
                flex: 0.35,
                justifyContent: 'center',
              }}>
              <Text style={styles.cardText}>{item?.SINCE}</Text>
            </View>
            <View
              style={{
                flex: 0.65,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.cardText,
                  {
                    backgroundColor: item?.BACKGROUND_COLOR,
                    paddingVertical: hp('0.75'),
                    paddingHorizontal: wp('4'),
                    borderRadius: wp('5'),
                    color: item?.COLOR,
                  },
                ]}>
                {item?.MOMENT_TYPE}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: hp('1.25'),
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                styles.textDesc,
                {fontSize: hp('1.5'), fontFamily: fontFamily.ceraBold},
              ]}>
              {item?.DESIGNATION}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                styles.textDesc,
                {fontSize: hp('1.4'), fontFamily: fontFamily.ceraMedium},
              ]}>
              {item?.BR_NAME}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.textDesc]}>
              {`${item?.SINCE} | ${item?.DURATION} Year`}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.textDesc}>
              {`${item?.SALARY} Rs`}
            </Text>
          </View>
        </View>
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
                <Text style={styles.textstyle}>{'Reportee Movment Log'}</Text>
              </View>
              <View style={{flex: 0.15}}></View>
            </View>
          </LinearGradient>
          <View style={{marginVertical: hp('3')}}>
            <View style={{marginHorizontal: wp('5')}}>
              <EmpCardPart
                firstText={'STATUS'}
                statusValue={statusValue}
                secondText={'SERVICE'}
                serviceLengthValue={serviceLengthValue}
                thirdText={'AGE'}
                ageValue={ageValue}
              />
            </View>

            <View
              style={{
                marginTop: hp('2'),
                marginBottom: hp('1'),
                paddingTop: hp('0.5'),
              }}>
              <FlatList
                data={movementLogData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  cardText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.57rem',
    fontWeight: '700',
  },

  textDesc: {
    color: '#353535',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    fontSize: '0.58rem',
    letterSpacing: 0.35,
  },
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
});

export default ReporteeMovementLogModal;
