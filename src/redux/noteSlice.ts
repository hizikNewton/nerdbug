import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type noteType = {
  id: number;
  note: { body: string; title: string };
  date: string;
};

export type noteListType = {
  city: string;
  notes: Array<noteType>;
};
export type initialNoteType = {
  noteList: Array<noteListType>;
};

let savedData: initialNoteType;

if (localStorage.getItem('notes')) {
  // Data exists, retrieve and parse it
  savedData = JSON.parse(localStorage.getItem('notes')!) as initialNoteType;
} else {
  // Data doesn't exist, initialize with default values or an empty state
  savedData = { noteList: [] } as initialNoteType;
}

const initialState: initialNoteType = savedData;

export const noteSlice = createSlice({
  name: 'notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<initialNoteType>) => {
      return { ...state, ...action.payload };
    },
    updateNote: (state, action: PayloadAction<noteListType>) => {
      let updatedData = [...state.noteList];

      const index = state.noteList.findIndex(
        ({ city }) => city.toLowerCase() == action.payload.city.toLowerCase()
      );
      console.log(action.payload.notes, 'dj', index);
      if (index != -1) {
        updatedData[index].notes.push(...action.payload.notes);
      } else {
        updatedData = [action.payload];
      }
      return {
        ...state.noteList,
        updatedData,
      };
    },
  },
});

export const { setData, updateNote } = noteSlice.actions;

export default noteSlice.reducer;
