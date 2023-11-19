import { configureStore } from '@reduxjs/toolkit';
import citiesAndWeatherSlice from './slice';
import noteSlice from './noteSlice';

export const store = configureStore({
  reducer: {
    citiesAndWeather: citiesAndWeatherSlice,
    notes: noteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
