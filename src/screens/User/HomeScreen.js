import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import UserLayout from "../../layouts/UserLayout";

const HomeScreen = () => {
  const features = [
    {
      id: 1,
      title: "Kiểm tra BEFAST bằng AI",
      icon: "camera",
      primary: true,
    },
    {
      id: 2,
      title: "Tính điểm nguy cơ đột quỵ",
      icon: "bar-chart-2",
    },
    {
      id: 3,
      title: "Bài luyện tập khắc phục",
      icon: "activity",
    },
    {
      id: 4,
      title: "Gọi cấp cứu",
      icon: "phone-call",
      danger: true,
    },
    {
      id: 5,
      title: "Bệnh viện gần nhất",
      icon: "map-pin",
    },
    {
      id: 6,
      title: "Theo dõi sức khỏe",
      icon: "heart",
    },
  ];

  return (
    <UserLayout>
      <View style={styles.greetingBox}>
        <Text style={styles.greetingText}>Xin chào,</Text>
        <Text style={styles.userName}>Nguyễn Văn A</Text>
      </View>

      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.resultLabel}>Kết quả kiểm tra gần nhất</Text>
            <Text style={styles.resultDate}>15/01/2025</Text>
          </View>

          <View style={styles.resultIconBox}>
            <Feather name="activity" size={22} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.riskBadge}>
          <Text style={styles.riskText}>Nguy cơ: Trung bình</Text>
        </View>

        <View style={styles.resultFooter}>
          <Text style={styles.resultFooterText}>Bài test BEFAST còn lại</Text>
          <Text style={styles.resultFooterNumber}>2/3</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chức năng chính</Text>

        <View style={styles.featureGrid}>
          {features.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={[
                styles.featureCard,
                item.primary && styles.featureCardPrimary,
                item.danger && styles.featureCardDanger,
              ]}
            >
              <View
                style={[
                  styles.featureIconBox,
                  (item.primary || item.danger) && styles.featureIconBoxActive,
                ]}
              >
                <Feather
                  name={item.icon}
                  size={21}
                  color={
                    item.primary || item.danger
                      ? COLORS.white
                      : COLORS.primary
                  }
                />
              </View>

              <Text
                style={[
                  styles.featureTitle,
                  (item.primary || item.danger) && styles.featureTitleLight,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.knowledgeCard} activeOpacity={0.85}>
          <View style={styles.knowledgeIconBox}>
            <Feather name="book-open" size={24} color={COLORS.primary} />
          </View>

          <View style={styles.knowledgeContent}>
            <Text style={styles.knowledgeTitle}>Kiến thức về đột quỵ</Text>
            <Text style={styles.knowledgeDesc}>
              Tìm hiểu dấu hiệu và cách phòng tránh
            </Text>
          </View>

          <Feather name="chevron-right" size={22} color={COLORS.darkGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mẹo sức khỏe hôm nay</Text>

        <View style={styles.tipCard}>
          <View style={styles.tipIconBox}>
            <Feather name="sun" size={20} color={COLORS.primary} />
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Uống đủ nước</Text>
            <Text style={styles.tipDesc}>
              Uống ít nhất 8 ly nước mỗi ngày để duy trì huyết áp ổn định
            </Text>
          </View>
        </View>
      </View>
    </UserLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  greetingBox: {
    marginBottom: 22,
  },

  greetingText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    color: "#111827",
  },

  userName: {
    marginTop: 2,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: "#286BC2",
  },

  resultCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 26,
    backgroundColor: COLORS.primary,
  },

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  resultLabel: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.85)",
  },

  resultDate: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.white,
  },

  resultIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  riskBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 16,
  },

  riskText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },

  resultFooter: {
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultFooterText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },

  resultFooterNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.white,
  },

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
  },

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  featureCard: {
    width: "48%",
    minHeight: 128,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: COLORS.white,
    padding: 16,
  },

  featureCardPrimary: {
    backgroundColor: "#286BC2",
    borderColor: "#286BC2",
  },

  featureCardDanger: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  featureIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  featureIconBoxActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  featureTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    color: "#111827",
  },

  featureTitleLight: {
    color: COLORS.white,
  },

  knowledgeCard: {
    marginTop: 12,
    minHeight: 76,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: COLORS.white,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  knowledgeIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  knowledgeContent: {
    flex: 1,
  },

  knowledgeTitle: {
    marginBottom: 3,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  knowledgeDesc: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },

  tipCard: {
    borderRadius: 20,
    backgroundColor: "#F5F6FA",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  tipIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    marginBottom: 4,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  tipDesc: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
    color: "#6B7280",
  },
});