import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: [],
};

const API_URL = "https://back-end-production-a31e.up.railway.app/dashboard-api/user/";

export const getUserDetail = createAsyncThunk("getUserDetail", async () => {
  try {
    const response = await axios.get(API_URL);
    return await response.data;
  } catch (err) {
    return await err.response.data;
  }
});

const userSlice = createSlice({
  name: "user",
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
      .addCase(getUserDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserDetail.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { addToken, logout } = userSlice.actions;
export default userSlice.reducer;
