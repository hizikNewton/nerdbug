/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Note from "src/components/Note";
import Section from "src/components/Section";
import { initialNoteType, noteListType, updateNote } from "src/redux/noteSlice";
import { RootState } from "src/redux/store";
import dataType, { noteType } from "src/types/type";
import { isEmpty } from "src/utils/helper";
import useLocalStorage from "src/utils/useLocalStorage";


const DetailPage = () => {

  const { city } = useParams();

  const { read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });
  const { write: writeNoteLs, read: readNoteLs } = useLocalStorage("notes", { noteList: [] } as initialNoteType)

  const [cityState, setCityState] = useState<dataType>();
  const [note, setnote] = useState({ title: "", body: "" });
  const [noteState, setNoteState] = useState<noteListType>({ notes: [], city })

  const notes_ = useSelector((state: RootState) => state.notes);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setnote((s) => ({ ...s, [name]: value }));
  };
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchState = () => {

      const persistedState = read()?.items?.find((i) => i.city.toLowerCase() === city?.toLowerCase());
      const noteState = readNoteLs()?.noteList?.find((i) => i.city.toLowerCase() === city?.toLowerCase());
      if (noteState) {
        setNoteState(noteState)
      }

      if (persistedState && !isEmpty(persistedState)) {
        setCityState(cityState => ({ ...cityState, ...persistedState }));
      } else {
        console.log("make network call");
      }
    };
    if (!cityState) {
      fetchState();
    }
    // writeNoteLs(notes_)
  }, [cityState?.city, city]);


  const handleSave = () => {
    let newNote = [] as noteType[]
    const notes = notes_.noteList.find((i) => i.city.toLowerCase() === city?.toLowerCase())?.notes
    if (!isEmpty(notes)) {
      newNote = [...notes!]
      newNote?.push({
        id: newNote.length + 1,
        note: note,
        date: new Date().toLocaleString(),
      });
    } else {
      newNote.push({ id: 1, date: new Date().toLocaleString(), note });
    }

    dispatch(updateNote({ city, notes: newNote }))
    writeNoteLs(notes_)
  };
  /*  
 
   const [cityState, dispatch] = useReducer(dataReducer, read());
 
   const currentCity = cityState!.items.find(i => i.city === state.city)
 
   const edit = (id) => {
     const note = currentCity?.notes?.filter(i => i.id === id)
     console.log(cityState, id, "howw")
     setnote(currentNote => ({ ...currentNote, note }))
   }
  */
  return (
    <>
      <Section>
        <Card details={true} city={city} cityWeather={cityState} />

        <input
          onChange={handleChange}
          name={"title"}
          value={note.title}
        ></input>
        <textarea onChange={handleChange} name={"body"} value={note.body} />
        <Button
          variant="primary"
          size="normal"
          onClick={handleSave}
          disabled={!note.body || !note.title}
        >
          Save
        </Button>
      </Section>
      <Section>
        <h3>Saved Notes</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {noteState?.notes.map(({ date, note }) => (
            <Note date={date} note={note} edit={() => { }} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DetailPage;
