import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { ResumeStackParamList } from '../types';

// Placeholder screens
import { View, Text } from 'react-native';

const ResumeDashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Resume Dashboard</Text>
  </View>
);

const ResumeBuilderScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Resume Builder</Text>
  </View>
);

const Stack = createStackNavigator<ResumeStackParamList>();

export const ResumeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResumeDashboard" component={ResumeDashboardScreen} />
      <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
    </Stack.Navigator>
  );
};
