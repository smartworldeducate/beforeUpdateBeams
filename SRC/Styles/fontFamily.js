import {Platform} from 'react-native';

const fontFamily = {
  // ceraBlack:
  // Platform.OS === 'android' ? 'CeraProBlack' : 'CeraProBlack',

  // ceraBold:
  // Platform.OS === 'android' ? 'CeraProBold' : 'CeraProBold',

  // ceraLight:
  // Platform.OS === 'android' ? 'CeraProLight' : 'CeraProLight',

  // ceraMedium:
  // Platform.OS === 'android' ? 'CeraProMedium' : 'CeraProMedium',

  //   ceraBlack: Platform.OS === 'android' ? 'CeraProBlack' : 'CeraProBlack',

  //   ceraBold: Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold',

  //   ceraLight: Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light',

  //   ceraMedium: Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium',

  //sans pro start

  ceraBlack:
    Platform.OS === 'android' ? 'SourceSansPro-Black' : 'SourceSansPro-Black',

  ceraBold:
    Platform.OS === 'android' ? 'SourceSansPro-Bold' : 'SourceSansPro-Bold',

  ceraLight:
    Platform.OS === 'android' ? 'SourceSansPro-Light' : 'SourceSansPro-Light',

  ceraMedium:
    Platform.OS === 'android'
      ? 'SourceSansPro-Semibold'
      : 'SourceSansPro-Semibold',

  //sans pro end

  // robotoLight:
  // Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light',

  // robotoMedium:
  // Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium',

  // robotoBold:
  // Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold',

  // robotoThin:
  // Platform.OS === 'android' ? 'Roboto-Thin' : 'Roboto-Thin',

  // robotoRegular:
  // Platform.OS === 'android' ? 'Roboto-Regular' : 'Roboto-Regular',
};

export default fontFamily;
