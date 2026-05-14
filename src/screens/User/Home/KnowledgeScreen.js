import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../../constants/theme";

/** Liên kết tới tài liệu công khai của cơ quan y tế / hiệp hội (để người dùng tự đối chiếu). */
const REFERENCE_LINKS = [
  {
    id: "who",
    label: "WHO — Stroke (fact sheet)",
    url: "https://www.who.int/news-room/fact-sheets/detail/stroke",
  },
  {
    id: "cdc",
    label: "CDC — Stroke",
    url: "https://www.cdc.gov/stroke/index.html",
  },
  {
    id: "nhs",
    label: "NHS (UK) — Stroke",
    url: "https://www.nhs.uk/conditions/stroke/",
  },
  {
    id: "asa",
    label: "American Stroke Association",
    url: "https://www.stroke.org/en/about-stroke",
  },
];

/**
 * Nội dung tóm tắt bám các điểm chính trong tài liệu công khai của WHO, CDC, NHS và ASA;
 * không thay cho chẩn đoán hay điều trị. Luôn đọc bản gốc và làm theo chỉ dẫn của nhân viên y tế.
 */
const THEORY_CARDS = [
  {
    icon: "alert-circle",
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    title: "Đột quỵ là gì?",
    summary: "Cấp cứu: máu não bị gián đoạn do tắc hoặc chảy máu.",
    content:
      "Theo WHO, đột quỵ là tình trạng cấp cứu xảy ra khi dòng máu lên não bị gián đoạn do tắc mạch hoặc chảy máu. Thiếu máu nuôi não có thể dẫn tới tổn thương tế bào não và biến chứng nặng. Đột quỵ có thể đe dọa tính mạng và cần được xử trí ngay.\n\n" +
      "WHO cũng nhấn mạnh gánh nặng bệnh đột quỵ toàn cầu lớn; phần lớn gánh nặng liên quan tới các yếu tố nguy cơ có thể can thiệp (ví dụ tăng huyết áp, hút thuốc, cholesterol LDL cao, chế độ ăn nhiều muối, đường huyết lúc đói cao, thừa cân, ít vận động, rượu có hại, ô nhiễm không khí, v.v.).",
  },
  {
    icon: "git-branch",
    iconColor: "#286BC2",
    iconBg: "rgba(132,170,216,0.2)",
    title: "Các dạng đột quỵ (theo WHO)",
    summary: "Nhồi máu não, xuất huyết não, và cơn thiếu máu não thoáng qua (TIA).",
    content:
      "WHO phân loại chính:\n\n" +
      "• Đột quỵ thiếu máu não (ischaemic): cục máu đông chặn mạch máu trong não, làm mất dòng máu tới vùng não tương ứng. Đây là dạng phổ biến nhất.\n\n" +
      "• Đột quỵ xuất huyết não (haemorrhagic): vỡ mạch máu trong não gây chảy máu nhu mô não.\n\n" +
      "• Cơn thiếu máu não thoáng qua (TIA): triệu chứng giống đột quỵ nhưng do tắc máu ngắn; thường chỉ vài phút và không để lại tổn thương kéo dài theo định nghĩa lâm sàng. TIA vẫn là cảnh báo quan trọng: cần được đánh giá y tế vì nguy cơ đột quỵ thật sau đó cao.",
  },
  {
    icon: "eye",
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    title: "Triệu chứng & gợi nhớ FAST / BE‑FAST",
    summary: "Mặt, tay, lời nói, thời gian — cộng thêm thăng bằng và thị lực (NHS / ASA).",
    content:
      "WHO liệt kê các dấu hiệu có thể gặp: mất thăng bằng hoặc phối hợp đột ngột; mất thị lực đột ngột; mặt xệ một bên; yếu một hoặc hai cánh tay; nói khó hoặc lời nói bất thường.\n\n" +
      "NHS và American Stroke Association thường dùng FAST để ghi nhớ:\n" +
      "• F (Face): méo miệng / xệ một bên mặt.\n" +
      "• A (Arms): yếu hoặc tê một cánh tay (hoặc cả hai).\n" +
      "• S (Speech): nói khó, nói không rõ hoặc không hiểu lời nói.\n" +
      "• T (Time): ghi nhận thời điểm triệu chứng bắt đầu và gọi cấp cứu ngay — thời gian quyết định điều trị.\n\n" +
      "Một số tài liệu mở rộng thêm B (Balance — chóng mặt, đi loạng) và E (Eyes — nhìn đôi hoặc mất một phần thị trường).",
  },
  {
    icon: "clock",
    iconColor: "#DC2626",
    iconBg: "#FEE2E2",
    title: "Vì sao phải vào viện ngay?",
    summary: "Chẩn đoán hình ảnh sớm; điều trị tái thông có “cửa sổ thời gian”.",
    content:
      "WHO nêu rõ: khi nghi đột quỵ phải coi là cấp cứu y tế; cần chẩn đoán hình ảnh (CT hoặc MRI) càng sớm càng tốt.\n\n" +
      "Với đột quỵ thiếu máu não, điều trị dùng thuốc tiêu sợi huyết (ví dụ tPA) phải được cân nhắc và thực hiện trong giới hạn thời gian từ lúc khởi phát triệu chứng (thường được mô tả là trong vài giờ đầu, tùy quy định từng cơ sở và chỉ định lâm sàng). Nội soi lấy huyết khối (thrombectomy) có thể được chỉ định tùy mức độ nặng và vị trí tổn thương.\n\n" +
      "Với xuất huyết não: kiểm soát huyết áp, chăm sóc đặc biệt và có thể phẫu thuật tùy trường hợp.\n\n" +
      "Theo WHO, điều trị trong đơn vị đột quỵ chuyên biệt kèm phục hồi chức năng giúp cải thiện kết cục và giảm tử vong / di chứng.",
  },
  {
    icon: "users",
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
    title: "Yếu tố nguy cơ",
    summary: "Có nhóm có thể thay đổi được và nhóm không thay đổi được.",
    content:
      "Theo WHO, các yếu tố có thể can thiệp gồm: tăng huyết áp (đóng góp nguy cơ hàng đầu); dùng thuốc lá; cholesterol máu cao; đái thường / đái tháo đường; LDL cao; thừa cân / béo phì; ít vận động; chế độ ăn không lành mạnh (đặc biệt nhiều muối, ít rau quả); uống rượu có hại; ma túy (ví dụ cocaine); ô nhiễm không khí; đường huyết lúc đói cao; suy thận mạn.\n\n" +
      "Yếu tố khó thay đổi: tuổi; đã từng đột quỵ; bệnh tim sẵn có (ví dụ rung nhĩ, suy tim); bệnh thận mạn.",
  },
  {
    icon: "shield",
    iconColor: "#16A34A",
    iconBg: "#DCFCE7",
    title: "Phòng ngừa (hướng dẫn chung của WHO)",
    summary: "Kiểm soát huyết áp, bỏ thuốc lá, ăn uống và vận động theo khuyến cáo.",
    content:
      "WHO khuyến nghị mọi người có thể giảm nguy cơ bằng cách:\n\n" +
      "• Kiểm soát huyết áp cao: lối sống lành mạnh và điều trị thuốc hạ áp theo chỉ định.\n" +
      "• Giảm / bỏ thuốc lá; tránh hít khói thụ động.\n" +
      "• Ăn uống cân bằng: ít nhất 5 khẩu phần rau quả mỗi ngày; giảm muối, chất béo bão hòa và đường.\n" +
      "• Vận động: khoảng 150 phút/tuần cường độ vừa (khuyến nghị mức độ chung — áp dụng cần cá thể hóa theo sức khỏe của bạn).\n" +
      "• Quản lý bệnh đi kèm: đái tháo đường, rối loạn lipid máu, rung nhĩ, v.v.\n" +
      "• Hạn chế rượu có hại.\n" +
      "• Cải thiện chất lượng không khí trong nhà và ngoài trời khi có thể.\n\n" +
      "Với người có nguy cơ cao, WHO còn nêu các biện pháp như dùng thuốc chống kết tập / kháng đông khi có chỉ định, điều trị hạ lipid, đánh giá hẹp động mạch cảnh và can thiệp tái thông khi chỉ định — tất cả phải do bác sĩ quyết định.",
  },
  {
    icon: "alert-octagon",
    iconColor: "#CA8A04",
    iconBg: "#FEF3C7",
    title: "Biến chứng có thể gặp",
    summary: "WHO mô tả biến chứng cấp và lâu dài — cần theo dõi chuyên môn.",
    content:
      "WHO ghi nhận đột quỵ có thể gây nhiều biến chứng trên não, tim và cơ thể.\n\n" +
      "Ví dụ biến chứng cấp (trong ngày đến vài tuần): phù não; rối loạn ngôn ngữ / khó nuốt; viêm phổi hít sặc; co giật; trầm cảm; loét tì đè; co cứng cơ; đau vai; huyết khối tĩnh mạch sâu.\n\n" +
      "Biến chứng lâu dài: yếu vận động, đi khó; đau và co cứng mạn tính; suy giảm nhận thức / trí nhớ; trầm cảm, lo âu; động kinh sau đột quỵ; tiểu không tự chủ; giảm khả năng tự phục vụ.",
  },
  {
    icon: "heart",
    iconColor: "#DB2777",
    iconBg: "#FCE7F3",
    title: "Phục hồi sau đột quỵ",
    summary: "WHO: bắt đầu sớm, đa chuyên khoa.",
    content:
      "Theo WHO, phục hồi chức năng là phần cốt lõi của chăm sóc đột quỵ. Nên bắt đầu khi người bệnh đã ổn định về mặt y khoa — lý tưởng là trong vài ngày đầu sau đột quỵ.\n\n" +
      "Phục hồi thường gồm nhiều chuyên ngành: vật lý trị liệu (vận động, sức cơ, thăng bằng); trị liệu nghề nghiệp (sinh hoạt hằng ngày); trị liệu ngôn ngữ / nuốt; hỗ trợ tâm lý – thần kinh; tư vấn tâm lý cho trầm cảm và thích nghi cảm xúc.",
  },
  {
    icon: "phone",
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    title: "Khi nghi ngờ đột quỵ — xử trí ban đầu",
    summary: "Theo hướng dẫn công khai của CDC / NHS (không thay cho cấp cứu).",
    content:
      "CDC và NHS nhấn mạnh: gọi ngay số cấp cứu tại địa phương (ở Việt Nam thường là 115). Không lái xe tự đến bệnh viện nếu đang có triệu chứng; không chờ triệu chứng tự hết.\n\n" +
      "Ghi lại thời điểm bắt đầu triệu chứng (hoặc lần cuối còn bình thường) — thông tin này quan trọng cho điều trị tái thông.\n\n" +
      "Không cho ăn, uống hay uống thuốc tự ý (tránh sặc, tránh làm phức tạp xử trí). Giữ người bệnh an toàn (nằm nghiêng nếu nôn, bảo vệ đầu) theo hướng dẫn của tổng đài cấp cứu khi được yêu cầu.",
  },
];

const KnowledgeScreen = ({ navigation }) => {
  const [openCard, setOpenCard] = useState(null);

  const goHome = () => {
    navigation.navigate("HomeTab");
  };

  const openRef = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeRoot} edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={goHome}>
            <Feather name="chevron-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.headerIcon}>
            <Feather name="book-open" size={24} color={COLORS.primary} />
          </View>

          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>Kiến thức đột quỵ</Text>
            <Text style={styles.headerSubtitle}>Tóm tắt theo WHO, CDC, NHS, ASA</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIcon}>
            <Feather name="layers" size={21} color={COLORS.primary} />
          </View>
          <Text style={styles.sectionTitle}>Nội dung lý thuyết</Text>
        </View>

        <Text style={styles.introLine}>
          Các đoạn dưới đây là bản tóm tắt tiếng Việt các điểm chính trong tài liệu công khai của Tổ chức Y tế Thế giới
          (WHO), Trung tâm Kiểm soát và Phòng ngừa Dịch bệnh Hoa Kỳ (CDC), Dịch vụ Y tế Quốc gia Anh (NHS) và Hiệp hội
          Đột quỵ Hoa Kỳ (ASA). Không thay cho tư vấn y khoa trực tiếp.
        </Text>

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
                  <View style={[styles.theoryIconBox, { backgroundColor: item.iconBg }]}>
                    <Feather name={item.icon} size={22} color={item.iconColor} />
                  </View>

                  <View style={styles.theoryTitleBox}>
                    <Text style={styles.theoryTitle}>{item.title}</Text>
                    <Text style={styles.theorySummary}>{item.summary}</Text>
                  </View>

                  <Feather
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color={COLORS.darkGray}
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

        <View style={styles.sourcesSection}>
          <Text style={styles.sourcesTitle}>Đọc thêm tại nguồn gốc (tiếng Anh)</Text>
          {REFERENCE_LINKS.map((ref, idx) => (
            <TouchableOpacity
              key={ref.id}
              style={[styles.sourceRow, idx === 0 && styles.sourceRowFirst]}
              activeOpacity={0.75}
              onPress={() => openRef(ref.url)}
            >
              <Feather name="external-link" size={18} color={COLORS.primary} />
              <Text style={styles.sourceLabel}>{ref.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.noteBox}>
          <View style={styles.noteIcon}>
            <Feather name="info" size={18} color={COLORS.primary} />
          </View>

          <View style={styles.noteContent}>
            <Text style={styles.noteTitle}>Lưu ý</Text>
            <Text style={styles.noteDesc}>
              Thông tin trong ứng dụng chỉ nhằm mục đích giáo dục sức khỏe cộng đồng, được tổng hợp từ các nguồn công
              khai nêu trên và có thể không phản ánh đầy đủ bản cập nhật mới nhất của từng cơ quan. Mọi quyết định chẩn
              đoán, điều trị và dùng thuốc phải dựa trên khám trực tiếp và chỉ định của bác sĩ / cấp cứu.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KnowledgeScreen;

const styles = StyleSheet.create({
  safeRoot: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
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
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    color: COLORS.black,
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.darkGray,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
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

  introLine: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 16,
  },

  cardList: {
    gap: 12,
    marginBottom: 22,
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
    fontWeight: "600",
    color: COLORS.darkGray,
  },

  theoryBody: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  theoryContent: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: "#1F2937",
  },

  sourcesSection: {
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F9FAFB",
  },

  sourcesTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 10,
  },

  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  sourceRowFirst: {
    borderTopWidth: 0,
    paddingTop: 0,
  },

  sourceLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    textDecorationLine: "underline",
  },

  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
    padding: 16,
  },

  noteIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(40,107,194,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  noteContent: {
    flex: 1,
  },

  noteTitle: {
    marginBottom: 6,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: COLORS.black,
  },

  noteDesc: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
    color: "#1F2937",
  },
});
