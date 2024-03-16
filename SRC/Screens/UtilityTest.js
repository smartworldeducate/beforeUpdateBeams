import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
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
const UtilityTest = props => {
  const dataArray = [
    {prop1: 'value1', prop2: 'value2'},
    {prop1: 'value3', prop2: 'value4'},
    {prop1: 'value5', prop2: 'value6'},
    {prop1: 'value7', prop2: 'value8'},
    {prop1: 'value9', prop2: 'value10'},
    {prop1: 'value11', prop2: 'value12'},
    {prop1: 'value13', prop2: 'value14'},
    {prop1: 'value15', prop2: 'value16'},
    {prop1: 'value17', prop2: 'value18'},
    {prop1: 'value19', prop2: 'value20'},
    {prop1: 'value21', prop2: 'value22'},
    {prop1: 'value23', prop2: 'value24'},
    {prop1: 'value25', prop2: 'value26'},
    {prop1: 'value27', prop2: 'value28'},
    {prop1: 'value29', prop2: 'value30'},
    {prop1: 'value31', prop2: 'value32'},
    {prop1: 'value33', prop2: 'value34'},
    {prop1: 'value35', prop2: 'value36'},
    {prop1: 'value37', prop2: 'value38'},
    {prop1: 'value39', prop2: 'value40'},
    {prop1: 'value41', prop2: 'value42'},
    {prop1: 'value43', prop2: 'value44'},
    {prop1: 'value45', prop2: 'value46'},
    {prop1: 'value47', prop2: 'value48'},
    {prop1: 'value49', prop2: 'value50'},
    {prop1: 'value51', prop2: 'value52'},
    {prop1: 'value53', prop2: 'value54'},
    {prop1: 'value55', prop2: 'value56'},
    {prop1: 'value57', prop2: 'value58'},
    {prop1: 'value59', prop2: 'value60'},
    {prop1: 'value27', prop2: 'value28'},
    {prop1: 'value29', prop2: 'value30'},
    {prop1: 'value31', prop2: 'value32'},
    {prop1: 'value33', prop2: 'value34'},
    {prop1: 'value35', prop2: 'value36'},
    {prop1: 'value37', prop2: 'value38'},
    {prop1: 'value39', prop2: 'value40'},
    {prop1: 'value41', prop2: 'value42'},
    {prop1: 'value43', prop2: 'value44'},
    {prop1: 'value45', prop2: 'value46'},
    {prop1: 'value47', prop2: 'value48'},
    {prop1: 'value49', prop2: 'value50'},
    {prop1: 'value51', prop2: 'value52'},
    {prop1: 'value53', prop2: 'value54'},
    {prop1: 'value55', prop2: 'value56'},
    {prop1: 'value57', prop2: 'value58'},
    {prop1: 'value59', prop2: 'value60'},
  ];

  const dispatch = useDispatch();
  // const messagesHere = useSelector(state => state.messagesStore?.userData);
  // console.log('messagesHere', messagesHere);

  const {userData, isLoading} = useSelector(state => state.messagesStore);

  const [data, setData] = useState(dataArray.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate('ViewMessageDetail', {messagedata: item})
        // }
        style={{
          height: hp('15'),
          width: wp('87'),

          marginRight: wp('3'),
          marginLeft: wp('2'),
          borderRadius: wp('3'),
          flexDirection: 'column',
          paddingHorizontal: wp('2'),

          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          marginVertical: hp('1'),
        }}>
        <View
          style={{
            height: hp('7'),

            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.17,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.EMP_PHOTO}}
              style={{height: hp('4.5'), width: wp('9'), borderRadius: wp(50)}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 0.83,
              paddingHorizontal: wp('1'),
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              letterSpacing={'tail'}
              style={styles.messageCardEmpName}>
              {item?.EMP_NAME}
            </Text>
            <Text style={styles.messageCardDate}>{item?.HIRE_DATE}</Text>
          </View>
        </View>
        <View
          style={{
            height: hp('10'),
            marginVertical: hp('0.5'),
            paddingHorizontal: wp('2'),
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              color: '#343434',
              fontFamily: fontFamily.ceraLight,
              fontWeight: '300',
              fontSize: hp('1.85'),
              letterSpacing: 0.15,
            }}>
            {item?.MSG_SUBJECT}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMoreData = () => {
    console.log('load');
    if (isLoadingMore || isLoading) return; // Prevent multiple simultaneous requests
    dispatch(messagesAction({page: currentPage + 1})); // Dispatch the action to fetch more data
    setIsLoadingMore(true);
    setCurrentPage(currentPage + 1);
  };

  const renderFooter = () => {
    return isLoadingMore ? (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <View>
      <MainHeader
        text={'Utility'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </View>

        <View style={{height: hp('8'), marginBottom: hp('5')}}></View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  item: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageCardEmpName: {
    color: '#6A6A6A',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  messageCardDate: {
    color: '#979797',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.52rem',
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
export default UtilityTest;
