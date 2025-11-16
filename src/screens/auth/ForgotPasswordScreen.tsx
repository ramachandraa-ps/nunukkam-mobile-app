import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button, Input } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const ForgotPasswordScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '10' }]}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              {submitted ? 'Check Your Email' : 'Forgot Password?'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {submitted
                ? 'A password reset link has been sent to your registered email address.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'}
            </Text>
          </View>

          {!submitted ? (
            <View style={[styles.formCard, { backgroundColor: colors.card }]}>
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@school.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail"
              />

              <Button
                title={loading ? 'Sending...' : 'Send Reset Link'}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading || !email}
                fullWidth
              />

              <Button
                title="Back to Login"
                onPress={handleBackToLogin}
                variant="outline"
                fullWidth
              />
            </View>
          ) : (
            <View style={[styles.formCard, { backgroundColor: colors.card }]}>
              <Button
                title="Back to Login"
                onPress={handleBackToLogin}
                fullWidth
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  formCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
