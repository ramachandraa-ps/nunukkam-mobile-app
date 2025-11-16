import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { ResumeStackParamList } from '../types';
import { ResumeDashboardScreen, ResumeBuilderScreen } from '../screens/resume';

const Stack = createStackNavigator<ResumeStackParamList>();

export const ResumeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResumeDashboard" component={ResumeDashboardScreen} />
      <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
    </Stack.Navigator>
  );
};
