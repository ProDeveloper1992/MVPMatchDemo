import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './root-navigation';
import {HomeScreen} from '../screens';

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
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
