import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";

export default function Footer(props) {
  return (
    <View style={[styles.footer, props.style]}>
      <Text style={styles.footerText}>{props.titleLeft}</Text>

      <TouchableOpacity activeOpacity={0.75} onPress={props.goToLink}>
        <Text style={styles.linkText}>{props.titleRight}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 22,
    paddingBottom: 4,
  },

  footerText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },

  linkText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "800",
    color: "#286BC2",
  },
});