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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import {UtilityAction} from '../features/UtilitySlice/UtilitySlice';
import Ficon from 'react-native-fontawesome-pro';
import {UtilityMiscLogAction} from '../features/UtilitySlice/UtilityMiscLog';
import Loader from '../Components/Loader/Loader';

const Utility = props => {
  const dispatch = useDispatch();

  const profileHereEmpId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  console.log('profileHereEmpId', profileHereEmpId);

  const utilityLoadingHere = useSelector(state => state.utilityStore);
  // console.log('utilityHere', utilityHere?.isLoading);

  const utilityHere = useSelector(state => state.utilityStore?.userData);
  console.log('utilityHere>>>>>', utilityHere);

  const utilityMiscLogHere = useSelector(state => state.utilityMiscLogStore);
  // console.log('utilityMiscLogHere', utilityMiscLogHere);

  useEffect(() => {
    dispatch(UtilityAction());
  }, []);

  const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(
            UtilityMiscLogAction({
              employee_id: profileHereEmpId,
              utility_id: item?.utility_id,
            }),
          );
          Linking.openURL(item?.utility_url);
        }}
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('1'),
          marginVertical: hp('1'),
          justifyContent: 'center',
          borderRadius: wp('2'),

          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
        }}>
        <View style={{flex: 0.85, marginHorizontal: wp('1')}}>
          <View style={{paddingTop: hp('2'), paddingHorizontal: wp('2')}}>
            <Text style={styles.textTitleStyle}>{item?.utility_title}</Text>
          </View>

          <View
            style={{
              paddingTop: hp('0.5'),
              paddingBottom: hp('1.5'),
              paddingHorizontal: wp('2'),
            }}>
            <Text style={styles.textDescStyle}>{item?.utility_desc}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Ficon
            type="light"
            name="arrow-down-right"
            size={hp(3.5)}
            color="#4D69DC"
          />
        </View>
      </TouchableOpacity>
    );
  };

  // const [expandedItemId, setExpandedItemId] = useState(null);

  // const renderItemList = ({item, index}) => (
  //   <TouchableOpacity onPress={() => handleItemPress(item.id)}>
  //     <View style={styles.itemContainer}>
  //       <Text style={styles.itemId}>ID: {item.id}</Text>
  //       {expandedItemId === item.id && (
  //         <Text style={styles.itemName}>Name: {item.name}</Text>
  //       )}
  //     </View>
  //   </TouchableOpacity>
  // );

  // const handleItemPress = id => {
  //   setExpandedItemId(id === expandedItemId ? null : id);
  // };

  // console.log('expandedItemId', expandedItemId);

  return (
    <View>
      <MainHeader
        text={'Miscellaneous'}
        iconName={'arrow-left'}
        onpressBtn={() => props.navigation.goBack()}
      />

      {utilityLoadingHere?.isLoading && <Loader></Loader>}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backfaceVisibility: colors.appBackGroundColor,
        }}>
        <View
          style={{
            marginHorizontal: wp('5.5'),
            marginTop: hp('4'),
            marginBottom: hp('1'),
          }}>
          <FlatList
            data={utilityHere}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* <View
          style={{
            marginHorizontal: wp('5.5'),
            marginTop: hp('1'),
            marginBottom: hp('20'),
          }}>
          <FlatList
            data={items}
            renderItem={renderItemList}
            keyExtractor={(item, index) => index.toString()}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  textTitleStyle: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.66rem',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  textDescStyle: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontSize: '0.63rem',
    fontWeight: '300',
    letterSpacing: 0.25,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemId: {
    fontSize: 18,
    marginRight: 10,
    color: 'black',
  },
  itemName: {
    fontSize: 18,
    color: 'grey',
  },
});
export default Utility;
