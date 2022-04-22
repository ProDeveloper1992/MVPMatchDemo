import {Colors} from './colors';
import {ButtonTypes} from './button-types';
import {Icons} from './icons';
import {Dimensions} from 'react-native';

const DIMENSIONS = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};

export {Colors, ButtonTypes, Icons, DIMENSIONS};
