import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
export default function Error(props) {
  return (
    <View style={styles.alertBox}>
      <Feather name="alert-circle" size={20} color="#EF4444" />

      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{props.title}</Text>
        <Text style={styles.alertDesc}>{props.desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(220, 38, 38, 0.08)",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.2)",
  },
  alertContent: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  alertDesc: {
    color: "#B91C1C",
    fontSize: 13,
    lineHeight: 18,
  },
});
