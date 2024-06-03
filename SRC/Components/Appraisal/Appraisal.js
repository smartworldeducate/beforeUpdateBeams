import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector, useDispatch} from 'react-redux';
import fontFamily from '../../Styles/fontFamily';

const Appraisal = ({dataList, renderItem, keyExtractor}) => {
  const appraisalYearsHere = useSelector(state => state.appraisalYearsStore);
  // console.log('appraisalYearsHereComp', appraisalYearsHere?.userData);
  const data1 = appraisalYearsHere?.userData;

  const newArray = data1?.map(({LABEL, VALUE, RATING_DESC}) => ({
    label: LABEL,
    value: VALUE,
    rating: RATING_DESC,
  }));
  // console.log('newArray', newArray);

  return (
    <>
      {appraisalYearsHere?.userData?.length > 0 ? (
        <View style={{marginHorizontal: wp('6')}}>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: wp('-5'),
              marginTop: hp('6'),
              paddingBottom: hp('1.5'),
              height: hp('36'),
            }}>
            <BarChart
              data={newArray}
              showFractionalValue
              // showYAxisIndices
              noOfSections={5}
              dashGap={15}
              dashWidth={5}
              rulesColor={'silver'}
              // yAxisLabelContainerStyle={{color: 'green'}}
              // hideYAxisText
              // hideAxesAndRules={false}
              // hideOrigin
              //   xAxisLength={wp('80')}
              // backgroundColor={'white'}
              // rulesType={'dashed'}
              isThreeD
              initialSpacing={hp(1)}
              barMarginBottom={2}
              showGradient
              gradientColor={'white'}
              yAxisThickness={1}
              xAxisThickness={1}
              // xAxisIndicesColor={'red'}
              // yAxisIndicesColor={'#1C37A4'}
              xAxisColor={'#1C37A4'}
              yAxisColor={'#1C37A4'}
              frontColor={'#566dd1'}
              sideColor={'#d3d3d3'}
              topColor={'#d3d3d3'}
              maxValue={100}
              isAnimated
              label
              xAxisLabelTextStyle={{
                color: '#1C37A4',
                fontSize: 12,
                fontWeight: 'bold',
              }}
              // yAxisLabelTextStyle={{
              //   color: 'white',
              //   fontSize: 12,
              //   fontWeight: 'bold',
              // }}

              barWidth={28}
              yAxisTextStyle={{
                color: '#1C37A4',
                fontSize: 12,
                fontWeight: 'bold',
              }}
              // hideRules
              // showReferenceLine1
              // referenceLine1Position={420}
              // referenceLine1Config={{
              //   color: 'red',
              //   dashWidth: 2,
              //   dashGap: 3,
              // }}
              renderTooltip={(item, index) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#1C37A4',
                      borderRadius: hp('0.65'),
                      marginTop: hp('-4.75'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        padding: wp('1.5'),
                        fontSize: hp('1.25'),
                        // fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {`${item.value}`}
                      {/* {`${item?.rating} \n ${item.value}`} */}
                    </Text>
                  </View>
                );
              }}
            />
          </View>

          {appraisalYearsHere?.success == 1 && (
            <View style={{marginTop: hp('3'), marginHorizontal: wp('-8')}}>
              <FlatList
                data={dataList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
              />
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noDataText}>
          No appraisal records are available at this moment.
        </Text>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  noDataText: {
    paddingTop: hp('3'),
    fontSize: hp('1.75'),
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('0.5'),
  },
});

export default Appraisal;
