import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { COLORS, SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';


const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading, error, clearError, registrationStep } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('MALE'); // Default MALE

  useEffect(() => {
    if (registrationStep === 'registered') {
      navigation.navigate('VerifyEmail');
    }
  }, [registrationStep, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
      clearError();
    }
  }, [error, clearError]);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Gender validation
    const validGenders = ["MALE", "FEMALE", "OTHER"];
    if (!validGenders.includes(gender.toUpperCase())) {
      Alert.alert('Error', 'Gender must be MALE, FEMALE, or OTHER');
      return;
    }

    const result = await register(fullName, email, password, age, gender.toUpperCase());
    if (result?.meta?.requestStatus === 'fulfilled') {
      navigation.navigate('VerifyEmail');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with Click Health</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.row}>
            <View style={styles.inputColumnLeft}>
              <Input
                label="Age"
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.inputColumnRight}>
              <Text style={styles.genderLabel}>Gender</Text>
              <View style={styles.genderOptions}>
                {GENDER_OPTIONS.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.genderOption,
                      index === GENDER_OPTIONS.length - 1 && styles.genderOptionLast,
                      gender === option && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender(option)}
                  >
                    <Text
                      style={[
                        styles.genderOptionText,
                        gender === option && styles.genderOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button 
            title="Register" 
            onPress={handleRegister} 
            loading={isLoading}
            style={styles.registerButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Log In</Text>
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
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputColumnLeft: {
    flex: 1,
    marginRight: 8,
  },
  inputColumnRight: {
    flex: 1,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderLabel: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 8,
    fontWeight: '600',
  },
  genderOptions: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGray,
  },
  genderOptionLast: {
    borderRightWidth: 0,
  },
  genderOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  genderOptionText: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  genderOptionTextSelected: {
    color: COLORS.white,
  },
  registerButton: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: COLORS.darkGray,
    fontSize: SIZES.body,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body,
  },
});

const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];

export default RegisterScreen;
