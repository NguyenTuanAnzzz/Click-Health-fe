import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { COLORS } from "../../constants/theme";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import GenderOption from "../../components/ui/GenderOption";
import Error from "../../components/ui/Error";
import { register } from "../../store/slices/authSlice";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("MALE");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user) {
      navigation.navigate("VerifyEmail", { email: user.email });

      dispatch({ type: "auth/logout" });
    }
  }, [user, navigation]);

  const handleRegister = () => {
    setLocalError("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setLocalError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Mật khẩu không khớp");
      return;
    }

    if (!agree) {
      setLocalError("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    dispatch(
      register({
        fullName: fullName.trim(),
        email: email.trim(),
        gender,
        password,
      })
    );
  };

  return (
    <AuthLayout tagline="Tạo tài khoản chăm sóc sức khỏe">
      <View style={styles.form}>
        <Text style={styles.formTitle}>Đăng ký tài khoản</Text>

        <Input
          label="Họ và tên"
          nameIcon="user"
          sizeIcon={20}
          placeholder="Nhập họ tên của bạn"
          value={fullName}
          onChangeText={setFullName}
        />

        <Input
          label="Email"
          nameIcon="mail"
          sizeIcon={20}
          placeholder="Nhập email của bạn"
          keyboard="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.genderBlock}>
          <Text style={styles.genderLabel}>Giới tính</Text>

          <View style={styles.genderRow}>
            <GenderOption
              label="Nam"
              value="MALE"
              selectedValue={gender}
              onSelect={setGender}
            />
            <GenderOption
              label="Nữ"
              value="FEMALE"
              selectedValue={gender}
              onSelect={setGender}
            />
            <GenderOption
              label="Khác"
              value="OTHER"
              selectedValue={gender}
              onSelect={setGender}
            />
          </View>
        </View>

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

        <Input
          label="Xác nhận mật khẩu"
          nameIcon="lock"
          sizeIcon={20}
          placeholder="Xác nhận mật khẩu"
          secure={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          rightIcon="eye"
        />

        {(localError || error) && (
          <Error title="Đăng ký thất bại" desc={error || localError} />
        )}

        <TouchableOpacity
          style={styles.termsRow}
          activeOpacity={0.85}
          onPress={() => setAgree((prev) => !prev)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Feather name="check" size={14} color={COLORS.white} />}
          </View>

          <Text style={styles.termsText}>
            Tôi đồng ý với{" "}
            <Text style={styles.linkText}>Điều khoản dịch vụ</Text> và{" "}
            <Text style={styles.linkText}>Chính sách bảo mật</Text>
          </Text>
        </TouchableOpacity>

        <Button
          title={loading ? "Đang đăng ký..." : "Đăng ký"}
          nameIcon="arrow-right"
          sizeIcon={18}
          handle={handleRegister}
          disabled={loading}
        />
      </View>

      <Footer
        titleLeft="Bạn đã có tài khoản?"
        titleRight="Đăng nhập ngay"
        goToLink={() => navigation.navigate("Login")}
      />
    </AuthLayout>
  );
};

export default RegisterScreen;

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
  genderBlock: {
    marginBottom: 18,
  },
  genderLabel: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.black,
  },
  genderRow: {
    flexDirection: "row",
    gap: 10,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: 22,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});