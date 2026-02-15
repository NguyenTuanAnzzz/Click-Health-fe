import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../constants/config';

// Async Thunks for API calls
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
  
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();


      if (!response.ok) {
       
        return rejectWithValue(data.message || 'Login failed');
      }

      // Backend returns: { userId, email, token }
      return { user: { id: data.userId, email: data.email }, token: data.token };
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ fullName, email, password, age, gender }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('age', age || '25');
      formData.append('gender', gender || 'MALE');

      console.log('URL:', `${API_URL}/signup`);
      
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();


      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      return { email };
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ email, code }, { rejectWithValue }) => {
    try {


      const response = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();


      if (!response.ok) {
        return rejectWithValue(data.message || 'Verification failed');
      }


      return { user: { id: data.userId, email: data.email }, token: data.token };
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Client-side logout only for JWT
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationStep: 'idle', // idle, registered, verified
  registeredEmail: null, // Store email after successful registration to use in verification
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegistration: (state) => {
      state.registrationStep = 'idle';
      state.registeredEmail = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registrationStep = 'registered';
      state.registeredEmail = action.payload.email;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Verify Email
    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registrationStep = 'verified';
      // Auto login after verification
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.registrationStep = 'idle';
      state.registeredEmail = null;
    });
  },
});

export const { clearError, resetRegistration } = authSlice.actions;
export default authSlice.reducer;