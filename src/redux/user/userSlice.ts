import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../utils/apiHandlers";

export type usersObj = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface UserState {
  users: usersObj[] | any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk("user/fetchData", async () => {
  const rsep = await fetch("https://reqres.in/api/users");
  const resp2 = await rsep.json();
  return resp2.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state: any, action: PayloadAction<any>) => {
      state.users.push(action.payload);
      return state;
    },
    EditUser: (state: any, action: PayloadAction<any>) => {
      let user = state.users.find(
        (user: usersObj) => action.payload.id === user.id
      );
      if (action.payload.first_name) {
        user.first_name = action.payload.first_name;
      }
      if (action.payload.last_name) {
        user.last_name = action.payload.last_name;
      }
      if (action.payload.email) {
        user.email = action.payload.email;
      }
      state.users = state.users.map((us: usersObj) => {
        if (user.id === us.id) {
          return user;
        }
        return us;
      });
      return state;
    },
    deleteUser: (state: any, action: PayloadAction<any>) => {
      state.users = state.users.filter(
        (user: usersObj) => action.payload !== user.id
      );
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addNewUser, EditUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
