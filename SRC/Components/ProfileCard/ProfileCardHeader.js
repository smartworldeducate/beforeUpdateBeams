import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';

const ProfileCardHeader = ({userIcon, headerText}) => {
  const [expanded, setExpended] = useState(false);
  const onPress = ({item}) => {
    console.log('itemExp', item);
  };
  return (
    <View
      style={{
        height: hp('6'),
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 0.13,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon type="light" name={userIcon} color="#979797" size={hp(2.5)} />
      </View>
      <View
        style={{
          flex: 0.74,
          justifyContent: 'center',
        }}>
        <Text style={styles.header}>{headerText}</Text>
      </View>
      <View
        style={{
          flex: 0.13,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          type="light"
          name="chevron-right"
          color="#979797"
          size={hp(2.5)}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    fontSize: '0.62rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
  },
});

export default ProfileCardHeader;
