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

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import Error from "../../components/ui/Error";
import { verifyOtp, resendOtp } from "../../store/slices/authSlice";

const OTP_EXPIRE_TIME = 60;

const VerifyEmailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { loading, error, isOtpVerified, user } = useSelector(
    (state) => state.auth
  );

  const email = route?.params?.email || user?.email || "";

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
    if (isExpired || loading) return;

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
    if (timeLeft > 0 || loading || !email) return;

    dispatch(resendOtp({ email }));

    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(OTP_EXPIRE_TIME);
    hasAutoVerified.current = false;

    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
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
            <View style={styles.emailIconBox}>
              <Feather name="mail" size={18} color="#286BC2" />
            </View>

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
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChangeOtp(text, index)}
              onKeyPress={(event) => handleBackspace(event, index)}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isExpired && !loading}
              selectTextOnFocus
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                isExpired && styles.otpInputDisabled,
              ]}
            />
          ))}
        </Animated.View>

        <View style={styles.timerBox}>
          <Feather
            name={isExpired ? "alert-circle" : "clock"}
            size={16}
            color={isExpired ? "#EF4444" : "#F59E0B"}
          />

          <Text
            style={[
              styles.timerText,
              isExpired && styles.timerTextExpired,
            ]}
          >
            {isExpired ? "Mã xác thực đã hết hạn" : "Mã hết hạn trong "}
            {!isExpired && (
              <Text style={styles.timerBold}>{formatTime(timeLeft)}</Text>
            )}
          </Text>
        </View>

        <Button
          title="Xác thực"
          nameIcon="check-circle"
          sizeIcon={18}
          loading={loading}
          disabled={!isOtpFull || isExpired}
          handle={handleVerify}
        />

        {error && <Error title="Xác thực thất bại" desc={error} />}

        <TouchableOpacity
          style={[
            styles.resendButton,
            isExpired && styles.resendButtonActive,
          ]}
          activeOpacity={0.85}
          disabled={!isExpired || loading}
          onPress={handleResendCode}
        >
          <Text
            style={[
              styles.resendText,
              !isExpired && styles.resendTextDisabled,
            ]}
          >
            {isExpired ? "Gửi lại mã" : `Gửi lại sau ${formatTime(timeLeft)}`}
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
    color: "#111827",
  },

  description: {
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#6B7280",
  },

  emailBox: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#F5F6FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 22,
  },

  emailIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  emailText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#286BC2",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#F5F6FA",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  otpInputFilled: {
    borderColor: "#286BC2",
    backgroundColor: "#EEF6FF",
    color: "#286BC2",
  },

  otpInputDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
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
    fontSize: 13,
    color: "#F59E0B",
    fontWeight: "600",
  },

  timerTextExpired: {
    color: "#EF4444",
  },

  timerBold: {
    fontWeight: "800",
  },

  resendButton: {
    minHeight: 54,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  resendButtonActive: {
    borderColor: "#286BC2",
    backgroundColor: "#EEF6FF",
  },

  resendText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#286BC2",
  },

  resendTextDisabled: {
    color: "#9CA3AF",
  },
});