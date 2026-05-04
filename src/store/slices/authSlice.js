import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";

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
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  },
);

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


export const resendOtp  = createAsyncThunk(
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isOtpVerified: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      state.isOtpVerified = false;
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
        state.token = action.payload || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
        state.isOtpVerified = true
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(resendOtp.pending, (state, action) =>{
        state.loading = true;
        state.isOtpVerified = false;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled,(state, action) =>{
        state.loading = false;
        state.isOtpVerified = false;
        state.user = {
          email: action.payload.email,
        };
        state.error = null;
      })
      .addCase(resendOtp.rejected,(state, action) =>{
        state.loading = false;
        state.error = action.payload
      })
      ;
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
