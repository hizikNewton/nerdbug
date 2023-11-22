/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "assets/logo.png";
import SearchComponent from "src/components/Search";

const Header: FC = () => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <>
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && "bg-transparent backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-6xl px-5 mx-auto sm:px-6 ">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 mr-2 md:mr-4">
              <Link to="/" className="block">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </Link>
            </div>
            <div>
              <SearchComponent />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
