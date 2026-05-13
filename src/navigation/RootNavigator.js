import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigator";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AppNavigator} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;