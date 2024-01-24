import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import React, {useEffect, useState} from 'react';
import Check from 'react-native-vector-icons/AntDesign';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ExpandableList from '../Components/expandlist/ExpandableList';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector} from 'react-redux';
const Profile = props => {
  const [localData, setLocalData] = useState('');
  const [expanded, setExpended] = useState(false);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setLocalData(parsedData);
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  useEffect(() => {
    getData('loginData');
  }, []);
  console.log('localdata', localData);
  const onPress = ({item}) => {};
  const profileData = useSelector(state => state.profileState);
  const seprateData = Object.assign({}, ...profileData?.user);
  const {EMPLOYEE_ID, EMP_PHOTO} = localData;
  const {
    EMPLOYEE_NAME,
    COMPANY_ID,
    DESIGNATION,
    DEPARTMENT,
    CATEGORY,
    DEPT_HEAD_ID,
    BIRTH_DATE,
    CADRE,
    HIRING_DATE,
    AC_TITLE,
    RELIGION_NAME,
    EMP_STATUS,
    REGULAR_DATE,
    HIRING,
    CONFIRMATION_DATE,
    SERVICE_LENGTH,
    BASIC_SAL,
    GROSS_SAL,
    ALLOWANCES,
    TAKE_HOME,
    ADRESS,
    PHONE_NO,
    NIC_NUMBER,
    MOB_PHONE,
    PASSPORT_NUM,
    QUALIFICATION,
    EOBI_NUMBER,
    DEPARTMENT_ID,
    E_MAIL,
    BRANCH_ID,
    COMPANY,
    BRANCH,
    NATIONALITY,
    MARITAL_STATUS,
  } = seprateData;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1C37A4'}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: hp(2.5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(8),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('Notification')}>
            <Icon type="light" name="bell" size={hp(3)} color="#FFF" />
          </TouchableOpacity>
          <View>{/* <Text>gdfgd</Text> */}</View>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            {/* <Menu name="menu" size={35} color="#fff" /> */}
            <Image
              style={styles.menustyle}
              source={{uri: 'menuicon'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: hp(2.5),
            marginTop: hp(6),
            borderRadius: hp(2),
            height: hp(20),
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
            backgroundColor: '#FFF',
          }}>
          <View
            style={{
              width: wp(50),
              height: hp(25),
              borderRadius: hp(50),
              backgroundColor: '#1C37A4',
              position: 'absolute',
              top: hp(-23.5),
              left: hp(9),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp(21),
                height: hp(10.5),
                borderRadius: hp(50),
                borderWidth: 3,
                borderColor: 'gray',
                position: 'absolute',
                top: hp(14),
                left: hp(7.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: wp(20), height: hp(10), borderRadius: hp(50)}}
                source={{uri: 'group'}}
                resizeMode="contain"
              />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: wp('12'),
                marginTop: hp('4'),
              }}>
              <View
                style={{
                  flex: 0.78,
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.zetext}>
                  {EMPLOYEE_NAME}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: 'center',
                  borderRadius: wp('5'),
                  backgroundColor: '#D4FFCC',
                  alignItems: 'center',
                }}>
                <Text style={styles.textnum}>{localData?.EMPLOYEE_ID}</Text>
              </View>
            </View>

            <View
              style={{marginHorizontal: wp('12'), marginVertical: hp('0.3')}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.zetext1}>
                {DESIGNATION}
              </Text>
            </View>

            <View
              style={{
                width: wp(90),
                height: 1,
                backgroundColor: '#DBDBDB',
                marginTop: hp(2.25),
              }}></View>

            {/* card bottom content */}

            <View
              style={{
                width: wp(90),
                height: hp(7),
                flexDirection: 'row',
                marginTop: hp(1.5),
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
                  <Icon
                    type="light"
                    name="circle-check"
                    size={hp(3.5)}
                    color="green"
                  />
                </View>
                <View style={{marginLeft: hp(0.8)}}>
                  <View>
                    <Text style={styles.smalltext}>{EMP_STATUS}</Text>
                  </View>
                  <View>
                    <Text style={styles.smalltext1}>STATUS</Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
                <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
                  <Icon
                    type="light"
                    name="wrench"
                    size={hp(3.5)}
                    color="#BB8FCE"
                  />
                </View>
                <View style={{marginLeft: hp(0.5)}}>
                  <View>
                    <Text style={styles.smalltext}>{SERVICE_LENGTH}</Text>
                  </View>
                  <View>
                    <Text style={styles.smalltext1}>SERVICE</Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
                <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
                  <Check name="checkcircleo" size={hp(3.5)} color="#CD6155" />
                </View>
                <View style={{marginLeft: hp(0.5)}}>
                  <View>
                    <Text style={styles.smalltext}>31 Years</Text>
                  </View>
                  <View>
                    <Text style={styles.smalltext1}>AGE</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* //personal Information// */}
        <View style={{marginTop: hp(2.5)}}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              marginHorizontal: hp(2.5),
              elevation: 4,
            }}>
            <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
              <CollapseHeader
                style={{
                  height: hp(7),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1.5),
                      flex: 0.5,
                      // backgroundColor: 'red',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: hp(1),
                      }}>
                      <Icon
                        type="light"
                        name="user"
                        color="#979797"
                        style={styles.iconSty}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.5),
                      }}>
                      <Text style={styles.smalltext}>Personal Information</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: hp(1),
                      flex: 0.5,
                    }}>
                    <Icon
                      type="light"
                      name="chevron-right"
                      size={hp(2)}
                      color="gray"
                      Size={hp(2)}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody style={{marginHorizontal: hp(2.5)}}>
                <View
                  style={{
                    height: hp(5),
                    marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Father Name</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{EMPLOYEE_NAME}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Religion</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{RELIGION_NAME}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Date Of Birth</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{BIRTH_DATE}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>CNIC</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{NIC_NUMBER}</Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </View>

        {/* //Service Information */}
        <View style={{marginTop: hp(1.5)}}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              marginHorizontal: hp(2.5),
              elevation: 4,
            }}>
            <Collapse isExpanded={expanded} onToggle={() => onPress(2)}>
              <CollapseHeader
                style={{
                  height: hp(7),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1.5),
                      flex: 0.5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: hp(1),
                      }}>
                      <Icon
                        type="light"
                        name="user-gear"
                        color="#979797"
                        style={styles.iconSty}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.5),
                      }}>
                      <Text style={styles.smalltext}>Service Information</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: hp(1),
                      flex: 0.5,
                    }}>
                    <Icon
                      type="light"
                      name="chevron-right"
                      size={hp(2)}
                      color="gray"
                      Size={hp(2)}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody style={{marginHorizontal: hp(2.5)}}>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>cardre</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{CADRE}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Department</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>
                      {DEPARTMENT.replace(/\s+$/, '')}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Branch</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{BRANCH}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Employee Status</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{EMP_STATUS}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Hire Date</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{HIRING_DATE}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Regular Date</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{REGULAR_DATE}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Confirm Date</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{CONFIRMATION_DATE}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Service Length</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{SERVICE_LENGTH}</Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </View>

        {/* //financial Information */}
        <View style={{marginTop: hp(1.5)}}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              marginHorizontal: hp(2.5),
              elevation: 4,
            }}>
            <Collapse isExpanded={expanded} onToggle={() => onPress(3)}>
              <CollapseHeader
                style={{
                  height: hp(7),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1.5),
                      flex: 0.5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: hp(1),
                      }}>
                      <Icon
                        type="light"
                        name="money-bill-1-wave"
                        color="#979797"
                        style={styles.iconSty}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.5),
                      }}>
                      <Text style={styles.smalltext}>
                        Financial Information
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: hp(1),
                      flex: 0.5,
                    }}>
                    <Icon
                      type="light"
                      name="chevron-right"
                      size={hp(2)}
                      color="gray"
                      Size={hp(2)}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody style={{marginHorizontal: hp(2.5)}}>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Basic Salary</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{BASIC_SAL}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Gross Salary</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{GROSS_SAL}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>ALLOWANCES</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{ALLOWANCES}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Take Home</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{TAKE_HOME}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Cost To School</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>fdvgd</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Account Title</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{AC_TITLE}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>EOBI</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{EOBI_NUMBER}</Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </View>

        {/* //contact Information */}
        <View style={{marginTop: hp(1.5)}}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              marginHorizontal: hp(2.5),
              elevation: 4,
            }}>
            <Collapse isExpanded={expanded} onToggle={() => onPress(3)}>
              <CollapseHeader
                style={{
                  height: hp(7),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1.5),
                      flex: 0.5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: hp(1),
                      }}>
                      <Icon
                        type="light"
                        name="clipboard-check"
                        color="#979797"
                        style={styles.iconSty}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.5),
                      }}>
                      <Text style={styles.smalltext}>Contact Information</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: hp(1),
                      flex: 0.5,
                    }}>
                    <Icon
                      type="light"
                      name="chevron-right"
                      size={hp(2)}
                      color="gray"
                      Size={hp(2)}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody style={{marginHorizontal: hp(2.5)}}>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Mobile1</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{PHONE_NO}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Mobile2</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{MOB_PHONE}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Email</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{E_MAIL}</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(5),
                    // marginHorizontal: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.testname}>Address</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textnum}>{ADRESS}</Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </View>

        {/* //movement Information */}
        <View style={{marginTop: hp(1.5)}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('MovementLine')}
            activeOpacity={8}
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              marginHorizontal: hp(2.5),
              elevation: 4,
            }}>
            <Collapse isExpanded={expanded} onToggle={() => onPress(3)}>
              <CollapseHeader
                style={{
                  height: hp(7),
                  marginHorizontal: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1.5),
                      flex: 0.5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: hp(1),
                      }}>
                      <Icon
                        type="light"
                        name="child"
                        color="#979797"
                        style={styles.iconSty}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.5),
                      }}>
                      <Text style={styles.smalltext}>Movement Log</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: hp(1),
                      flex: 0.5,
                    }}>
                    <Icon
                      type="light"
                      name="chevron-right"
                      size={hp(2)}
                      color="gray"
                      Size={hp(2)}
                    />
                  </View>
                </View>
              </CollapseHeader>
            </Collapse>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = EStyleSheet.create({
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  testname: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  zetext: {
    color: '#363636',
    fontWeight: '700',
    fontSize: '0.73rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  zetext1: {
    color: '#363636',
    fontWeight: '500',
    fontSize: '0.61rem',
    fontFamily: fontFamily.ceraMedium,
  },
  smalltext: {
    fontWeight: '700',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraBold,
    color: '#353535',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '500',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#979797',
    fontStyle: 'normal',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  textnum: {
    fontSize: '0.5rem',
    paddingHorizontal: 8,
    fontFamily: fontFamily.ceraMedium,
    color: '#343434',
    fontStyle: 'normal',
    fontWeight: '700',
  },
  menustyle: {
    width: '1.3rem',
    height: '1rem',
  },
});
