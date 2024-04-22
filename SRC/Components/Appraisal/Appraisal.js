import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector, useDispatch} from 'react-redux';

const Appraisal = ({dataList, renderItem, keyExtractor}) => {
  const appraisalYearsHere = useSelector(state => state.appraisalYearsStore);
  // console.log('appraisalYearsHereComp', appraisalYearsHere?.userData);
  const data = [
    {label: '2024\nPotential Performer', value: 70},
    {label: '2023\nPotential Performer', value: 60},
    {label: '2022\nPotential Performer', value: 40},
    {label: '2021\nPotential Performer', value: 60},
    {label: '2020\nPotential Performer', value: 70},
    {label: '2019\nPotential Performer', value: 40},
    {label: '2018\nPotential Performer', value: 30},
    {label: '2017\nPotential Performer', value: 20},
  ];
  const data1 = appraisalYearsHere?.userData;

  const newArray = data1?.map(({LABEL, VALUE, RATING_DESC}) => ({
    label: LABEL,
    value: VALUE,
    rating: RATING_DESC,
  }));
  // console.log('newArray', newArray);

  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: wp('-5'),
          marginTop: hp('6'),
          paddingBottom: hp('1.5'),
          height: hp('38'),
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
          yAxisTextStyle={{color: '#1C37A4', fontSize: 12, fontWeight: 'bold'}}
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
        <View style={{marginTop: hp('3'), marginHorizontal: wp('-2')}}>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({});

export default Appraisal;
