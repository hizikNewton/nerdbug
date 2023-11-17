/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";
import reactLogo from "assets/react.svg";
import Modal from "src/components/Modal";
import dataReducer, { stateType } from "src/utils/dataReducer";
import Button from "src/components/Button";
import useLocalStorage from "src/utils/useLocalStorage";

const Header: FC = () => {
  const [top, setTop] = useState(true);

  const { pathname, state } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setnote] = useState("");
  const { read, write } = useLocalStorage("notes", { notes: [] } as {
    notes: stateType;
  });
  const initialNote = read();
  const [noteState, dispatch] = useReducer(
    dataReducer,
    initialNote?.notes ?? []
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setnote(value);
  };

  const handleSave = () => {
    dispatch({ type: "ADD_NOTE", payload: { city: state?.city, note } });
    write({ notes: noteState });
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <textarea onChange={handleChange} />

        <Button variant="primary" size="normal" onClick={handleSave}>
          Save
        </Button>
      </Modal>
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && "bg-white backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-6xl px-5 mx-auto sm:px-6 border">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="flex-shrink-0 mr-4">
              {/* Logo */}
              <Link to="/" className="block">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </Link>
            </div>
            <div>
              {pathname === "/detail" ? (
                <button onClick={openModal}>Add Note</button>
              ) : (
                <input placeholder="search me" />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
