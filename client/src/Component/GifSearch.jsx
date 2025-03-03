import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function GifSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGIFs = async () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchGIFs();
    }
  };

  return (
    <>
      <div className="flex relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
          placeholder="Search all the GIFs and Stickers"
          className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-bl border border-gray-300 outline-none "
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
          >
            <HiMiniXMark size={22} />
          </button>
        )}
        <button
          onClick={searchGIFs}
          className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white px-4 py-2 rounded-tr rounded-br"
        >
          <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
        </button>
      </div>
    </>
  );
}

export default GifSearch;
