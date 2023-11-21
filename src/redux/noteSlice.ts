import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'src/utils/helper';

export type noteType = {
  id: string;
  body: string;
  title: string;
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
    saveNote: (
      state,
      action: PayloadAction<{ note: noteType; city: string }>
    ) => {
      const { note, city } = action.payload;
      const stateCopy = Object.assign({}, state);
      const cityNoteObj = Object.assign(
        {},
        stateCopy.noteList.find((i) => i.city === city)
      );
      const otherCityNoteObject = stateCopy.noteList.filter(
        (i) => i.city != city
      );

      if (isEmpty(stateCopy.noteList)) {
        //if state is empty
        stateCopy.noteList = [{ city, notes: [{ ...note }] }];
      } else if (!isEmpty(cityNoteObj)) {
        //if there are other city(ies)
        const notes = [...cityNoteObj.notes, { ...note, id: note.id + 1 }];
        stateCopy.noteList = [...otherCityNoteObject, { city, notes }];
      } else {
        stateCopy.noteList = [
          ...otherCityNoteObject,
          { city, notes: [{ ...note }] },
        ];
      }
      return stateCopy;
    },

    updateNote: (
      state,
      action: PayloadAction<{
        city: string;
        noteId: string;
        updatedNote: Partial<noteType>;
      }>
    ) => {
      const { city, noteId } = action.payload;

      const cityNoteObj = state.noteList.find(
        ({ city: storedCity }) =>
          storedCity.toLowerCase() === city.toLowerCase()
      );
      const otherCityNoteObject = state.noteList.filter((i) => i.city != city);
      const note = cityNoteObj!.notes.find((item) => item.id === noteId);
      const otherNote = cityNoteObj!.notes.filter((item) => item.id != noteId);

      const updatedNote = {
        ...note,
        ...action.payload.updatedNote,
      } as Required<noteType>;

      return {
        ...state,
        noteList: [
          ...otherCityNoteObject,
          { city, notes: [...otherNote, updatedNote] },
        ],
      };
    },
    removeNote: (
      state,
      action: PayloadAction<{ city: string; noteId: string }>
    ) => {
      const { city, noteId } = action.payload;

      const index = state.noteList.findIndex(
        ({ city: storedCity }) =>
          storedCity.toLowerCase() === city.toLowerCase()
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
  },
});

export const { setData, updateNote, removeNote, saveNote } = noteSlice.actions;

export default noteSlice.reducer;
