import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {AppText} from '../index';
import {FontTypes} from '../../constants/font-types';
import {Colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export default function MovieItem({item}) {
  const navigation = useNavigation();
  const onItemPress = () => {
    navigation.navigate('movie-detail-screen', {movie: item});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onItemPress}
      style={styles.container}>
      <Image source={{uri: item?.i?.imageUrl}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <AppText size={16} fontType={FontTypes.bold}>
          {item?.l}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
