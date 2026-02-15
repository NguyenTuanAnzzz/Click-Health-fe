import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.lightGray;
    if (variant === 'secondary') return COLORS.white;
    return COLORS.primary;
  };

  const getTextColor = () => {
    if (disabled) return COLORS.darkGray;
    if (variant === 'secondary') return COLORS.primary;
    return COLORS.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        variant === 'secondary' && styles.secondaryBorder,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  secondaryBorder: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
