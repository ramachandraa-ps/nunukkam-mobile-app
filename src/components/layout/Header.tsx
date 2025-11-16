import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightPress?: () => void;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  rightIcon,
  onRightPress,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      <View style={styles.leftContainer}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightContainer}>
        {rightIcon && onRightPress && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <MaterialIcons name={rightIcon} size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    ...typography.h3,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: spacing.xs,
  },
});
