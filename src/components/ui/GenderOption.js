import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";

const GenderOption = (props) => {
  const isSelected = props.selectedValue === props.value;

  return (
    <TouchableOpacity
      style={[styles.option, !isSelected && styles.optionInactive]}
      activeOpacity={0.85}
      onPress={() => props.onSelect(props.value)}
    >
      {isSelected ? (
        <LinearGradient
          colors={["#286BC2", "#4F8DD3", "#84AAD8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.textActive}>{props.label}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.text}>{props.label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    overflow: "hidden",
  },

  optionInactive: {
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
  },

  gradient: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },

  textActive: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

export default GenderOption;