import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlaylistDetails = createAsyncThunk(
  'playlist/fetchbyID',
  async id => {
    try {
      const response = await axios.get(
        `https://api.allorigins.win/raw?url=http://api.deezer.com/playlist/${id}`
      );
      if ((response.status = 200)) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const playlistDetailsSlice = createSlice({
  name: 'playlistDetails',
  initialState: { data: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchPlaylistDetails.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.data = action.payload;
    },
    [fetchPlaylistDetails.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchPlaylistDetails.rejected]: (state, action) => {
      state.loading = 'failed';
    },
  },
});

export default playlistDetailsSlice.reducer;
