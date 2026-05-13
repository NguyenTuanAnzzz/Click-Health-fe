import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";

import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../../store/slices/authSlice";

const VIP_FEATURES = [
    "Kiểm tra sức khỏe không giới hạn",
    "Báo cáo chi tiết & phân tích chuyên sâu",
    "Ưu tiên tư vấn trực tuyến với bác sĩ",
];

const SUPPORT_ITEMS = [
    {
        icon: "file-text",
        title: "Điều khoản dịch vụ",
    },
    {
        icon: "shield",
        title: "Chính sách bảo mật",
    },
    {
        icon: "info",
        title: "Về Click Health",
    },
];



const ProfileScreen = ({ navigation }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("yearly");
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);



    const handleEditProfile = () => {
        Alert.alert("Thông báo", "Chức năng chỉnh sửa hồ sơ sẽ được phát triển sau.");
    };

    const handleUpgrade = () => {
        Alert.alert(
            "Nâng cấp VIP",
            selectedPlan === "monthly"
                ? "Bạn đã chọn gói hàng tháng 49,000₫."
                : "Bạn đã chọn gói hàng năm 490,000₫."
        );
    };

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất không?", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Đăng xuất",
                style: "destructive",
                onPress: () => navigation.getParent()?.getParent()?.navigate("Auth"),
            },
        ]);
    };
    useEffect(() => {
        dispatch(getInfo());
        
    }, [dispatch]);

    return (
        <UserLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={22} color={COLORS.darkGray || "#374151"} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.headerTitle}>Hồ sơ</Text>
                        <Text style={styles.headerSubtitle}>Quản lý tài khoản & cài đặt</Text>
                    </View>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.avatarBox}>
                        <Image
                            source={{
                                uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix",
                            }}
                            style={styles.avatar}
                        />

                        <TouchableOpacity style={styles.cameraButton} activeOpacity={0.85}>
                            <Feather name="camera" size={12} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{user?.fullName || "Chưa có tên"}</Text>
                        <Text style={styles.userEmail}>nguyenvana@example.com</Text>

                        <TouchableOpacity
                            style={styles.editButton}
                            activeOpacity={0.85}
                            onPress={handleEditProfile}
                        >
                            <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SectionTitle title="Cài đặt ứng dụng" />

                <View style={styles.settingCard}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIcon}>
                                <Feather name="moon" size={20} color={darkMode ? COLORS.primary : "#4B5563"} />
                            </View>
                            <Text style={styles.settingText}>Chế độ tối</Text>
                        </View>

                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{
                                false: "#E5E7EB",
                                true: COLORS.primary,
                            }}
                            thumbColor={COLORS.white}
                        />
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingRow} activeOpacity={0.85}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIcon}>
                                <Feather name="globe" size={20} color="#4B5563" />
                            </View>
                            <Text style={styles.settingText}>Ngôn ngữ</Text>
                        </View>

                        <View style={styles.languageBox}>
                            <Text style={styles.languageText}>Tiếng Việt</Text>
                            <Feather name="chevron-down" size={18} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                </View>

                <SectionTitle title="Gói nâng cấp" />

                <View style={styles.vipCard}>
                    <View style={styles.circleBg} />

                    <View style={styles.vipHeader}>
                        <View>
                            <Text style={styles.vipTitle}>Nâng cấp VIP</Text>
                            <Text style={styles.vipSubtitle}>Mở khóa toàn bộ tính năng cao cấp</Text>
                        </View>

                        <View style={styles.crownBox}>
                            <Feather name="award" size={24} color={COLORS.primary} />
                        </View>
                    </View>

                    <View style={styles.planRow}>
                        <PlanCard
                            title="Hàng tháng"
                            price="49,000₫"
                            selected={selectedPlan === "monthly"}
                            onPress={() => setSelectedPlan("monthly")}
                        />

                        <PlanCard
                            title="Hàng năm"
                            price="490,000₫"
                            badge="-10%"
                            selected={selectedPlan === "yearly"}
                            onPress={() => setSelectedPlan("yearly")}
                        />
                    </View>

                    <View style={styles.vipFeatureList}>
                        {VIP_FEATURES.map((feature) => (
                            <View key={feature} style={styles.vipFeatureItem}>
                                <Feather name="check-circle" size={16} color="#22C55E" />
                                <Text style={styles.vipFeatureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity activeOpacity={0.85} onPress={handleUpgrade}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryLight || "#84AAD8"]}
                            style={styles.upgradeButton}
                        >
                            <Text style={styles.upgradeButtonText}>Nâng cấp ngay</Text>
                            <Feather name="arrow-right-circle" size={20} color={COLORS.white} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <SectionTitle title="Thông tin & hỗ trợ" />

                <View style={styles.supportCard}>
                    {SUPPORT_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={item.title}
                            style={styles.supportRow}
                            activeOpacity={0.85}
                            onPress={() => Alert.alert(item.title, "Chức năng sẽ được phát triển sau.")}
                        >
                            <View style={styles.supportLeft}>
                                <View style={styles.supportIcon}>
                                    <Feather name={item.icon} size={19} color="#6B7280" />
                                </View>
                                <Text style={styles.supportText}>{item.title}</Text>
                            </View>

                            <Feather name="chevron-right" size={20} color="#D1D5DB" />

                            {index < SUPPORT_ITEMS.length - 1 && <View style={styles.rowDivider} />}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.85}
                    onPress={handleLogout}
                >
                    <Feather name="log-out" size={20} color="#DC2626" />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Phiên bản 1.2.4 (Build 2025)</Text>
            </View>
        </UserLayout>
    );
};

const SectionTitle = ({ title }) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
};

const PlanCard = ({ title, price, badge, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.planCard, selected && styles.planCardActive]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {badge && (
                <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>{badge}</Text>
                </View>
            )}

            <Text style={[styles.planTitle, selected && styles.planTitleActive]}>
                {title}
            </Text>
            <Text style={styles.planPrice}>{price}</Text>
        </TouchableOpacity>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
    },

    backButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        fontSize: 22,
        lineHeight: 28,
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

    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "rgba(132,170,216,0.28)",
        backgroundColor: "#F1F6FD",
        padding: 20,
        marginBottom: 28,

        shadowColor: COLORS.primary,
        shadowOpacity: 0.06,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    avatarBox: {
        position: "relative",
    },

    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: "rgba(40,107,194,0.22)",
    },

    cameraButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: COLORS.white,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        flex: 1,
    },

    userName: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "900",
        color: COLORS.black,
    },

    userEmail: {
        marginTop: 3,
        marginBottom: 12,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "500",
        color: COLORS.gray,
    },

    editButton: {
        alignSelf: "flex-start",
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(40,107,194,0.3)",
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 7,
    },

    editButtonText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "900",
        color: COLORS.primary,
    },

    sectionTitle: {
        marginLeft: 4,
        marginBottom: 10,
        fontSize: 11,
        lineHeight: 15,
        fontWeight: "900",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 1.6,
    },

    settingCard: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        marginBottom: 28,
        overflow: "hidden",

        shadowColor: COLORS.primary,
        shadowOpacity: 0.05,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    settingRow: {
        minHeight: 72,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    settingIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    settingText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "900",
        color: "#374151",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginLeft: 72,
    },

    languageBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    languageText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "900",
        color: COLORS.primary,
    },

    vipCard: {
        position: "relative",
        borderRadius: 28,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        padding: 18,
        marginBottom: 28,
        overflow: "hidden",

        shadowColor: COLORS.primary,
        shadowOpacity: 0.06,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    circleBg: {
        position: "absolute",
        top: -26,
        right: -26,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#F1F6FD",
        opacity: 0.8,
    },

    vipHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    vipTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "900",
        color: COLORS.black,
    },

    vipSubtitle: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
        color: COLORS.gray,
    },

    crownBox: {
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: "#F1F6FD",
        alignItems: "center",
        justifyContent: "center",
    },

    planRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 18,
    },

    planCard: {
        flex: 1,
        position: "relative",
        borderRadius: 18,
        borderWidth: 2,
        borderColor: "#F3F4F6",
        backgroundColor: "#F9FAFB",
        padding: 14,
    },

    planCardActive: {
        borderColor: COLORS.primary,
        backgroundColor: "#F1F6FD",
    },

    planBadge: {
        position: "absolute",
        top: -9,
        right: -3,
        borderRadius: 999,
        backgroundColor: "#22C55E",
        paddingHorizontal: 8,
        paddingVertical: 2,
    },

    planBadgeText: {
        fontSize: 8,
        lineHeight: 11,
        fontWeight: "900",
        color: COLORS.white,
    },

    planTitle: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "900",
        color: "#9CA3AF",
        textTransform: "uppercase",
    },

    planTitleActive: {
        color: COLORS.primary,
    },

    planPrice: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "900",
        color: COLORS.black,
    },

    vipFeatureList: {
        gap: 9,
        marginBottom: 18,
    },

    vipFeatureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    vipFeatureText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "600",
        color: "#4B5563",
    },

    upgradeButton: {
        height: 52,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    upgradeButtonText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "900",
        color: COLORS.white,
    },

    supportCard: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        marginBottom: 28,
        overflow: "hidden",

        shadowColor: COLORS.primary,
        shadowOpacity: 0.05,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    supportRow: {
        minHeight: 70,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    supportLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    supportIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        justifyContent: "center",
    },

    supportText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "900",
        color: "#374151",
    },

    rowDivider: {
        position: "absolute",
        left: 72,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: "#F3F4F6",
    },

    logoutButton: {
        height: 54,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#FECACA",
        backgroundColor: "#FEF2F2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    logoutText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "900",
        color: "#DC2626",
    },

    versionText: {
        marginTop: 22,
        marginBottom: 20,
        textAlign: "center",
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
});