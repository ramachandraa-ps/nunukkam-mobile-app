import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { LeaderboardStackParamList } from '../types';

// Placeholder screens
import { View, Text } from 'react-native';

const LeaderboardMainScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Leaderboard Main</Text>
  </View>
);

const FullLeaderboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Full Leaderboard</Text>
  </View>
);

const Stack = createStackNavigator<LeaderboardStackParamList>();

export const LeaderboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeaderboardMain" component={LeaderboardMainScreen} />
      <Stack.Screen name="FullLeaderboard" component={FullLeaderboardScreen} />
    </Stack.Navigator>
  );
};
