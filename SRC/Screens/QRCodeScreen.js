import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Linking,
  AppRegistry,
  TouchableOpacity,
  Button,
} from 'react-native';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../Styles/colors';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {QRScanAction} from '../features/QRScan/QRScan';

const QRCodeScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const QRCodeScanHere = useSelector(state => state.QRScanStore);
  console.log('QRCodeScanHere', QRCodeScanHere);

  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef(null);

  const [scanData, setScanData] = useState('Start Scanning ...');

  const onSuccess = e => {
    // console.log('Scanned QR code data:', e.data);
    // console.log('all e', e);
    dispatch(
      QRScanAction({
        employee_id: profileHereEmpId,
        tag_text: e.data,
      }),
    );
    setScanData(e.data);
    setScanning(false);
    scannerRef.current.reactivate();
  };

  const handleScanAgain = () => {
    setScanning(true);
    setScanData('');
  };

  useFocusEffect(
    React.useCallback(() => {
      setScanning(true);
      setScanData('Start Scanning ...');

      return () => {
        console.log('QRCodeScreen is unfocused');
        // dispatch(clearViewAllMessagesState());
      };
    }, []),
  );

  return (
    <>
      <View>
        <MainHeader
          text={'QR Scanner'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackGroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {scanning ? (
          <QRCodeScanner
            ref={scannerRef}
            cameraStyle={{height: hp('60')}}
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            topContent={
              <View style={{}}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={{
                    fontSize: hp('1.25'),
                    color: 'black',
                    fontFamily: fontFamily.ceraMedium,
                    marginVertical: hp(2),
                  }}>
                  {scanData}
                </Text>
              </View>
            }
            bottomContent={
              <View
                style={{
                  paddingTop: hp(3),
                }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={{
                    fontSize: hp('2.25'),
                    color: '#1C37A4',
                    fontFamily: fontFamily.ceraMedium,
                  }}>
                  {'QR Scanner'}
                </Text>
              </View>
            }
          />
        ) : (
          <View style={{marginHorizontal: wp('10')}}>
            {QRCodeScanHere?.success == 1 && (
              <>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: `${QRCodeScanHere?.qrCodeImage}`,
                    }}
                    style={{
                      height: hp('20'),
                      width: wp('40'),
                      borderWidth: wp('1'),
                      borderColor: 'black',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <View
                  style={{
                    marginTop: hp('4'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2.75'),
                      color: 'black',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    {'Training for Leadership'}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp('4'),
                    justifyContent: 'center',
                    marginHorizontal: wp('15'),
                  }}>
                  <Text
                    style={{
                      fontSize: hp('1.75'),
                      color: 'grey',
                      fontFamily: fontFamily.ceraMedium,
                      textAlign: 'center',
                    }}>
                    {`${QRCodeScanHere?.scanMessage}`}
                  </Text>
                </View>
              </>
            )}
            {/* <View style={{}}>
              <Text
                style={{
                  fontSize: hp('2'),
                  color: '#1C37A4',
                  fontFamily: fontFamily.ceraMedium,
                }}>
                {scanData}
              </Text>
            </View> */}

            {QRCodeScanHere?.success == 1 ? (
              <View style={{marginTop: hp('5')}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('QRScannerListDrawer')}
                  style={{
                    height: hp('5.5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('10'),

                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2'),
                      color: '#061D7A',
                      fontFamily: fontFamily.ceraMedium,
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={{}}>
                  <View>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: 'red',
                        fontFamily: fontFamily.ceraMedium,
                      }}>
                      {QRCodeScanHere?.message}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleScanAgain}
                    style={{
                      marginTop: hp('3'),
                      height: hp('5.5'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp('10'),

                      backgroundColor: 'white',
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                      elevation: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: '#061D7A',
                        fontFamily: fontFamily.ceraMedium,
                      }}>
                      Scan Again
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title="Scan Again" onPress={handleScanAgain} /> */}
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </>
  );
};
{
  /* <Button title="Scan Again" onPress={handleScanAgain} /> */
}
const styles = EStyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCodeScreen;
