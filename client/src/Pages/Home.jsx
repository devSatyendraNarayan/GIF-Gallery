import React, { useEffect } from "react";
import { GifState } from "../Context/GifContext";
import Gif from "../Component/Gif";
import FilterGif from "../Component/FilterGif";

function Home() {
  const { gf, gifs, setGifs, filter } = GifState();

  useEffect(() => {
    const fetchTrendingGIFs = async () => {
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g",
      });
      setGifs(data);
    };

    fetchTrendingGIFs();
  }, [gf, setGifs, filter]);

  return (
    <>
      <div className="w-full mb-5 flex justify-center items-center bg-gradient-to-r from-red-500 to-blue-500 h-16 rounded mt-2">
        <h1 className="text-3xl tracking-widest font-extrabold">
          ALL the GIFS
        </h1>
      </div>
      <FilterGif showTrending/>
      <div className="columns-2  mt-5 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif?.title} />
        ))}
      </div>
    </>
  );
}

export default Home;
