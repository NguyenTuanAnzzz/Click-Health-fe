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

    await register(fullName, email, password, age, gender.toUpperCase());
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
            <View style={{ flex: 1, marginRight: 8 }}>
              <Input
                label="Age"
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Input
                label="Gender"
                placeholder="MALE/FEMALE"
                value={gender}
                onChangeText={setGender}
                autoCapitalize="characters"
              />
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
            style={{ marginTop: 20 }}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default RegisterScreen;
