import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";


const AuthLayout = ({ children, tagline, icon = "heart-outline" }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* background */}
      <View style={styles.backgroundOrbTop} />
      <View style={styles.backgroundOrbBottom} />

      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Ionicons name={icon} size={34} color={COLORS.white} />
          </View>

          <Text style={styles.brand}>Click Health</Text>
          <Text style={styles.tagline}>{tagline}</Text>
        </View>

        {/* content */}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  backgroundOrbTop: {
    position: "absolute",
    top: -120,
    right: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(132, 170, 216, 0.16)",
  },

  backgroundOrbBottom: {
    position: "absolute",
    bottom: -180,
    left: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(40, 107, 194, 0.08)",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: 56,
    paddingBottom: 34,
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  brand: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 4,
  },

  tagline: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
});