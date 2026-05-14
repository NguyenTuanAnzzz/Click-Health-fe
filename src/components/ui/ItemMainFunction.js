import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
export default function ItemMainFunction(props) {
    const navigation = useNavigation();
    const iconName = props.nameIcon || props.icon;

    const handlePress = () => {
        if (props.telNumber) {
            const url = `tel:${props.telNumber}`;
            Linking.openURL(url).catch(() => {
                Alert.alert("Không thể gọi", "Máy không mở được ứng dụng điện thoại.");
            });
            return;
        }
        if (props.link) {
            navigation.navigate(props.link);
        }
    };
    return (

        <TouchableOpacity
            activeOpacity={0.85}
            style={[
                styles.featureCard,
                props.primary && styles.featureCardPrimary,
                props.danger && styles.featureCardDanger,
            ]}
            onPress={handlePress}
        >
            <View
                style={[
                    styles.featureIconBox,
                    (props.primary || props.danger) && styles.featureIconBoxActive,
                ]}
            >
                <Feather
                    name={iconName}
                    size={21}
                    color={
                        props.primary || props.danger
                            ? COLORS.white
                            : COLORS.primary
                    }
                />
            </View>

            <Text
                style={[
                    styles.featureTitle,
                    (props.primary || props.danger) && styles.featureTitleLight,
                ]}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

})