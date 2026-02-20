import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { COLORS, SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmailScreen = () => {
  const navigation = useNavigation();
  const { verifyEmail, isLoading, error, clearError, registrationStep, registeredEmail } = useAuth();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(registeredEmail || '');

  useEffect(() => {
    if (registrationStep === 'verified') {
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => {} } // Navigation is handled by RootNavigator state change
      ]);
    }
  }, [registrationStep, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Verification Failed', error);
      clearError();
    }
  }, [error, clearError]);

  const handleVerify = async () => {
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedCode = code?.toString().trim();

    if (!normalizedEmail) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (!normalizedCode || normalizedCode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    const result = await verifyEmail(normalizedEmail, normalizedCode);
    console.log('[VERIFY_SCREEN] verify result status:', result?.meta?.requestStatus);
  };

  const handleResend = () => {
    Alert.alert('Info', 'Resend functionality not implemented in this demo');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            Please enter the verification code sent to your email address.
          </Text>
        </View>

        <View style={styles.form}>
           <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!registeredEmail} // Disable if we have it from registration
          />

          <Input
            label="Verification Code"
            placeholder="Enter code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            style={{ textAlign: 'center', letterSpacing: 5, fontSize: 24 }}
          />

          <Button 
            title="Verify Email" 
            onPress={handleVerify} 
            loading={isLoading}
            style={{ marginTop: 20 }}
          />

          <Button 
            title="Resend Code" 
            onPress={handleResend} 
            variant="secondary"
            style={{ marginTop: 10 }}
          />

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Back to Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.darkGray,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body,
  },
});

export default VerifyEmailScreen;
