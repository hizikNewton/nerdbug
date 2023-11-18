import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from "./IconButton";

const Note = ({ note, date, edit }) => {
  const handleButtonEdit = (e) => {
    edit(e.target.id)

  }
  const handleButtonDelete = () => {

  }
  return (
    <div className="rounded">
      <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
        <div>
          <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
            {note.title}
          </h4>
          <p className="text-gray-800 dark:text-gray-100 text-sm">{note.body}</p>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
            <p className="text-sm">{date}</p>
            <div>

              <IconButton onClick={handleButtonEdit} id={note.id}> <FaEdit className="" /></IconButton>

              <IconButton onClick={handleButtonDelete}> <FaTrash className="" /></IconButton>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
