import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const LineSeprator = ({
  height,
  backgroundColor,
  marginHorizontal,
  maginVertical,
}) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: backgroundColor,
        marginHorizontal: marginHorizontal,
        marginVertical: maginVertical,
      }}></View>
  );
};

export default LineSeprator;

const styles = EStyleSheet.create({});
