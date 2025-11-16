import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { MentorshipStackParamList } from '../types';
import {
  MentorshipDashboardScreen,
  BookSessionScreen,
  SessionNotesScreen,
  CancelSessionScreen,
} from '../screens/mentorship';

const Stack = createStackNavigator<MentorshipStackParamList>();

export const MentorshipNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MentorshipDashboard" component={MentorshipDashboardScreen} />
      <Stack.Screen name="BookSession" component={BookSessionScreen} />
      <Stack.Screen name="SessionNotes" component={SessionNotesScreen} />
      <Stack.Screen name="CancelSession" component={CancelSessionScreen} />
    </Stack.Navigator>
  );
};
