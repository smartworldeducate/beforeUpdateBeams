import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
  Linking,
  FlatList,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import FgraphList from './GraphList';
import fontFamily from '../Styles/fontFamily';
import ApGraph from './ApGraph';
import GraphChart from './LineChart';
const ApComp = () => {
  const appraisalData = useSelector(state => state.appraisalState);
  // console.log("appraisal data on comp screen",appraisalData?.user)
  const [expanded, setExpended] = useState(false);
  const [defalut, setDefalut] = useState(true);
  const [clinder, setClinder] = useState(null);
  const clinderHandler = item => {
    setClinder(item);
    setDefalut(false);
  };
  const onPress = ({item}) => {
    // console.log('onPress item', item);
    // setExpended(!expanded);
  };
  const years = [
    {id: 1, month: 'Jan'},
    {id: 2, month: 'Fab'},
    {id: 3, month: 'Mar'},
    {id: 4, month: 'Apr'},
    {id: 5, month: 'May'},
    {id: 6, month: 'Jun'},
    {id: 7, month: 'Jul'},
    {id: 8, month: 'Aug'},
    {id: 9, month: 'Sep'},
    {id: 10, month: 'Oct'},
    {id: 11, month: 'Nov'},
    {id: 12, month: 'Dec'},
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: hp(3.5),
          width: wp(2.5),
          borderRadius: 1,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderHistoryItem = ({item, index}) => {
    return (
      <View style={{marginTop: hp(1)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: hp(2),
            marginHorizontal: hp(2.5),
            elevation: 4,
          }}>
          <Collapse isExpanded={expanded} onToggle={() => onPress(item)}>
            <CollapseHeader
              style={{
                height: hp(12),
                marginHorizontal: hp(1),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 0.3, marginTop: hp(1)}}>
                <ApGraph item={item} />
              </View>
              <View style={{flex: 0.3}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: hp(1),
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{marginVertical: hp(0.5), justifyContent: 'center'}}>
                    {renderDot('#C1B7FD')}
                  </View>
                  <View>
                    <View>
                      <Text style={styles.numbertext}>{item?.VALUE}</Text>
                    </View>
                    <View>
                      <Text style={styles.basictext}>{item?.RATING_DESC}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.3}}>
                <View style={{flexDirection: 'row', marginLeft: hp(2)}}>
                  <View
                    style={{marginVertical: hp(0.5), justifyContent: 'center'}}>
                    {renderDot('#FEBB5B')}
                  </View>
                  <View>
                    <View>
                      <Text style={styles.numbertext}>{item?.SAL_INCR}</Text>
                    </View>
                    <View>
                      <Text style={styles.basictext}>INCREASE</Text>
                    </View>
                  </View>
                </View>
              </View>
            </CollapseHeader>
          </Collapse>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          marginHorizontal: hp(2.5),
          backgroundColor: '#fff',
          borderRadius: hp(2),
          marginTop: hp(0),
        }}>
        <GraphChart />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={appraisalData?.user}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ApComp;

const styles = EStyleSheet.create({
  smalltext: {
    fontWeight: '500',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '500',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#353535',
    fontStyle: 'normal',
    alignItems: 'center',
  },
  iconSty: {
    fontSize: hp(2.5),
    color: '#A6ACAF',
    fontWeight: 100,
  },
  headertext: {
    fontSize: '0.75rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#363636',
    fontWeight: '500',
  },
  duction: {
    color: '#979797',
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
  textnum: {
    color: '#343434',
    fontSize: '0.6rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  circularText: {
    fontSize: '0.75rem',
    color: '#646464',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  circularText1: {
    fontSize: '0.5rem',
    color: '#979797',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    marginHorizontal: hp(0.9),
    textTransform: 'uppercase',
  },
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
  ftbotom: {
    color: '#FFF',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  mainHeader: {
    height: hp(8),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(0),
    borderBottomLeftRadius: hp(0),
  },
  container: {
    flex: 1,
    marginTop: hp(0),
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.5rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  renderdot: {
    height: hp(3.7),
    width: wp(2.5),
    borderRadius: 1,

    marginRight: 10,
  },
  salaryMainView: {
    height: hp(7),
    marginHorizontal: hp(2.5),
    borderRadius: hp(1),
    backgroundColor: '#E7E7E7',
    marginTop: hp(2),
  },
});
