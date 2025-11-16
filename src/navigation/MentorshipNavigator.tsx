import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { MentorshipStackParamList } from '../types';

// Placeholder screens
import { View, Text } from 'react-native';

const MentorshipDashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Mentorship Dashboard</Text>
  </View>
);

const BookSessionScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Book Session</Text>
  </View>
);

const SessionNotesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Session Notes</Text>
  </View>
);

const CancelSessionScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Cancel Session</Text>
  </View>
);

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
