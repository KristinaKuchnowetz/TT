import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../services/api";
import User from "./types";

interface UserInfo {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserInfo = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (username: string) => {
    const response = await getUserDetails(username);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      });
  },
});

export default userSlice.reducer;
