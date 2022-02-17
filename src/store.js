import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './core/store/playlistsSlice';
import playlistDetailsSlice from './core/store/playlistDetailsSlice';
import userInfoSlice from './core/store/usersSlice';

export const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
    playlistDetails: playlistDetailsSlice,
    userInfo: userInfoSlice,
  },
});
