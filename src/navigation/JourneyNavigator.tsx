import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { JourneyStackParamList } from '../types';

// Placeholder screens
import { View, Text } from 'react-native';

const LearningJourneyScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Learning Journey</Text>
  </View>
);

const CoreSkillsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Core Skills</Text>
  </View>
);

const ModuleDetailScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Module Detail</Text>
  </View>
);

const TaskDetailScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Task Detail</Text>
  </View>
);

const Stack = createStackNavigator<JourneyStackParamList>();

export const JourneyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearningJourney" component={LearningJourneyScreen} />
      <Stack.Screen name="CoreSkills" component={CoreSkillsScreen} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
};
