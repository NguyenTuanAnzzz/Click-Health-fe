import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading screen while checking auth state if necessary
  // For now, since initial state is false, it will show Auth stack by default
  // Ideally, you'd check persisted storage here.

  if (isLoading && !isAuthenticated) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" color={COLORS.primary} />
       </View>
     );
  }

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
