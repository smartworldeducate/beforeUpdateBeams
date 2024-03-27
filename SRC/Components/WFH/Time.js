import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';
import moment from 'moment';

const Time = ({}) => {
  const [time, setTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format('h:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  time: {
    color: '#363636',
    fontFamily: fontFamily.ceraLight,
    fontSize: '2rem',
    fontWeight: '300',
  },
});
export default Time;
