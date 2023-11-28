import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/registerUser", async (body) => {
  try {
    const res = await axios.post("https://back-end-production-a31e.up.railway.app/dashboard-api/auth/register", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.data;
  } catch (err) {
    return await err.response.data;
  }
});

const registerSlice = createSlice({
  name: "auth",
  initialState: {
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.status == "error") {
        state.message = action.payload.message;
      } else {
        state.message = "";
        window.location.href = "/login";
      }
    });
  },
});

export default registerSlice.reducer;
