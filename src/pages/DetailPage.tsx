/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Note from "src/components/Note";

import Section from "src/components/Section";
import { updateEntry } from "src/redux/slice";
import { RootState } from "src/redux/store";
import dataType from "src/types/type";
import useLocalStorage from "src/utils/useLocalStorage";
const DetailPage = () => {
  const { city } = useLocation().state;
  const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });
  const [state, setState] = useState<dataType>();
  const citiesAndWeather = useSelector(
    (state: RootState) => state.citiesAndWeather
  );
  const [note, setnote] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnote((s) => ({ ...s, [name]: value }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(citiesAndWeather, "cw detail");
    const fetchState = () => {
      const persistedState = read()?.items?.find((i) => i.city == city);
      if (persistedState) {
        setState((state) => ({ ...state, ...persistedState }));
      } else {
        console.log("make network call");
      }
    };
    if (!state) {
      fetchState();
    }
  }, [state?.city, city, citiesAndWeather.items]);

  const handleSave = () => {
    let currentCityNotes = state?.notes;
    if (currentCityNotes) {
      currentCityNotes.push({
        id: currentCityNotes.length + 1,
        note: note,
        date: new Date().toLocaleString(),
      });
    } else {
      currentCityNotes = [{ id: 1, date: new Date().toLocaleString(), note }];
    }
    const newState = { ...state!, notes: currentCityNotes };
    dispatch(updateEntry(newState));
    setnote({ title: "", body: "" });
    /* 
    write(cityState as any);  */
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
        <Card details={true} city={city} cityWeather={state} />

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
          {state?.notes?.map(({ date, note }) => (
            <Note date={date} note={note} edit={edit} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DetailPage;
