import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/User/Home/HomeScreen";
import NearbyHospitalScreen from "../screens/User/Home/NearbyHospitalScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NearbyHospital" component={NearbyHospitalScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;