import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

import ViewInput from '../ViewInput';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MarkAttendanceModal = ({
  modalVisible,
  onPressOpacity,
  onPressSave,
  onPressSaveTardy,
  onPressSaveAbsent,
  onPressSaveLeave,
  onPressSaveExempted,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const gradientColors = [
    {status: 'PP', dark: ['#78E2CD', '#1AB394'], light: ['#c8faf0', '#91fae5']},
    {status: 'PO', dark: ['#66E08A', '#259245'], light: ['#c8fad7', '#7ff5a2']},
    {status: 'T', dark: ['#F1B68F', '#FF6600'], light: ['#fac8a7', '#fa9d5f']},
    {status: 'A', dark: ['#FF9EA8', '#ED5565'], light: ['#fcb1b8', '#ff8591']},
    {status: 'L', dark: ['#FFC88C', '#F8AC59'], light: ['#fad9b4', '#f5c590']},
    {status: 'E', dark: ['#7DBEFF', '#0076EC'], light: ['#afcdfa', '#7fb0fa']},
  ];

  const [timeInValue, setTimeInValue] = useState(null);
  const [timeInModal, setTimeInModal] = useState(false);
  const [remarksText, setRemarksText] = useState('');

  const [informSH, setInformSH] = useState(false);
  const [ticketPRO, setTicketPRO] = useState(false);
  const [none, setNone] = useState(true);
  const [absentRadioButtonValues, setAbsentRadioButtonValues] = useState(3);

  const handlePress = (index, status) => {
    setSelectedIndex(index);
    setSelectedStatus(status);
    setTimeInValue(null);
    setTimeInModal(false);
  };
  console.log('selectedStatus', selectedStatus);

  const onPressTimeInModal = () => {
    setTimeInModal(true);
  };

  const handleTimeInConfirm = time => {
    const pakTime = new Date(time);
    setTimeInValue(
      pakTime.toLocaleTimeString('en-PK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    );
    hideTimeInModal();
  };

  const hideTimeInModal = () => {
    setTimeInModal(false);
  };

  const onChangeRekarmsText = val => {
    setRemarksText(val);
  };

  const onPressInformSH = () => {
    setInformSH(true);
    setTicketPRO(false);
    setNone(false);
    setAbsentRadioButtonValues('1');
  };

  const onPressTicketPRO = () => {
    setInformSH(false);
    setTicketPRO(true);
    setNone(false);
    setAbsentRadioButtonValues('2');
  };
  const onPressNone = () => {
    setInformSH(false);
    setTicketPRO(false);
    setNone(true);
    setAbsentRadioButtonValues('3');
  };

  const handleOnPressSave = () => {
    onPressSave(selectedStatus);
  };

  const handleOnPressSaveTardy = () => {
    try {
      if (selectedStatus == 'T') {
        onPressSaveTardy(selectedStatus, timeInValue, remarksText);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnPressSaveAbsent = () => {
    try {
      if (selectedStatus == 'A') {
        onPressSaveAbsent(selectedStatus, absentRadioButtonValues, remarksText);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnPressSaveLeave = () => {
    try {
      if (selectedStatus == 'L') {
        onPressSaveLeave(selectedStatus, remarksText);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnPressSaveExempted = () => {
    try {
      if (selectedStatus == 'E') {
        onPressSaveExempted(selectedStatus, remarksText);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('selectedStatusInsideUseEffect', selectedStatus);
    setTimeInValue(null);
    setTimeInModal(false);

    setInformSH(false);
    setTicketPRO(false);
    setNone(true);
    setRemarksText('');
    setAbsentRadioButtonValues('3');
  }, [selectedStatus]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPressOpacity}>
      <DateTimePickerModal
        isVisible={timeInModal}
        mode="time"
        is24Hour={true}
        display={'clock'}
        onConfirm={handleTimeInConfirm}
        onCancel={hideTimeInModal}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={{
            flex:
              selectedStatus == 'T' ||
              selectedStatus == 'A' ||
              selectedStatus == 'L' ||
              selectedStatus == 'E'
                ? 0.45
                : 0.7,
          }}
          onPress={onPressOpacity}
          activeOpacity={1}
        />
        <View
          style={{
            flex:
              selectedStatus == 'T' ||
              selectedStatus == 'A' ||
              selectedStatus == 'L' ||
              selectedStatus == 'E'
                ? 0.55
                : 0.3,
            borderTopLeftRadius: wp('5'),
            borderTopRightRadius: wp('5'),
            backgroundColor: colors.whiteColor,
            paddingHorizontal: wp('4'),
          }}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View
              style={{
                borderRadius: wp('3'),
                backgroundColor: colors.whiteColor,
                flexDirection: 'column',
                borderTopLeftRadius: wp('5'),
                borderTopRightRadius: wp('5'),
              }}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp('1'),
                  }}>
                  {gradientColors.map((gradient, index) => {
                    const colors =
                      selectedIndex === index ? gradient.dark : gradient.light;

                    return (
                      <>
                        <LinearGradient
                          key={index}
                          useAngle={true}
                          angle={180}
                          angleCenter={{x: 0.5, y: 0.5}}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={colors}
                          locations={[0, 1]}
                          style={styles.linearGradiantStyle}>
                          <TouchableOpacity
                            onPress={() => handlePress(index, gradient.status)}
                            style={{
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                              style={styles.linearGradiantText}>
                              {gradient.status}
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>

                        {selectedIndex === index && (
                          <View
                            style={{
                              justifyContent: 'center',
                              marginLeft: wp('-5'),
                              paddingTop: hp('2'),
                            }}>
                            <FontAwesomeIcon
                              icon={`fas fa-circle-check`}
                              size={hp('2.5')}
                              style={{color: 'green'}}
                            />
                          </View>
                        )}
                      </>
                    );
                  })}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp('1.25'),
                  }}>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Physical\nPresent`}</Text>
                  </View>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Present\nOnline`}</Text>
                  </View>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Tardy`}</Text>
                  </View>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Absent`}</Text>
                  </View>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Leave`}</Text>
                  </View>
                  <View style={styles.boxTextView}>
                    <Text style={styles.boxText}>{`Exempted`}</Text>
                  </View>
                </View>

                {selectedStatus == 'T' && (
                  <View style={{justifyContent: 'center'}}>
                    <View
                      style={{
                        marginTop: hp(2),
                        backgroundColor: '#fff',
                        borderRadius: wp(10),
                        shadowColor: '#000',
                        shadowOpacity: 1,
                        shadowRadius: wp('15'),
                        elevation: 10,
                      }}>
                      <ViewInput
                        dateText={
                          timeInValue == null ? 'Start Time' : timeInValue
                        }
                        dateFun={onPressTimeInModal}
                        iconName={'fat fa-clock-nine'}
                        placeholder={'Time in'}
                        placeholderColor={colors.loginTextColor}
                        style={styles.textInputCustomStyle}
                      />
                    </View>

                    <View style={{marginTop: hp('2.5')}}>
                      <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        value={remarksText}
                        onChangeText={onChangeRekarmsText}
                        placeholder="Remarks"
                        placeholderTextColor={'black'}
                        returnKeyType={'done'}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: hp('6'),
                        marginTop: selectedStatus == 'T' ? hp('6') : hp('6'),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressOpacity}
                        style={{
                          flex: 0.3,
                          backgroundColor: '#C9C9C9',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 0.4}}></View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        // onPress={() => onPressSave(selectedStatus)}
                        onPress={handleOnPressSaveTardy}
                        disabled={selectedStatus != null ? false : true}
                        style={{
                          flex: 0.3,
                          backgroundColor:
                            selectedStatus != null ? '#1C37A4' : 'grey',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {selectedStatus == 'A' && (
                  <View style={{justifyContent: 'center'}}>
                    <View
                      style={{
                        marginTop: hp(2),
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressInformSH}
                        style={{
                          flex: 0.35,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesomeIcon
                            icon={`fas fa-circle-dot`}
                            size={hp('3')}
                            style={{color: informSH ? '#0EAA24' : 'silver'}}
                          />
                        </View>

                        <View
                          style={{
                            flex: 0.7,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: fontFamily.ceraMedium,
                              color: 'black',
                            }}>
                            Inform SH
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressTicketPRO}
                        style={{
                          flex: 0.35,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesomeIcon
                            icon={`fas fa-circle-dot`}
                            size={hp('3')}
                            style={{color: ticketPRO ? '#0EAA24' : 'silver'}}
                          />
                        </View>

                        <View
                          style={{
                            flex: 0.7,

                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: fontFamily.ceraMedium,
                              color: 'black',
                            }}>
                            Ticket PRO
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressNone}
                        style={{
                          flex: 0.3,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesomeIcon
                            icon={`fas fa-circle-dot`}
                            size={hp('3')}
                            style={{color: none ? '#0EAA24' : 'silver'}}
                          />
                        </View>

                        <View
                          style={{
                            flex: 0.7,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: fontFamily.ceraMedium,
                              color: 'black',
                            }}>
                            None
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{marginTop: hp('2.5')}}>
                      <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        value={remarksText}
                        onChangeText={onChangeRekarmsText}
                        placeholder="Remarks"
                        placeholderTextColor={'black'}
                        returnKeyType={'done'}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: hp('6'),
                        marginTop: selectedStatus == 'T' ? hp('6') : hp('6'),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressOpacity}
                        style={{
                          flex: 0.3,
                          backgroundColor: '#C9C9C9',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 0.4}}></View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        // onPress={() => onPressSave(selectedStatus)}
                        onPress={handleOnPressSaveAbsent}
                        disabled={selectedStatus != null ? false : true}
                        style={{
                          flex: 0.3,
                          backgroundColor:
                            selectedStatus != null ? '#1C37A4' : 'grey',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {selectedStatus == 'L' && (
                  <View style={{justifyContent: 'center'}}>
                    <View style={{marginTop: hp('2.5')}}>
                      <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        value={remarksText}
                        onChangeText={onChangeRekarmsText}
                        placeholder="Remarks"
                        placeholderTextColor={'black'}
                        returnKeyType={'done'}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: hp('6'),
                        marginTop: selectedStatus == 'T' ? hp('6') : hp('6'),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressOpacity}
                        style={{
                          flex: 0.3,
                          backgroundColor: '#C9C9C9',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 0.4}}></View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        // onPress={() => onPressSave(selectedStatus)}
                        onPress={handleOnPressSaveLeave}
                        disabled={selectedStatus != null ? false : true}
                        style={{
                          flex: 0.3,
                          backgroundColor:
                            selectedStatus != null ? '#1C37A4' : 'grey',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {selectedStatus == 'E' && (
                  <View style={{justifyContent: 'center'}}>
                    <View style={{marginTop: hp('2.5')}}>
                      <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        value={remarksText}
                        onChangeText={onChangeRekarmsText}
                        placeholder="Remarks"
                        placeholderTextColor={'black'}
                        returnKeyType={'done'}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: hp('6'),
                        marginTop: selectedStatus == 'T' ? hp('6') : hp('6'),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPressOpacity}
                        style={{
                          flex: 0.3,
                          backgroundColor: '#C9C9C9',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                      <View style={{flex: 0.4}}></View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        // onPress={() => onPressSave(selectedStatus)}
                        onPress={handleOnPressSaveExempted}
                        disabled={selectedStatus != null ? false : true}
                        style={{
                          flex: 0.3,
                          backgroundColor:
                            selectedStatus != null ? '#1C37A4' : 'grey',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp('3'),
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: '500',
                          }}>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              {(selectedStatus == 'PP' ||
                selectedStatus == 'PO' ||
                selectedStatus == null) && (
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('6'),
                    marginTop: selectedStatus == 'T' ? hp('6') : hp('6'),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onPressOpacity}
                    style={{
                      flex: 0.3,
                      backgroundColor: '#C9C9C9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp('3'),
                    }}>
                    <Text
                      style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                  <View style={{flex: 0.4}}></View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    // onPress={() => onPressSave(selectedStatus)}
                    onPress={handleOnPressSave}
                    disabled={selectedStatus != null ? false : true}
                    style={{
                      flex: 0.3,
                      backgroundColor:
                        selectedStatus != null ? '#1C37A4' : 'grey',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp('3'),
                    }}>
                    <Text
                      style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.transparentBlack,
  },

  modalContent: {
    flex: 0.5,
    borderTopLeftRadius: wp('5'),
    borderTopRightRadius: wp('5'),
    backgroundColor: colors.whiteColor,
    paddingHorizontal: wp('4'),
  },
  scrollView: {
    flexGrow: 1,
  },
  textInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('4'),
    textAlignVertical: 'top', // Ensures text starts at the top
    backgroundColor: '#fff',
    color: 'black',
    fontFamily: fontFamily.ceraMedium,
    paddingHorizontal: wp('2'),
  },

  linearGradiantStyle: {
    flex: 0.153,
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  linearGradiantText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
  },
  boxTextView: {
    flex: 0.15,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 9,
    color: '#66656A',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    lineHeight: hp('2'),
    letterSpacing: 0.35,
    textAlign: 'center',
    lineHeight: 11,
  },

  textInputCustomStyle: {
    fontSize: '0.7rem',
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('2'),
    color: '#363636',
    fontWait: '500',
    fontFamily: fontFamily.ceraMedium,
  },
});

export default MarkAttendanceModal;
