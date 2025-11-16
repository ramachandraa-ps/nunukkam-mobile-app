import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { LeaderboardStackParamList } from '../types';
import { LeaderboardMainScreen, FullLeaderboardScreen } from '../screens/leaderboard';

const Stack = createStackNavigator<LeaderboardStackParamList>();

export const LeaderboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeaderboardMain" component={LeaderboardMainScreen} />
      <Stack.Screen name="FullLeaderboard" component={FullLeaderboardScreen} />
    </Stack.Navigator>
  );
};
