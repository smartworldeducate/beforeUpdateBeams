import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import StarRating from 'react-native-star-rating-widget';
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
import {UpdateRatingAction} from '../features/RatingAndFeedbackSlice/UpdateRatingSlice';
import Toast from 'react-native-simple-toast';
import {SuggestionFeedbackAction} from '../features/RatingAndFeedbackSlice/SuggestionFeedback';

const FeedBack = props => {
  const dispatch = useDispatch();
  const updateRatingSuccess = useSelector(
    state => state.updateRatingStore.success,
  );
  const updateRatingMessage = useSelector(
    state => state.updateRatingStore.message,
  );
  console.log('updateRatingSuccess', updateRatingSuccess);

  const ratingHereStore = useSelector(
    state => state.ratingStore?.userData[0]?.RATING_ID,
  );
  console.log('ratingHereStore', ratingHereStore);

  const userId = useSelector(
    state => state.profileStore?.userData?.emp_result?.EMPLOYEE_ID,
  );

  const suggestionFeedbackHere = useSelector(
    state => state.suggestionFeedbackStore,
  );

  console.log('suggestionFeedbackHere', suggestionFeedbackHere?.success);

  const [feedback, setFeedbak] = useState(true);
  const [suggestion, setSuggestion] = useState(false);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState('');
  const [suggestionDesc, setSuggestionDesc] = useState('');

  const fetchLatestRating = async () => {
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
  };

  useEffect(() => {
    fetchLatestRating();
  }, [dispatch]);

  // useEffect(() => {
  //   AsyncStorage.getItem('loginData')
  //     .then(loginData => {
  //       const parsedLoginData = JSON.parse(loginData);
  //       dispatch(
  //         RatingAction({
  //           employee_id: parsedLoginData,
  //         }),
  //       );
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving loginData from AsyncStorage:', error);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    if (ratingHereStore == undefined) {
      setRating(0);
    } else {
      setRating(ratingHereStore);
    }
  }, [ratingHereStore]);

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

  const onChangeRating = val => {
    console.log('onChangeRating');
    dispatch(updateRating(val));
    setRating(val);
  };

  const onPressSubmitRating = () => {
    dispatch(
      UpdateRatingAction({
        employee_id: userId,
        rating_id: rating,
        type_id: 1,
      }),
    );
    fetchLatestRating();
    // if (updateRatingSuccess == 1) {
    //   Toast.show(updateRatingMessage, Toast.SHORT);
    // }
  };

  const onPressSuggestionSubmit = () => {
    console.log('onPressSuggestionSubmit');
    dispatch(
      SuggestionFeedbackAction({
        employee_id: userId,
        title: title,
        feedback_desc: suggestionDesc,
        type_id: 2,
      }),
    );
  };

  useEffect(() => {
    if (suggestionFeedbackHere?.success == 1) {
      // Toast.showWithGravity(
      //   'This is a long toast at the top.',
      //   Toast.LONG,
      //   Toast.TOP,
      // );

      setTitle('');
      setSuggestionDesc('');
    }
  }, [suggestionFeedbackHere]);

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
                      backgroundColor: feedback ? colors.whiteColor : '#E7E7E7',
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
                  </View>

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <StarRating
                      rating={rating}
                      onChange={onChangeRating}
                      maxStars={5}
                      starSize={hp('5.5')}
                      color={'#fdd835'}
                      emptyColor={'#fdd835'}
                      enableHalfStar={false}
                      // style={{borderColor: 'red', borderWidth: 1}}
                      // starStyle={{borderColor: 'red', borderWidth: 1}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: wp('4'),
                      marginVertical: hp('2'),
                    }}>
                    <TouchableOpacity
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
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = EStyleSheet.create({
  mainText: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontSize: '0.8rem',
    letterSpacing: 0,
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
