/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import dataType from 'src/types/type';

type initialStateType = { items: Array<dataType> };
export type noteType = {
  id: number;
  note: { body: string; title: string };
  date: string;
};

let savedData: initialStateType;

if (localStorage.getItem('citiesAndWeather')) {
  // Data exists, retrieve and parse it
  savedData = JSON.parse(
    localStorage.getItem('citiesAndWeather')!
  ) as initialStateType;
} else {
  // Data doesn't exist, initialize with default values or an empty state
  savedData = {} as initialStateType;
}
// Define the initial state using that type
const initialState: initialStateType = savedData as initialStateType;

export const citiesAndWeatherSlice = createSlice({
  name: 'citiesAndWeather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<initialStateType>) => {
      return { ...state, ...action.payload };
    },

    addFavourite: (state, action: PayloadAction<{ city: string }>) => {
      const index = state!.items.findIndex(
        (item) => item.city == action.payload.city
      );
      const filtered = state!.items.filter(
        (item) => item.city !== action.payload.city
      );
      const current = state.items[index];
      const updatedCurrent = { ...current, favourite: !current?.favourite };
      return { ...state, items: [...filtered, updatedCurrent] };
    },
    removeEntry: (state, action: PayloadAction<dataType>) => {
      return {
        ...state,
        items: state!.items.filter((item) => item.city !== action.payload.city),
      };
    },
    updateEntry: (state, action: PayloadAction<dataType>) => {
      const updatedData = [...state.items];
      const index = updatedData.findIndex(
        ({ city }) => city.toLowerCase() == action.payload.city.toLowerCase()
      );
      updatedData[index] = action.payload;
      return {
        ...state,
        items: updatedData,
      };
    },
  },
});

export const { removeEntry, setData, updateEntry, addFavourite } =
  citiesAndWeatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const citiesAndWeatherSelector = (state: RootState) =>
  state.citiesAndWeather;

export default citiesAndWeatherSlice.reducer;
