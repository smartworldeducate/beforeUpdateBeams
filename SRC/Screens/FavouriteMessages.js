import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import colors from '../Styles/colors';

const FavouriteMessages = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const textInputRef = useRef(null);
  const [searchText, setSearchText] = useState(null);

  const onPressSearchIcon = () => {
    console.log('onPressSearchIcon');
  };

  const onChangeSearchText = val => {
    setSearchText(val);
  };

  return (
    <>
      <View>
        <>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1C37A5', '#4D69DC']}
            style={styles.mainHeader}>
            <StatusBar translucent backgroundColor="transparent" />
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('6'),
                  marginHorizontal: wp('2'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    flex: 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="light"
                    name="arrow-left"
                    size={hp(2.5)}
                    color="#FFF"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headerText}>Favourite's</Text>
                </View>
                <View style={{flex: 0.15}}></View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  borderColor: 'grey',
                  borderRadius: wp('2'),
                  borderWidth: wp('0.15'),
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  marginHorizontal: wp('5'),
                  marginTop: hp('2'),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 0.8,
                  }}>
                  <TextInput
                    ref={textInputRef}
                    value={searchText}
                    onChangeText={onChangeSearchText}
                    returnKeyType={'done'}
                    iconName={'user'}
                    placeholder={'Search Message'}
                    placeholderColor={'gray'}
                    iconColor={colors.loginIconColor}
                    placeholderTextColor="gray"
                    placeholderStyle={styles.plaseholderStyle}
                    underlineColorAndroid="transparent"
                    style={styles.textInputCustomStyle}
                    // autoFocus
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.searchicon,
                    {
                      borderTopRightRadius: wp('2'),
                      borderBottomRightRadius: wp('2'),
                    },
                  ]}
                  onPress={onPressSearchIcon}>
                  <Icon
                    type="light"
                    name="magnifying-glass"
                    size={hp(2.5)}
                    color="#292D32"
                  />
                </TouchableOpacity>
              </View>
            </>
          </LinearGradient>
        </>
      </View>
    </>
  );
};

export default FavouriteMessages;

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp('20'),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
  },
  headerText: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    letterSpacing: 0.35,
  },

  plaseholderStyle: {
    color: 'silver',
    fontSize: '0.65rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
  },

  textInputCustomStyle: {
    height: hp('6'),
    letterSpacing: -0.05,
    color: '#292D32',
    fontSize: '0.7rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    paddingLeft: wp('2'),
  },
  searchicon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e8ed',
  },

  messageCardEmpName: {
    color: '#201F24',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  msgSubject: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '300',
    fontSize: '0.57rem',
    letterSpacing: 0.15,
  },
  messageCardDate: {
    color: '#201F24',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
});
