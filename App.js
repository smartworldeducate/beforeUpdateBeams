import React, {useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Routes from './Routes';
import EStyleSheet from 'react-native-extended-stylesheet';
const {width} = Dimensions.get('window');
const rem = width > 767 ? 16 : 20;
import {store} from './SRC/app/store';
import {Provider} from 'react-redux';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
configureFontAwesomePro();
// calc styles
EStyleSheet.build({
  $rem: rem,
});
const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({});
