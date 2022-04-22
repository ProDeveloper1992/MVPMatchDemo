import React, {useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {debounce} from 'lodash';
import {Colors} from '../../constants';

export default function AppInput({
  style,
  label,
  icon,
  rightIcon,
  onRightIconPress = () => {},
  error,
  onChangeText = (text) => {},
  isDebounce = false,
  onDebounceText = (text) => {},
  ...props
}) {
  const handler = useCallback(
    debounce((text) => onDebounce(text), 1000),
    [],
  );

  const onChange = (text) => {
    onChangeText(text);
    handler(text);
  };

  const onDebounce = (text) => {
    if (isDebounce) {
      onDebounceText(text);
    }
  };

  return (
    <View style={style || null}>
      <View style={styles.labelContainer}>
        {label && (
          <Text
            color={error ? Colors.ui_error : Colors.ui_black}
            style={[
              styles.label,
              {color: error ? Colors.ui_error : Colors.ui_black},
            ]}>
            {label}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.ui_white,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
          borderColor: error ? Colors.ui_error : Colors.ui_grey,
        }}>
        {icon && <View style={{marginEnd: 10}}>{icon}</View>}
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor={Colors.ui_grey_dark}
          autoCapitalize={'none'}
          onChangeText={onChange}
          clearButtonMode={'while-editing'}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{padding: 5}}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    color: Colors.ui_black,
  },
  errorText: {
    textAlign: 'right',
    color: Colors.ui_error,
  },
  label: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
