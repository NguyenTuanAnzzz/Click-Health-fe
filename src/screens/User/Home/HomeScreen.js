import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";
import RecentCheckCard from "../../../components/ui/RecentCheckCard";
import ItemMainFunction from "../../../components/ui/ItemMainFunction";
import features from "../../../constants/homeFeatures";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

  const data = features

  const navigation = useNavigation()
  return (
    <UserLayout>
      <View style={styles.greetingBox}>
        <Text style={styles.greetingText}>Xin chào,</Text>
        <Text style={styles.userName}>Nguyễn Văn A</Text>
      </View>

      <RecentCheckCard/>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chức năng chính</Text>

        <View style={styles.featureGrid}>
          {
            data.map(d => (
              <ItemMainFunction key={d.id} title={d.title} nameIcon={d.icon} danger={d.danger} primary={d.primary} link={d.link}/>
            ))
          }
          
        </View>

        <TouchableOpacity style={styles.knowledgeCard} activeOpacity={0.85} onPress={() =>(navigation.navigate("KnowledgeTab"))}>
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
    marginBottom: 18,
  },

  greetingText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    color: COLORS.black,
  },

  userName: {
    marginTop: 2,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    color: COLORS.primary,
  },

  section: {
    marginTop: 24,
    marginBottom: 10,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: COLORS.black,
  },

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  featureCard: {
    width: "48%",
    minHeight: 118,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    padding: 15,

    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  featureCardPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  featureCardDanger: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },

  featureIconBox: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  featureIconBoxActive: {
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  featureTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    color: COLORS.black,
  },

  featureTitleLight: {
    color: COLORS.white,
  },

  knowledgeCard: {
    marginTop: 14,
    minHeight: 82,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    padding: 14,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  knowledgeIconBox: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  knowledgeContent: {
    flex: 1,
  },

  knowledgeTitle: {
    marginBottom: 4,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: COLORS.black,
  },

  knowledgeDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.darkGray,
  },

  tipCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F8FBFF",
    padding: 15,

    flexDirection: "row",
    alignItems: "flex-start",
  },

  tipIconBox: {
    width: 42,
    height: 42,
    borderRadius: 15,
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
    lineHeight: 20,
    fontWeight: "900",
    color: COLORS.black,
  },

  tipDesc: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
});