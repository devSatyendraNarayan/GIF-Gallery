import React from "react";
import { Link } from "react-router-dom";

function Gif({ gif, hover = true }) {
  return (
    <Link to={`${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-2 relative cursor-pointer group aspect-video">
        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif?.title}
          className="w-full object-cover rounded transition-all duration-300"
        />
        {hover && (
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-8"
            />
            <span className="text-white opacity-75">{gif?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Gif;
