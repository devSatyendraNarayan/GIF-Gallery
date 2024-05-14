import React, { useEffect, useState } from 'react';
import { GifState } from '../Context/GifContext';
import { useParams } from 'react-router-dom';
import FilterGif from '../Component/FilterGif';
import Gif from '../Component/Gif'; 

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResults = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query, filter]); 

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 mb-2 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>No GIFs found for {query}. Try searching for other filters.</span>
      )}
    </div>
  );
}

export default Search;
