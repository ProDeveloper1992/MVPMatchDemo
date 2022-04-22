import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Colors, Icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AppText, MovieItem} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getMoviesList} from '../../redux/actions/user-action';
import {FontTypes} from '../../constants/font-types';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {favorites} = useSelector((state) => state.userState);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    await dispatch(getMoviesList('aven'));
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => String(index)}
        data={favorites}
        renderItem={({item, index}) => {
          return (
            <View key={String(index)} style={{flex: 0.5}}>
              <MovieItem item={item} />
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.noData}>
            <AppText
              size={16}
              color={Colors.ui_grey_dark}
              fontType={FontTypes.bold}>
              {'No Movies Found!'}
            </AppText>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui_white,
  },
  listContainer: {
    flexGrow: 1,
    padding: 5,
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginEnd: 20,
  },
});

export default FavoritesScreen;
