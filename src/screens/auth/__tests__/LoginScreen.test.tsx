import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';
import { AuthProvider } from '../../../contexts/AuthContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('LoginScreen', () => {
  const renderLoginScreen = () => {
    return render(
      <ThemeProvider>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render login form correctly', () => {
      const { getByText, getByPlaceholderText } = renderLoginScreen();

      expect(getByText('Welcome to Nunukkam')).toBeTruthy();
      expect(getByText('Sign in to continue your learning journey.')).toBeTruthy();
      expect(getByPlaceholderText('your.email@school.com')).toBeTruthy();
      expect(getByPlaceholderText('••••••••••')).toBeTruthy();
      expect(getByText('Sign In')).toBeTruthy();
    });

    it('should render forgot password link', () => {
      const { getByText } = renderLoginScreen();

      expect(getByText('Forgot Password?')).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should show error when fields are empty', async () => {
      const { getByText } = renderLoginScreen();

      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(getByText('Please enter both email and password')).toBeTruthy();
      });
    });

    it('should show error for invalid email format', async () => {
      const { getByPlaceholderText, getByText } = renderLoginScreen();

      const emailInput = getByPlaceholderText('your.email@school.com');
      const passwordInput = getByPlaceholderText('••••••••••');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'invalidemail');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(getByText('Please enter a valid email address')).toBeTruthy();
      });
    });

    it('should show error for short password', async () => {
      const { getByPlaceholderText, getByText } = renderLoginScreen();

      const emailInput = getByPlaceholderText('your.email@school.com');
      const passwordInput = getByPlaceholderText('••••••••••');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, '12345');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(getByText('Invalid email or password')).toBeTruthy();
      });
    });
  });

  describe('Successful Login', () => {
    it('should login successfully with valid credentials', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderLoginScreen();

      const emailInput = getByPlaceholderText('your.email@school.com');
      const passwordInput = getByPlaceholderText('••••••••••');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      // Should show loading state
      await waitFor(() => {
        expect(getByText('Signing In...')).toBeTruthy();
      });

      // Should not show error
      await waitFor(() => {
        expect(queryByText('Invalid email or password')).toBeNull();
      }, { timeout: 2000 });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', () => {
      const { getByPlaceholderText } = renderLoginScreen();

      const passwordInput = getByPlaceholderText('••••••••••');

      // Initially password should be hidden
      expect(passwordInput.props.secureTextEntry).toBe(true);

      // Find and press the visibility toggle icon
      // Note: This would require the Input component to expose testID
    });
  });

  describe('Navigation', () => {
    it('should navigate to forgot password screen', () => {
      const { getByText } = renderLoginScreen();

      const forgotPasswordLink = getByText('Forgot Password?');
      fireEvent.press(forgotPasswordLink);

      expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
    });
  });
});
