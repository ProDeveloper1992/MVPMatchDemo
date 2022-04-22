import React from 'react';
import {Text} from 'react-native';
import {Colors} from '../../constants';
import PropTypes from 'prop-types';
import {FontTypes} from '../../constants/font-types';

const AppText = (props) => {
  function getFontWeight() {
    switch (props.fontType) {
      case FontTypes.bold:
        return '700';

      case FontTypes.semibold:
        return '600';

      case FontTypes.medium:
        return '500';

      case FontTypes.regular:
        return '400';

      default:
        return '400';
    }
  }

  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontSize: props.size,
          color: props.color,
          fontWeight: getFontWeight(),
          textTransform: props.uppercase ? 'uppercase' : 'none',
        },
      ]}
    />
  );
};

AppText.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  fontType: PropTypes.oneOf([
    FontTypes.bold,
    FontTypes.semibold,
    FontTypes.medium,
    FontTypes.regular,
  ]),
};

AppText.defaultProps = {
  size: 14,
  color: Colors.ui_button_black,
  uppercase: false,
};

export default AppText;
