/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
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
  const { write: writeNoteLs, read: readNoteLs } = useLocalStorage("notes", {
    noteList: [],
  } as initialNoteType);

  const { state } = useLocation();

  const [cityState, setCityState] = useState<dataType>();
  const [note, setnote] = useState({ title: "", body: "" });
  const [noteState, setNoteState] = useState<noteListType>({ notes: [], city });

  const notes_ = useSelector((state: RootState) => state.notes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnote((s) => ({ ...s, [name]: value }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchState = () => {
      const persistedState = read()?.items?.find(
        (i) => i.city.toLowerCase() === city?.toLowerCase()
      );
      const noteState = readNoteLs()?.noteList?.find(
        (i) => i.city.toLowerCase() === city?.toLowerCase()
      );
      if (noteState) {
        setNoteState(noteState);
      }

      if (persistedState && !isEmpty(persistedState)) {
        setCityState((cityState) => ({ ...cityState, ...persistedState }));
      } else {
        console.log(state);
        setCityState(state);
      }
    };
    if (!cityState) {
      fetchState();
    }
    writeNoteLs(notes_);
  }, [cityState?.city, city, notes_]);
  const notes = notes_.noteList.find(
    (i) => i.city.toLowerCase() === city?.toLowerCase()
  )?.notes;
  const handleSave = () => {
    let newNote = [] as noteType[];

    if (!isEmpty(notes)) {
      newNote = [...notes!];
      newNote?.push({
        id: newNote.length + 1,
        note: note,
        date: new Date().toLocaleString(),
      });
    } else {
      newNote.push({ id: 1, date: new Date().toLocaleString(), note });
    }

    dispatch(updateNote({ city, notes: newNote }));
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
        <div className=" w-80 my-4">
          <div>
            <label
              className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 "
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500"
              onChange={handleChange}
              name={"title"}
              value={note.title}
            ></input>
          </div>
          <div className="my-4">
            <label
              className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 "
              htmlFor="body"
            >
              Body
            </label>
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500"
              onChange={handleChange}
              name={"body"}
              value={note.body}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="normal"
              onClick={handleSave}
              disabled={!note.body || !note.title}
            >
              Save
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <h3 className=" text-2xl font-bold mb-2 text-left">Saved Notes</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes?.map(({ date, note }) => (
            <Note date={date} note={note} edit={() => {}} city={city} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DetailPage;
