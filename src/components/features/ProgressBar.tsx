import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  color,
  height = 8,
}) => {
  const { colors } = useTheme();
  const progressColor = color || colors.success;
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          {showPercentage && (
            <Text style={[styles.percentage, { color: colors.textSecondary }]}>
              {percentage}%
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { backgroundColor: colors.border, height }]}>
        <View
          style={[
            styles.fill,
            {
              backgroundColor: progressColor,
              width: `${percentage}%`,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
});
