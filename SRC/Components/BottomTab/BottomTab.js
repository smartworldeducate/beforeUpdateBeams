import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
const BottomTab = ({state, descriptors, navigation, props}) => {
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // console.log("route", route, index);

            return (
              <View key={index} style={styles.innerMainView}>
                {index === 0 ? (
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        zIndex: 1,
                        marginBottom: hp('-3'),
                        right: wp('-10'),
                        top: hp('2.25'),

                        // backgroundColor: 'red',
                        height: hp('3.15'),
                        width: wp('6'),
                        borderRadius: wp('50'),
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: colors.white,
                          fontSize: hp('1.5'),
                          fontFamily: fontFamily.innerBold,
                        }}></Text>
                    </View>

                    <TouchableOpacity
                      onPress={onPress}
                      style={styles.touchableIcon}>
                      <Menu
                        name="home"
                        size={hp(3)}
                        color="#1C37A4"
                        style={{}}
                      />
                    </TouchableOpacity>
                  </View>
                ) : index === 1 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={styles.centralIcon}>
                      <Ficon
                        type="light"
                        name="book-bookmark"
                        size={hp(3)}
                        color="#1C37A4"
                      />
                    </TouchableOpacity>
                  </View>
                ) : index === 2 ? (
                  <TouchableOpacity
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <Ficon style={{}} name="qrcode" size={hp(4)} color="blue" />
                  </TouchableOpacity>
                ) : index === 3 ? (
                  <TouchableOpacity
                    onPress={onPress}
                    style={styles.touchableIcon}>
                    <Ficon
                      type="light"
                      name="user-tag"
                      size={hp(3.5)}
                      color="#1C37A4"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};
const styles = EStyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? hp('11') : hp('12.5'),
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: wp('0.15'),
    paddingBottom: hp('1'),
    borderTopLeftRadius: wp('5.5'),
    borderTopRightRadius: wp('5.5'),
    marginHorizontal: wp('5'),
  },
  innerMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1'),
    flex: 1,
  },
  imgStyle: {
    height: hp('5.25'),
    width: wp('10.5'),
  },
  centralIcon: {
    alignItems: 'center',
    marginTop: hp('-3.25'),
  },
  centralImgStyle: {
    height: hp('10'),
    width: wp('20'),
  },
  textStyle: {
    alignItems: 'center',
    fontSize: '0.53rem',
    fontFamily: fontFamily.innerBold,
    color: colors.lightGrey,
    letterSpacing: 0.5,
  },
  centralText: {
    alignItems: 'center',
    fontSize: '0.53rem',
    fontFamily: fontFamily.innerBold,
    color: colors.lightGrey,
    letterSpacing: wp('0.1'),
  },
});

export default BottomTab;
