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
      const { city, notes } = action.payload;
    
      const index = state.noteList.findIndex(
        ({ city: storedCity }) => storedCity.toLowerCase() === city.toLowerCase()
      );
    
      const updatedNoteList = index !== -1
        ? state.noteList.map((item, i) =>
            i === index
              ? { ...item, notes: [...item.notes, ...notes] }
              : item
          )
        : [...state.noteList, { city, notes }];
    
      return { ...state, noteList: updatedNoteList };
    },
    removeNote: (state, action: PayloadAction<{city:string,noteId:number}>) => {
      const { city, noteId } = action.payload;
    
      const index = state.noteList.findIndex(
        ({ city: storedCity }) => storedCity.toLowerCase() === city.toLowerCase()
      );
    
      if (index !== -1) {
        const updatedNoteList = state.noteList.map((item, i) =>
          i === index
            ? {
                ...item,
                notes: item.notes.filter((note) => note.id !== noteId),
              }
            : item
        );
    
        return { ...state, noteList: updatedNoteList };
      }
    
      // If the city doesn't exist, return the state unchanged
      return state;
    },
  }
});

export const { setData, updateNote,removeNote } = noteSlice.actions;

export default noteSlice.reducer;
