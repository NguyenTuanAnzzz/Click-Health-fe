import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";

const UserHeader = () => {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.caption}>Sức khỏe hôm nay</Text>
          <Text style={styles.title}>Click Health</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
          <Feather name="bell" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingTop: 10,
    paddingBottom: 10,
  },

  header: {
    minHeight: 74,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: COLORS.white,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  left: {
    flex: 1,
  },

  caption: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  actionButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(132,170,216,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(132,170,216,0.28)",
  },
});