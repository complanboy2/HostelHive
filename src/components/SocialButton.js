import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const SocialButton = ({
  platform,
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  // Get the correct icon and color based on the social platform
  const getIconData = () => {
    switch (platform.toLowerCase()) {
      case 'google':
        return { 
          iconType: 'fontawesome', 
          name: 'google', 
          color: '#DB4437', 
          backgroundColor: '#FFFFFF' 
        };
      case 'facebook':
        return { 
          iconType: 'fontawesome', 
          name: 'facebook', 
          color: '#FFFFFF', 
          backgroundColor: '#4267B2' 
        };
      case 'apple':
        return { 
          iconType: 'fontawesome', 
          name: 'apple', 
          color: '#FFFFFF', 
          backgroundColor: '#000000' 
        };
      case 'twitter':
        return { 
          iconType: 'fontawesome', 
          name: 'twitter', 
          color: '#FFFFFF', 
          backgroundColor: '#1DA1F2' 
        };
      default:
        return { 
          iconType: 'ionicons', 
          name: 'logo-github', 
          color: '#FFFFFF', 
          backgroundColor: '#333333' 
        };
    }
  };

  const { iconType, name, color, backgroundColor } = getIconData();

  // Determine the button's style based on the platform
  const buttonStyle = [
    styles.button,
    { backgroundColor },
    disabled && styles.disabledButton,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {iconType === 'fontawesome' ? (
          <FontAwesome name={name} size={20} color={color} />
        ) : (
          <Ionicons name={name} size={20} color={color} />
        )}
      </View>
      <Text style={[styles.buttonText, { color }, textStyle]}>
        {title || `Continue with ${platform}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default SocialButton;