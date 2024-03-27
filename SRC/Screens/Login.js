import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {loginUserHandle} from '../features/register/googleLoginSlice';
import Toast from 'react-native-toast-message';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../Components/Button/Button';
import TextInputCustom from '../Components/TextInput/TextInput';
import colors from '../Styles/colors';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {LoginAction} from '../features/loginSlice/loginSlice';
const Login = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };
  const [employeeId, setEmployeeId] = useState();
  const [employeePassword, setEmployeePassword] = useState();
  const [loaduiung, setLoding] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animodal, setAnimodal] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [data, setData] = useState(null);

  //set data in local storage///

  async function saveData(value) {
    const jsonString = JSON.stringify(value);
    try {
      await AsyncStorage.setItem('loginData', jsonString);
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  const handleLogin = async () => {
    if (employeeId && employeePassword !== '') {
      var login_data = await dispatch(
        loginUserHandle({employeeId: employeeId, password: employeePassword}),
      );
      const loginObj = Object.assign({}, ...login_data.payload);
      saveData(loginObj);
      console.log('login data on login screen', loginObj);
      setData(loginObj);
      setLoding(true);
      if (login_data !== '') {
        // console.log("login page data",login_data)
        props.navigation.dispatch(StackActions.replace('HomeScreen'));
        // setLoding(false);
      } else {
        ToastAndroid.showWithGravity(
          'something went wrong',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'enter valid username and password',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  //249159142983-3r1307q40tb9de7qctsm4ckk244etg9h.apps.googleusercontent.com
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '820650781605-l9l1fmj1tj0icic0ovkld3q2o8souslj.apps.googleusercontent.com',
    });
  }, []);
  const signinWithGoogle = async () => {
    // setAnimodal(true)
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // handleNavigate('HomeScreen');
      const {id, name, email, givenName, photo} = userInfo?.user;
      //  console.log("google data",glData.payload.data)
      await storeData({google_id: id, photo: photo});
      const glData = await dispatch(loginUser({email: email, google_id: id}));
      // console.log("google data",glData.payload.data)
      // glData.payload.data ? props.navigation.navigate('Home') : props.navigation.navigate('Register')
      // setAnimodal(false)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 20;

  const onChangeEmpId = val => {
    setEmployeeId(val);
  };
  const onChangeEmpPassword = val => {
    setEmployeePassword(val);
  };

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPressLogin = () => {
    handleNavigate('HomeScreen');
  };

  const [showPassword, setShowPassword] = useState(true);
  const [eyeType, setEyeType] = useState(false);
  const onPressShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeType(!eyeType);
  };

  const loginHere = useSelector(state => state.loginStore);
  const successHere = useSelector(state => state.loginStore.success);

  console.log('successHere', successHere);

  const onPressLoginBtn = () => {
    console.log('onPressLoginBtn');
    dispatch(LoginAction({employeeId: employeeId, password: employeePassword}));
  };

  useEffect(() => {
    async function fetchData() {
      if (successHere === 1) {
        await AsyncStorage.setItem(
          'loginData',
          loginHere?.userData[0]?.EMPLOYEE_ID,
        );
        await AsyncStorage.setItem(
          'branchId',
          loginHere?.userData[0]?.BRANCH_ID,
        );
        await AsyncStorage.setItem(
          'deptId',
          loginHere?.userData[0]?.DEPARTMENT_ID,
        );
        setEmployeeId(null);
        setEmployeePassword(null);

        props.navigation.dispatch(StackActions.replace('HomeScreen'));
      }
    }
    fetchData();
  }, [successHere]);

  // useEffect(() => {
  //   console.log('HomeScreen');
  //   AsyncStorage.getItem('loginData')
  //     .then(loginData => {
  //       // console.log('loginData', loginData);
  //       const parsedLoginData = JSON.parse(loginData);
  //       console.log('parsedLoginData', parsedLoginData);

  //       dispatch(
  //         LoginAction({employeeId: employeeId, password: employeePassword}),
  //       );
  //       if (successHere) {
  //         props.navigation.dispatch(StackActions.replace('HomeScreen'));
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving loginData from AsyncStorage:', error);
  //     });
  // }, [dispatch]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={colors.loginIconColor} />

      {/* {animation && (
        <View>
          <Modal isVisible={animodal}>
            <View style={styles.modalView}>
              <View style={{}}>
                <ActivityIndicator animating={animation} size={'large'} />
              </View>
              <View style={{}}>
                <Text>please wait</Text>
              </View>
            </View>
          </Modal>
        </View>
      )} */}
      <ImageBackground
        source={{uri: 'appbg'}}
        style={{flex: 1}}
        resizeMode={'cover'}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={{marginHorizontal: wp('5')}}>
            <View
              style={{
                marginTop: hp('8'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'logonew'}}
                style={{height: hp('25'), width: wp('50')}}
                resizeMode={'contain'}
              />
            </View>

            <View style={{marginHorizontal: wp('2')}}>
              <View style={{marginTop: hp('3'), marginBottom: hp('2')}}>
                <Text
                  style={{fontSize: hp('2.75'), color: colors.loginTextColor}}>
                  Login
                </Text>
              </View>

              <View style={styles.textInputView}>
                <TextInputCustom
                  value={employeeId}
                  onChangeText={onChangeEmpId}
                  keyboardType={'numeric'}
                  maxLength={11}
                  returnKeyType={'done'}
                  iconName={'user-tie'}
                  placeholder={'Employee ID'}
                  placeholderColor={colors.loginTextColor}
                  // iconColor={colors.loginIconColor}
                  style={styles.textInputCustomStyle}
                />
              </View>

              <View style={styles.textInputView}>
                <TextInputCustom
                  value={employeePassword}
                  onChangeText={onChangeEmpPassword}
                  keyboardType={'default'}
                  maxLength={11}
                  returnKeyType={'done'}
                  iconName={'key'}
                  iconRight={eyeType == true ? 'eye' : 'eye-slash'}
                  placeholder={'Password'}
                  placeholderColor={colors.loginTextColor}
                  secureTextEntry={showPassword}
                  iconColor={colors.loginIconColor}
                  onPressIcon={onPressShowPassword}
                  style={styles.textInputCustomStyle}
                />
              </View>

              {/* <View style={{flexDirection: 'row', marginVertical: hp('1')}}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Switch
                    trackColor={{false: '#767577', true: '#061D7A'}}
                    thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View
                  style={{
                    flex: 0.4,

                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: hp('1.75'), color: '#120D26'}}>
                    Remember Me
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: hp('1.75'), color: '#120D26'}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View
              style={{
                marginTop: hp('3'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={handleLogin}
                onPress={onPressLoginBtn}
                style={styles.loginbtn}>
                <Text style={{color: '#061D7A'}}>LOGIN</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.orbtn}>OR</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginWithGoogle}
              onPress={() =>
                signinWithGoogle()
                  .then(res => {
                    console.log('respo:', res);
                  })
                  .catch(error => {
                    console.log(error);
                  })
              }>
              <View style={{flex: 0.15}}></View>

              <View
                style={{
                  flex: 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: 'google'}}
                  style={{
                    height: hp('3.75'),
                    width: wp('7'),
                  }}
                  resizeMode={'contain'}
                />
              </View>

              <View style={{flex: 0.5}}>
                <Text style={{color: colors.loginTextColor, fontSize: hp('2')}}>
                  {'Login with Google'}
                </Text>
              </View>

              <View style={{flex: 0.1}}></View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  orbtn: {
    textAlign: 'center',
    fontSize: hp('2'),
    marginVertical: hp('2'),
    color: colors.greyColor,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  loginbtn: {
    height: hp('7'),
    width: wp('85'),
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 7,
  },
  modalView: {
    width: wp(30),
    height: hp(15),
    backgroundColor: '#EAFAF1',
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hp(15),
  },
  textInputView: {
    marginTop: hp('2'),
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),
    borderRadius: wp('10'),
    marginBottom: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('6'),
    color: colors.loginIconColor,
  },
  loginWithGoogle: {
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),
    marginHorizontal: wp('2'),

    borderRadius: wp('10'),
    marginBottom: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },
});

export default Login;
