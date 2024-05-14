import React, { useState, useEffect } from "react";
import { GifState } from "../Context/GifContext";
import { useParams } from "react-router-dom";

import Gif from "../Component/Gif";
import FollowOn from "../Component/FollowOn";

function Categories() {
  const [results, setResults] = useState([]);
  const { category } = useParams();
  const { gf } = GifState();

  const fetchResults = async () => {
    try {
      const { data } = await gf.gifs(category, category); // Change Categories to category to match the parameter name
      setResults(data);
    } catch (error) {
      console.error("Error fetching category results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [category]); // Change Categories to category to match the parameter name

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="divider"></div>
        
      </div>
      <div>
          {category && (
            <>
              <h2 className="text-4xl pb-1 font-extrabold capitalize">
                {category.split("-").join(" & ")} GIFs
              </h2>
              <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
                @{category}
              </h2>
              {results.length > 0 && (
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                  {results.slice(1).map((gif) => (
                    <Gif gif={gif} key={gif.id} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
    </div>
  );
}

export default Categories;
