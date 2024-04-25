import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Left from 'react-native-vector-icons/AntDesign';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';

const MainHeader = ({
  text,
  iconName,
  onpressBtn,
  rightIcon,
  yearText,
  onPressRightText,
}) => {
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={styles.mainHeader}>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(6),
            height: hp('5'),
            marginHorizontal: wp('2'),
          }}>
          <TouchableOpacity
            onPress={onpressBtn}
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="light" name={iconName} size={hp(2.5)} color="#fff" />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textstyle}>{text}</Text>
          </View>

          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {rightIcon && (
              <Icon type="light" name={rightIcon} size={hp(2.5)} color="#fff" />
            )}
            {yearText && (
              <Text
                onPress={onPressRightText}
                style={[styles.textstyle, {padding: wp('1')}]}>
                {yearText}
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default MainHeader;

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(12),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(3),
  },
  headerChild: {
    marginTop: hp(6),
    flexDirection: 'row',
    width: wp(90),
    justifyContent: 'space-between',
    marginHorizontal: hp(2.5),
  },
  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    letterSpacing: 0.35,
  },
});
