import React from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({
  iconName,
  iconColor,
  style,
  onChange,
  onChangeText,
  placeholder,
  Value,
  placeholderColor,
  maxLength,
  keyboardType,
  multiline,
  onPressIn,
  autoFocus,
  onFocus,
  editable,
  secureTextEntry,
  returnKeyType,
  numberOfLines,
  ref,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: colors.borderLightGrey,
        borderWidth: 1,
        borderRadius: widthPercentageToDP('10'),
      }}>
      <View
        style={{
          flex: 0.14,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp('1'),
          backgroundColor: '#FDEB13',
          //   borderRadius: wp('10'),
        }}>
        <Icon name={iconName} color={iconColor} size={30} />
      </View>

      <View style={{flex: 0.86, justifyContent: 'center'}}>
        <TextInput
          style={style}
          onChangeText={onChangeText}
          onChange={onChange}
          placeholder={placeholder}
          value={Value}
          placeholderTextColor={placeholderColor}
          maxLength={maxLength}
          keyboardType={keyboardType}
          multiline={multiline}
          onPressIn={onPressIn}
          autoFocus={autoFocus}
          onFocus={onFocus}
          editable={editable}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          numberOfLines={numberOfLines}
          ref={ref}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Search;
