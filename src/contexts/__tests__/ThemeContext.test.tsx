import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  describe('Initial State', () => {
    it('should have light theme by default', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.colorScheme).toBe('light');
      expect(result.current.isDark).toBe(false);
      expect(result.current.colors).toBeDefined();
      expect(result.current.colors.primary).toBe('#7c3bed');
    });

    it('should have all required color properties', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      const requiredColors = [
        'primary',
        'secondary',
        'accent',
        'success',
        'warning',
        'danger',
        'background',
        'card',
        'text',
        'textSecondary',
        'border',
      ];

      requiredColors.forEach((color) => {
        expect(result.current.colors).toHaveProperty(color);
      });
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.colorScheme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.colorScheme).toBe('dark');
      expect(result.current.isDark).toBe(true);
    });

    it('should toggle from dark to light theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      // Toggle to dark
      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.colorScheme).toBe('dark');

      // Toggle back to light
      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.colorScheme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });

    it('should update colors when theme is toggled', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      const lightPrimary = result.current.colors.primary;

      act(() => {
        result.current.toggleTheme();
      });

      const darkPrimary = result.current.colors.primary;

      expect(lightPrimary).not.toBe(darkPrimary);
    });
  });

  describe('Error Handling', () => {
    it('should return default theme when used outside provider', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.colorScheme).toBe('light');
      expect(result.current.colors).toBeDefined();
      expect(result.current.isDark).toBe(false);
    });
  });
});
