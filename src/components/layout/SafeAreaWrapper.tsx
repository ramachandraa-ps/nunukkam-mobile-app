import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface SafeAreaWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
