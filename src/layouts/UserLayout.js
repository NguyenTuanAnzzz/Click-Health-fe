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

        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.contentCard}>{children}</View>
          </ScrollView>
        </View>

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

  body: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 18,
    paddingBottom: 120,
  },

  contentCard: {
    borderRadius: 28,
    padding: 0,
  },
});