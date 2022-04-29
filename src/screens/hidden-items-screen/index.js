import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Colors} from '../../constants';
import {AppText, MovieItem} from '../../components';
import {useSelector} from 'react-redux';
import {FontTypes} from '../../constants/font-types';

const HiddenItemsScreen = () => {
  const {hiddenItems} = useSelector((state) => state.userState);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => String(index)}
        data={hiddenItems}
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

export default HiddenItemsScreen;
