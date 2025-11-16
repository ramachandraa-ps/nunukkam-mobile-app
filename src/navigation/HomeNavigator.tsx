import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { HomeStackParamList } from '../types';

// Placeholder screen
import { View, Text } from 'react-native';

const HomeDashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Dashboard</Text>
  </View>
);

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
    </Stack.Navigator>
  );
};
