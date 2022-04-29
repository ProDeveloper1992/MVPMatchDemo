import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Colors, Icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AppInput, AppText, MovieItem} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getMoviesList} from '../../redux/actions/user-action';
import {FontTypes} from '../../constants/font-types';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {moviesList} = useSelector((state) => state.userState);

  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rowCenter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('favorites-screen')}>
            <Image source={Icons.heart_outline} style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('hidden-items-screen')}>
            <Image
              source={Icons.hidden}
              style={[styles.searchIcon, {marginHorizontal: 20}]}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    console.log('loadMovies');
    await dispatch(getMoviesList('aven'));
  };

  const onDebounceText = async (text) => {
    let sText = text ? text : 'aven';
    setSearching(true);
    await dispatch(getMoviesList(sText));
    setSearching(false);
  };

  return (
    <View style={styles.container}>
      <AppInput
        value={searchText}
        placeholder={'Type movie name here...'}
        isDebounce={true}
        style={{paddingHorizontal: 15}}
        onChangeText={setSearchText}
        onDebounceText={onDebounceText}
        rightIcon={
          searching ? (
            <ActivityIndicator size={'small'} color={Colors.ui_black} />
          ) : null
        }
        icon={
          <TouchableOpacity>
            <Image source={Icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        }
      />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => String(index)}
        data={moviesList}
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
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;
