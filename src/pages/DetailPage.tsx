/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Note from "src/components/Note";
import Section from "src/components/Section";
import { initialNoteType, noteListType, noteType, saveNote, updateNote } from "src/redux/noteSlice";
import { RootState } from "src/redux/store";
import dataType from "src/types/type";
import { generateRandomId, isEmpty } from "src/utils/helper";
import useLocalStorage from "src/utils/useLocalStorage";

const DetailPage = () => {
  const { city } = useParams();

  const { read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });
  const { write: writeNoteLs, read: readNoteLs } = useLocalStorage("notes", {
    noteList: [],
  } as initialNoteType);


  const notes_ = useSelector((state: RootState) => state.notes);

  const cityAndNotesArray = notes_.noteList.find(
    (i) => i.city.toLowerCase() === city?.toLowerCase()
  );

  const { state } = useLocation();

  const [cityState, setCityState] = useState<dataType>();
  const initialNoteState = { id: "", date: "", body: "", title: "" }
  const [note, setnote] = useState<noteType>(initialNoteState);
  const [showNote, setShowNote] = useState(false);
  const [_, setNoteState] = useState<noteListType>({
    notes: [],
    city: city ?? "",
  });
  const noteRef = useRef<HTMLDivElement>(null);

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
        setCityState(state);
      }
    };
    if (!cityState) {
      fetchState();
    }
    writeNoteLs(notes_);
    if (showNote) noteRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cityState?.city, city, notes_, showNote]);


  const handleSave = () => {
    const note_ = { ...note, date: new Date().toLocaleString() }
    //const index = cityAndNotesArray?.notes.findIndex(i => i.id === note_.id)
    if (isEmpty(note.id)) {
      dispatch(saveNote({ city: city!, note: { ...note_, id: generateRandomId() } }));
    } else {
      dispatch(updateNote({ city: city!, noteId: note.id, updatedNote: note_ }))
    }
    setnote(initialNoteState);
  };

  const handleShowNote = (e) => {
    e.preventDefault();
    setShowNote(true);
  };
  return (
    <>
      <Section className="items-center ">
        <div className="relative -mb-40 -top-28 h-fit">
          <Card
            details={true}
            city={city!}
            cityWeather={cityState}
            handleShowNote={handleShowNote}
            noteRef={noteRef}
            classx="shadow-3xl"
          />
          {showNote && (
            <div className="my-4 w-80" ref={noteRef}>
              <div>
                <label
                  className="block mb-1 font-bold text-gray-500 md:text-left md:mb-0 "
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-zinc-500"
                  onChange={handleChange}
                  name={"title"}
                  value={note.title}
                ></input>
              </div>
              <div className="my-4">
                <label
                  className="block mb-1 font-bold text-gray-500 md:text-left md:mb-0 "
                  htmlFor="body"
                >
                  Body
                </label>
                <textarea
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-zinc-500"
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
          )}
        </div>
      </Section>
      <Section className="">
        <h3 className="mb-2 text-2xl font-bold text-left ">Saved Notes</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cityAndNotesArray?.notes?.map(note => (
            <Note noteItem={note} city={city!} setnote={setnote} setShowNote={setShowNote} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DetailPage;
