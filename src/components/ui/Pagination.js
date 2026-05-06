import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function Pagination({
    currentPage = 1,
    pages = [],
    onPrevious,
    onNext,
    onPagePress,
    disablePrevious = false,
    disableNext = false,
}) {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[styles.navButton, disablePrevious && styles.buttonDisabled]}
                activeOpacity={0.75}
                onPress={onPrevious}
                disabled={disablePrevious}
            >
                <Feather
                    name="chevron-left"
                    size={18}
                    color={disablePrevious ? COLORS.textMuted : COLORS.text}
                />
                <Text
                    style={[
                        styles.navText,
                        disablePrevious && styles.textDisabled,
                    ]}
                >
                    Previous
                </Text>
            </TouchableOpacity>

            <View style={styles.pageList}>
                {pages.map((page, index) => {
                    const isActive = page === currentPage;
                    const isDots = page === "...";

                    if (isDots) {
                        return (
                            <View key={`dots-${index}`} style={styles.dotsBox}>
                                <Text style={styles.dotsText}>...</Text>
                            </View>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={`page-${page}`}
                            style={[
                                styles.pageButton,
                                isActive && styles.pageButtonActive,
                            ]}
                            activeOpacity={0.75}
                            onPress={() => onPagePress?.(page)}
                        >
                            <Text
                                style={[
                                    styles.pageText,
                                    isActive && styles.pageTextActive,
                                ]}
                            >
                                {page}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity
                style={[styles.navButton, disableNext && styles.buttonDisabled]}
                activeOpacity={0.75}
                onPress={onNext}
                disabled={disableNext}
            >
                <Text
                    style={[
                        styles.navText,
                        disableNext && styles.textDisabled,
                    ]}
                >
                    Next
                </Text>
                <Feather
                    name="chevron-right"
                    size={18}
                    color={disableNext ? COLORS.textMuted : COLORS.text}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 18,
        marginBottom: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.white,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: COLORS.black,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    navButton: {
        height: 38,
        paddingHorizontal: 8,
        borderRadius: 12,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonDisabled: {
        opacity: 0.45,
    },

    navText: {
        fontSize: 14,
        fontWeight: "800",
        color: COLORS.text,
        marginHorizontal: 4,
    },

    textDisabled: {
        color: COLORS.textMuted,
    },

    pageList: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
    },

    pageButton: {
        width: 38,
        height: 38,
        borderRadius: 13,

        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3,
    },

    pageButtonActive: {
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    pageText: {
        fontSize: 15,
        fontWeight: "800",
        color: COLORS.text,
    },

    pageTextActive: {
        color: COLORS.white,
    },

    dotsBox: {
        width: 32,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3,
    },

    dotsText: {
        fontSize: 16,
        fontWeight: "900",
        color: COLORS.textMuted,
    },
});