import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const TitleCategoriesListModal = ({
  modalVisible,
  onPressOpacity,
  text,
  leaveTypesData,
  renderItem,
  keyExtractor,
  isSearchAllow,
  searchValue,
  onChangeSearchValue,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPressOpacity}>
      <View style={{flex: 1, backgroundColor: colors.transparentBlack}}>
        <TouchableOpacity
          onPress={onPressOpacity}
          style={{flex: 0.25}}></TouchableOpacity>
        <View
          style={{
            flex: 0.75,
            borderTopLeftRadius: wp('7'),
            borderTopRightRadius: wp('7'),
            paddingHorizontal: wp('6'),
            backgroundColor: colors.whiteColor,
          }}>
          <View style={{margin: hp(2)}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: hp('2.85'),
                fontFamily: fontFamily.ceraMedium,
                color: 'black',
                fontWeight: '500',
                paddingVertical: hp(1),
              }}>
              {text}
            </Text>
          </View>

          {isSearchAllow && (
            <View
              style={{
                flexDirection: 'row',
                borderColor: 'grey',
                borderWidth: wp('0.15'),
                borderRadius: wp('50'),
              }}>
              <View style={{flex: 0.9}}>
                <TextInput
                  style={styles.textInputCustomStyle}
                  onChangeText={onChangeSearchValue}
                  placeholder={'Search here...'}
                  placeholderTextColor={colors.loginTextColor}
                  value={searchValue}
                  keyboardType={'default'}
                  multiline={false}
                  numberOfLines={1}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.1}
                style={{
                  flex: 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name={'magnifying-glass'}
                  color={'#1C37A4'}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          )}

          <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
              data={leaveTypesData} // Use filtered data here
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{marginHorizontal: hp('2')}}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('6'),
    color: colors.loginIconColor,
  },
});

export default TitleCategoriesListModal;
