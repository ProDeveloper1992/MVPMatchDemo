import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AppText, Button} from '../../components';
import {Colors, DIMENSIONS, Icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {FontTypes} from '../../constants/font-types';
import {useDispatch, useSelector} from 'react-redux';
import {ActionDispatcher} from '../../redux/actions';
import {
  GET_MOVIES_LIST_SUCCESS,
  SET_FAVORITES_LIST,
} from '../../redux/actions/types';
import {
  addToFavorite,
  addToHiddenItems,
  removeFromFavorite,
  removeFromHiddenItems,
} from '../../redux/actions/user-action';

export default function MovieDetail(props) {
  const {movie} = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {favorites, hiddenItems, moviesList} = useSelector(
    (state) => state.userState,
  );

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
    } else {
      dispatch(addToFavorite(movie));
    }
  };

  const isHidden = () => {
    if (hiddenItems && hiddenItems.length > 0) {
      for (let hiddenItem of hiddenItems) {
        if (hiddenItem.id === movie.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const onHidePress = () => {
    if (isHidden()) {
      dispatch(removeFromHiddenItems(movie));
    } else {
      dispatch(addToHiddenItems(movie));
    }
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

        <Button
          title={isHidden() ? 'UnHide' : 'Hide'}
          onPress={onHidePress}
          style={{width: '100%'}}
        />
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
