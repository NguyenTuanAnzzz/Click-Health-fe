import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

import UserHeader from "../components/ui/UserHeader";
import BottomNavigation from "../components/ui/BottomNavigation";

const UserLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <UserHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {children}
        </ScrollView>

        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
};

export default UserLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 22,
    paddingBottom: 120,
  },
});