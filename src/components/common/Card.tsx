import React, { ReactNode } from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing } from '../../theme/spacing';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  shadow = true,
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    ...(shadow && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    }),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};
