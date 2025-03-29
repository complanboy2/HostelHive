import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, signup, socialLogin } from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if the user is already logged in
    checkUserLoggedIn();
  }, []);
  
  const checkUserLoggedIn = async () => {
    try {
      setIsLoading(true);
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && userInfoString) {
        setUserToken(token);
        setUserInfo(JSON.parse(userInfoString));
      }
    } catch (error) {
      console.log('Error checking user login status: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call login API
      const response = await login(email, password);
      
      if (response && response.token) {
        // Save the token to AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        
        // Update state
        setUserToken(response.token);
        setUserInfo(response.user);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (error) {
      setError(error.message || 'An error occurred while logging in');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const registerUser = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call signup API
      const response = await signup(userData);
      
      if (response && response.token) {
        // Save the token to AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        
        // Update state
        setUserToken(response.token);
        setUserInfo(response.user);
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (error) {
      setError(error.message || 'An error occurred while registering');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const socialLoginUser = async (provider, token) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call social login API
      const response = await socialLogin(provider, token);
      
      if (response && response.token) {
        // Save the token to AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        
        // Update state
        setUserToken(response.token);
        setUserInfo(response.user);
        return true;
      } else {
        setError('Social login failed');
        return false;
      }
    } catch (error) {
      setError(error.message || 'An error occurred during social login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logoutUser = async () => {
    try {
      setIsLoading(true);
      
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      
      // Update state
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.log('Error logging out: ', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login: loginUser,
        register: registerUser,
        socialLogin: socialLoginUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};