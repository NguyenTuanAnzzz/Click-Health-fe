import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/signup`, userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Register failed"),
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      const token = res.data?.token;

      if (token) {
        if (rememberMe) {
          await AsyncStorage.setItem("token", token);
        } else {
          await AsyncStorage.removeItem("token");
        }
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  }
);

export const loadStoredToken = createAsyncThunk(
  "auth/loadStoredToken",
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Cannot load stored token");
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await AsyncStorage.removeItem("token");
});

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/verify-otp`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Verify OTP failed"),
      );
    }
  },
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (emailData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/resend-otp`, emailData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Resend OTP failed"),
      );
    }
  },
);

export const getInfo = createAsyncThunk(
  "auth/getInfo",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.token;

      if (!token) {
        token = await AsyncStorage.getItem("token");
      }

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const res = await axios.get(`${API_URL}/users/get-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Get user info failed")
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isOtpVerified: false,
    appLoading: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loadStoredToken.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(loadStoredToken.fulfilled, (state, action) => {
        state.token = action.payload || null;
        state.appLoading = false;
      })
      .addCase(loadStoredToken.rejected, (state) => {
        state.token = null;
        state.appLoading = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.loading = false;
        state.isOtpVerified = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isOtpVerified = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
        };
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isOtpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(resendOtp.pending, (state, action) => {
        state.loading = true;
        state.isOtpVerified = false;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpVerified = false;
        state.user = {
          email: action.payload.email,
        };
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInfo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.error = null;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
