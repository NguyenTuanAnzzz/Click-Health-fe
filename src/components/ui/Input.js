import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Input(props) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.inputShell}>
        <View style={styles.leftIcon}>
          <Feather
            name={props.nameIcon}
            size={props.sizeIcon || 18}
            color="#286BC2"
          />
        </View>

        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={props.keyboard}
          secureTextEntry={props.secure}
          value={props.value}
          onChangeText={props.onChangeText}
        />

        {props.rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            activeOpacity={0.75}
            onPress={props.onPressRightIcon}
          >
            <Feather
              name={props.rightIcon}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldBlock: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  inputShell: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#F5F6FA",
    justifyContent: "center",
  },

  leftIcon: {
    position: "absolute",
    left: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },

  rightIcon: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },

  input: {
    minHeight: 54,
    paddingLeft: 44,
    paddingRight: 48,
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },
});