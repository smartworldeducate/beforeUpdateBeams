import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const GraphChart = () => {
  // const appraisalData = useSelector(state => state.appraisalState);
  // console.log('obj data', appraisalData?.user);
  // const getArr = appraisalData?.user;
  // console.log('getArr', getArr);
  // const intArray = [];
  // const newArray = appraisalData?.user.map((item, i) => {
  //   intArray.push({
  //     value: parseInt(item.VALUE),
  //     label: item.LABEL,
  //     frontColor: item.FRONTCOLOR,
  //   });
  // });
  // console.log('new array ', intArray);

  // const [ourData, seOurData] = useState(getArr);

  // const barData = [
  //   {value: 100, label: '2019', frontColor: '#4ABFF4'},
  //   {value: 180, label: '2020', frontColor: '#79C3DB'},
  //   {value: 195, label: '2021', frontColor: '#28B2B3'},
  //   {value: 250, label: '2022', frontColor: '#4ADDBA'},
  //   {value: 320, label: '2023', frontColor: '#91E3E3'},

  // ];

  const intArray = [
    {year: '2020', value: 130},
    {year: '2021', value: 200},
    {year: '2022', value: 50},
    {year: '2023', value: 60},
    {year: '2024', value: 70},
    {year: '2025', value: 40},
    {year: '2026', value: 20},
    {year: '2027', value: 10},
  ];

  return (
    <>
      {/* <View style={{height: 260}}>
        {appraisalData !== '' ? ( */}
      <View style={{paddingBottom: hp('3'), backgroundColor: 'red'}}>
        <BarChart
          showFractionalValue
          showYAxisIndices
          noOfSections={4}
          // hideYAxisText
          // hideAxesAndRules={true}
          isThreeD
          initialSpacing={hp(4.5)}
          barMarginBottom={hp(1)}
          showGradient
          gradientColor={'#1C37A4'}
          yAxisThickness={1}
          xAxisThickness={1}
          frontColor={'transparent'}
          sideColor={'#1C37A4'}
          topColor={'#1C37A4'}
          maxValue={400}
          data={intArray}
          isAnimated
          xAxisLabelTextStyle={{color: 'green', textAlign: 'center'}}
          renderTooltip={(item, index) => {
            return (
              <View
                style={{
                  backgroundColor: '#7BAAEF',
                  borderRadius: 4,
                  color: '#fff',
                }}>
                <Text>{item.value}</Text>
              </View>
            );
          }}
        />
      </View>
      {/* ) : (
          <Text style={{color: 'black'}}>no data</Text>
        )}
      </View> */}
    </>
  );
};

export default GraphChart;
