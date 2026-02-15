import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';
import { COLORS, SIZES } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';

const HomeScreen = () => {
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name || 'User'}!</Text>
      <Text style={styles.subtitle}>You are now logged in.</Text>
      
      <Button 
        title="Logout" 
        onPress={() => logout()} 
        variant="secondary"
        style={{ marginTop: 20, width: '80%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
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
  },
});

export default HomeScreen;
