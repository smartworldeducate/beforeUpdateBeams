import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Routes from './Routes';
import EStyleSheet from 'react-native-extended-stylesheet';
const {width} = Dimensions.get('window');
const rem = width > 767 ? 16 : 20;
import {store} from './SRC/app/store';
import {Provider} from 'react-redux';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {
  notificationListener,
  requestNotificationPermission,
} from './SRC/NotificationHandler/NotificationHandler';
import InterConnectionDesign from './SRC/Components/InternetCheck/InterConnectionDesign';
import InternetCheck from './SRC/Components/InternetCheck/InternetCheck';

configureFontAwesomePro();
// calc styles
EStyleSheet.build({
  $rem: rem,
});

const App = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    requestNotificationPermission();
    notificationListener();
  }, []);
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>

      {isConnected ? null : <InterConnectionDesign />}
      <InternetCheck setIsConnected={setIsConnected} />
    </>
  );
};

export default App;
const styles = StyleSheet.create({});
