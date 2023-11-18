/* eslint-disable @typescript-eslint/no-explicit-any */
/* import { useReducer, useState } from "react";
import { useLocation } from "react-router";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Note from "src/components/Note";
import dataType from "src/types/type";
import dataReducer from "src/utils/dataReducer";
import useLocalStorage from "src/utils/useLocalStorage";
 */

import Section from "src/components/Section";
const DetailPage = () => {
  /*  const { state } = useLocation()
 
   const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as {
     items: Array<dataType>;
   });
 
   const [cityState, dispatch] = useReducer(dataReducer, read());
 
   const currentCity = cityState!.items.find(i => i.city === state.city)
 
   const [note, setnote] = useState({ title: "", body: "" });
 
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setnote(s => ({ ...s, [name]: value }));
   };
 
   const handleSave = () => {
         let currentCityNotes = currentCity?.notes
         if (currentCityNotes) {
           currentCityNotes.push({
             id: currentCityNotes.length + 1,
             note: note,
             date: new Date().toLocaleString(),
           });
         } else {
           currentCityNotes = [{ id: 1, date: new Date().toLocaleString(), note }];
         }
         dispatch({ type: "UPDATE_ENTRY", payload: { cityObj: { ...state, notes: currentCityNotes } } })
         setnote({ title: "", body: "" })
     
         write(cityState as any); 
   };
 
   const edit = (id) => {
     const note = currentCity?.notes?.filter(i => i.id === id)
     console.log(cityState, id, "howw")
     setnote(currentNote => ({ ...currentNote, note }))
   }
  */
  return (
    <>
      <Section>
        <div>{"hello"}</div>
        {/*  <Card details={true} weatherInfo={state.weatherInfo} city={state.city} citiesAndWeather={cityState} dispatch={() => { }} />
        <input onChange={handleChange} name={"title"} value={note.title}></input>
        <textarea onChange={handleChange} name={"body"} value={note.body} />
        <Button variant="primary" size="normal" onClick={handleSave} disabled={!note.body || !note.title}>
          Save
        </Button>
      </Section>
      <Section>
        <h3>Saved Notes</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCity?.notes?.map(({ date, note }) => (
            <Note date={date} note={note} edit={edit} />
          ))}
        </div> */}
      </Section>
    </>
  );
};

export default DetailPage;
