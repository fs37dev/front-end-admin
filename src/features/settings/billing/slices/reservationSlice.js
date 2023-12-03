import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  reservations: [],
  reservation: "",
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

export const getReservationDetail = createAsyncThunk("getReservationDetail", async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return await response.data;
  } catch (err) {
    return await err.response.data;
  }
});

export const updateReservation = createAsyncThunk("updateReservation", async ({ id, status }) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, { status: status });
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
      // Get Reservation List
      .addCase(getReservationList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationList.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.reservations;
        state.reservation = "";
      })
      .addCase(getReservationList.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload.reservation;
        state.reservations = [];
      })
      .addCase(getReservationDetail.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(updateReservation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        window.location.reload();
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const { addToken, logout } = reservationSlice.actions;
export default reservationSlice.reducer;
