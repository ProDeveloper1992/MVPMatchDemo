import {StyleSheet} from 'react-native';
import {Colors, DIMENSIONS} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.ui_white,
    margin: 10,
    shadowColor: Colors.ui_black,
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    height: DIMENSIONS.HEIGHT / 4,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.ui_grey,
  },
  detailsContainer: {
    padding: 10,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
