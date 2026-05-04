import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';


export default function Footer(props) {
    
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>{props.titleLeft}</Text>
            <TouchableOpacity onPress={props.goToLink}>
                <Text style={styles.linkText}>{props.titleRight}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: 24,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkGray,
    },
    linkText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.primary,
        marginLeft: 5,
    },
})