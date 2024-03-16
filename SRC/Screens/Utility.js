import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import LinearGradient from 'react-native-linear-gradient';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import {messagesAction} from '../features/MessagesSlice/MessagesSlice';
import {UtilityAction} from '../features/UtilitySlice/UtilitySlice';
const Utility = props => {
  const dispatch = useDispatch();
  const utilityHere = useSelector(state => state.utilityStore?.userData);
  console.log('utilityHere', utilityHere);

  useEffect(() => {
    dispatch(UtilityAction());
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    console.log('index', index);
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item?.utility_url)}
        style={{
          paddingHorizontal: wp('2'),
          paddingVertical: hp('2'),
          backgroundColor: 'white',
          borderRadius: wp('3'),
          marginVertical: hp('1'),
        }}>
        <Text style={styles.textStyle}>{item?.utility_title}</Text>
        <Text style={styles.textStyle}>{item?.utility_desc}</Text>
        <Text style={styles.textStyle}>{item?.utility_url}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <MainHeader
        text={'Utility'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp('3'),
            marginTop: hp('5'),
          }}>
          <FlatList
            data={utilityHere}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    color: 'black',
    fontFamily: fontFamily.ceraLight,
    fontSize: hp('1.75'),
    fontWeight: '500',
  },
});
export default Utility;
