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

  const { token, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("Home");
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
          secure={true}
          value={password}
          onChangeText={setPassword}
          rightIcon="eye"
        />

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.rememberRow} activeOpacity={0.85}>
            <View style={styles.checkbox}>
              <Feather name="check" size={14} color={COLORS.white} />
            </View>
            <Text style={styles.rememberText}>Nhớ mật khẩu</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title={loading ? "Đang đăng nhập..." : "Đăng nhập"}
          nameIcon="arrow-right"
          sizeIcon={18}
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
    color: COLORS.black,
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
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
});