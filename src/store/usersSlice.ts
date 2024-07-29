import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchUsers } from "../services/api";
import type { PayloadAction } from "@reduxjs/toolkit";
import User from "./types";

interface UsersList {
  userInput: string;
  users: User[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: UsersList= {
  userInput: "",
  users: [],
  loading: false,
  error: null,
  hasMore: true,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await searchUsers(query, page);
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    rememberUser: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload.items];
        state.hasMore = action.payload.items.length > 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { rememberUser } = usersSlice.actions;
export default usersSlice.reducer;
