import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { JourneyStackParamList } from '../types';
import {
  LearningJourneyScreen,
  CoreSkillsScreen,
  ModuleDetailScreen,
  TaskDetailScreen,
  YourPerformanceScreen,
} from '../screens/journey';

const Stack = createStackNavigator<JourneyStackParamList>();

export const JourneyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearningJourney" component={LearningJourneyScreen} />
      <Stack.Screen name="CoreSkills" component={CoreSkillsScreen} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="YourPerformance" component={YourPerformanceScreen} />
    </Stack.Navigator>
  );
};
