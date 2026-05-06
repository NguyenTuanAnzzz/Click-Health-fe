import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const getNearbyHospital = createAsyncThunk(
  "place/getNearbyHospital",
  async ({lat, lng, page, limit}, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/places/nearby-hospitals?lat=${lat}&lng=${lng}&page=${page}&limit=${limit}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Get Hospital failed"),
      );
    }
  },
);

const placeSlice = createSlice({
  name: "place",
  initialState: {
    hospitals: [],
    loading: null,
    error: null,
    pages: null,
    totalItems: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNearbyHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNearbyHospital.fulfilled, (state, action) =>{
        state.loading = false;
        state.error = null
        state.hospitals = action.payload.hospitals || null
        state.pages = action.payload.totalPages || null
        state.totalItems = action.payload.totalItems || null
      })
      .addCase(getNearbyHospital.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload || action.error.message
      })
      
  },
});



export default placeSlice.reducer;