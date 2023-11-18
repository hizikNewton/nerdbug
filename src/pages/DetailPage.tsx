import Note from "src/components/Note";
import Section from "src/components/Section";
import { stateType } from "src/utils/noteReducer";
import useLocalStorage from "src/utils/useLocalStorage";

const DetailPage = () => {
  const { read } = useLocalStorage("notes", { notes: [] } as {
    notes: stateType;
  });
  const [{ notes }] = read()?.notes || [{}];
  return (
    <>
      <Section>Detail</Section>
      <Section>
        <h3>Saved Notes</h3>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes?.map(({ date, note }) => (
            <Note date={date} note={note} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DetailPage;
