import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

export default function Button(props){
    return (
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={props.handle}>
            <Text style={styles.primaryButtonText}>{props.title}</Text>
            <Feather name={props.nameIcon} size={props.sizeIcon} color={COLORS.white} />
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
     primaryButton: {
        minHeight: 56,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 6,
      },
      primaryButtonText: {
        marginRight: 10,
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
      },
})
