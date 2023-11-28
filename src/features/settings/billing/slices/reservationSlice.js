import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  reservations: [],
};

const API_URL = "https://back-end-production-a31e.up.railway.app/dashboard-api/reservations/";

export const getReservationList = createAsyncThunk("getReservationList", async () => {
  try {
    const response = await axios.get(API_URL);
    return await response.data;
  } catch (err) {
    return await err.response.data;
  }
});

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(getReservationList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationList.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.reservations;
      })
      .addCase(getReservationList.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { addToken, logout } = reservationSlice.actions;
export default reservationSlice.reducer;
