import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
const navItems = [
  {
    icon: "home",
    label: "Trang chủ",
    screen: "Home",
  },
  {
    icon: "clipboard",
    label: "Kiểm tra",
    screen: "Check",
  },
  {
    icon: "heart",
    label: "Sức khỏe",
    screen: "Health",
  },
  {
    icon: "book-open",
    label: "Kiến thức",
    screen: "Knowledge",
  },
  {
    icon: "user",
    label: "Hồ sơ",
    screen: "Profile",
  },
];

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeScreen = route.name;

  const handleNavigate = (screen) => {
    if (activeScreen !== screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const active = activeScreen === item.screen;

        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.navItem}
            activeOpacity={0.85}
            onPress={() => handleNavigate(item.screen)}
          >
            <Feather
              name={item.icon}
              size={22}
              color={active ? COLORS.primary : COLORS.textMuted}
            />

            <Text style={[styles.navLabel, active && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  navLabelActive: {
    color: COLORS.primary,
  },
});
