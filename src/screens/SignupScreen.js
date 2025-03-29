import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { COLORS } from '../constants/colors';
import { signupValidationSchema } from '../utils/validationSchema';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { register, socialLogin, error, isLoading } = useContext(AuthContext);
  const [signupError, setSignupError] = useState('');
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupValidationSchema),
  });

  const onSubmit = async (data) => {
    setSignupError('');
    
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    
    const success = await register(userData);
    
    if (!success) {
      setSignupError(error || 'Failed to register. Please try again.');
    }
  };

  const handleSocialSignup = async (platform) => {
    setSignupError('');
    // In a real app, you would handle the OAuth flow here
    // For now, we'll just simulate a successful login with a mock token
    const mockToken = 'mock-social-auth-token';
    const success = await socialLogin(platform, mockToken);
    
    if (!success) {
      setSignupError(error || `Failed to sign up with ${platform}.`);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Sign up to get started with the app
            </Text>
          </View>

          {signupError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{signupError}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  touched={!!value}
                  icon="person-outline"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  touched={!!value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail-outline"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  touched={!!value}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
              )}
            />
            
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  touched={!!value}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
              )}
            />

            <Button
              title={isLoading ? 'Signing up...' : 'Sign Up'}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.socialButtons}>
              <SocialButton
                platform="Google"
                onPress={() => handleSocialSignup('Google')}
                disabled={isLoading}
              />
              <SocialButton
                platform="Facebook"
                onPress={() => handleSocialSignup('Facebook')}
                disabled={isLoading}
              />
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  form: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: COLORS.gray,
    fontSize: 14,
  },
  socialButtons: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  loginText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
  },
});

export default SignupScreen;