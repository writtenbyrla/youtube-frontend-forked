import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  return result.data;
});

const userSlice = createSlice({
  name: "loginSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return action.payload;
    });
  },
});

export default userSlice;
export { asyncLogin };
