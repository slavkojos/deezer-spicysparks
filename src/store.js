import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './core/store/playlistsSlice';
import playlistDetailsSlice from './core/store/playlistDetailsSlice';
import userInfoSlice from './core/store/usersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, playlistsReducer);
export const store = configureStore({
  reducer: {
    playlists: persistedReducer,
    playlistDetails: playlistDetailsSlice,
    userInfo: userInfoSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
