import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const GenderOption = (props) => {
  const isSelected = props.selectedValue === props.value;

  return (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.optionActive]}
      activeOpacity={0.85}
      onPress={() => props.onSelect(props.value)}
    >
      <Text style={[styles.text, isSelected && styles.textActive]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(40, 107, 194, 0.25)",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  optionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  textActive: {
    color: COLORS.white,
  },
});

export default GenderOption;
