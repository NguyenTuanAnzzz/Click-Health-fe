import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";

const THEORY_CARDS = [
  {
    icon: "alert-circle",
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    title: "Đột quỵ là gì?",
    summary: "Tình trạng não bị tổn thương do dòng máu lên não bị gián đoạn.",
    content:
      "Đột quỵ xảy ra khi mạch máu đưa máu lên não bị tắc nghẽn hoặc bị vỡ. Khi não không nhận đủ oxy và chất dinh dưỡng, tế bào não có thể bị tổn thương nhanh chóng. Đây là tình trạng cấp cứu y tế, cần được xử lý càng sớm càng tốt.",
  },
  {
    icon: "activity",
    iconColor: "#286BC2",
    iconBg: "rgba(132,170,216,0.2)",
    title: "Các loại đột quỵ thường gặp",
    summary: "Có hai dạng chính: thiếu máu não và xuất huyết não.",
    content:
      "Đột quỵ thiếu máu não xảy ra khi mạch máu bị tắc, làm máu không thể lên não. Đây là dạng phổ biến hơn. Đột quỵ xuất huyết não xảy ra khi mạch máu trong não bị vỡ, gây chảy máu và tạo áp lực lên mô não. Cả hai dạng đều nguy hiểm và cần cấp cứu kịp thời.",
  },
  {
    icon: "eye",
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    title: "Dấu hiệu nhận biết FAST",
    summary: "FAST giúp ghi nhớ nhanh các dấu hiệu nghi ngờ đột quỵ.",
    content:
      "FAST gồm Face, Arms, Speech, Time. Face là mặt bị lệch hoặc méo miệng. Arms là yếu hoặc tê một bên tay. Speech là nói khó, nói ngọng hoặc không nói được. Time nghĩa là cần gọi cấp cứu ngay khi xuất hiện các dấu hiệu này.",
  },
  {
    icon: "clock",
    iconColor: "#DC2626",
    iconBg: "#FEE2E2",
    title: "Vì sao thời gian rất quan trọng?",
    summary: "Mỗi phút chậm trễ có thể làm tăng nguy cơ tổn thương não.",
    content:
      "Trong đột quỵ, thời gian là yếu tố quyết định. Càng điều trị sớm, khả năng cứu sống và giảm di chứng càng cao. Khi nghi ngờ đột quỵ, không nên chờ triệu chứng tự hết, không tự ý cho uống thuốc và cần gọi cấp cứu ngay.",
  },
  {
    icon: "users",
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
    title: "Ai có nguy cơ cao bị đột quỵ?",
    summary: "Một số nhóm người cần theo dõi sức khỏe thường xuyên hơn.",
    content:
      "Người bị tăng huyết áp, tiểu đường, rối loạn mỡ máu, bệnh tim mạch, béo phì, hút thuốc lá, uống nhiều rượu bia, ít vận động hoặc có tiền sử gia đình bị đột quỵ sẽ có nguy cơ cao hơn. Người lớn tuổi cũng là nhóm cần được chú ý.",
  },
  {
    icon: "shield",
    iconColor: "#16A34A",
    iconBg: "#DCFCE7",
    title: "Cách phòng ngừa đột quỵ",
    summary: "Thay đổi lối sống giúp giảm nguy cơ đột quỵ.",
    content:
      "Có thể giảm nguy cơ đột quỵ bằng cách kiểm soát huyết áp, ăn ít muối, hạn chế chất béo xấu, tập thể dục đều đặn, ngủ đủ giấc, không hút thuốc, hạn chế rượu bia và khám sức khỏe định kỳ. Với người có bệnh nền, cần dùng thuốc theo đúng chỉ định của bác sĩ.",
  },
  {
    icon: "heart",
    iconColor: "#DB2777",
    iconBg: "#FCE7F3",
    title: "Phục hồi sau đột quỵ",
    summary: "Phục hồi cần thời gian, luyện tập và sự hỗ trợ từ gia đình.",
    content:
      "Sau đột quỵ, người bệnh có thể gặp khó khăn khi vận động, nói chuyện, ghi nhớ hoặc sinh hoạt hằng ngày. Quá trình phục hồi cần tái khám đúng lịch, tập vật lý trị liệu, dùng thuốc theo chỉ định và duy trì tinh thần tích cực. Gia đình đóng vai trò quan trọng trong việc hỗ trợ người bệnh.",
  },
  {
    icon: "info",
    iconColor: "#CA8A04",
    iconBg: "#FEF3C7",
    title: "Lưu ý khi nghi ngờ đột quỵ",
    summary: "Không tự xử lý tại nhà nếu có dấu hiệu nguy hiểm.",
    content:
      "Nếu người bệnh có dấu hiệu méo miệng, yếu tay chân, nói khó, đau đầu dữ dội, chóng mặt, mất thăng bằng hoặc giảm ý thức, cần gọi cấp cứu ngay. Không tự ý cho người bệnh ăn, uống thuốc hoặc cạo gió. Hãy ghi nhớ thời điểm bắt đầu triệu chứng để cung cấp cho nhân viên y tế.",
  },
];

const KnowledgeScreen = ({ navigation }) => {
  const [openCard, setOpenCard] = useState(null);

  const handleEmergencyCall = () => {
    Alert.alert("Gọi cấp cứu", "Bạn có muốn gọi 115 ngay không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Gọi 115",
        style: "destructive",
        onPress: () => Linking.openURL("tel:115"),
      },
    ]);
  };

  return (
    <UserLayout activeScreen="Knowledge">
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={styles.headerIcon}>
              <Feather name="book-open" size={24} color={COLORS.primary} />
            </View>

            <View style={styles.headerTextBox}>
              <Text style={styles.headerTitle}>Kiến thức đột quỵ</Text>
              <Text style={styles.headerSubtitle}>
                Lý thuyết cơ bản cần biết
              </Text>
            </View>
          </View>

          <View style={styles.emergencyBox}>
            <View style={styles.emergencyIconBox}>
              <Feather name="alert-triangle" size={22} color="#EF4444" />
            </View>

            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Trường hợp khẩn cấp</Text>
              <Text style={styles.emergencyDesc}>
                Nếu nghi ngờ đột quỵ, hãy gọi cấp cứu ngay. Không chờ triệu
                chứng tự hết.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.emergencyButton}
            activeOpacity={0.85}
            onPress={handleEmergencyCall}
          >
            <Feather name="phone-call" size={20} color={COLORS.white} />
            <Text style={styles.emergencyButtonText}>Gọi cấp cứu 115</Text>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Feather name="book-open" size={21} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>Nội dung lý thuyết</Text>
          </View>

          <View style={styles.cardList}>
            {THEORY_CARDS.map((item, index) => {
              const isOpen = openCard === index;

              return (
                <TouchableOpacity
                  key={item.title}
                  activeOpacity={0.85}
                  style={[styles.theoryCard, isOpen && styles.theoryCardActive]}
                  onPress={() => setOpenCard(isOpen ? null : index)}
                >
                  <View style={styles.theoryHeader}>
                    <View
                      style={[
                        styles.theoryIconBox,
                        { backgroundColor: item.iconBg },
                      ]}
                    >
                      <Feather
                        name={item.icon}
                        size={22}
                        color={item.iconColor}
                      />
                    </View>

                    <View style={styles.theoryTitleBox}>
                      <Text style={styles.theoryTitle}>{item.title}</Text>
                      <Text style={styles.theorySummary}>{item.summary}</Text>
                    </View>

                    <Feather
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={22}
                      color={COLORS.darkGray || COLORS.gray}
                    />
                  </View>

                  {isOpen && (
                    <View style={styles.theoryBody}>
                      <Text style={styles.theoryContent}>{item.content}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.noteBox}>
            <View style={styles.noteIcon}>
              <Feather name="info" size={18} color={COLORS.primary} />
            </View>

            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>Lưu ý</Text>
              <Text style={styles.noteDesc}>
                Nội dung chỉ dùng để tham khảo và học kiến thức cơ bản. Khi có
                dấu hiệu nghi ngờ đột quỵ, cần liên hệ nhân viên y tế hoặc gọi
                cấp cứu.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </UserLayout>
  );
};

export default KnowledgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 56,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(40,107,194,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(132,170,216,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTextBox: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    color: COLORS.black,
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.gray,
  },

  emergencyBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FFF7ED",
    padding: 15,
    marginBottom: 12,

    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  emergencyIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },

  emergencyContent: {
    flex: 1,
  },

  emergencyTitle: {
    marginBottom: 4,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#991B1B",
  },

  emergencyDesc: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#7F1D1D",
  },

  emergencyButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 22,
  },

  emergencyButtonText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(132,170,216,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    color: COLORS.black,
  },

  cardList: {
    gap: 12,
    marginBottom: 20,
  },

  theoryCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    padding: 14,

    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  theoryCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#F8FBFF",
  },

  theoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  theoryIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  theoryTitleBox: {
    flex: 1,
  },

  theoryTitle: {
    marginBottom: 4,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: COLORS.black,
  },

  theorySummary: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.gray,
  },

  theoryBody: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  theoryContent: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "500",
    color: COLORS.darkGray || "#4B5563",
  },

  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 20,
    backgroundColor: "rgba(132,170,216,0.12)",
    padding: 14,
  },

  noteIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(40,107,194,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  noteContent: {
    flex: 1,
  },

  noteTitle: {
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    color: COLORS.black,
  },

  noteDesc: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.gray,
  },
});