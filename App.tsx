import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { DataProvider } from './src/contexts/DataContext';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
