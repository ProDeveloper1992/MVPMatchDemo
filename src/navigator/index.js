import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './root-navigation';
import {FavoritesScreen, HomeScreen, MovieDetailScreen} from '../screens';

const RootStack = createStackNavigator();

export default function () {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={'#000'}
      />
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator initialRouteName={'home-screen'}>
          <RootStack.Screen
            name={'home-screen'}
            component={HomeScreen}
            options={{title: 'Home', headerBackTitle: ''}}
          />
          <RootStack.Screen
            name={'movie-detail-screen'}
            component={MovieDetailScreen}
            options={{title: 'Details', headerBackTitle: ''}}
          />
          <RootStack.Screen
            name={'favorites-screen'}
            component={FavoritesScreen}
            options={{title: 'Favorites', headerBackTitle: ''}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
