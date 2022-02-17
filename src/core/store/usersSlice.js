import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserInfo = createAsyncThunk('user/fetchbyID', async id => {
  try {
    const response = await axios.get(
      `https://api.allorigins.win/raw?url=http://api.deezer.com/user/${id}`
    );
    if ((response.status = 200)) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: { user: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.user = action.payload;
    },
    [fetchUserInfo.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.loading = 'failed';
    },
  },
});

export default userInfoSlice.reducer;
