export const colors = {
  light: {
    primary: '#7c3bed',
    secondary: '#4A90E2',
    accent: '#7E57C2',
    success: '#50C878',
    warning: '#FFA500',
    danger: '#D9534F',
    alert: '#D9534F',
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#757575',
    border: '#E0E0E0',
    disabled: '#CED4DA',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    primary: '#9b5fff',
    secondary: '#5fa3ff',
    accent: '#9b7fd9',
    success: '#6dd98d',
    warning: '#ffb733',
    danger: '#ff6b6b',
    alert: '#ff6b6b',
    background: '#121212',
    card: '#1E1E1E',
    text: '#E0E0E0',
    textSecondary: '#B0B0B0',
    border: '#333333',
    disabled: '#666666',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export type ColorScheme = keyof typeof colors;
export type ColorName = keyof typeof colors.light;
