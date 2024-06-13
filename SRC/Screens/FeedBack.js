import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import StarRating from 'react-native-star-rating-widget';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../Styles/colors';
import {
  RatingAction,
  updateRating,
} from '../features/RatingAndFeedbackSlice/RatingSlice';
import {
  clearAllStateUpdateRating,
  UpdateRatingAction,
} from '../features/RatingAndFeedbackSlice/UpdateRatingSlice';
import Toast from 'react-native-simple-toast';
import {
  clearAllStateSuggestionFeedback,
  SuggestionFeedbackAction,
} from '../features/RatingAndFeedbackSlice/SuggestionFeedback';
import MessageSuccessModal from '../Components/Modal/MessageSuccessModal';
import Loader from '../Components/Loader/Loader';

const FeedBack = props => {
  const dispatch = useDispatch();
  const updateRatingSuccess = useSelector(
    state => state.updateRatingStore.success,
  );
  const updateRatingHere = useSelector(state => state.updateRatingStore);

  const updateRatingSuccessResponseHere = useSelector(
    state => state.updateRatingStore.success,
  );

  const ratingHereStore = useSelector(state => state.ratingStore);

  const ratingGet = ratingHereStore?.userData?.RATING_ID;

  const userId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const suggestionFeedbackHere = useSelector(
    state => state.suggestionFeedbackStore,
  );

  const updateSuggestionSuccessResponseHere = useSelector(
    state => state.suggestionFeedbackStore.success,
  );

  const [feedback, setFeedbak] = useState(true);
  const [suggestion, setSuggestion] = useState(false);

  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState(null);

  const [title, setTitle] = useState('');
  const [suggestionDesc, setSuggestionDesc] = useState('');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModalSuggestion, setShowErrorModalSuggestion] =
    useState(false);
  const [showSuccessModalSuggestion, setShowSuccessModalSuggestion] =
    useState(false);

  const [hideButtonsonSuccess, setHideButtonsOnSuccess] = useState(false);

  useEffect(() => {
    try {
      AsyncStorage.getItem('loginData').then(loginData => {
        const parsedLoginData = JSON.parse(loginData);
        dispatch(
          RatingAction({
            employee_id: parsedLoginData,
          }),
        );
      });
    } catch (error) {
      console.error('Error fetching latest rating:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    setRating(ratingGet);
  }, [ratingGet]);

  const onChangeRating = val => {
    console.log('onChangeRating');
    setRating(val);
  };

  const onChangeDisable = () => {};

  const onPressSubmitRating = () => {
    dispatch(
      UpdateRatingAction({
        employee_id: JSON.parse(userId),
        rating_id: rating,
        type_id: 1,
      }),
    );
  };

  const onPressNotNow = () => {
    setRating(ratingGet);
  };

  console.log('ratingGet', ratingGet);
  console.log('ratingGetType', typeof ratingGet);

  useEffect(() => {
    if (updateRatingHere?.success == 1) {
      setDesc(updateRatingHere?.userData?.message);
    }
  }, [updateRatingHere]);

  useEffect(() => {
    if (updateRatingSuccessResponseHere == 0) {
      setShowErrorModal(true);
    } else if (updateRatingSuccessResponseHere == 1) {
      setRating(updateRatingHere?.userData?.RATING_ID);
      setShowSuccessModal(true);
      setHideButtonsOnSuccess(true);
    }
  }, [updateRatingSuccessResponseHere]);

  const closeModal = () => {
    dispatch(clearAllStateUpdateRating());
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const onPressFeedback = () => {
    setFeedbak(true);
    setSuggestion(false);
  };
  const onPressSuggestion = () => {
    setSuggestion(true);
    setFeedbak(false);
  };

  const onChangeTitle = val => {
    setTitle(val);
  };

  const onChangeSuggestionDesc = val => {
    setSuggestionDesc(val);
  };

  const onPressSuggestionSubmit = () => {
    dispatch(
      SuggestionFeedbackAction({
        employee_id: JSON.parse(userId),
        title: title,
        feedback_desc: suggestionDesc,
        type_id: 2,
      }),
    );
  };

  useEffect(() => {
    if (suggestionFeedbackHere?.success == 1) {
      setTitle('');
      setSuggestionDesc('');
    }
  }, [suggestionFeedbackHere]);

  useEffect(() => {
    if (updateSuggestionSuccessResponseHere == 0) {
      setShowErrorModalSuggestion(true);
    } else if (updateSuggestionSuccessResponseHere == 1) {
      setShowSuccessModalSuggestion(true);
    }
  }, [updateSuggestionSuccessResponseHere]);

  const closeModalSuggestion = () => {
    dispatch(clearAllStateSuggestionFeedback());
    setShowSuccessModalSuggestion(false);
    setShowErrorModalSuggestion(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      //  Additional logic when screen gains focus
      setDesc(null);
      setFeedbak(true);
      setSuggestion(false);
      // setRating(ratingGet);

      return () => {
        // Additional logic when screen loses focus
        console.log('Feedback Page is unfocused');
        setRating(ratingGet);
      };
    }, []),
  );

  console.log('rating', rating);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.appBackGroundColor,
      }}>
      <>
        <View>
          <MainHeader
            text={'Feedback'}
            iconName={'arrow-left'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.appBackGroundColor,
          }}>
          {suggestionFeedbackHere?.isLoading && <Loader></Loader>}
          {ratingHereStore?.isLoading ? (
            <Loader></Loader>
          ) : (
            <View style={{marginVertical: hp('3')}}>
              <View style={{marginHorizontal: wp('5')}}>
                <View
                  style={{
                    backgroundColor: '#E7E7E7',
                    height: hp('7'),
                    borderRadius: wp('2'),
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: hp('5'),
                      marginHorizontal: wp('2'),
                    }}>
                    <TouchableOpacity
                      onPress={onPressFeedback}
                      activeOpacity={0.5}
                      style={{
                        flex: 0.46,
                        backgroundColor: feedback
                          ? colors.whiteColor
                          : '#E7E7E7',
                        borderRadius: wp('2'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.upperText}>Feedback</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 0.08,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></View>
                    <TouchableOpacity
                      onPress={onPressSuggestion}
                      activeOpacity={0.5}
                      style={{
                        flex: 0.46,
                        backgroundColor: suggestion
                          ? colors.whiteColor
                          : '#E7E7E7',
                        borderRadius: wp('2'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.upperText}>Suggestion</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {feedback && (
                  <>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: hp('3'),
                      }}>
                      <Text style={styles.mainText}>
                        How do you rate this App?
                      </Text>

                      {ratingGet > 0 || hideButtonsonSuccess ? (
                        <></>
                      ) : (
                        <Text style={styles.belowText}>
                          No feedback has been provided yet.
                        </Text>
                      )}
                    </View>

                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <StarRating
                        rating={rating}
                        onChange={
                          ratingGet > 1 ? onChangeDisable : onChangeRating
                        }
                        // onChange={onChangeRating}
                        maxStars={5}
                        starSize={hp('5.5')}
                        color={'#fdd835'}
                        emptyColor={'#fdd835'}
                        enableHalfStar={false}
                        // style={{borderColor: 'red', borderWidth: 1}}
                        // starStyle={{borderColor: 'red', borderWidth: 1}}
                      />
                    </View>

                    <View sty></View>

                    {ratingGet > 0 || hideButtonsonSuccess ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: hp('2'),
                        }}>
                        <Text
                          style={{
                            fontSize: hp('1.75'),
                            fontFamily: fontFamily.ceraLight,
                            color: 'black',
                          }}>{`You gave a ${rating}-star rating`}</Text>
                        <Text
                          style={{
                            fontSize: hp('1.75'),
                            fontFamily: fontFamily.ceraLight,
                            fontStyle: 'italic',
                            color: 'black',
                          }}>{`Thank you for your feedback.`}</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: wp('4'),
                          marginVertical: hp('2'),
                        }}>
                        <TouchableOpacity
                          onPress={onPressNotNow}
                          activeOpacity={0.8}
                          style={styles.btnView1}>
                          <Text style={styles.btnText}>Not Now</Text>
                        </TouchableOpacity>
                        <View style={{flex: 0.35}}></View>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={onPressSubmitRating}
                          style={styles.btnView2}>
                          <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}

                {suggestion && (
                  <>
                    <View style={styles.titleView}>
                      <TextInput
                        value={title}
                        onChangeText={onChangeTitle}
                        style={styles.titleInputStyle}
                        placeholder={'Title'}
                        placeholderTextColor={colors.drakGrey}
                        maxLength={100}
                        keyboardType={'default'}
                        multiline={false}
                        returnKeyType={'next'}
                      />
                    </View>

                    <View style={styles.suggestionView}>
                      <TextInput
                        value={suggestionDesc}
                        onChangeText={onChangeSuggestionDesc}
                        style={styles.suggestionDescInputStyle}
                        placeholder={'Suggestion'}
                        placeholderTextColor={colors.drakGrey}
                        keyboardType={'default'}
                        multiline={true}
                        returnKeyType={'done'}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={onPressSuggestionSubmit}
                      activeOpacity={0.8}
                      style={styles.submitBtn}>
                      <Text style={styles.btnSubmitText}>Submit</Text>
                    </TouchableOpacity>
                  </>
                )}

                {showErrorModal && (
                  <MessageSuccessModal
                    textUpper={'Request Status'}
                    textLower={updateRatingHere?.message}
                    btnText={'OK'}
                    onPressOpacity={closeModal}
                  />
                )}

                {showSuccessModal && (
                  <MessageSuccessModal
                    textUpper={'Request Status'}
                    textLower={updateRatingHere?.userData?.message}
                    btnText={'OK'}
                    onPressOpacity={closeModal}
                  />
                )}

                {showErrorModalSuggestion && (
                  <MessageSuccessModal
                    textUpper={'Request Status'}
                    textLower={suggestionFeedbackHere?.message}
                    btnText={'OK'}
                    onPressOpacity={closeModalSuggestion}
                  />
                )}

                {showSuccessModalSuggestion && (
                  <MessageSuccessModal
                    textUpper={'Request Status'}
                    textLower={suggestionFeedbackHere?.message}
                    btnText={'OK'}
                    onPressOpacity={closeModalSuggestion}
                  />
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = EStyleSheet.create({
  mainText: {
    color: '#363636',
    fontStyle: 'italic',
    fontSize: '0.8rem',
    letterSpacing: 0.5,
  },
  belowText: {
    color: '#363636',
    fontWeight: '300',
    fontSize: hp('1.55'),
    fontStyle: 'italic',
  },
  upperText: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: hp('1.8'),
  },
  btnView1: {
    flex: 0.325,
    backgroundColor: '#4a4949',
    height: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('5'),
  },
  btnView2: {
    flex: 0.325,
    backgroundColor: '#1C37A4',
    height: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('5'),
  },
  btnText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.63rem',
  },
  titleView: {
    marginTop: wp('5'),
    backgroundColor: 'white',
    borderColor: colors.greyColor,
    borderWidth: 0.5,
    borderRadius: wp('3.5'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },

  suggestionView: {
    marginTop: wp('5'),
    backgroundColor: 'white',
    borderColor: colors.greyColor,
    borderWidth: 0.5,
    borderRadius: wp('3.5'),
    marginBottom: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },

  titleInputStyle: {
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
  },
  suggestionDescInputStyle: {
    fontSize: hp('1.65'),
    height: hp('20'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: hp('5.5'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C37A4',
    borderRadius: wp('10'),
    marginVertical: hp('3'),
  },
  btnSubmitText: {
    color: 'white',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.7rem',
  },
});
