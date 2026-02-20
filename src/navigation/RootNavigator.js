import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../hooks/useAuth';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
