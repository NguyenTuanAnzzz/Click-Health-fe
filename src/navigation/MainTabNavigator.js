import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeNavigator from "./HomeNavigator";
import KnowledgeScreen from "../screens/User/Home/KnowledgeScreen";
import ProfileScreen from "../screens/User/Home/ProfileScreen";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted || COLORS.gray,
        tabBarStyle: {
          height: 78,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            HomeTab: "home",
            CheckTab: "clipboard",
            HealthTab: "heart",
            KnowledgeTab: "book-open",
            ProfileTab: "user",
          };

          return <Feather name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: "Trang chủ" }}
      />

      <Tab.Screen
        name="CheckTab"
        component={EmptyScreen}
        options={{ title: "Kiểm tra" }}
      />

      <Tab.Screen
        name="HealthTab"
        component={EmptyScreen}
        options={{ title: "Sức khỏe" }}
      />

      <Tab.Screen
        name="KnowledgeTab"
        component={KnowledgeScreen}
        options={{ title: "Kiến thức" }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Hồ sơ" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;