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
  const themeContext = useTheme();
  const colors = themeContext?.colors || {
    primary: '#7c3bed',
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    danger: '#D9534F',
    success: '#50C878',
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as any,
        },
        tabBarIconStyle: {
          marginBottom: 0,
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
