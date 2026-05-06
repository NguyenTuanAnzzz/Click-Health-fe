import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function HospitalCard({
  name,
  address,
  distance,
  onDirection,
  onCall,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="plus-square" size={24} color={COLORS.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.distanceRow}>
            <Feather name="map-pin" size={14} color={COLORS.primary} />
            <Text style={styles.distance}>{distance}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.directionButton}
              activeOpacity={0.8}
              onPress={onDirection}
            >
              <Feather name="navigation" size={16} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.8}
              onPress={onCall}
            >
              <Feather name="phone" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(132,170,216,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 5,
  },

  address: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.darkGray,
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  distance: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  directionButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(132,170,216,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  callButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});