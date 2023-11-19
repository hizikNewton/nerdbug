/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import dataType from 'src/types/type';

// Define a type for the slice state
/* interface citiesAndWeatherState {
  city: string;
  country: string;
  populationCounts: [
    {
      year: string;
      value: string;
      sex: string;
      reliabilty: string;
    }
  ];
  weatherInfo: any;
  favourite?: boolean;
  notes: Array<noteType>;
} */
type initialStateType = { items: Array<dataType> };
export type noteType = {
  id: number;
  note: { body: string; title: string };
  date: string;
};

// Define the initial state using that type
const initialState: initialStateType = {} as initialStateType;

export const citiesAndWeatherSlice = createSlice({
  name: 'citiesAndWeather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<initialStateType>) => {
      return { ...state, ...action.payload };
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeEntry: (state, action: PayloadAction<dataType>) => {
      return {
        ...state,
        items: state!.items.filter((item) => item.city !== action.payload.city),
      };
    },
  },
});

export const { removeEntry, setData } = citiesAndWeatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const citiesAndWeatherSelector = (state: RootState) =>
  state.citiesAndWeather;

export default citiesAndWeatherSlice.reducer;
