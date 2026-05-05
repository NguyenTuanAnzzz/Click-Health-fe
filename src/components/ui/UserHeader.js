import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";

const UserHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.caption}>Sức khỏe hôm nay</Text>
        <Text style={styles.title}>Click Health</Text>
      </View>

      <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
        <Feather name="bell" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  header: {
    height: 78,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,

    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
    zIndex: 10,
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
    fontWeight: "800",
    color: COLORS.text,
  },

  actionButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
});