import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  errorMessage: "",
  token: "",
};

const API_URL = "https://back-end-production-a31e.up.railway.app/dashboard-api/auth/";

export const registerUser = createAsyncThunk("registerUser", async (registerObj) => {
  try {
    const response = await axios.post(API_URL + "register", registerObj);
    return await response.data;
  } catch (err) {
    return await err.response.data;
  }
});

export const loginUser = createAsyncThunk("loginUser", async (loginObj) => {
  try {
    const response = await axios.post(API_URL + "login", loginObj);
    return await response.data;
  } catch (err) {
    return await err.response.data;
  }
});

const authSlice = createSlice({
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
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status == "error") {
          state.errorMessage = action.payload.message;
        } else {
          state.errorMessage = "";
          window.location.href = "/login";
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status == "error") {
          state.errorMessage = action.payload.message;
        } else {
          state.errorMessage = "";
          state.token = action.payload.data.access_token;
          localStorage.setItem("token", action.payload.data.access_token);
          window.location.href = "/app/reservation";
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { addToken, logout } = authSlice.actions;
export default authSlice.reducer;
