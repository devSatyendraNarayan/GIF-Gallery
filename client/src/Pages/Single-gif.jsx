import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/GifContext";
import Gif from "../Component/Gif";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { IoCodeSharp } from "react-icons/io5";
import FollowOn from "../Component/FollowOn";
import { FiExternalLink } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa6";


function SingleGif() {
  const validTypes = ["gifs", "stickers", "texts"];
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const { gf, addToFavorites, favorites} = GifState();

  const [readMore, setReadMore] = useState(false);

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };
  const shareGif = () => {};
  const EmbedGif = () => {};

  useEffect(() => {
    if (!validTypes.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [slug, type]);

  

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 my-10 gap-4">
        <div className="md:col-span-1">
          {gif?.user && (
            <div className="flex flex-col">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-full object-cover"
              />
              <div className="px-2 mt-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="opacity-70">@{gif?.user?.username}</div>
              </div>
              {gif?.user?.description && (
                <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                  {readMore
                    ? gif?.user?.description
                    : gif?.user?.description.slice(0, 100) + "..."}
                  <div
                    className="flex items-center opacity-70 cursor-pointer"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                </p>
              )}
            </div>
          )}
          <FollowOn />
          <div className="divider"></div>
          {gif?.source && (
            <div>
              <span className="opacity-70">Source</span>
              <div className="flex items-center text-sm font-bold gap-1">
                <FiExternalLink size={25} />
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-3/4">
              <div className="opacity-70 truncate mb-2">{gif && gif.title}</div>
              {gif && <Gif gif={gif} hover={false} />}
            </div>
            <div className="flex xl:flex-col flex-row gap-5 mt-6">
              <button
                  onClick={() => addToFavorites(gif.id)}
                className="flex gap-5 items-center font-bold text-lg"
              >
                <HiMiniHeart
                  size={30}
                  className={`${favorites.includes(gif.id) ? "text-red-500" : ""}`}
                />
                Favourite
              </button>
              <button
                onClick={shareGif}
                className="flex gap-5 items-center font-bold text-lg"
              >
                <FaPaperPlane size={25} />
                Share
              </button>
              <button
                onClick={EmbedGif}
                className="flex gap-5 items-center font-bold text-lg"
              >
                <IoCodeSharp size={30} />
                Embed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>Related GIFs</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {relatedGifs.slice(1).map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
