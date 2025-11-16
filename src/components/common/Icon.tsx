import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color }) => {
  const { colors } = useTheme();
  return <MaterialIcons name={name} size={size} color={color || colors.text} />;
};
