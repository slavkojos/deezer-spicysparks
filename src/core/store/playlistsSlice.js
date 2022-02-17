import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl =
  'https://api.allorigins.win/raw?url=http://api.deezer.com/chart/0/playlists?limit=30';

export const fetchPlaylists = createAsyncThunk(
  'playlists/fetchAll',
  async thunkApi => {
    try {
      const response = await axios.get(apiUrl);
      if ((response.status = 200)) {
        const playlists = response.data.data;
        playlists.map(playlist => {
          return {
            id: playlist.id,
            title: playlist.title,
            type: playlist.type,
            nb_tracks: playlist.nb_tracks,
            link: playlist.link,
            picture_xl: playlist.picture_xl,
            tracklist: playlist.tracklist,
            creation_date: playlist.creation_date,
          };
        });
        return playlists;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: { playlists: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchPlaylists.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.playlists = action.payload;
    },
    [fetchPlaylists.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchPlaylists.rejected]: (state, action) => {
      state.loading = 'failed';
    },
  },
});

export default playlistsSlice.reducer;
