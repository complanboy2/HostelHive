import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { userToken } = useContext(AuthContext);
  
  // If the user is logged in, we'd navigate to the main app screens
  // For now, we'll just show the auth screens
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;