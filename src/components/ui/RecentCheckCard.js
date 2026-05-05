import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";

const RecentCheckCard = () => {
  return (
    <LinearGradient
      colors={COLORS.gradientBlueDark}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <View style={styles.info}>
          <Text style={styles.label}>Kết quả kiểm tra gần nhất</Text>
          <Text style={styles.code}>#150/2025</Text>
        </View>

        <View style={styles.iconBox}>
          <Feather name="activity" size={20} color={COLORS.white} />
        </View>
      </View>

      <View style={styles.middleBox}>
        <View style={styles.itemRow}>
          <Feather name="user" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={styles.itemText}>Nguyễn Văn An</Text>
        </View>

        <View style={styles.itemRow}>
          <Feather name="calendar" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={styles.itemText}>Thứ hai, 20/03/2025</Text>
        </View>

        <View style={styles.itemRow}>
          <Feather name="check-circle" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={styles.itemText}>Đã hoàn thành đánh giá sức khỏe</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.statusLabel}>Tiến độ hồ sơ</Text>
          <Text style={styles.statusText}>Đã cập nhật kết quả</Text>
        </View>

        <View style={styles.progressBadge}>
          <Text style={styles.step}>2/3</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RecentCheckCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    minHeight: 170,
    justifyContent: "space-between",

    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 7,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  info: {
    flex: 1,
    paddingRight: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.78)",
    marginBottom: 6,
  },

  code: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  middleBox: {
    marginTop: 14,
    gap: 8,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  itemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.92)",
  },

  bottomRow: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.18)",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 3,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
  },

  progressBadge: {
    minWidth: 48,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  step: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },
});