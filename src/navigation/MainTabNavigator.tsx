import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import type { MainTabParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

import { HomeNavigator } from './HomeNavigator';
import { JourneyNavigator } from './JourneyNavigator';
import { ResumeNavigator } from './ResumeNavigator';
import { MentorshipNavigator } from './MentorshipNavigator';
import { LeaderboardNavigator } from './LeaderboardNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Journey"
        component={JourneyNavigator}
        options={{
          tabBarLabel: 'Journey',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Resume"
        component={ResumeNavigator}
        options={{
          tabBarLabel: 'Resume',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mentors"
        component={MentorshipNavigator}
        options={{
          tabBarLabel: 'Mentors',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranks"
        component={LeaderboardNavigator}
        options={{
          tabBarLabel: 'Ranks',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
