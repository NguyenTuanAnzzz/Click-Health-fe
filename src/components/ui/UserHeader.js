import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

const UserHeader = () => {
  return (
    <View style={styles.container}>
      <View>
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.black,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
