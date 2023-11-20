/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { fetchWeatherForCity } from "src/utils/api";
import IconButton from "./IconButton";
import { FaSearch } from "react-icons/fa";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

type obj = { [x: string]: any };

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    current: obj;
    location: obj;
  }>({ current: {}, location: {} });
  const { current, location } = searchResults;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const debouncedFetchData = debounce(async (searchTerm) => {
    try {
      await fetchWeatherForCity(searchTerm)
        .then((res: any) => {
          setIsMenuOpen(true);
          setSearchResults(res);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 300);

  const handleSearch = (searchTerm) => {
    setLoading(true);
    debouncedFetchData(searchTerm);
  };
  return (
    <div className="z-10 relative">
      <label className="relative">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by city"
          disabled={loading}
        />
        <div className="absolute top-0 right-0 pr-2">
          {loading ? (
            <Spinner />
          ) : (
            <IconButton onClick={() => handleSearch(searchTerm)}>
              <FaSearch />
            </IconButton>
          )}
        </div>
      </label>
      {isMenuOpen && (
        <div ref={menuRef}>
          <Link
            to={`/detail/${location.name.toLowerCase()}`}
            key={location.name}
            state={{ city: location.name, weatherInfo: { current } }}
          >
            <ul className=" z-20 absolute w-full bg-gray-100 p-2 rounded">
              <li>
                <div className="flex justify-between">
                  <div className=" w-fit flex flex-col">
                    <span> {location?.country}</span>
                    <span>{location?.name}</span>
                  </div>
                  <div className=" w-fit flex flex-col">
                    <span>{current?.temperature}&deg;C</span>
                    <span>{current?.observation_time}</span>
                  </div>
                </div>
              </li>
            </ul>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
