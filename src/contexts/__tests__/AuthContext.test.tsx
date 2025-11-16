import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../AuthContext';

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.signIn({ email: 'test@example.com', name: 'Test User' });
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual({
          id: 'student-1',
          email: 'test@example.com',
          name: 'Test User',
        });
      });
    });

    it('should update state immediately on signIn', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.signIn({ email: 'user@test.com', name: 'User' });
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('user@test.com');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({
        id: 'student-1',
        email: 'test@example.com',
        name: 'test',
      });
    });

    it('should throw error for empty email', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.login('', 'password123');
        })
      ).rejects.toThrow('Email and password are required');
    });

    it('should throw error for empty password', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.login('test@example.com', '');
        })
      ).rejects.toThrow('Email and password are required');
    });

    it('should throw error for short password', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.login('test@example.com', '12345');
        })
      ).rejects.toThrow('Password must be at least 6 characters');
    });

    it('should set loading state during login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Check loading state is true during login
      expect(result.current.isLoading).toBe(true);

      await loginPromise;

      // Check loading state is false after login
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // First sign in
      act(() => {
        result.current.signIn({ email: 'test@example.com', name: 'Test User' });
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // First sign in
      act(() => {
        result.current.signIn({ email: 'test@example.com', name: 'Test User' });
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then sign out
      act(() => {
        result.current.signOut();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useAuth is used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      console.error = originalError;
    });
  });
});
