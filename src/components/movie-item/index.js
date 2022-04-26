import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {AppText} from '../index';
import {FontTypes} from '../../constants/font-types';
import {Colors, Icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../redux/actions/user-action';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function MovieItem({item}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {favorites} = useSelector((state) => state.userState);

  const onItemPress = () => {
    navigation.navigate('movie-detail-screen', {movie: item});
  };

  const isFavorite = () => {
    if (favorites && favorites.length > 0) {
      for (let fav of favorites) {
        if (fav.id === item.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const onHeartPress = () => {
    if (isFavorite()) {
      dispatch(removeFromFavorite(item));
    } else {
      dispatch(addToFavorite(item));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onItemPress}
      style={styles.container}>
      <Image source={{uri: item?.i?.imageUrl}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.rowCenter}>
          <AppText size={16} fontType={FontTypes.bold} style={{flex: 1}}>
            {item?.l}
          </AppText>
          <TouchableOpacity onPress={onHeartPress}>
            <Image
              source={isFavorite() ? Icons.heart_filled : Icons.heart_outline}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
