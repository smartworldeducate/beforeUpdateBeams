import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Check from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import fontSize from '../Styles/fontSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';
const TimeLine = props => {
  const timeLineData = useSelector(state => state.timeLineState);
  // console.log('timeLIneData', timeLineData?.user);

  const renderItem = ({item, index}) => {
    const bgcolor = [
      '#D4FFCC',
      '#CCFFF3',
      '#FFFDCC',
      '#E0CCFF',
      '#FFE5CC',
      '#FFCCCC',
    ];
    const color = [
      '#2D8E00',
      '#008E8E',
      '#8E7700',
      '#69008E',
      '#D69A03',
      '#D80000',
    ];
    const statusColore = [
      'Hired as a',
      'Promoted to',
      'Confirmed as a',
      'Awarded a',
    ];

    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <View
            style={{
              width: wp(6),
              height: hp(3),
              borderRadius: hp(50),
              borderWidth: 1,
              borderColor: '#1C37A4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp(4),
                height: hp(2),
                borderRadius: hp(50),
                backgroundColor: '#1C37A4',
              }}></View>
          </View>
          <View
            style={{
              height: hp(9.8),
              width: wp(0.5),
              backgroundColor: '#1C37A4',
              marginLeft: hp(1.2),
              marginTop: hp(0.5),
              marginBottom: hp(0.5),
            }}></View>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: hp(1),
            height: hp(12),
            borderRadius: hp(2),
            backgroundColor: '#FFF',
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: hp(2),
              marginTop: hp(1),
            }}>
            <View>
              <Text style={styles.dtext}>{item?.TIMELINE_DATE}</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item?.TIMELINE_TYPE == 'Appraisal'
                    ? bgcolor[0]
                    : item?.TIMELINE_TYPE == 'Confirmation'
                    ? bgcolor[2]
                    : item?.TIMELINE_TYPE == 'Hire'
                    ? bgcolor[3]
                    : item?.TIMELINE_TYPE == 'm_log'
                    ? bgcolor[3]
                    : '',
                borderRadius: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.ststext,
                  {
                    color:
                      item?.TIMELINE_TYPE == 'Appraisal'
                        ? color[0]
                        : item?.TIMELINE_TYPE == 'Confirmation'
                        ? color[2]
                        : item?.TIMELINE_TYPE == 'Hire'
                        ? color[3]
                        : item?.TIMELINE_TYPE == 'm_log'
                        ? color[3]
                        : '',
                  },
                ]}>
                {item?.TIMELINE_TYPE}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: hp(1),
              paddingVertical: hp(1),
              marginHorizontal: hp(2),
            }}>
            <Text style={styles.centertext}>
              {item?.TIMELINE_TYPE == 'Hired'
                ? statusColore[0]
                : item?.TIMELINE_TYPE == 'Confirmation'
                ? statusColore[2]
                : item?.TIMELINE_TYPE == 'Appraisal'
                ? statusColore[3]
                : item?.TIMELINE_TYPE == 'm_log'
                ? statusColore[0]
                : ''}
              <Text
                style={[
                  styles.prev,
                  {
                    color:
                      item?.TIMELINE_TYPE == 'Confirmation'
                        ? color[2]
                        : item?.TIMELINE_TYPE == 'Appraisal'
                        ? '#2ECC71'
                        : item?.TIMELINE_TYPE == 'Promoted'
                        ? 'green'
                        : '',
                  },
                ]}>
                {' '}
                {item?.DESIGNATION}{' '}
              </Text>
              in rating for annual appraisals{' '}
              {item?.TIMELINE_TYPE == 'Confirmation' ? (
                <Text style={[styles.prev]}>{item?.DEPT_NAME}</Text>
              ) : item?.TIMELINE_TYPE == 'Promoted' ? (
                <Text style={styles.prev}>{item?.DEPT_NAME}</Text>
              ) : item?.TIMELINE_TYPE == 'Promoted' ? (
                <Text style={styles.prev}>{item?.DEPT_NAME}</Text>
              ) : item?.TIMELINE_TYPE == 'Appraisal' ? (
                <Text style={styles.prev}>{item?.RATING_YEAR}.</Text>
              ) : item?.TIMELINE_TYPE == 'm_log' ? (
                <Text style={styles.prev}>{item?.RATING_YEAR}.</Text>
              ) : (
                ''
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <View>
        <MainHeader
          text={'Timeline'}
          iconName={'arrow-left'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View
        style={{
          height: hp(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: hp(2.5),
          marginTop: hp(3),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
            <Icon
              type="light"
              name="circle-check"
              size={hp(3)}
              color="#239B56"
            />
          </View>
          <View style={{marginLeft: hp(0.8)}}>
            <View>
              <Text style={styles.smalltext}>Regular</Text>
            </View>
            <View>
              <Text style={styles.smalltext1}>STATUS</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
            <Icon name="wrench" size={hp(3)} color="#BB8FCE" />
          </View>
          <View style={{marginLeft: hp(0.5)}}>
            <View>
              <Text style={styles.smalltext}>3.7 Years</Text>
            </View>
            <View>
              <Text style={styles.smalltext1}>SERVICE</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: hp(3.5)}}>
          <View style={{alignItems: 'center', paddingVertical: hp(0.3)}}>
            <Check name="checkcircleo" size={hp(3)} color="#CD6155" />
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
      <View style={{flex: 1, marginHorizontal: hp(2.5), marginTop: hp(2)}}>
        <FlatList
          data={timeLineData?.user}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default TimeLine;

const styles = EStyleSheet.create({
  zetext: {
    color: '#363636',
    fontWeight: '700',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraBlack,
  },
  zetext1: {
    color: '#363636',
    fontWeight: '500',
    // marginTop: hp(1),
    fontSize: '0.7rem',
    fontFamily: fontFamily.ceraBlack,
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
  dtext: {
    color: '#353535',
    fontSize: '0.65rem',
    fontWeight: '700',
    fontStyle: 'normal',
    paddingVertical: hp(0.5),
    fontFamily: fontFamily.ceraBold,
  },
  centertext: {
    fontFamily: fontFamily.ceraLight,
    fontSize: '0.65rem',
    fontWeight: '100',
    fontStyle: 'normal',
    color: '#979797',
    lineHeight: hp(2),
  },
  ststext: {
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraBold,
    paddingHorizontal: hp(2.5),
    paddingVertical: hp(0.5),
    textTransform: 'uppercase',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  prev: {
    // color: '#4E69DA',
    fontSize: '0.65rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  endtext: {
    color: '#4E69DA',
    fontSize: '0.65rem',
    fontFamily: fontFamily.ceraMedium,
    fontWeight: '500',
    fontStyle: 'normal',
  },
});
