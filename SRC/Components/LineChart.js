import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const GraphChart = () => {
  const appraisalData = useSelector(state => state.appraisalState);
  console.log('obj data', appraisalData?.user);
  const getArr = appraisalData?.user;
  console.log('getArr', getArr);
  const intArray = [];
  const newArray = appraisalData?.user.map((item, i) => {
    intArray.push({
      value: parseInt(item.VALUE),
      label: item.LABEL,
      frontColor: item.FRONTCOLOR,
    });
  });
  console.log('new array ', intArray);

  const [ourData, seOurData] = useState(getArr);

  // const barData = [
  //   {value: 100, label: '2019', frontColor: '#4ABFF4'},
  //   {value: 180, label: '2020', frontColor: '#79C3DB'},
  //   {value: 195, label: '2021', frontColor: '#28B2B3'},
  //   {value: 250, label: '2022', frontColor: '#4ADDBA'},
  //   {value: 320, label: '2023', frontColor: '#91E3E3'},

  // ];

  return (
    <>
      <View style={{height: 260}}>
        {appraisalData !== '' ? (
          <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            hideYAxisText
            hideAxesAndRules={true}
            isThreeD
            initialSpacing={hp(4.5)}
            barMarginBottom={hp(1)}
            showGradient
            gradientColor={'#1C37A4'}
            yAxisThickness={0}
            xAxisThickness={0}
            frontColor={'transparent'}
            sideColor={'#1C37A4'}
            topColor={'#1C37A4'}
            maxValue={400}
            data={intArray}
            isAnimated
            xAxisLabelTextStyle={{color: '#cdcdcd', textAlign: 'center'}}
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
        ) : (
          <Text style={{color: 'black'}}>no data</Text>
        )}
      </View>
    </>
  );
};

export default GraphChart;
