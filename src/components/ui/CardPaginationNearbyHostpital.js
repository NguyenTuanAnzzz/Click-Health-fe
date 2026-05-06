import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CardPaginationNearbyHospital(props) {
  const { pageNumber, active, click } = props;
  
  return (
    <TouchableOpacity
      style={[
        styles.card,
        active && styles.cardActive,
       
      ]}
      onPress={click}
      activeOpacity={0.75}
    >
      <Text
        style={[
          styles.text,
          active && styles.textActive,
        ]}
      >
        {pageNumber}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },

  cardActive: {
    backgroundColor: "#0f4c81",
    borderColor: "#0f4c81",
  },

  cardDisabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f4c81",
  },

  textActive: {
    color: "#ffffff",
  },

  textDisabled: {
    color: "#94a3b8",
  },
});
