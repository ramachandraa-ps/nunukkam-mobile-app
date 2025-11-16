import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AppNavigator } from '../AppNavigator';
import { AuthProvider } from '../../contexts/AuthContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

describe('AppNavigator', () => {
  const renderNavigator = (initialAuth = false) => {
    return render(
      <ThemeProvider>
        <AuthProvider initialAuth={initialAuth}>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    );
  };

  describe('Unauthenticated State', () => {
    it('should render auth navigator when not authenticated', async () => {
      const { getByText } = renderNavigator(false);

      await waitFor(() => {
        // Should show login screen
        expect(getByText('Welcome to Nunukkam')).toBeTruthy();
      });
    });
  });

  describe('Authenticated State', () => {
    it('should render main navigator when authenticated', async () => {
      const { getByText } = renderNavigator(true);

      await waitFor(() => {
        // Should show main dashboard
        expect(getByText('Nunukkam')).toBeTruthy();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator during auth check', () => {
      const { getByText } = renderNavigator(false);

      // Loading text should appear briefly
      expect(getByText('Loading...')).toBeTruthy();
    });
  });
});
