import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonTypes, Colors} from '../../constants';
import styles, {getTextColor} from './style';
import {AppText} from '..';
import {FontTypes} from '../../constants/font-types';

const Button = ({
  title,
  icon,
  onPress,
  loading,
  disabled,
  style,
  type,
  fontSize,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.buttonContainer(type, disabled), style]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.ui_white} />
      ) : (
        <View style={styles.rowCenter}>
          {icon}
          {title != '' ? (
            <AppText
              size={fontSize}
              fontType={FontTypes.bold}
              color={getTextColor(type)}>
              {title}
            </AppText>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fontSize: PropTypes.number,
  style: PropTypes.any,
  onPress: PropTypes.func,
  type: PropTypes.oneOf([
    ButtonTypes.default,
    ButtonTypes.danger,
    ButtonTypes.outline,
    ButtonTypes.text,
  ]),
};

Button.defaultProps = {
  type: ButtonTypes.default,
  fontSize: 16,
  title: '',
  icon: null,
  loading: false,
  disabled: false,
  onPress: () => {},
};

export default Button;
