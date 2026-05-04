import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { COLORS } from "../../constants/theme";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import Error from "../../components/ui/Error";
import { verifyOtp } from "../../store/slices/authSlice";
import { resendOtp } from "../../store/slices/authSlice";
const OTP_EXPIRE_TIME = 60;

const VerifyEmailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { loading, error, isOtpVerified, user } = useSelector((state) => state.auth);

  const email = route?.params?.email || user?.email ;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME);

  const inputsRef = useRef([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const hasAutoVerified = useRef(false);

  const otpValue = otp.join("");
  const isOtpFull = otpValue.length === 6;
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 300);

    return () => clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (isOtpVerified) {
      navigation.navigate("Login");
    }
  }, [isOtpVerified, navigation]);

  useEffect(() => {
    if (!error) return;

    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [error, shakeAnim]);

  useEffect(() => {
    if (
      isOtpFull &&
      email &&
      !isExpired &&
      !loading &&
      !hasAutoVerified.current
    ) {
      hasAutoVerified.current = true;
      handleVerify();
    }

    if (!isOtpFull) {
      hasAutoVerified.current = false;
    }
  }, [isOtpFull, email, isExpired, loading]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleChangeOtp = (text, index) => {
    if (isExpired) return;

    const sanitizedValue = text.replace(/[^0-9]/g, "");

    if (sanitizedValue.length > 1) {
      const digits = sanitizedValue.slice(0, 6).split("");

      setOtp((prev) => {
        const next = [...prev];

        digits.forEach((digit, i) => {
          next[i] = digit;
        });

        return next;
      });

      const nextIndex = Math.min(digits.length, 5);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    setOtp((prev) => {
      const next = [...prev];
      next[index] = sanitizedValue;
      return next;
    });

    if (sanitizedValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };


  const handleVerify = () => {
    if (!email || !isOtpFull || isExpired || loading) return;

    dispatch(
      verifyOtp({
        email,
        otp: otpValue,
      })
    );
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;
    dispatch(resendOtp({ email }))
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(OTP_EXPIRE_TIME);
    hasAutoVerified.current = false;

    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);

    // Nếu backend có API resend OTP thì mở dòng này:
    // dispatch(resendOtp({ email }));
  };

  return (
    <AuthLayout
      tagline="Xác thực tài khoản của bạn"
      icon="shield-checkmark-outline"
    >
      <View style={styles.form}>
        <Text style={styles.formTitle}>Xác thực email</Text>

        <Text style={styles.description}>
          Nhập mã xác thực gồm 6 số đã được gửi đến email của bạn.
        </Text>

        {!!email && (
          <View style={styles.emailBox}>
            <Feather name="mail" size={20} color={COLORS.primary} />
            <Text style={styles.emailText}>{email}</Text>
          </View>
        )}

        <Animated.View
          style={[
            styles.otpContainer,
            {
              transform: [{ translateX: shakeAnim }],
            },
          ]}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChangeOtp(text, index)}
              onKeyPress={(event) => handleBackspace(event, index)}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isExpired && !loading}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                isExpired && styles.otpInputDisabled,
              ]}
            />
          ))}
        </Animated.View>

        <View style={styles.timerBox}>
          <Feather name="clock" size={16} color="#EA580C" />
          <Text style={styles.timerText}>
            {isExpired ? "Mã xác thực đã hết hạn" : "Mã hết hạn trong "}
            {!isExpired && (
              <Text style={styles.timerBold}>{formatTime(timeLeft)}</Text>
            )}
          </Text>
        </View>

        <Button
          title={loading ? "Đang xác thực..." : "Xác thực"}
          nameIcon="check-circle"
          sizeIcon={18}
          handle={handleVerify}
          disabled={!isOtpFull || loading || isExpired}
        />

        {error && <Error title="Xác thực thất bại" desc={error} />}

        <TouchableOpacity
          style={[
            styles.resendButton,
            timeLeft <= 0 && styles.resendButtonActive,
          ]}
          activeOpacity={0.85}
          disabled={timeLeft > 0}
          onPress={handleResendCode}
        >
          <Text
            style={[
              styles.resendText,
              timeLeft > 0 && styles.resendTextDisabled,
            ]}
          >
            {timeLeft > 0
              ? `Gửi lại sau ${formatTime(timeLeft)}`
              : "Gửi lại mã"}
          </Text>
        </TouchableOpacity>
      </View>

      <Footer
        titleLeft="Nhập sai email?"
        titleRight="Đăng ký lại"
        goToLink={() => navigation.navigate("Register")}
      />
    </AuthLayout>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  formTitle: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.black,
  },
  description: {
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
  emailBox: {
    minHeight: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(40, 107, 194, 0.18)",
    backgroundColor: "rgba(40, 107, 194, 0.06)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  emailText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBackground,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.black,
  },
  otpInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(40, 107, 194, 0.1)",
    color: COLORS.primary,
  },
  otpInputDisabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    gap: 6,
  },
  timerText: {
    fontSize: 14,
    color: "#EA580C",
    fontWeight: "500",
  },
  timerBold: {
    fontWeight: "800",
  },
  resendButton: {
    minHeight: 54,
    marginTop: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  resendButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(40, 107, 194, 0.06)",
  },
  resendText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  resendTextDisabled: {
    color: "#9CA3AF",
  },
});