import React from 'react';
import {StyleSheet, View, v} from 'react-native';
import {Colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AppText} from '../../components';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppText>{'HOME'}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui_white,
    padding: 20,
  },
});

export default Home;
