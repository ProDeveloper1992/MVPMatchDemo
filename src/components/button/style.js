import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  buttonContainer: function (type, disabled) {
    return {
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: Colors.ui_button_black,
      backgroundColor: getBgColor(type, disabled),
      borderWidth: 1,
      borderColor: getBorderColor(type, disabled),
    };
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function getBgColor(type, disabled) {
  switch (type) {
    case 'default':
      if (disabled) {
        return Colors.ui_button_disabled;
      }
      return Colors.ui_button_black;
    case 'danger':
      return Colors.ui_button_danger;
    case 'outline':
      return Colors.ui_white;
    case 'text':
      return Colors.ui_white;
    default:
      return Colors.ui_button_black;
  }
}

export function getTextColor(type) {
  switch (type) {
    case 'default':
      return Colors.ui_white;
    case 'danger':
      return Colors.ui_white;
    case 'outline':
      return Colors.ui_button_black;
    case 'text':
      return Colors.ui_button_black;
    default:
      return Colors.ui_white;
  }
}

const getBorderColor = (type, disabled) => {
  switch (type) {
    case 'default':
      return Colors.ui_transparent;
    case 'danger':
      return Colors.ui_transparent;
    case 'outline':
      return Colors.ui_button_black;
    case 'text':
      return Colors.ui_transparent;
    default:
      return Colors.ui_transparent;
  }
};
