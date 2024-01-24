import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-fontawesome-pro';
import {StackActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CustomDrawer = ({navigation}) => {
  const [localData, setLocalData] = useState(null);
  const [data, setData] = useState([]);
  const userData = useSelector(state => state.userLogin);
  console.log('drawer data', userData?.user);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setLocalData(parsedData);
        return value;
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  async function saveData() {
    console.log('logout');
    await AsyncStorage.removeItem('loginData');
    navigation.dispatch(StackActions.replace('Login'));
  }
  // console.log(' drawer lacal data', localData?.EMP_PHOTO);
  useEffect(() => {
    getData('loginData');
  }, []);
  return (
    <>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#1C37A5', '#4D69DC']}
        style={{flex: 1}}>
        <View
          style={{
            height: hp(8),
            flexDirection: 'row',
            marginTop: hp(7),
          }}>
          <View
            style={{
              flex: 0.8,
            }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                color: '#fff',
                fontSize: hp(3),
              }}>
              <Icon type="light" name="xmark" size={hp(3.5)} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginHorizontal: hp(5.5)}}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: hp(2),
              marginTop: hp(1),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                borderRadius: hp(50),
                marginRight: hp(3),
                flex: 0.15,
              }}>
              <Image
                style={{
                  width: wp(14),
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: hp(7),
                  borderRadius: hp(50),
                }}
                source={{uri: 'salman'}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={{flex: 0.85}}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.username}>
                  Salman Ali
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(0)}}>
                <View style={{marginRight: hp(1)}}>
                  <View style={{flexDirection: 'row', marginTop: hp(0)}}>
                    <View style={{marginRight: hp(1)}}>
                      <Text style={styles.viewProfile}>View Profile</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.listnameStyle, {marginTop: hp(4)}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreenDrawer')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Home</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Attendance</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Financial')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Financials</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Timeline</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Reportee')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Reportees</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Approcial')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Appraisal</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('ChildBss')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Children in BSS</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Index</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('FeedBack')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Feedback</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listnameStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Utility')}>
              <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                <View style={styles.homeleft}>
                  <Text style={styles.textlistStyle}>Utility</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={styles.listnameStyle}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TestScreen')}>
                  <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                    <View style={styles.homeleft}>
                      <Text style={styles.textlistStyle}>Change Password</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.listnameStyle}>
                <TouchableOpacity onPress={saveData}>
                  <View style={{flexDirection: 'row', marginLeft: hp(3)}}>
                    <View style={styles.homeleft}>
                      <Text style={styles.textlistStyle}>Logout</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Image
                style={{width: wp(40), height: hp(20)}}
                source={{uri: 'dimg'}}
                resizeMode={'contain'}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default CustomDrawer;

const styles = EStyleSheet.create({
  username: {
    fontSize: '0.7rem',
    color: '#fff',
    fontWeight: '700',
    marginTop: hp(1),
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  viewProfile: {
    fontSize: '0.5rem',
    color: '#FFF',
    fontSize: hp(1.5),
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  textlistStyle: {
    fontSize: '0.7rem',
    color: '#fff',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  listnameStyle: {
    width: wp(50),
    height: hp(5),
    marginTop: hp(0.4),
    justifyContent: 'center',
  },
  homeleft: {marginLeft: hp(0.5)},
});
