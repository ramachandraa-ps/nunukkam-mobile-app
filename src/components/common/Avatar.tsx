import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface AvatarProps {
  source?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 40, style }) => {
  const { colors } = useTheme();

  const avatarStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  return (
    <View style={[avatarStyle, style]}>
      {source ? (
        <Image source={{ uri: source }} style={{ width: size, height: size }} />
      ) : (
        <MaterialIcons name="person" size={size * 0.6} color={colors.textSecondary} />
      )}
    </View>
  );
};
