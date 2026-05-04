import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

export default function Input(props) {
    return (
        <View style={styles.fieldBlock}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputShell}>
                <View style={styles.leftIcon}>
                    <Feather name={props.nameIcon} size={props.sizeIcon} color={COLORS.textMuted} />
                </View>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={COLORS.textMuted}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={props.keyboard}
                    secureTextEntry={props.secure}
                    value={props.value}
                    onChangeText={props.onChangeText}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldBlock: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '700',
        color: '#4B5563',
    },
    inputShell: {
        minHeight: 56,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.inputBackground,
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    leftIcon: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex: 1,
    },
    input: {
        minHeight: 56,
        paddingLeft: 48,
        paddingRight: 48,
        color: COLORS.black,
        fontSize: 16,
    },
})