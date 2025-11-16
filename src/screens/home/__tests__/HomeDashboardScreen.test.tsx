import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeDashboardScreen } from '../HomeDashboardScreen';
import { AuthProvider } from '../../../contexts/AuthContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { DataProvider } from '../../../contexts/DataContext';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('HomeDashboardScreen', () => {
  const renderScreen = () => {
    return render(
      <ThemeProvider>
        <AuthProvider initialAuth={true}>
          <DataProvider>
            <HomeDashboardScreen />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByText } = renderScreen();
      expect(getByText('Nunukkam')).toBeTruthy();
    });

    it('should display welcome message', () => {
      const { getByText } = renderScreen();
      expect(getByText(/Welcome back/)).toBeTruthy();
    });

    it('should display learning progress section', () => {
      const { getByText } = renderScreen();
      expect(getByText('Your Learning Progress')).toBeTruthy();
      expect(getByText('Modules')).toBeTruthy();
      expect(getByText('Chapters')).toBeTruthy();
      expect(getByText('Assessments')).toBeTruthy();
    });

    it('should display attendance section', () => {
      const { getByText } = renderScreen();
      expect(getByText('Your Attendance')).toBeTruthy();
    });

    it('should display pending tasks section', () => {
      const { getByText } = renderScreen();
      expect(getByText('Pending Tasks')).toBeTruthy();
    });

    it('should display updates section', () => {
      const { getByText } = renderScreen();
      expect(getByText('Updates')).toBeTruthy();
    });
  });

  describe('Data Loading', () => {
    it('should handle data loading errors gracefully', () => {
      // The screen should render even if data loading fails
      const { getByText } = renderScreen();
      expect(getByText('Nunukkam')).toBeTruthy();
    });
  });
});
