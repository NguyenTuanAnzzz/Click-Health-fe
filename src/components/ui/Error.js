import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Error(props) {
  return (
    <View style={styles.alertBox}>
      <View style={styles.iconBox}>
        <Feather name="alert-circle" size={18} color="#EF4444" />
      </View>

      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{props.title}</Text>

        {!!props.desc && (
          <Text style={styles.alertDesc}>{props.desc}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },

  alertContent: {
    marginLeft: 10,
    flex: 1,
  },

  alertTitle: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },

  alertDesc: {
    color: "#991B1B",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
});