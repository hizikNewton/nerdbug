import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from "./IconButton";
import { useDispatch } from "react-redux";
import { noteType, removeNote } from "src/redux/noteSlice";
import { FC } from "react";

interface NoteProps {
  noteItem: noteType
  city: string
  setnote: (value: React.SetStateAction<noteType>) => void
  setShowNote: (value: React.SetStateAction<boolean>) => void
}
const Note: FC<NoteProps> = ({ noteItem, city, setnote, setShowNote }) => {
  const { id, body, title, date } = noteItem
  const dispatch = useDispatch();
  const handleButtonEdit = () => {
    setShowNote(true)
    setnote({ ...noteItem })
  };
  const handleButtonDelete = (id) => {
    dispatch(removeNote({ city, noteId: id }));
  };
  return (
    <div className="">
      <div className="w-full h-48 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
        <div>
          <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
            {title}
          </h4>
          <p className="text-gray-800 overflow-hidden truncate  dark:text-gray-100 text-sm">
            {body}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-12 justify-between text-gray-800 dark:text-gray-100">
            <p className=" text-xs w-16">{date}</p>
            <div className="flex gap-2">
              <IconButton onClick={handleButtonEdit} id={id}>
                <FaEdit />
              </IconButton>

              <IconButton onClick={() => handleButtonDelete(id)}>
                <FaTrash className="" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
