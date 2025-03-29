import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  textStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  // Determine the appropriate border color based on input state
  const getBorderColor = () => {
    if (error && touched) return COLORS.error;
    if (isFocused) return COLORS.primary;
    return COLORS.border;
  };

  // Determine the appropriate label color based on input state
  const getLabelColor = () => {
    if (error && touched) return COLORS.error;
    if (isFocused) return COLORS.primary;
    return COLORS.placeholder;
  };

  // Handle toggling password visibility
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: getLabelColor() }]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        { borderColor: getBorderColor() },
        isFocused && styles.focusedInput,
        style,
      ]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? COLORS.primary : COLORS.placeholder}
            style={styles.icon}
          />
        )}
        
        <TextInput
          style={[styles.input, textStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={COLORS.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && touched && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  focusedInput: {
    borderWidth: 2,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  icon: {
    marginLeft: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormInput;