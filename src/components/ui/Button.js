import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";

export default function Button(props) {
  const isLoading = props.loading;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.handle}
      disabled={isLoading}
      style={[
        styles.buttonWrapper,
        isLoading && styles.buttonDisabled,
        props.style,
      ]}
    >
      <LinearGradient
        colors={["#286BC2", "#4F8DD3", "#84AAD8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryButton}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.primaryButtonText}>{props.title}</Text>

            {props.nameIcon && (
              <Feather
                name={props.nameIcon}
                size={props.sizeIcon || 20}
                color="#FFFFFF"
              />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 16,
    shadowColor: "#286BC2",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 5,
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
  },

  primaryButtonText: {
    marginRight: 10,
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  buttonDisabled: {
    opacity: 0.65,
  },
});