import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {getAllEmployeeHandler} from '../features/allemoloyee/createSlice';
import axios from 'axios';
import colors from '../Styles/colors';
import {useNavigation} from '@react-navigation/native';
export default SearchEmp = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(1);
  const [empData, setEmpData] = useState([]);
  const [expanded, setExpended] = useState(false);
  const [search, setSearch] = useState('');

  const onpressSearch = async search => {
    const response = await axios.post(
      'https://b2training.beaconhouse.net/beams_ci/index.php/api/search',
      {searchEmp: search},
      {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      },
    );
    setEmpData(response.data?.data);
  };

  const onPress = item => {};

  const getAllEmpPress = async () => {
    const emp = await dispatch(
      getAllEmployeeHandler({
        ofset: offset,
      }),
    );
    setEmpData([...empData, ...emp?.payload?.data]);
  };
  useEffect(() => {
    getAllEmpPress();
  }, []);
  const handleLoadMore = async () => {
    setOffset(empData?.length);
    // console.log("handle function call",offset)
    await getAllEmpPress();
    // console.log("handle function after",offset)
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: hp(2),
          marginHorizontal: hp(2.5),
          elevation: 4,
          marginTop: hp(1),
        }}>
        <Collapse isExpanded={expanded} onToggle={onPress(item)}>
          <CollapseHeader
            style={{
              height: hp(12),
              marginHorizontal: hp(1),
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: hp(-2),
                  marginVertical: hp(0.3),
                }}>
                <Image
                  style={{
                    width: wp(16),
                    height: hp(8),
                    marginTop: hp('1.5'),
                    position: 'absolute',
                    top: hp(0),
                    borderRadius: hp(1),
                  }}
                  source={{uri: 'group'}}
                  resizeMode="contain"
                />
              </View>
              <View style={{flex: 0.7}}>
                <View
                  style={{flex: 1, flexDirection: 'row', marginTop: hp(1.7)}}>
                  <View style={{flex: 0.8, marginLeft: hp(-2)}}>
                    <Text style={styles.childname}>
                      {item?.EMP_NAME.replace(/\s+$/, '')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: hp(2),
                      height: hp(2.5),
                    }}>
                    <Text style={styles.number}>{item?.EMPLOYEE_ID}</Text>
                  </View>
                </View>
                <View
                  style={{flex: 1, flexDirection: 'row', marginTop: hp(-1)}}>
                  <View style={{flex: 0.3, marginLeft: hp(-1)}}>
                    <Text style={styles.testname}>Designation:</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      alignItems: 'flex-end',
                      marginRight: hp(2),
                    }}>
                    <Text style={styles.textnum}>
                      {item?.DESIGNATION.replace(/\s+$/, '')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{flex: 1, flexDirection: 'row', marginTop: hp(-1.7)}}>
                  <View style={{flex: 0.5, marginLeft: hp(-1)}}>
                    <Text style={styles.testname}>Date:</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'flex-end',
                      marginRight: hp(2),
                    }}>
                    <Text style={styles.textnum}>
                      {item?.HIRE_DATE.replace(/\s+$/, '')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={{marginHorizontal: hp(2.5)}}>
            <View
              style={{
                height: hp(4),
                marginHorizontal: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.testname}>Branch:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textnum}>
                  {item?.BR_NAME.replace(/\s+$/, '')}
                </Text>
              </View>
            </View>
            {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}

            <View
              style={{
                height: hp(4),
                marginHorizontal: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.testname}>Department:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textnum}>
                  {item?.DEPT_NAME.replace(/\s+$/, '')}
                </Text>
              </View>
            </View>
            {/* <View style={{height: 1, backgroundColor: '#DBDBDB'}}></View> */}
            <View
              style={{
                height: hp(4),
                marginHorizontal: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.testname}>Status:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textnum}>
                  {item?.EMP_STATUS.replace(/\s+$/, '')}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: hp(4),
                marginHorizontal: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.testname}>Service Length:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textnum}>
                  {item?.SERVICE_LENGTH.replace(/\s+$/, '')}
                </Text>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: wp(20),
            height: hp(10),
            backgroundColor: '#EAFAF1',
            borderRadius: hp(50),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: hp(15),
          }}>
          <View style={{}}>
            <ActivityIndicator size={'large'} color="blue" />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.appBackGroundColor}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={styles.mainHeader}>
        <View style={styles.headerChild}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: hp(2),
              marginTop: hp(1.5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="light" name="arrow-left" size={hp(3)} color="#FFF" />
          </TouchableOpacity>
          <View
            style={styles.homeSearch}
            onPress={() => navigation.navigate('Search')}>
            <View style={styles.homesearchView}>
              <TextInput
                onChangeText={text => setSearch(text)}
                value={search}
                returnKeyType={'done'}
                iconName={'user'}
                placeholder={'Search Employee'}
                placeholderColor={'gray'}
                iconColor={colors.loginIconColor}
                placeholderTextColor="gray"
                placeholderStyle={styles.plaseholderStyle}
                underlineColorAndroid="transparent"
                style={styles.textInputCustomStyle}></TextInput>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchicon}
              onPress={() => onpressSearch(search)}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3)}
                color="#292D32"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={empData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
  ftbotom: {
    color: '#FFF',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },

  container: {
    flex: 1,
    marginTop: hp(0),
  },
  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.5rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  childname: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.7rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },

  salaryMainView: {
    height: hp(7),
    marginHorizontal: hp(2.5),
    borderRadius: hp(1),
    backgroundColor: '#E7E7E7',
    marginTop: hp(2),
  },
  testname: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  headerChild: {
    marginTop: hp(6),
    flexDirection: 'row',
  },
  textstyle: {
    color: '#fff',
    marginTop: hp(0),
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  mainHeader: {
    marginTop: hp(-2),
    height: hp(18),
    borderBottomRightRadius: hp(2.5),
    borderBottomLeftRadius: hp(2.5),
  },
  homesearchView: {
    width: wp(71),
    height: hp(6),
    backgroundColor: '#58D68D ',
    borderRadius: hp(2),
  },

  textstyle: {
    color: '#fff',
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  textInputCustomStyle: {
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: '#292D32',
    fontSize: '0.7rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
  },
  homeSearch: {
    marginTop: hp(2.2),
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginLeft: hp(1.5),
    borderRadius: hp(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  searchicon: {marginTop: hp(1.5), marginRight: hp(2)},
  placeholderStyle: {
    fontSize: '0.575rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
  },

  itemStyle: {
    padding: 10,
    color: '#000',
    fontSize: '0.6rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    lineHeight: hp(1.5),
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  childname: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.6rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.5rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
});
