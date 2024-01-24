import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';

const TextInputCustom = ({
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
  iconRight,
  onPressIcon,
  ref,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // borderColor: colors.borderLightGrey,
        // borderWidth: 1,
        borderRadius: wp('10'),
      }}>
      <View
        style={{
          flex: 0.14,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp('1'),
          backgroundColor: '#FDEB13',
          borderRadius: wp('10'),
        }}>
        <Icon type="light" name={iconName} color={iconColor} size={25} />
      </View>

      <View style={{flex: 0.72, justifyContent: 'center'}}>
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
      <TouchableOpacity
        onPress={onPressIcon}
        style={{
          flex: 0.14,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp('1'),
          // backgroundColor: '#FDEB13',
          // borderRadius: wp('10'),
        }}>
        {iconRight && (
          <Icon type="light" name={iconRight} color={iconColor} size={18} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default TextInputCustom;
