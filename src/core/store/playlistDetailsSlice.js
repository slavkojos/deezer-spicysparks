import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const corsProxy = 'https://api.allorigins.win/raw?url=';
const apiUrl =
  'https://api.allorigins.win/raw?url=http://api.deezer.com/playlist';
export const fetchPlaylistDetails = createAsyncThunk(
  'playlist/fetchbyID',
  async id => {
    try {
      const response = await axios.get(corsProxy + apiUrl + '/' + id);
      console.log('response, ' + response.status);
      if ((response.status = 200)) {
        return response.data;
      }
      throw new Error(response.statusText);
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
      if (action.payload.error) {
        state.loading = 'error';
        return;
      }
      state.loading = 'loaded';
      state.data = action.payload;
    },
    [fetchPlaylistDetails.pending]: (state, action) => {
      state.data = [];
      state.loading = 'loading';
    },
    [fetchPlaylistDetails.rejected]: (state, action) => {
      state.loading = 'failed';
    },
  },
});

export default playlistDetailsSlice.reducer;
