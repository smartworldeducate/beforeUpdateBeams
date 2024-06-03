import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../Styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import ChildsInBss from '../Components/ChildsInBss/ChildsInBss';
import ReporteeProfileModal from '../Components/Modal/ReporteeProfileModal';
import {
  clearSearchData,
  SearchEmployeeAction,
} from '../features/SearchEmployeeSlice/SearchEmployeeSlice';
import LineSeprator from '../Components/LineSeprator/LineSeprator';

const Search = ({}) => {
  const dispatch = useDispatch();
  const searchEmployeeHere = useSelector(state => state.searchEmployyeStore);
  const searchEmployeeHereByLength = useSelector(
    state => state.searchEmployyeStore.resultLength,
  );
  console.log('searchEmployeeHere', searchEmployeeHere?.userData);
  // console.log('searchEmployeeHereByLength', searchEmployeeHereByLength);
  const navigation = useNavigation();
  const profileHere = useSelector(state => state.profileStore);

  const [reporteeModal, setReporteeModal] = useState(false);

  const textInputRef = useRef(null);
  const [searchText, setSearchText] = useState(null);

  const [idHere, setIdHere] = useState(null);
  const [branchIdHere, setBranchIdHere] = useState(null);
  const [deptIdHere, setDeptIdHere] = useState(null);
  const [showSearchData, setShowSearchData] = useState(false);

  const onPressSearchIcon = () => {
    dispatch(
      SearchEmployeeAction({
        searchEmp: searchText,
        offset: 1,
      }),
    );
    // console.log('123');
  };

  const onChangeSearchText = val => {
    setSearchText(val);
  };

  const onPressEmployee = item => {
    setReporteeModal(!reporteeModal);
    setIdHere(item?.item);
    setBranchIdHere(item?.itemBranchId);
    setDeptIdHere(item?.itemDeptId);
  };

  const onRequestClose = () => {
    console.log('123');
    setReporteeModal(false);
    setIdHere(null);
    setBranchIdHere(null);
    setDeptIdHere(null);
  };

  console.log('reporteeModal', reporteeModal);

  const renderItem = ({item, index}) => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.18,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.EMP_PHOTO}}
              style={{
                height: hp('7'),
                width: wp('14'),
                borderRadius: wp('10'),
              }}
              resizeMode={'cover'}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              onPressEmployee({
                item: item?.EMPLOYEE_ID,
                itemBranchId: item?.BRANCH_ID,
                itemDeptId: item?.DEPARTMENT_ID,
              })
            }
            activeOpacity={0.6}
            style={{
              flex: 0.55,
              flexDirection: 'column',
            }}>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeName}>
                {item?.EMP_NAME}
              </Text>
            </View>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeDesignation}>
                {item?.DESIGNATION}
              </Text>
            </View>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeBranchTexts}>
                {item?.DEPT_NAME}
              </Text>
            </View>
            <View style={{}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.reporteeBranchTexts}>
                {`${item?.BRANCH_NAME} - ${item?.BRANCH_ID}`}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 0.07,
            }}></View>
          <View
            style={{
              flex: 0.2,
              backgroundColor: '#D4FFCC',
              height: hp('3'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp('3'),
            }}>
            <Text
              style={{
                alignItems: 'center',
                color: '#2D8E00',
                fontSize: hp('1.65'),
                fontFamily: fontFamily.ceraMedium,
              }}>
              {item?.EMPLOYEE_ID}
            </Text>
          </View>
        </View>

        <LineSeprator
          height={hp('0.15')}
          backgroundColor={'#DBDBDB'}
          maginVertical={hp('1.25')}
        />
      </View>
    );
  };

  return (
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
              <Text style={styles.headerText}>Search</Text>
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
                placeholder={'Search Employee'}
                placeholderColor={'gray'}
                iconColor={colors.loginIconColor}
                placeholderTextColor="gray"
                placeholderStyle={styles.plaseholderStyle}
                underlineColorAndroid="transparent"
                style={styles.textInputCustomStyle}
                autoFocus
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

      <View
        style={{
          marginBottom: hp('20'),
          marginHorizontal: wp('4'),
          marginTop: hp('1'),
          // paddingTop: hp('3'),
        }}>
        {searchEmployeeHere?.userData?.data_length > 0 ? (
          <FlatList
            data={searchEmployeeHere?.userData?.results}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <FlatList
            data={profileHere?.userData?.reporting_result?.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      {reporteeModal ? (
        <ReporteeProfileModal
          onPressBackIcon={onRequestClose}
          modalVisible={reporteeModal}
          onRequestClose={onRequestClose}
          reporteeId={idHere}
          my_branch_id={branchIdHere}
          my_DEPARTMENT_ID={deptIdHere}
        />
      ) : (
        <></>
      )}
    </>
  );
};

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
  stdNameText: {
    color: '#353535',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    fontSize: '0.67rem',
  },
  stdStdIdText: {
    color: '#2D8E00',
    fontFamily: fontFamily.ceraBold,
    fontWeight: '700',
    paddingVertical: hp('0.5'),
    fontSize: '0.55rem',
    borderRadius: wp('5'),
  },
  cardText: {
    color: '#343434',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '500',
    fontSize: '0.57rem',
    letterSpacing: 0.25,
  },
  reporteeName: {
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#343434',
  },
  reporteeDesignation: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    color: '#979797',
  },
  reporteeBranchTexts: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraLight,
    fontWeight: '300',
    color: '#353535',
  },
});

export default Search;
