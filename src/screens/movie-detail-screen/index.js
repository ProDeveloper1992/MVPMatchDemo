import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AppText} from '../../components';
import {Colors, DIMENSIONS, Icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {FontTypes} from '../../constants/font-types';
import {useDispatch, useSelector} from 'react-redux';
import {ActionDispatcher} from '../../redux/actions';
import {SET_FAVORITES_LIST} from '../../redux/actions/types';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../redux/actions/user-action';

export default function MovieDetail(props) {
  const {movie} = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {favorites} = useSelector((state) => state.userState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: movie?.l ? movie.l : 'Details',
    });
  }, [navigation]);

  const isFavorite = () => {
    if (favorites && favorites.length > 0) {
      for (let fav of favorites) {
        if (fav.id === movie.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const onHeartPress = () => {
    if (isFavorite()) {
      dispatch(removeFromFavorite(movie));
      // const filteredFavorites = FAVORITES.filter(
      //   (favItem) => movie.id != favItem.id,
      // );
      // FAVORITES = filteredFavorites;
    } else {
      // FAVORITES.push(movie);
      dispatch(addToFavorite(movie));
    }
    // dispatch(ActionDispatcher(SET_FAVORITES_LIST, FAVORITES));
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: movie?.i?.imageUrl}} style={styles.image} />
      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText size={16} fontType={FontTypes.bold} style={{flex: 1}}>
            {movie?.l}
          </AppText>
          <TouchableOpacity onPress={onHeartPress}>
            <Image
              source={isFavorite() ? Icons.heart_filled : Icons.heart_outline}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <AppText style={{marginVertical: 5}}>{movie?.s}</AppText>
        {movie?.y ? (
          <AppText style={{marginVertical: 5}}>{`Year: ${movie.y}`}</AppText>
        ) : null}
        {movie?.rank ? (
          <AppText style={{marginVertical: 5}}>{`Rank: ${movie.rank}`}</AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui_white,
  },
  image: {
    height: DIMENSIONS.HEIGHT / 3,
    width: '100%',
    backgroundColor: Colors.ui_grey,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
});
