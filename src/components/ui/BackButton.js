import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";

export default function BackButton({ style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
    >
      <Feather name="chevron-left" size={25} color={COLORS.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});