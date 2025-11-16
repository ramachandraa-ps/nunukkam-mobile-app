import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', style }) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'info':
        return colors.secondary;
      default:
        return colors.border;
    }
  };

  const getTextColor = () => {
    if (variant === 'default') return colors.text;
    return '#FFFFFF';
  };

  const badgeStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  };

  const textStyle: TextStyle = {
    ...typography.caption,
    color: getTextColor(),
    fontWeight: '600',
  };

  return (
    <View style={[badgeStyle, style]}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};
