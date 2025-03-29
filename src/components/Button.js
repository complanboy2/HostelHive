import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';

const Button = ({
  title,
  onPress,
  type = 'primary',
  outlined = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  loadingColor,
}) => {
  // Get button styles based on type and state
  const getButtonStyle = () => {
    // Base button style
    let buttonStyle = [styles.button];
    
    // Add type-specific styles
    if (type === 'primary') {
      buttonStyle.push(outlined ? styles.primaryOutlined : styles.primary);
    } else if (type === 'secondary') {
      buttonStyle.push(outlined ? styles.secondaryOutlined : styles.secondary);
    } else if (type === 'danger') {
      buttonStyle.push(outlined ? styles.dangerOutlined : styles.danger);
    }
    
    // Add disabled style if button is disabled
    if (disabled || loading) {
      buttonStyle.push(styles.disabled);
    }
    
    // Add custom style if provided
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };
  
  // Get text style based on button type and state
  const getTextStyle = () => {
    let baseTextStyle = [styles.buttonText];
    
    // Add type-specific text styles for outlined buttons
    if (outlined) {
      if (type === 'primary') {
        baseTextStyle.push({ color: COLORS.primary });
      } else if (type === 'secondary') {
        baseTextStyle.push({ color: COLORS.secondary });
      } else if (type === 'danger') {
        baseTextStyle.push({ color: COLORS.error });
      }
    }
    
    // Add custom text style if provided
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }
    
    return baseTextStyle;
  };
  
  // Get appropriate loading color
  const getLoadingColor = () => {
    if (loadingColor) return loadingColor;
    
    if (outlined) {
      if (type === 'primary') return COLORS.primary;
      if (type === 'secondary') return COLORS.secondary;
      if (type === 'danger') return COLORS.error;
    }
    
    return COLORS.white;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getLoadingColor()} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    minHeight: 48,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  primaryOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  secondaryOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  dangerOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;