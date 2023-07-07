import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fechAuth = createAsyncThunk("auth/fechAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fechRegister = createAsyncThunk(
  "auth/fechRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  },
);

export const fechAuthMe = createAsyncThunk(
  "auth/fechAuthMe",
  async (params) => {
    const { data } = await axios.get("/auth/me", params);
    return data;
  },
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fechAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fechAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fechAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fechAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fechAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fechAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fechRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fechRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fechRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
