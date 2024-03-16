import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';
import EmpCardPart from '../../Components/EmpCardPart/EmpCardPart';
import fontFamily from '../../Styles/fontFamily';
import {useSelector} from 'react-redux';

const ReporteeProfile = ({route}) => {
  const valHere = route.params.deviceTypeParam;
  console.log('valHere', valHere);
  const profileHere = useSelector(state => state.profileStore);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1C37A4',
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#1C37A4',
        }}>
        <StatusBar barStyle={'default'} backgroundColor={'#1C37A4'} />

        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('7'),
            marginHorizontal: wp('2'),
            height: hp('5'),
          }}>
          <TouchableOpacity style={styles.topLeftRightView}>
            <Icon type="light" name={'bell'} size={hp(3.5)} color="#fff" />
          </TouchableOpacity>
          <View style={{flex: 0.7}}></View>
          <TouchableOpacity
            onPress={() => props.navigation.openDrawer()}
            style={styles.topLeftRightView}>
            <Image
              style={styles.menustyle}
              source={{uri: 'menuicon'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: hp('22'),
            backgroundColor: 'white',
            marginHorizontal: wp('4'),
            marginTop: hp('3'),
            borderRadius: wp('5'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('5'),
            }}>
            <View style={{flex: 0.15}}></View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'column',
                marginHorizontal: wp('2'),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.75}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.empName}>
                    {profileHere?.userData?.emp_result?.EMP_NAME}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.25,
                    backgroundColor: '#D4FFCC',
                    borderRadius: wp('3'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.empId}>
                    {profileHere?.userData?.emp_result?.EMPLOYEE_ID}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.empDesignation}>
                  {profileHere?.userData?.emp_result?.DESIGNATION}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.15,
              }}></View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#DBDBDB',
              marginTop: hp(3),
              marginBottom: hp(2),
            }}></View>

          <View style={{marginHorizontal: wp('3')}}>
            <EmpCardPart
              statusValue={
                profileHere?.userData?.emp_result?.EMP_STATUS_DESCRIPTION
              }
              serviceLengthValue={
                profileHere?.userData?.emp_result?.SERVICE_LENGTH
              }
              ageValue={profileHere?.userData?.emp_result?.TOTAL_AGE}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReporteeProfile;

const styles = EStyleSheet.create({
  topLeftRightView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menustyle: {
    width: '1rem',
    height: '1rem',
  },
  empName: {
    fontSize: '0.73rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
    paddingVertical: hp('0.35'),
  },
  empId: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraBold,
    color: '#2D8E00',
    fontWeight: '700',
    textAlign: 'center',
  },
  empDesignation: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    fontWeight: '500',
  },
});
