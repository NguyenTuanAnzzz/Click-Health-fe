import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import Error from "../../components/ui/Error";
import { login } from "../../store/slices/authSlice";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { token, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password, rememberMe }));
  };

  useEffect(() => {
    if (token) {
      const parentNavigation = navigation.getParent();

      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
      
    }
  }, [token, navigation]);



  return (
    <AuthLayout tagline="Ứng dụng chăm sóc sức khỏe">
      <View style={styles.form}>
        <Text style={styles.formTitle}>Chào mừng!</Text>

        <Input
          label="Email"
          nameIcon="mail"
          sizeIcon={20}
          placeholder="Nhập email của bạn"
          keyboard="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Mật khẩu"
          nameIcon="lock"
          sizeIcon={20}
          placeholder="Nhập mật khẩu"
          secure={!showPassword}
          value={password}
          onChangeText={setPassword}
          rightIcon={showPassword ? "eye-off" : "eye"}
          onPressRightIcon={() => setShowPassword((prev) => !prev)}
        />

        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.rememberRow}
            activeOpacity={0.85}
            onPress={() => setRememberMe((prev) => !prev)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxActive]}
            >
              {rememberMe && (
                <Feather name="check" size={14} color={COLORS.white} />
              )}
            </View>

            <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Đăng nhập"
          nameIcon="arrow-right"
          sizeIcon={20}
          loading={loading}
          handle={handleLogin}
        />

        {error && <Error title="Đăng nhập thất bại" desc={error} />}
      </View>

      <Footer
        titleLeft="Chưa có tài khoản?"
        titleRight="Đăng ký ngay"
        goToLink={() => navigation.navigate("Register")}
      />
    </AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },

  formTitle: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 20,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: COLORS.primary,
  },

  rememberText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#286BC2",
  },
});
